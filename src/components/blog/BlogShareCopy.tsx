"use client";

import { useState } from "react";

const RED = "#EF2E33";

export default function BlogShareCopy() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title="Copy link"
      onClick={() => {
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      }}
      className="w-9 h-9 rounded-full border-[1.5px] flex items-center justify-center transition-all hover:scale-110"
      style={{
        borderColor: copied ? RED : "#e0e0e0",
        color: copied ? RED : "#999",
        background: copied ? "#fdeaeb" : "#fff",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    </button>
  );
}
