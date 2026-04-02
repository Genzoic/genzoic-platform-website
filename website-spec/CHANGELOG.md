# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.
For changes 001-005, see `CHANGELOG-001-005.md`.
For change 006, see `CHANGELOG-006.md`.
For changes 007-008, see `CHANGELOG-007-008.md`.
For change 009, see `CHANGELOG-009.md`.
For change 010, see `CHANGELOG-010.md`.

---

## Change 011: Show All 9 Solutions on Homepage, Remove /solutions Listing Page

**Date:** 2026-04-02
**Files affected:** `src/pages/Homepage.tsx`, `src/pages/Solutions.tsx` (DELETE), `src/App.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`
**Priority:** HIGH - Navigation and content structure change.

### Context

With only 9 solutions remaining after Change 008, the separate `/solutions` listing page is unnecessary overhead. It adds a click between the visitor and the solution detail pages without adding value - there are only 9 cards to show, which fits perfectly in a 3x3 grid.

Currently the homepage shows only 5 "featured" solutions (one per vertical) with a "View all 13 solutions" link to the listing page. This is stale (should say 9, not 13) and creates an incomplete picture. Showing all 9 directly on the homepage gives visitors the full picture immediately.

The `/solutions/:slug` detail pages remain unchanged.

---

### CHANGE 11A: Replace Featured Solutions With All Solutions on Homepage

**File:** `src/pages/Homepage.tsx`

**What:** Show all 9 solutions in the Industry Solutions section instead of the 5 featured ones.

1. **Delete** the `FEATURED_SLUGS` array and the `featuredSolutions` filter (lines ~30-40).

2. **Replace** `featuredSolutions.map(...)` with `solutionsData.map(...)` in the grid.

3. **Delete** the "View all 13 solutions" link block below the grid (lines ~599-606):
```tsx
<div className="mt-10 text-center">
  <Link
    to="/solutions"
    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
  >
    View all 13 solutions <ArrowRight size={15} />
  </Link>
</div>
```

4. **Replace it** with the "Don't see your industry?" CTA from the old Solutions page:
```tsx
<div className="mt-12 text-center">
  <p className="text-slate-500 dark:text-slate-400 mb-5 text-sm">
    Don't see your industry? We build custom Context Graphs for any vertical.
  </p>
  <a
    href={DEMO_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="cta-btn"
  >
    Talk to us <ArrowRight size={14} />
  </a>
</div>
```

5. **Update the subheading** text to incorporate the stronger copy from the Solutions page. Change:
```
Not generic AI. Purpose-built solutions powered by industry-specific Context Graphs.
```
To:
```
Purpose-built AI solutions powered by industry-specific Context Graphs. Each solution maps the relationships that matter for your vertical - so AI can reason about your business, not just your data.
```

The grid stays as `lg:grid-cols-3` which gives a clean 3x3 layout for 9 solutions.

---

### CHANGE 11B: Delete Solutions Listing Page

**File:** `src/pages/Solutions.tsx`

**What:** Delete the entire file. It is no longer needed.

---

### CHANGE 11C: Remove /solutions Route

**File:** `src/App.tsx`

**What:**
1. Remove the import: `import Solutions from "@/pages/Solutions";`
2. Remove the route: `<Route path="/solutions" element={<Solutions />} />`
3. Keep: `<Route path="/solutions/:slug" element={<SolutionDetail />} />` (detail pages stay)

---

### CHANGE 11D: Update Header Navigation

**File:** `src/components/Header.tsx`

**What:** The "Solutions" nav link currently points to `/solutions`. Update both the desktop and mobile nav links to scroll to the solutions section on the homepage instead.

Change `to="/solutions"` to `to="/#solutions"` in both places (desktop nav link ~line 45 and mobile nav link ~line 100).

Also add `id="solutions"` to the Industry Solutions section in `Homepage.tsx` if it does not already have one:
```tsx
<section id="solutions" className="section-soft py-20 md:py-28">
```

The existing `HashScroll` component in `App.tsx` already handles `/#hash` smooth-scrolling.

---

### CHANGE 11E: Update Footer Navigation

**File:** `src/components/Footer.tsx`

**What:** Update the "Solutions" footer link from `to="/solutions"` to `to="/#solutions"` to match the header change.

---

### Verification After All Changes (011)

1. **Homepage shows all 9 solutions** in a 3x3 grid. No orphan row, no "View all" link.
2. **"Don't see your industry?" CTA** appears below the grid with "Talk to us" button.
3. **Navigating to `/solutions` directly** should show the 404 page (or redirect to homepage - either is fine).
4. **`/solutions/:slug` detail pages still work** - all 9 solution slugs load correctly.
5. **Header "Solutions" link** scrolls to the solutions section on the homepage from any page.
6. **Footer "Solutions" link** does the same.
7. **No references** to `Solutions.tsx`, `FEATURED_SLUGS`, or `View all 13` remain in the codebase.
8. **No unused imports** - check that the Solutions page import is removed from App.tsx.
9. **TypeScript compiles** - run `npm run build`.
