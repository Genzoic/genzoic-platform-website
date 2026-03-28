# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.

---

## Change 001: Add "Implementation Partnership" section to Homepage

**Date:** 2026-03-28
**Files affected:** Homepage (Index.tsx or equivalent)
**Spec reference:** `homepage.md` Section 6

### What to do

Add a NEW section between the existing **Platform** section (Section 5) and the **Industry Solutions** section (previously Section 6, now Section 7). The existing sections after Platform all shift down by one.

### Section details

**Background:** `bg-white dark:bg-slate-950` (matches the alternating pattern - Platform is bg-white, so this continues the pattern; Industry Solutions after this should be bg-slate-50)

**Note on alternating backgrounds:** After inserting this section, verify that the alternating background pattern is still correct across all 8 sections:
1. Hero: bg-white / dark:bg-slate-950
2. Problem: bg-slate-50 / dark:bg-slate-900/50
3. Context Graph: bg-white / dark:bg-slate-950
4. How It Works: bg-slate-50 / dark:bg-slate-900/50
5. Platform: bg-white / dark:bg-slate-950
6. **Implementation Partnership: bg-slate-50 / dark:bg-slate-900/50** (alternating)
7. Industry Solutions: bg-white / dark:bg-slate-950
8. Final CTA: bg-slate-50 / dark:bg-slate-900/50

**Layout:** Max-width 5xl. Heading centered, then 3-column card grid (1 col mobile, 2 col tablet, 3 col desktop).

**Heading (H2):** Built with you, not just for you

**Subtext:** A Context Graph is not a plug-and-play product. It encodes how your specific business operates - and getting that right requires working alongside your team. We stay until AI is delivering measurable results.

**Three cards:**

| # | Icon (Lucide) | Title | Description |
|---|---------------|-------|-------------|
| 1 | Map | Map your business | We work with your domain experts to map the entities, relationships, and decision logic that define how your business actually runs. Not a generic template - your business, your graph. |
| 2 | Wrench (or Settings) | Deploy and validate | AI Assistants are configured with role-specific access, connected to your systems, and validated against real operational scenarios before anyone relies on them. |
| 3 | TrendingUp | Stay until it works | We measure adoption, accuracy, and business impact. We iterate on the graph, refine assistant skills, and expand to new teams - until AI is part of how your company operates, not a side experiment. |

**Bottom line** (below cards, muted text, centered):
Think of it as forward-deployed engineering for your AI transformation. We have skin in the game because your success is our success.

### Styling notes

- Follow the same card component pattern used elsewhere on the site (solid bg, border, rounded-xl, hover state).
- Subtle left-border accent on each card in brand-primary or brand-accent color.
- NO GRADIENTS. Flat solid colors only.
- The bottom line should be text-secondary/text-muted size, not a heading.

### Verification

After implementing, scroll through the full homepage and confirm:
1. The section appears between Platform and Industry Solutions
2. Alternating background colors are still correct across all 8 sections
3. Cards are responsive (1 col mobile, 3 col desktop)
4. Dark mode and light mode both look correct
