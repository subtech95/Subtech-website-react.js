import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D", // Using dark as default
        foreground: "#FFFFFF",
        white: "#FFFFFF",
        "sub-white": "#F8F8F8",
        black: "#0D0D0D",
        "sub-black": "#1A1A1A",
        red: {
          500: "#CC0000",
          600: "#AA0000",
        },
        gray: {
          subtle: "#E5E5E5",
          muted: "#999999",
        }
      },
      backgroundImage: {
        "hero-glow": "linear-gradient(to bottom, #0D0D0D, #1A1A1A)",
        "divider-glow": "radial-gradient(circle at center, rgba(204, 0, 0, 0.05) 0%, transparent 70%)",
        "cta-gradient": "linear-gradient(to right, #CC0000, #AA0000)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
