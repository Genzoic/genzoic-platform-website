# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.
For changes 001-005, see `CHANGELOG-001-005.md`.
For change 006, see `CHANGELOG-006.md`.
For changes 007-008, see `CHANGELOG-007-008.md`.

---

## Change 009: Fix "Compound" Step Highlight Bug in How It Works

**Date:** 2026-04-02
**File affected:** `src/pages/Homepage.tsx`
**Priority:** LOW - Visual bug fix.

### Context

In the "How it works" section on the homepage, the third step ("Compound") has a background highlight (`bg-blue-50/50` / `bg-blue-950/20` with rounded corners and padding) that the other two steps ("Connect and map", "Seed and deploy") do not have. Since all three steps are static and non-interactive, this makes step 3 look like a selected/active state in a UI that has no selection behavior. It confuses visitors into thinking the section is clickable.

### Fix

**File:** `src/pages/Homepage.tsx`

Find the `.map()` rendering the three steps. There is a conditional class on the container `div`:

```tsx
<div key={step.num} className={`text-center ${step.num === 3 ? "md:bg-blue-50/50 md:dark:bg-blue-950/20 md:rounded-2xl md:p-6 md:-m-3" : ""}`}>
```

**Replace with:**

```tsx
<div key={step.num} className="text-center">
```

Remove the ternary entirely. All three steps should render with identical styling.

### Verification

1. All three steps in "How it works" should have the same background (no highlight on any of them).
2. Visual rhythm should be even across the three columns.
3. No other styling changes needed.
