# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.
For changes 001-005, see `CHANGELOG-001-005.md`.
For change 006, see `CHANGELOG-006.md`.
For changes 007-008, see `CHANGELOG-007-008.md`.
For change 009, see `CHANGELOG-009.md`.

---

## Change 010: Remove "Power Your Existing AI" Card From Platform Capabilities

**Date:** 2026-04-02
**File affected:** `src/pages/Homepage.tsx`
**Priority:** LOW - Layout fix.

### Context

The Platform Capabilities section on the homepage displays 7 cards in a 3-column grid. This produces a 3-3-1 layout with a single orphan card ("Power your existing AI") sitting alone on the last row. It looks unbalanced.

The "Power your existing AI" card is the weakest of the 7. The other 6 describe core platform capabilities (graph-anchored skills, per-employee assistants, org-aware conflict resolution, enterprise controls, knowledge retention, skill ranking). The 7th card describes a deployment/integration option (use the Context Graph as a standalone knowledge layer for existing AI tools). It is not a platform capability - it is a go-to-market message that does not belong in the same grid.

### Fix

**File:** `src/pages/Homepage.tsx`

In the Platform Capabilities section, find the array of feature objects inside the `.map()` call. Remove the last object:

```typescript
{
  icon: Blocks,
  title: "Power your existing AI",
  desc: "The Context Graph is also available as a standalone knowledge layer. Connect it to your existing copilots, chatbots, or internal AI tools. Same graph, same skills, your delivery mechanism.",
  color: "#6366f1",
},
```

After removal, the array should have exactly 6 objects, producing a clean 3x2 grid.

Also check if the `Blocks` icon import is still used elsewhere in the file. If not, remove it from the import statement to avoid lint warnings.

### Verification

1. Platform Capabilities section shows exactly 6 cards in a clean 3x2 grid.
2. No orphan card on a partial row.
3. No unused import warnings from ESLint.
4. Run `npm run build` to confirm.
