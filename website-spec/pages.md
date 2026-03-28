# Other Pages Specification

> Reference: `site-spec.md` for design system. `solutions.md` for solution data.
> CRITICAL: No gradients anywhere. Flat solid colors only.

---

## Page: Solutions Listing (`/solutions`)

### Purpose
Let visitors browse all 13 industry solutions, filtered by vertical. This is where the homepage "View all solutions" link goes.

### Layout

**Hero section:**
- Background: `bg-slate-50 dark:bg-slate-900/50`
- Heading (H1): "Industry Solutions"
- Subtext: "Purpose-built AI solutions powered by industry-specific Context Graphs. Each solution maps the relationships that matter for your vertical - so AI can reason about your business, not just your data."
- Generous padding (py-20)

**Filter tabs:**
- Horizontal row of tabs below the hero: "All" + one tab per industry
- Active tab: solid brand-primary background with white text
- Inactive tabs: `bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300`
- Tabs should wrap on mobile
- "All" selected by default

**Solution grid:**
- Below the filter tabs
- Responsive grid: 1 col mobile, 2 col md, 3 col lg
- Max-width 6xl
- Gap: gap-6

**Solution card:**
- Each card contains:
  - Industry badge (top, using brand-accent color scheme - fuchsia)
  - Solution name (H3, bold)
  - Tagline (one line, muted text)
  - "Learn more" link with right arrow icon, in brand-primary color
- Card links to `/solutions/{slug}`
- Card styling follows the design system card pattern (bg-white/dark:bg-slate-800, border, rounded-xl, hover:border-blue)
- On hover: subtle border color change, no shadow, no scale transform

**Bottom CTA:**
- After the grid, centered:
- "Don't see your industry? We build custom Context Graphs for any vertical."
- Button: "Talk to us" -> link to https://calendar.app.google/DezhnNr993pqnzhx5

---

## Page: Solution Detail (`/solutions/:slug`)

### Purpose
Deep-dive page for a single solution. This is what an enterprise buyer reads when they find a solution relevant to their industry. It should feel thorough and specific - like a product page, not a brochure.

### Data
Look up the solution from `solutionsData` by matching the `:slug` URL parameter. If no match, show a simple 404 with a link back to `/solutions`.

### Layout

**Back navigation:**
- Top of page: "Back to Solutions" link with left arrow icon, links to `/solutions`
- Subtle, small text

**Hero section:**
- Background: `bg-white dark:bg-slate-950`
- Two-column layout on desktop, stacked on mobile:
  - Left column (60%): Industry badge, Solution name (H1), Tagline, Description paragraph, CTA button "Book a Demo"
  - Right column (40%): Solution image (from Unsplash URL), rounded corners, object-cover
- Generous padding

**Section: What the Context Graph Maps**
- Background: `bg-slate-50 dark:bg-slate-900/50`
- Heading (H2): "What the Context Graph maps"
- Display the `contextGraphExample` text in a styled card with a left border accent in brand-primary color
- This should feel like a technical specification - the graph structure for this specific use case

**Section: Questions Your AI Can Now Answer**
- Background: `bg-white dark:bg-slate-950`
- Heading (H2): "Questions your AI can now answer"
- Display the 3 `exampleQuestions` as individual cards
- Each card: question mark icon (HelpCircle from Lucide) + the question text in quotes
- These should feel like real things a VP would type into an AI tool. Style them almost like chat bubbles or query inputs.

**Section: Key Capabilities**
- Background: `bg-slate-50 dark:bg-slate-900/50`
- Heading (H2): "Key capabilities"
- Display `keyCapabilities` as a grid of small cards (2 col md, 1 col mobile)
- Each with a check icon + capability text
- Keep compact

**Section: Business Impact**
- Background: `bg-white dark:bg-slate-950`
- Heading (H2): "Expected business impact"
- Display 3 `businessImpact` items as wide cards or a single highlighted block
- Each should feel like a measurable outcome, not a vague promise
- Use bold text for the metric portion

**Section: CTA**
- Background: `bg-slate-50 dark:bg-slate-900/50`
- Heading (H2): "See this in action"
- Subtext: "Book a 30-minute demo focused on {solution.industry}. We will show you what the Context Graph looks like for your business."
- Button: "Book a Demo" -> https://calendar.app.google/DezhnNr993pqnzhx5

---

## Page: Contact (`/contact`)

### Purpose
Simple page for people who want to reach out without booking a Calendly demo. Should be dead simple.

### Layout

**Hero section:**
- Background: `bg-white dark:bg-slate-950`
- Heading (H1): "Get in touch"
- Subtext: "Book a demo to see the Context Graph in action, or send us a note."

**Two-column layout (desktop), stacked (mobile):**

**Left column: Book a Demo (primary path)**
- Card with brand-primary accent
- Heading (H3): "Book a demo"
- Description: "30 minutes. We will map a slice of your business and show you what your AI has been missing."
- Button: "Schedule on Google Calendar" -> https://calendar.app.google/DezhnNr993pqnzhx5 (opens new tab)
- This should be visually more prominent than the form

**Right column: Contact Form (secondary path)**
- Card with standard styling
- Heading (H3): "Send us a message"
- Fields:
  - Full Name (text, required)
  - Work Email (email, required)
  - Company (text, optional)
  - Message (textarea, optional)
- Submit button (secondary style)
- On submit: show a client-side success message ("Thanks! We will be in touch shortly."). No backend wiring needed - that will be added later.

**Contact info (below the two columns):**
- Email: hello@genzoic.com
- LinkedIn: https://linkedin.com/company/genzoic
- Small text, muted. Not a major visual element.

---

## Page: 404 Not Found

### Layout
- Centered, minimal
- Heading: "Page not found"
- Subtext: "The page you are looking for does not exist."
- Link: "Go to homepage" -> `/`
- Keep it simple and on-brand

---

## Shared Components

### Header
See `site-spec.md` for navigation specification.
- Sticky, with backdrop-blur
- Logo switches between light/dark versions based on theme
- Mobile hamburger menu

### Footer
See `site-spec.md` for footer specification.
- Clean, minimal, three columns + social links + copyright

### ScrollToTop
A simple component that scrolls the page to the top whenever the route changes:
```typescript
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
```
Include this in the App layout so every page navigation starts at the top.

### ThemeContext
A React context that manages dark/light mode:
- Default: dark mode
- Toggles `class="dark"` on the `<html>` element
- Provides `theme` (string) and `toggleTheme` (function)
- No localStorage persistence needed
