# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check (tsc -b) then build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

There are no tests configured in this project.

## Architecture

**Genzoic.com** is a React 19 + Vite SPA (not Next.js) — a marketing/demo website for an enterprise AI platform. Deployed on Vercel with SPA rewrites (`vercel.json`).

### Stack
- **React 19** + **React Router v7** (client-side routing)
- **TypeScript** (strict mode, ES2023 target)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — uses new `@import "tailwindcss"` syntax, not `@tailwind` directives)
- **Radix UI** primitives wrapped in `src/components/ui/`
- **D3 + react-force-graph-2d** for interactive graph visualizations
- Path alias: `@/` → `src/`

### Routing
```
/                    → Homepage
/solutions           → Filtered grid of all 13 solutions
/solutions/:slug     → Solution detail with interactive context graph
/contact             → Contact + demo booking form
```

`HashScroll` component in `App.tsx` intercepts URL hashes (e.g., `/#platform`) and smooth-scrolls to the matching element ID.

### Key Data Layer (`src/data/`)
- `solutions.ts` — defines the `Solution` interface and all 13 solution objects. Each solution has a `slug` (URL key), `industry` (filter key), and optionally a `graphFile` pointing to a JSON file in `src/data/graphs/`.
- `src/data/graphs/*.json` — one JSON file per solution, loaded lazily via `import.meta.glob` in `SolutionDetail.tsx`. Graph schema: `{ nodes: [{id, type, label, description}], edges: [{source, target, relationship}] }`.

### Theme
Custom `ThemeContext` (not next-themes, despite it being in `package.json`) toggles `dark` class on `document.documentElement`. Tailwind dark variant is configured as `(&:where(.dark, .dark *))` in `index.css`.

### Component Structure
- `src/pages/` — full-page route components
- `src/components/` — layout + feature components (Header, Footer, InteractiveGraph, DataSourceDialog)
- `src/components/ui/` — Radix UI primitive wrappers (use `cn()` from `src/lib/utils.ts` for class merging)
- `src/contexts/` — React Context providers

### InteractiveGraph
The `InteractiveGraph.tsx` component (~810 lines) renders D3-powered force graphs. It receives typed `GraphData` and handles node click → `DataSourceDialog` modal. Graph files are dynamically imported in `SolutionDetail.tsx` using:
```typescript
const graphModules = import.meta.glob<{ default: GraphData }>(
  "@/data/graphs/*.json",
  { eager: false }
);
```

### ESLint
Uses ESLint 9 flat config (`eslint.config.js`). TypeScript strict mode disallows unused locals/parameters.
