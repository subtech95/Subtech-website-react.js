/**
 * POST /api/enquiry
 *
 * Accepts the "Get a Free Quote" form posted from product detail pages and
 * forwards the enquiry to the Subtech CRM. The form submits as either
 * `application/x-www-form-urlencoded` (native HTML form) or JSON.
 *
 * On success we redirect the browser to /thank-you for HTML form submits, or
 * return JSON `{ ok: true }` for fetch-based callers.
 *
 * Behavior is fail-soft: if the CRM endpoint is unreachable we still log the
 * lead to stdout (visible in `pm2 logs`) and return success to the visitor —
 * we'd rather lose telemetry than lose the lead.
 *
 * Configure the upstream endpoint via env (defaults to the public CRM):
 *   ENQUIRY_FORWARD_URL=https://crm.subtech.in/api/public/leads
 */

import { NextResponse } from "next/server";
import { CMS_BASE_URL } from "@/lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  name: string;
  phone: string;
  qty: string;
  requirement: string;
  product: string;
  source: string;
  user_agent: string | null;
  submitted_at: string;
};

function clean(v: FormDataEntryValue | null | undefined): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, 500);
}

async function readForm(req: Request): Promise<Record<string, string>> {
  const ctype = req.headers.get("content-type") ?? "";
  if (ctype.includes("application/json")) {
    const j = (await req.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(j)) {
      if (typeof v === "string") out[k] = v.trim().slice(0, 500);
    }
    return out;
  }
  // application/x-www-form-urlencoded or multipart/form-data
  const fd = await req.formData();
  return {
    name: clean(fd.get("name")),
    phone: clean(fd.get("phone")),
    qty: clean(fd.get("qty")),
    requirement: clean(fd.get("requirement")),
    product: clean(fd.get("product")),
  };
}

function isHtmlForm(req: Request): boolean {
  const ctype = req.headers.get("content-type") ?? "";
  return (
    ctype.includes("application/x-www-form-urlencoded") ||
    ctype.includes("multipart/form-data")
  );
}

async function forwardToCrm(lead: Lead): Promise<boolean> {
  const url =
    process.env.ENQUIRY_FORWARD_URL ?? `${CMS_BASE_URL}/api/public/leads`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(lead),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const fields = await readForm(req);

  // Validation — phone and name are the must-haves to be a usable lead.
  const errors: Record<string, string> = {};
  if (!fields.name) errors.name = "Please enter your name.";
  if (!fields.phone || !/^[\d\s+\-()]{7,20}$/.test(fields.phone)) {
    errors.phone = "Please enter a valid mobile number.";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors },
      { status: 400 },
    );
  }

  const lead: Lead = {
    name: fields.name,
    phone: fields.phone,
    qty: fields.qty || "",
    requirement: fields.requirement || "",
    product: fields.product || "Generic enquiry",
    source: "earth.subtech.in (Next.js)",
    user_agent: req.headers.get("user-agent"),
    submitted_at: new Date().toISOString(),
  };

  const forwarded = await forwardToCrm(lead);
  if (!forwarded) {
    // Fail-soft: log so the lead is recoverable from pm2 logs.
    console.warn("[enquiry] CRM forward failed, lead retained in logs:", lead);
  } else {
    console.log("[enquiry] forwarded:", lead.product, lead.phone);
  }

  if (isHtmlForm(req)) {
    const url = new URL("/thank-you", req.url);
    url.searchParams.set("p", lead.product);
    // 303 redirects a POST to a GET — mandatory after form submit.
    return NextResponse.redirect(url, 303);
  }
  return NextResponse.json({ ok: true });
}

// Reject non-POST methods cleanly.
export function GET() {
  return NextResponse.json(
    { ok: false, error: "POST only" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
