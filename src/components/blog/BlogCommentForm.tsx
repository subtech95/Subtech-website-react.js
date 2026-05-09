"use client";

import { useState } from "react";

const RED = "#EF2E33";

type Props = { blogId: number };

/**
 * Posts to the CRM `Controller/Master/` endpoint — same shape as the PHP site's
 * comment form. CRM stores comments with `status='pending'` until moderated.
 */
export default function BlogCommentForm({ blogId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("method", "Comment");
      fd.append("blog_id", String(blogId));
      fd.append("fname", name);
      fd.append("email", email);
      fd.append("message", message);
      fd.append("source", "earth.subtech.in blog comment");

      // Same-origin proxy — see /api/enquiry/route.ts.
      await fetch("/api/enquiry", {
        method: "POST",
        body: fd,
      });

      setState("ok");
      setMsg("Comment submitted — it will appear after review.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setState("err");
      setMsg("Connection error. Try again.");
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your Name *">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rajesh Kumar"
            required
            className="px-4 py-3.5 rounded-[10px] bg-white/5 border-[1.5px] border-white/10 text-[14px] text-white placeholder:text-white/20 outline-none transition focus:border-[color:var(--R)] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(239,46,51,0.15)]"
            style={{ ["--R" as string]: RED }}
          />
        </Field>
        <Field label="Your Email *">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="px-4 py-3.5 rounded-[10px] bg-white/5 border-[1.5px] border-white/10 text-[14px] text-white placeholder:text-white/20 outline-none transition focus:border-[color:var(--R)] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(239,46,51,0.15)]"
            style={{ ["--R" as string]: RED }}
          />
        </Field>
      </div>
      <Field label="Your Comment *">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Write your comment here..."
          required
          className="mt-4 px-4 py-3.5 rounded-[10px] bg-white/5 border-[1.5px] border-white/10 text-[14px] text-white placeholder:text-white/20 outline-none transition focus:border-[color:var(--R)] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(239,46,51,0.15)] resize-y"
          style={{ ["--R" as string]: RED }}
        />
      </Field>

      <p className="mt-4 mb-3 text-[12px] text-white/[0.25]">
        Comments are moderated. We typically respond within 24 hours.
      </p>

      {msg && (
        <div
          className={`mb-3 text-[14px] font-medium ${
            state === "ok"
              ? "text-green-400"
              : state === "err"
                ? "text-red-400"
                : "text-white/60"
          }`}
        >
          {msg}
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] text-white font-bold text-[14px] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(239,46,51,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: state === "ok" ? "#16a34a" : RED }}
      >
        {state === "loading"
          ? "Sending..."
          : state === "ok"
            ? "Sent"
            : "Post Comment"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-bold tracking-[0.8px] uppercase text-white/35">
        {label}
      </label>
      {children}
    </div>
  );
}
