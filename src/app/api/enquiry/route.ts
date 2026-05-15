/**
 * POST /api/enquiry
 *
 * Same-origin proxy that the entire site posts to. Avoids CORS errors that
 * would otherwise hit when forms try to POST cross-origin.
 *
 * Accepts:
 *   - multipart/form-data    (file uploads — service complaint photos)
 *   - application/x-www-form-urlencoded
 *   - application/json
 *
 * Routes to one of two CRM endpoints based on the form's `method` field
 * (kept compatible with the legacy PHP `Controller/Master` shape):
 *   - method = "Complains"  →  /api/public/service-requests
 *   - everything else        →  /api/public/enquiries
 *
 * Override the upstream base via env on the droplet:
 *   ENQUIRY_FORWARD_BASE=https://crm.subtech.in
 *
 * Failure is fail-soft: if the CRM is unreachable we still log the lead
 * to stdout (visible via `pm2 logs subtech-earth-website`) and return
 * success to the visitor — better to lose telemetry than lose a lead.
 *
 * Response shape (matches legacy PHP so existing client parsers work):
 *   { type: "success" | "error", message: string }
 *
 * HTML form submits get a 303 redirect to /thank-you?p=<product>.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORWARD_BASE = (
  process.env.ENQUIRY_FORWARD_BASE ?? "https://crm.subtech.in"
).replace(/\/+$/, "");

const ENQUIRIES_URL          = `${FORWARD_BASE}/api/public/enquiries`;
const SERVICE_REQUEST_URL    = `${FORWARD_BASE}/api/public/service-requests`;
const CAREER_APPLICATIONS_URL = `${FORWARD_BASE}/api/public/career-applications`;

type Payload = Record<string, string>;

function asString(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

/** Convert FormData (excluding File entries — CRM doesn't accept binaries
 * via JSON) into a plain JSON-friendly object. */
function formDataToJson(fd: FormData): Payload {
  const out: Payload = {};
  fd.forEach((v, k) => {
    // File uploads silently dropped — CRM endpoint takes JSON only.
    if (typeof v === "string") out[k] = v;
  });
  return out;
}

function pickEndpoint(payload: Payload): string {
  const m = (payload.method || "").toLowerCase();
  if (m === "complains" || m === "complaint" || m === "service") {
    return SERVICE_REQUEST_URL;
  }
  if (m === "jobapply" || m === "apply" || m === "career") {
    return CAREER_APPLICATIONS_URL;
  }
  return ENQUIRIES_URL;
}

/**
 * Translate the website's legacy careers-form field names to the new CRM's
 * /api/public/career-applications JSON shape. The website's form uses
 * `data_id` for job id, `subject` for the job title, `c_type` for LinkedIn,
 * and stuffs experience/message into a few different fields. We bundle all
 * the context into `cover_letter` so nothing is lost — the recruiter sees
 * the full submission in the CRM admin.
 */
function transformForCareerApplications(payload: Payload): Payload {
  const pieces: string[] = [];
  if (payload.subject)  pieces.push(`Position applied for: ${payload.subject}`);
  if (payload.message)  pieces.push(`Experience: ${payload.message}`);
  if (payload.c_type)   pieces.push(`LinkedIn: ${payload.c_type}`);
  if (payload.address)  pieces.push(`Message:\n${payload.address}`);
  if (payload.job)      pieces.push(`Department: ${payload.job}`);
  // Note about the resume — the proxy converts FormData to JSON and drops
  // File entries, so the resume binary isn't actually attached here. Flag
  // it in the cover letter so admins know to ask the candidate for it.
  pieces.push("[Resume was attached on the website form — please request a copy from the candidate.]");

  return {
    job_id:       payload.data_id || payload.job_id || "",
    name:         payload.name    || "",
    email:        payload.email   || "",
    mobile:       payload.mobile  || payload.phone || "",
    cover_letter: pieces.join("\n\n"),
    source:       payload.source  || "earth.subtech.in",
  };
}

async function forwardJson(url: string, payload: Payload): Promise<{
  ok: boolean;
  status: number;
  text: string;
  parsed: { status?: boolean; message?: string; data?: unknown } | null;
}> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const text = await res.text();
    let parsed: { status?: boolean; message?: string; data?: unknown } | null = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      /* upstream returned non-JSON */
    }
    return { ok: res.ok, status: res.status, text, parsed };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      text: err instanceof Error ? err.message : "fetch failed",
      parsed: null,
    };
  }
}

/**
 * Differentiate a real HTML <form action="/api/enquiry"> submit (which
 * expects a 303 redirect → /thank-you) from a JS fetch() submit (which
 * expects a JSON response). Using Sec-Fetch-Dest as the primary signal:
 *
 *   - Native form submit → Sec-Fetch-Dest: document
 *   - fetch() / XHR     → Sec-Fetch-Dest: empty
 *
 * Fall back to the Accept header for older browsers — native submits
 * include text/html, fetch defaults to any media type.
 */
function isHtmlFormSubmit(req: Request): boolean {
  if (req.headers.get("sec-fetch-dest") === "document") return true;
  const accept = req.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

/**
 * Build an absolute redirect URL that respects the Nginx proxy's host —
 * `req.url` would otherwise be `http://0.0.0.0:3002/...` because that's
 * what Next.js sees when listening behind a reverse proxy.
 */
function publicUrl(req: Request, path: string): URL {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "earth.subtech.in";
  return new URL(path, `${proto}://${host}`);
}

export async function POST(req: Request) {
  const ctype = req.headers.get("content-type") ?? "";

  // ── 1. Parse incoming payload to a plain object ────────────────────────
  let payload: Payload = {};
  try {
    if (ctype.includes("application/json")) {
      const j = (await req.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(j)) payload[k] = asString(v);
    } else {
      const fd = await req.formData();
      payload = formDataToJson(fd);
    }
  } catch {
    return NextResponse.json(
      { type: "error", message: "Bad form payload" },
      { status: 400 },
    );
  }

  // ── 2. Tag with source if missing ──────────────────────────────────────
  if (!payload.source) payload.source = "earth.subtech.in";

  // ── 3. Forward to the right CRM endpoint ───────────────────────────────
  const url = pickEndpoint(payload);
  // Career applications need their fields re-shaped because the website
  // form uses legacy names (data_id, subject, c_type, address) that don't
  // map directly to the new CRM's career-applications endpoint.
  const bodyToSend =
    url === CAREER_APPLICATIONS_URL ? transformForCareerApplications(payload) : payload;
  const fwd = await forwardJson(url, bodyToSend);

  if (!fwd.ok) {
    console.warn(
      "[enquiry] CRM forward failed:",
      fwd.status,
      fwd.text.slice(0, 200),
      "url=" + url,
      "name=" + (payload.name || ""),
      "mobile=" + (payload.mobile || payload.phone || ""),
    );
  } else {
    console.log(
      "[enquiry] forwarded:",
      url.endsWith("/service-requests") ? "service-request" : "enquiry",
      "id=" + (fwd.parsed?.data && typeof fwd.parsed.data === "object" && "id" in fwd.parsed.data
        ? (fwd.parsed.data as { id: number }).id
        : "?"),
    );
  }

  // ── 4. HTML form submits → redirect to thank-you ───────────────────────
  if (isHtmlFormSubmit(req)) {
    const product = (payload.product || "your enquiry").slice(0, 120);
    const thankUrl = publicUrl(req, "/thank-you");
    thankUrl.searchParams.set("p", product);
    // Even on upstream failure, send the user to thank-you so the lead
    // isn't lost from the visitor's perspective. The console.warn above
    // ensures the lead is recoverable from `pm2 logs`.
    return NextResponse.redirect(thankUrl, 303);
  }

  // ── 5. fetch() callers — return legacy-shaped JSON ─────────────────────
  // CRM responds with `{ status, message, data }`. Map to the legacy
  // PHP `{ type, message }` shape that all existing clients parse.
  if (fwd.parsed && typeof fwd.parsed.status === "boolean") {
    return NextResponse.json(
      {
        type: fwd.parsed.status ? "success" : "error",
        message: fwd.parsed.message || (fwd.parsed.status ? "Submitted" : "Server error"),
        data: fwd.parsed.data,
      },
      { status: fwd.parsed.status ? 200 : 502 },
    );
  }

  return NextResponse.json(
    {
      type: fwd.ok ? "success" : "error",
      message: fwd.ok ? "Submitted successfully." : "Server error. Please try again.",
    },
    { status: fwd.ok ? 200 : 502 },
  );
}

export function GET() {
  return NextResponse.json(
    { type: "error", message: "POST only" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
