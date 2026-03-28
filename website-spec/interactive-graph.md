# Interactive Context Graph Specification

> Reference: `site-spec.md` for design system. `homepage.md` for section placement.
> CRITICAL: No gradients. Flat solid colors only.

## Overview

Add an interactive, explorable Context Graph visualization to the website. This is a live demo of the product's core concept - visitors can click nodes, explore relationships, and ask predefined questions to see how AI reasons over the graph.

**Placement:** Homepage, Section 3 (The Context Graph). Add the interactive graph ABOVE the three scenario cards. The graph is the visual proof; the scenario cards below it explain what it enables.

**Future:** Solution-specific graphs on each `/solutions/:slug` page (not in scope for v1, but design the component to be reusable with different datasets).

---

## Technical Approach

### Library
Use **react-force-graph-2d** (`react-force-graph`) or **@react-sigma/core** with **graphology**. If neither works well, fall back to **D3.js force-directed graph** with React wrapper.

The graph should:
- Render in a contained area (not full-screen)
- Be responsive (scale to container width)
- Support zoom and pan
- Support click interactions on nodes
- Animate smoothly
- Work in both light and dark mode

### Data Format
Store graph data as a static JSON file (no backend, no API calls). Place in `src/data/fmcg-context-graph.json`.

```typescript
interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  questions: PredefinedQuestion[];
}

interface GraphNode {
  id: string;
  label: string;
  type: "Product" | "Ingredient" | "Supplier" | "Plant" | "Channel" | "Store";
  description?: string;  // Shown on click/hover
}

interface GraphEdge {
  source: string;  // node id
  target: string;  // node id
  relationship: "SUPPLIES" | "USED_IN" | "MANUFACTURED_AT" | "SOLD_THROUGH" | "AVAILABLE_AT";
}

interface PredefinedQuestion {
  id: string;
  question: string;
  answer: string;  // Pre-computed answer text
  highlightNodes: string[];  // Node IDs to highlight when this question is active
  highlightEdges: string[];  // Edge IDs (source-target pairs) to highlight
  reasoningSteps: string[];  // Step-by-step reasoning chain to display
}
```

---

## FMCG Demo Dataset

Create a dataset that mirrors the screenshot from the actual Genzoic platform. Use realistic but fictional data for an FMCG/food company.

### Node Types and Colors

| Type | Light Mode Color | Dark Mode Color | Icon/Shape |
|------|-----------------|-----------------|------------|
| Product | `#b45309` (amber-700) | `#f59e0b` (amber-400) | Box/cube |
| Ingredient | `#15803d` (green-700) | `#4ade80` (green-400) | Leaf/circle |
| Supplier | `#c2410c` (orange-700) | `#fb923c` (orange-400) | Building/hexagon |
| Plant | `#1d4ed8` (blue-700) | `#60a5fa` (blue-400) | Factory/square |
| Channel | `#7c3aed` (violet-700) | `#a78bfa` (violet-400) | ShoppingCart/diamond |
| Store | `#be185d` (pink-700) | `#f472b6` (pink-400) | MapPin/triangle |

### Sample Nodes (aim for 40-60 nodes total)

**Products (8-10):**
- Mango Chutney, Tomato Ketchup, Garlic Aioli, Hot Sauce 150ml, Apple Cider Vinegar, Honey Mustard, Sourdough Bread, White Bread 500g, Pesto Basilico, Thai Chili Sauce

**Ingredients (10-12):**
- Mango Puree, Tomato Concentrate, Garlic Extract, Cayenne Pepper, Apple Puree, Honey, Semolina, Yeast Extract, Olive Oil, Citric Acid, Cane Sugar, Bell Pepper, Gluten Powder, Basil Extract, Fresh Tomatoes

**Suppliers (6-8):**
- Kroger Ingredients, Walmart Bulk, Christina Foods, Natural Flavors Co., TrueHarvest Co., Grandmasters Ingredients, FreshFarm Co., AquaSpice Corp.

**Plants (4-5):**
- East Coast Production Facility, Midwest Processing Plant, West Coast Bottling, Southern Distribution Hub, Pacific Northwest Mill

**Channels (3-4):**
- Retail Stores, E-Commerce DTC, Wholesale/B2B, Foodservice

**Stores (5-6):**
- Whole Foods, Target, Mango Saree (specialty), White Vineyard, Chicago Outlet, Regional Chain A

### Sample Edges
Connect them realistically. For example:
- Mango Puree -> USED_IN -> Mango Chutney
- TrueHarvest Co. -> SUPPLIES -> Mango Puree
- Mango Chutney -> MANUFACTURED_AT -> East Coast Production Facility
- Mango Chutney -> SOLD_THROUGH -> Retail Stores
- Mango Chutney -> AVAILABLE_AT -> Whole Foods

Create enough edges to show a dense, interconnected graph (aim for 100-150 edges).

---

## Predefined Questions (4-5)

### Question 1: Supplier Disruption
**Question:** "TrueHarvest Co. can no longer supply ingredients. What is the impact?"
**Reasoning steps:**
1. TrueHarvest Co. supplies: Mango Puree, Apple Puree, Fresh Tomatoes
2. Products affected: Mango Chutney, Apple Cider Vinegar, Tomato Ketchup, Pesto Basilico
3. Plants impacted: East Coast Production Facility, Midwest Processing Plant
4. Channels at risk: Retail Stores, E-Commerce DTC
5. Stores affected: Whole Foods, Target, Chicago Outlet
**Highlight:** TrueHarvest Co. node + all connected ingredient nodes + all downstream product/plant/channel/store nodes
**Answer:** "TrueHarvest Co. supplies 3 key ingredients used in 4 products across 2 plants. Disruption would affect retail and DTC channels, impacting 3 major store accounts. Alternative sourcing should be prioritized for Mango Puree (single-source) and Fresh Tomatoes (FreshFarm Co. as backup)."

### Question 2: Product Traceability
**Question:** "Which suppliers and ingredients go into Mango Chutney?"
**Reasoning steps:**
1. Mango Chutney uses: Mango Puree, Cane Sugar, Citric Acid, Cayenne Pepper
2. Supplied by: TrueHarvest Co. (Mango Puree), Natural Flavors Co. (Citric Acid), Kroger Ingredients (Cane Sugar, Cayenne Pepper)
3. Manufactured at: East Coast Production Facility
4. Sold through: Retail Stores, E-Commerce DTC
**Highlight:** Mango Chutney + all connected ingredient and supplier nodes
**Answer:** "Mango Chutney depends on 4 ingredients from 3 suppliers. Mango Puree from TrueHarvest Co. is the most critical - it is single-sourced. The product is manufactured at the East Coast facility and distributed through retail and DTC channels."

### Question 3: Channel Analysis
**Question:** "If we lose the Whole Foods account, which products are most affected?"
**Reasoning steps:**
1. Whole Foods carries: Mango Chutney, Garlic Aioli, Honey Mustard, Pesto Basilico, Apple Cider Vinegar
2. Of these, Mango Chutney and Pesto Basilico have Whole Foods as their largest retail account
3. Garlic Aioli and Honey Mustard are also in Target and Chicago Outlet
4. Revenue concentration risk is highest for Mango Chutney (40% of retail volume through Whole Foods)
**Highlight:** Whole Foods node + all connected product nodes + alternative store nodes
**Answer:** "Whole Foods carries 5 of our 10 products. Mango Chutney and Pesto Basilico have the highest concentration risk, with 40% and 35% of retail volume respectively flowing through this account. Garlic Aioli and Honey Mustard have better diversification across Target and regional chains."

### Question 4: Plant Disruption
**Question:** "East Coast Production Facility goes offline. What is affected?"
**Reasoning steps:**
1. East Coast produces: Mango Chutney, Tomato Ketchup, Hot Sauce 150ml, Garlic Aioli
2. These products are sold through: Retail Stores, E-Commerce DTC, Wholesale/B2B
3. Stores affected: Whole Foods, Target, Mango Saree, White Vineyard
4. Midwest Processing Plant could absorb Hot Sauce and Tomato Ketchup production
5. Mango Chutney and Garlic Aioli have no alternative plant - production would halt
**Highlight:** East Coast Production Facility + all connected product nodes + downstream channels and stores
**Answer:** "The East Coast facility produces 4 products serving all major channels and 4 store accounts. Hot Sauce and Tomato Ketchup can be rerouted to the Midwest Plant. Mango Chutney and Garlic Aioli have no alternative production facility - these would face supply interruption until the facility is restored."

---

## UI Layout

### Graph Container
- Width: Full container width (max-w-5xl like other sections)
- Height: 500px on desktop, 350px on mobile
- Background: `bg-white dark:bg-slate-800/30` with `border border-slate-200 dark:border-slate-700 rounded-xl`
- Include zoom controls (+ / - buttons) in the top-right corner of the container
- Include a "Reset view" button

### Node Legend
- Position: Left side of the graph container, overlaid or as a sidebar
- Show colored dots/badges for each node type with label
- Should match the colors in the table above
- In dark mode, use the dark mode color variants

### Edge Legend
- Below the node legend or in a collapsible section
- Show line styles/colors for each relationship type
- SUPPLIES, USED_IN, MANUFACTURED_AT, SOLD_THROUGH, AVAILABLE_AT

### Node Interaction
- **Hover:** Show node label tooltip if not already visible. Highlight connected edges.
- **Click:** Select the node. Show a detail panel/popover with:
  - Node type badge
  - Node label
  - Description (if available)
  - Connected nodes grouped by relationship type
  - "X connected nodes" count
- **Double-click:** Zoom into the node's neighborhood

### Questions Panel
- Position: Below the graph container
- Layout: Horizontal row of clickable question cards (scroll on mobile)
- Each card shows:
  - A question mark icon
  - The question text (truncated to 1 line on mobile)
- **When a question is clicked:**
  1. Dim all non-relevant nodes/edges to 20% opacity
  2. Highlight the relevant nodes and edges at full opacity with a subtle glow/border
  3. Below the graph, expand a reasoning panel showing:
     - The full question
     - Step-by-step reasoning chain (numbered steps)
     - The pre-computed answer in a styled card
  4. Add a "Clear" button to reset the graph to default state

### Answer Display
- The reasoning steps should appear as a numbered vertical list
- The final answer should be in a distinct card with a slight left-border accent (brand-primary)
- Include a note: "This answer was generated by AI reasoning over the Context Graph" (small, muted text)

---

## Responsive Behavior

- **Desktop (lg+):** Full graph at 500px height, questions as horizontal row below
- **Tablet (md):** Graph at 400px height, questions stack to 2-column grid
- **Mobile (sm):** Graph at 300px height with simplified rendering (fewer labels visible by default), questions stack vertically

---

## Performance Notes

- The graph data is static JSON (~40-60 nodes, ~100-150 edges) - no API calls needed
- Use requestAnimationFrame for smooth animation
- Consider stopping the force simulation after initial layout stabilizes (to reduce CPU usage)
- Lazy-load the graph component (React.lazy + Suspense) since it uses a heavy visualization library

---

## Dark/Light Mode

The graph MUST look good in both themes:
- **Dark mode:** Dark container background, bright node colors, white/light edge lines, white labels
- **Light mode:** White/light container background, deeper node colors, dark edge lines, dark labels
- The legend and question cards should follow the site-spec design system colors

---

## Future (Not in v1)

- Solution-specific graphs on each `/solutions/:slug` page with relevant demo data
- Ability to search/filter nodes by type
- Animated reasoning paths (edges light up sequentially when a question is answered)
- Embed a real Genzoic assistant chat interface where visitors can type custom questions (requires backend)
