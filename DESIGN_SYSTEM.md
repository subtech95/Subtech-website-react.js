# Subtech Design System — "Voltage"

---

## Company

- **Name:** Subtech
- **Tagline:** Est. 1998
- **Location:** Greater Noida, India
- **Business:** Industrial electrical automation — VFD panels, AMF panels, MCC panels, motor starters
- **Key Clients:** GAIL, NTPC, DMRC, Indian Railways, Indian Air Force
- **Stats:**
  - Rs 22 Cr revenue
  - 220+ dealers
  - 25+ years
  - 10,000+ panels installed
- **Certifications:** ISO 9001, ISO 14001, CE, CPRI, ZED Silver

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 14 with App Router          |
| Language         | TypeScript                          |
| Styling          | Tailwind CSS                        |
| Animations       | Framer Motion & GSAP                |
| 3D               | React Three Fiber, Drei & Three.js  |
| Package Manager  | npm                                 |

---

## Design Philosophy

Apple-inspired minimal premium design. Dark cinematic hero section. Clean white content sections. Lots of breathing space. Nothing crowded. Feels like Tesla meets Siemens. World-class industrial tech brand feel. Every section has one focal point. Animations are subtle and purposeful.

---

## Color Palette

| Token          | Hex       | Usage                                        |
| -------------- | --------- | -------------------------------------------- |
| Primary Dark   | `#0D0D0D` | Hero, navbar, footer, dark sections          |
| Secondary Dark | `#1A1A1A` | Dark cards, hover states                     |
| Pure White     | `#FFFFFF` | Main content section backgrounds             |
| Off White      | `#F8F8F8` | Alternate section backgrounds                |
| Brand Red      | `#CC0000` | CTAs, active states, accents **ONLY**        |
| Border         | `#E5E5E5` | All card and section borders                 |
| Body Text      | `#333333` | All paragraph text                           |
| Muted Text     | `#888888` | Subtitles, captions, secondary text          |
| Red Glow       | `#CC0000` at 5% opacity | Ambient glow effects only        |

### Color Usage Rule

- **70%** — White & off-white surfaces
- **20%** — Dark charcoal surfaces
- **10%** — Red accents only
- Never use red as a background except the single CTA banner section
- Never use more than 3 gradient effects on the entire website

---

## Typography

**Font Family:** DM Sans (Google Fonts)
**Loaded Weights:** 300, 400, 500, 600, 700 only

### Type Scale

| Level      | Size  | Weight | Letter Spacing | Line Height | Notes     |
| ---------- | ----- | ------ | -------------- | ----------- | --------- |
| H1         | 72px  | 700    | -2px           | 1.1         |           |
| H2         | 48px  | 600    | -1px           | 1.2         |           |
| H3         | 32px  | 500    | 0              | 1.3         |           |
| H4         | 24px  | 500    | —              | 1.4         |           |
| Body Large | 18px  | 400    | —              | 1.7         |           |
| Body       | 16px  | 400    | —              | 1.7         |           |
| Small      | 14px  | 400    | —              | 1.6         |           |
| Caption    | 12px  | 300    | 2px            | —           | UPPERCASE |

---

## Spacing System

**Base unit:** 8px

| Token | Value  |
| ----- | ------ |
| xs    | 8px    |
| sm    | 16px   |
| md    | 24px   |
| lg    | 32px   |
| xl    | 48px   |
| 2xl   | 64px   |
| 3xl   | 96px   |
| 4xl   | 128px  |

**Section padding (top & bottom):** 96px minimum

---

## Border Radius

| Element          | Radius |
| ---------------- | ------ |
| Buttons          | 8px    |
| Cards            | 12px   |
| Large Containers | 16px   |
| Pills & Tags     | 999px  |

---

## Shadow System

| State        | Value                             |
| ------------ | --------------------------------- |
| Card Default | `0 1px 3px rgba(0, 0, 0, 0.08)`  |
| Card Hover   | `0 8px 24px rgba(0, 0, 0, 0.12)` |

Never use heavy drop shadows.

---

## Animation Principles

- **Hover transitions:** 200ms ease
- **Scroll animations:** fade-in + slide-up 20px, 0.6s ease-out
- **Stagger delay between items:** 0.1s
- **3D panel:** slow Y-axis rotation, responds to mouse
- **Page load:** hero content fades in staggered, 0.2s per element
- Never use animations that distract from content

---

## Gradient Rules

**Maximum 3 gradients on entire website:**

1. **Hero overlay:** linear from `#0D0D0D` to `#1A1A1A`
2. **Red ambient:** radial `#CC0000` at 5% opacity only
3. **CTA button:** linear from `#CC0000` to `#AA0000`

---

## Logo Usage

- **White logo** — on all dark backgrounds (navbar, hero, footer)
- **Black logo** — on all white/light backgrounds
- Never stretch or recolor the logo

---

## Component Patterns

### Buttons

| Variant   | Background    | Text  | Border      | Radius | Height | H-Padding |
| --------- | ------------- | ----- | ----------- | ------ | ------ | --------- |
| Primary   | `#CC0000`     | White | None        | 8px    | 48px   | 24px      |
| Secondary | Transparent   | White | White 1px   | 8px    | 48px   | 24px      |

### Text Link

- Color: `#CC0000`
- No underline by default
- Underline on hover

### Card Pattern

- Background: white
- Border: 1px `#E5E5E5`
- Radius: 12px
- Padding: 24px
- **Hover:** red top border appears, 4px lift

### Section Pattern

- Always full width
- Max content width: 1280px, centered
- Vertical padding: 96px

---

## Pages to Build

1. **Homepage** — main landing page
2. **Products** — full product catalog
3. **About** — company story and certifications
4. **Contact** — form and location
5. **Thank You** — post form submission

---

## Important Rules

- **Never** use the phrase "Na Motor Jale Na Starter" anywhere
- **Always** use "Est. 1998" as the company tagline
- **Never** use more than one H1 per page
- All images must have alt text with product keywords
- Mobile responsive on all pages
- All API calls go to `https://crm.subtech.in`
- Environment variable for CRM URL: `NEXT_PUBLIC_CRM_URL`
