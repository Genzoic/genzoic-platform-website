# Genzoic Website - Site Specification

## What This Is

Complete specification for building the Genzoic marketing website from scratch. The site sells an enterprise AI platform built on a "Context Graph" - a knowledge graph that maps business entities (products, suppliers, plants, channels, pricing, formulations) so AI can reason about the business, not just query tables.

**Target visitor:** VP/Director of Data & Analytics, Chief Data Officer, Head of AI/ML at a mid-to-large enterprise. This person has seen dozens of AI tools. They are skeptical. They will leave in 10 seconds if this looks like another generic AI startup. The site must communicate depth, technical credibility, and a clear differentiation - fast.

**Tone:** Technical but accessible. Confident, not salesy. Startup energy with enterprise substance. Think: the kind of company a Snowflake architect or Databricks power user would respect.

---

## Tech Stack

- **Framework:** React 18+ with TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS with shadcn/ui components
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Path aliases:** `@/` maps to `src/`

---

## Design System

### Brand Colors (from logo)

The logo comes in two versions. Derive the entire palette from these:

- **Light theme logo:** Deep royal blue text + magenta/fuchsia sparkle accent
- **Dark theme logo:** White text + magenta/fuchsia sparkle accent

#### Color Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `brand-primary` | `blue-800` (#1e40af) | `blue-400` (#60a5fa) | Primary actions, links, active states |
| `brand-accent` | `fuchsia-600` (#c026d3) | `fuchsia-400` (#e879f9) | Sparkle accent, highlights, badges |
| `bg-primary` | `white` (#ffffff) | `slate-950` (#020617) | Page background |
| `bg-secondary` | `slate-50` (#f8fafc) | `slate-900` (#0f172a) | Alternating section backgrounds |
| `bg-card` | `white` (#ffffff) | `slate-800` (#1e293b) | Card backgrounds |
| `border` | `slate-200` (#e2e8f0) | `slate-700` (#334155) | Borders, dividers |
| `text-primary` | `slate-900` (#0f172a) | `white` (#ffffff) | Headings, primary text |
| `text-secondary` | `slate-600` (#475569) | `slate-300` (#cbd5e1) | Body text, descriptions |
| `text-muted` | `slate-500` (#64748b) | `slate-400` (#94a3b8) | Captions, labels |

### Typography

- **Font:** Inter (via Google Fonts) - if not loaded, fall back to system sans-serif
- **Headings:** font-bold, tracking-tight
- **H1:** text-5xl md:text-6xl lg:text-7xl
- **H2:** text-3xl md:text-4xl lg:text-5xl
- **H3:** text-xl md:text-2xl
- **Body:** text-base (16px), leading-relaxed
- **Small:** text-sm (14px)

### Critical Design Rules

1. **NO GRADIENTS.** Zero. None. Not on text, not on backgrounds, not on borders, not on buttons. Flat solid colors only. This is a hard rule.
2. **No emojis in the UI.** Use Lucide icons instead.
3. **Generous whitespace.** Sections should breathe. py-20 md:py-28 minimum for major sections.
4. **Subtle borders over shadows.** Cards use `border border-slate-200 dark:border-slate-700` not box-shadow.
5. **Dark mode is the default.** Most enterprise data/AI tools present dark. Light mode should be available via toggle.
6. **Responsive:** Mobile-first. Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px).

### Component Patterns

**Buttons:**
- Primary: `bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700` (solid, no gradients)
- Secondary: `bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-700`
- Both: `px-6 py-3 rounded-lg font-semibold text-sm transition-colors`

**Cards:**
- `bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-8`
- Hover state: `hover:border-blue-300 dark:hover:border-blue-600 transition-colors`

**Badges/Tags:**
- `text-xs font-semibold px-3 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300`

**Section pattern (alternating):**
- Odd sections: `bg-white dark:bg-slate-950`
- Even sections: `bg-slate-50 dark:bg-slate-900/50`

---

## Logo & Favicon Files

Place in `logos-and-favicons/`:
- `genzoic-logo-light.png` - Blue logo for light backgrounds (used in light mode)
- `genzoic-logo-dark.png` - White logo for dark backgrounds (used in dark mode)

The Header should switch between these based on theme.

---

## Site Map & Navigation

### Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | The main pitch. Does all the heavy lifting. |
| `/solutions` | Solutions Listing | Filterable grid of all industry solutions |
| `/solutions/:slug` | Solution Detail | Deep dive into a specific solution |
| `/contact` | Contact | Calendly embed + simple inquiry form |

That is it. Four page types. No about page, no blog, no pricing, no fluff.

### Header Navigation

```
[Logo]          Platform    Solutions    [Theme Toggle]  [Book a Demo]
```

- **Logo:** Links to `/`. Switches between light/dark versions based on theme.
- **Platform:** Scrolls to `#platform` section on homepage. If not on homepage, navigates to `/#platform`.
- **Solutions:** Links to `/solutions`.
- **Theme Toggle:** Sun/Moon icon, toggles light/dark mode.
- **Book a Demo:** Primary CTA button. Links to `https://calendar.app.google/DezhnNr993pqnzhx5` (opens in new tab).

Mobile: Hamburger menu with same items.

### Footer

Clean, minimal footer. Three columns + copyright.

```
[Logo]
"AI that understands how your business works."

Product         Company         Connect
Platform        Contact         LinkedIn
Solutions       Privacy Policy  X (Twitter)
How It Works    Terms of Service

(c) 2026 Genzoic Inc. All rights reserved.
```

---

## Dark/Light Theme

Implement a ThemeContext provider. Default to dark mode. Persist preference in a React state (no localStorage needed). All components must support both themes using Tailwind `dark:` classes.

The `<html>` element should have `class="dark"` by default, toggled by the theme context.

---

## Image Strategy

- **Logos and favicons:** Local files in `logos-and-favicons/`
- **All other images:** External Unsplash URLs with size parameters (`?w=800&h=500&fit=crop&auto=format`)
- No local content images. This keeps the repo lightweight.

---

## Files Reference

- `homepage.md` - Full content specification for the homepage (8 sections including Implementation Partnership)
- `CHANGELOG.md` - Incremental changes log for updating the live site
- `interactive-graph.md` - Interactive Context Graph component specification (graph visualization, demo data, predefined Q&A)
- `solutions.md` - All solution data entries and solution page specs
- `pages.md` - Specifications for solutions listing, solution detail, and contact pages
