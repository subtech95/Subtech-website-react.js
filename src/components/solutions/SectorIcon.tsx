/**
 * Line-art SVG icons for the 13 sectors. One single component that switches
 * on slug — keeps imports simple and the SECTORS data emoji-free.
 *
 * All icons are stroke-based (1.6 weight, currentColor) so they inherit colour
 * from the parent and stay visually consistent with the Company dropdown's
 * outline icon style.
 */

import type { SVGProps } from "react";

const COMMON: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export default function SectorIcon({
  slug,
  className = "w-5 h-5",
}: {
  slug: string;
  className?: string;
}) {
  switch (slug) {
    case "utilities-and-energy":
      return (
        <svg {...COMMON} className={className}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );

    case "government-project-automation":
      return (
        <svg {...COMMON} className={className}>
          <polygon points="2 9 12 3 22 9" />
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="5" y1="9" x2="5" y2="20" />
          <line x1="9" y1="9" x2="9" y2="20" />
          <line x1="15" y1="9" x2="15" y2="20" />
          <line x1="19" y1="9" x2="19" y2="20" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );

    case "campus-power-automation":
      return (
        <svg {...COMMON} className={className}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5" />
        </svg>
      );

    case "industrial-motor-control":
      return (
        <svg {...COMMON} className={className}>
          <path d="M2 21h20" />
          <path d="M4 21V9l5 4V9l5 4V9l5 12" />
          <line x1="7" y1="14" x2="7" y2="18" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <line x1="17" y1="15" x2="17" y2="18" />
        </svg>
      );

    case "hospital-critical-power-systems":
      return (
        <svg {...COMMON} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );

    case "home-automation-panels":
      return (
        <svg {...COMMON} className={className}>
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );

    case "smart-irrigation-motor-protection":
      return (
        <svg {...COMMON} className={className}>
          <path d="M12 22V10" />
          <path d="M12 10c0-3 2-6 5-6 0 4-2 6-5 6z" />
          <path d="M12 13c0-3-2-6-5-6 0 4 2 6 5 6z" />
          <path d="M5 22h14" />
        </svg>
      );

    case "commercial-building-automation":
      return (
        <svg {...COMMON} className={className}>
          <rect x="5" y="3" width="14" height="18" />
          <line x1="9" y1="7" x2="9" y2="7.01" />
          <line x1="13" y1="7" x2="13" y2="7.01" />
          <line x1="9" y1="11" x2="9" y2="11.01" />
          <line x1="13" y1="11" x2="13" y2="11.01" />
          <line x1="9" y1="15" x2="9" y2="15.01" />
          <line x1="13" y1="15" x2="13" y2="15.01" />
          <line x1="3" y1="21" x2="21" y2="21" />
        </svg>
      );

    case "real-estate-electrical-panels":
      return (
        <svg {...COMMON} className={className}>
          <path d="M5 21V9h12v12" />
          <line x1="5" y1="9" x2="20" y2="4" />
          <line x1="11" y1="7" x2="11" y2="21" />
          <rect x="8" y="14" width="6" height="7" />
        </svg>
      );

    case "bank-power-backup-automation":
      return (
        <svg {...COMMON} className={className}>
          <line x1="3" y1="11" x2="21" y2="11" />
          <polyline points="3 11 12 4 21 11" />
          <line x1="6" y1="13" x2="6" y2="19" />
          <line x1="10" y1="13" x2="10" y2="19" />
          <line x1="14" y1="13" x2="14" y2="19" />
          <line x1="18" y1="13" x2="18" y2="19" />
          <line x1="3" y1="21" x2="21" y2="21" />
        </svg>
      );

    case "telecom-power-systems":
      return (
        <svg {...COMMON} className={className}>
          <line x1="12" y1="22" x2="12" y2="6" />
          <line x1="6" y1="22" x2="12" y2="6" />
          <line x1="18" y1="22" x2="12" y2="6" />
          <line x1="5" y1="22" x2="19" y2="22" />
          <circle cx="12" cy="3.5" r="1.6" />
          <path d="M9 6c-1.4 1-2.2 2.7-2.2 4.5" />
          <path d="M15 6c1.4 1 2.2 2.7 2.2 4.5" />
        </svg>
      );

    case "defence-electrical-systems":
      return (
        <svg {...COMMON} className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );

    case "oems-and-panel-integrators":
      return (
        <svg {...COMMON} className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.93 4.93l2.12 2.12" />
          <path d="M16.95 16.95l2.12 2.12" />
          <path d="M4.93 19.07l2.12-2.12" />
          <path d="M16.95 7.05l2.12-2.12" />
        </svg>
      );

    default:
      // Generic fallback — neutral plug/outlet icon
      return (
        <svg {...COMMON} className={className}>
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="9" x2="9" y2="13" />
          <line x1="15" y1="9" x2="15" y2="13" />
          <path d="M9 16a4 4 0 0 0 6 0" />
        </svg>
      );
  }
}
