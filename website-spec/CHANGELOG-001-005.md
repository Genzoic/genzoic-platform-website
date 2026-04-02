# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.

---

## Change 005: Solution Page Content Overhaul + Layout Redesign

**Date:** 2026-04-02
**Files affected:** `src/data/solutions.ts`, `src/pages/SolutionDetail.tsx`, `pages.md`
**Priority:** HIGH - Content accuracy + visual impact on the pages enterprise buyers will spend the most time on

### Context

Three problems with the current solution detail pages:

1. **Duplicate questions.** Change 003 added intelligence-layer questions as Q1 to each solution but the original similar questions were kept, creating near-duplicates in 7 of 13 solutions. Each solution should have exactly 3 distinct questions.
2. **Business impact is buried in text.** Metrics like "15-25%" are embedded in full sentences. Enterprise buyers scan for numbers. The metrics need to be visually prominent.
3. **All three sections look the same.** Questions, Capabilities, and Business Impact are all rendered as vertical card lists with small icons. There is no visual hierarchy or distinct treatment. Each section needs to feel different based on its purpose.

---

### CHANGE 5A: Solution Page Layout Redesign

**File:** `src/pages/SolutionDetail.tsx`, `pages.md`

**What:** Redesign the visual treatment of the three content sections (Questions, Capabilities, Business Impact) on every solution detail page. The data model changes are in 5B-5D; this change specifies the new rendering.

#### Section: "Questions your AI can answer" (renamed from "Questions your AI can now answer")

**New rendering - "Query cards":**
- 3 questions per solution (reduced from 3-5)
- Remove the HelpCircle icon and the italic styling
- Each question rendered as a clean horizontal card:
  - Large opening quotation mark in brand-primary color (decorative, top-left of card)
  - Question text in regular weight, text-base size (not italic, not small)
  - Card: bg-white dark:bg-slate-800, border, rounded-xl, generous padding (p-6)
  - Subtle left border accent in brand-primary (4px solid)
- Layout: single column, gap-4
- Section label stays "AI Reasoning" in blue
- Heading: "Questions your AI can answer" (remove "now" - it sounds like a feature announcement, not a permanent capability)

**Why:** The questions ARE the demo. Make them readable and prominent. Remove visual clutter (icons, italics) that makes them feel like a feature list instead of real queries.

#### Section: "Key capabilities" - Restructure as 3-column layout

**New rendering - "Connects / Analyzes / Recommends":**
- Instead of a flat 2-column grid of 5 checkmark cards, restructure as 3 columns
- Each column has a category header and 2 capability items underneath:
  - **Column 1 header:** "Connects" (icon: Network, color: blue) - what the graph maps
  - **Column 2 header:** "Analyzes" (icon: Search, color: violet) - what patterns it identifies
  - **Column 3 header:** "Recommends" (icon: Lightbulb, color: emerald) - what actions it suggests
- Each capability item: small bullet or dash + text, no card wrapper, compact
- Layout: 3-col desktop, stacked on mobile with column headers visible
- Section label stays "Capabilities" in blue
- Heading: "How it works" (replaces "Key capabilities" - more action-oriented)

**Why:** A categorized structure communicates that the platform does three distinct things, not just a bag of features. "Connects / Analyzes / Recommends" maps to the actual platform pipeline.

#### Section: "Expected business impact" - Big metric cards

**New rendering - metric hero cards:**
- 3 cards in a horizontal row (responsive: 1-col mobile, 3-col desktop)
- Each card:
  - Metric number in large display text (text-4xl md:text-5xl, font-bold, text-orange-500 dark:text-orange-400)
  - Metric label below (text-base, font-semibold, text-slate-900 dark:text-white)
  - One-line context below that (text-sm, text-slate-500 dark:text-slate-400)
  - Card: bg-white dark:bg-slate-800, border, rounded-xl, text-center, generous padding (p-8)
- Remove the TrendingUp icon - the large metric number IS the visual element
- Section label stays "Business Impact" in orange
- Heading: "Measurable results" (replaces "Expected business impact" - "expected" sounds uncertain)

**Why:** Enterprise buyers scan for numbers. A big "15-25%" catches the eye in a way that "Reduce shrink/waste by 15-25% through better expiry management" as a text line does not. This is the standard SaaS metric display pattern and it works.

#### Updated pages.md spec for Solution Detail:

Replace the current three section specs with:

```
Section: Questions Your AI Can Answer
- Background: bg-white dark:bg-slate-950
- Section label: "AI Reasoning" (blue)
- Heading (H2): "Questions your AI can answer"
- 3 query cards, single column, each with decorative quote mark
  and left-border accent. No icons, no italics.

Section: How It Works
- Background: bg-slate-50 dark:bg-slate-900/50
- Section label: "Capabilities" (blue)
- Heading (H2): "How it works"
- 3-column layout: Connects / Analyzes / Recommends
- Each column: category icon + header + 2 capability items

Section: Measurable Results
- Background: bg-white dark:bg-slate-950
- Section label: "Business Impact" (orange)
- Heading (H2): "Measurable results"
- 3 metric cards in a row: large metric number + label + context
```

---

### CHANGE 5B: Deduplicate Questions to 3 Per Solution

**File:** `src/data/solutions.ts`

**What:** Reduce `exampleQuestions` to exactly 3 per solution. Remove near-duplicates that were created when Change 003 prepended intelligence-layer questions without removing the originals they replaced.

**Deduplication per solution:**

**Solution 1 - Inventory Optimization:** Remove Q2 ("Which stores will have SKU #4521 expire...") - overlaps with Q1's expiry scenario.
Keep:
1. "Butter Croissants expire in 3 days at Store #07. What should happen?"
2. "Given our supplier lead time for category X just increased from 21 to 35 days, which stores should we increase safety stock for?"
3. "What is our optimal stock level for this product at Store #42 considering its seasonal demand, weather patterns, and current inventory?"

**Solution 2 - Customer Feedback:** Remove Q4 ("What product categories are generating the most improvement requests...") - weakest question, too generic.
Keep:
1. "Almond Oat Milk complaints spiked 40% this week. What is the root cause and what should we do?"
2. "Are complaints about Product X correlated with a specific supplier batch or manufacturing date?"
3. "Which stores in the Southeast region have seen a spike in negative feedback on our private-label dairy products in the last 30 days?"

**Solution 3 - DSD Copilot:** Remove Q2 ("For my route today, which stores are likely to need restocking...") - overlaps with Q1's route reprioritization.
Keep:
1. "It is raining today and my Route B-07 has 22 stops. How should I reprioritize?"
2. "Store #87 has underperformed on the new promotion - what is different about their shelf placement compared to top-performing stores?"
3. "If I have 200 extra units of Product Y on my truck, which three stores on my route would benefit most from an opportunistic placement?"

**Solution 4 - Promotion & Demand:** Remove Q2 ("If we run a BOGO promotion on Product X in 500 stores...") - near-duplicate of Q1.
Keep:
1. "We want to run a BOGO on Pumpkin Spice Latte Mix at 500 stores for Thanksgiving. Will it work?"
2. "Which stores should we exclude from the promotion because their current inventory levels cannot support the expected lift?"
3. "Based on the last three promotions of similar products, what is the expected cannibalization effect on Products Y and Z?"

**Solution 5 - Supply Chain Risk:** Remove Q2 ("If our primary cobalt supplier in the DRC faces a 60-day production halt...") - near-duplicate of Q1.
Keep:
1. "DRC cobalt mine just had a cave-in. 60-day production halt confirmed. What do we do?"
2. "What percentage of our nickel supply comes from regions with sanctions risk, and which finished products would be impacted?"
3. "If lithium carbonate prices increase by 30%, what is the margin impact across our product portfolio, and which customer contracts have price adjustment clauses?"

**Solution 6 - Production Planning:** Remove Q2 ("Line 3 has seen a 4% yield drop this week...") - EXACT duplicate of Q1.
Keep:
1. "Line 3 yield dropped 4% this week. Is it the new cathode batch or the calibration change from Tuesday?"
2. "Based on electrode coating thickness data from the last 8 hours, which cells in formation are likely to fail final quality inspection?"
3. "If we need to increase production of our 4680 cells by 20% next quarter, which line should we prioritize, and what are the bottleneck stages?"

**Solution 7 - Regulatory & ESG:** Remove Q3 ("If the IRA domestic content percentage requirement increases to 80%...") - near-duplicate of Q1.
Keep:
1. "IRA domestic content requirement increases to 80% in 2027. Which products qualify?"
2. "Which of our product lines currently do not meet the EU Battery Passport carbon footprint threshold, and what sourcing changes would bring them into compliance?"
3. "What is our current recycled content percentage by product line, and what would it cost to reach the 2030 EU minimum requirements?"

**Solution 8 - Formulation & Recipe:** Remove Q2 ("If Supplier A discontinues Chemical Compound X...") - same scenario as Q1 with generic names.
Keep:
1. "Hexion discontinues Epoxy Resin DGEBA. What formulations are affected and what is the substitution plan?"
2. "We need to reformulate Product Y to remove a SVHC substance - what are the viable substitute chemicals, and which have already been qualified in our system?"
3. "What is the total cost impact across our portfolio if we switch from Supplier A to Supplier B for our primary surfactant?"

**Solution 9 - Safety & Environmental:** Remove Q3 ("Which chemicals currently on-site require updated emergency response plans...") - weakest question, too generic.
Keep:
1. "Chlorine gas leak detected at Houston plant. What is the response?"
2. "If we increase production of Product X by 25%, which environmental permits need to be reviewed for emission threshold compliance?"
3. "Our Tier II reporting is due in 60 days - which facilities have inventory data gaps that need to be resolved?"

**Solution 10 - Plant Maintenance:** Remove Q3 ("Based on vibration data trends, which pumps are likely to need unplanned maintenance...") - overlaps with Q1's vibration scenario.
Keep:
1. "Gas Turbine Unit A vibration data shows 4.3 mm/s. Standard threshold is 5.0. Should we act?"
2. "If we take Reactor 4 offline for maintenance next week, what is the downstream production impact, and can other reactors absorb the load?"
3. "What is the optimal turnaround schedule for Q3 that minimizes total production loss while addressing all overdue maintenance items?"

**Solution 11 - Drug Supply Chain:** Remove Q2 ("Lot #7823 failed a stability test at month 18...") - near-duplicate of Q1.
Keep:
1. "Metformin API fails stability test at month 18. What is the exposure?"
2. "If our primary API supplier for Drug X fails their next FDA inspection, what is our qualified backup capacity and how quickly can we switch?"
3. "Which products in our portfolio have single-source API suppliers, and what is the risk profile for each?"

**Solution 12 - Allergen & Ingredient:** Remove Q2 ("If Supplier A's soy lecithin is found to contain undeclared milk protein...") - near-duplicate of Q1.
Keep:
1. "Soy Lecithin from Supplier A found to contain undeclared milk protein. What is the exposure?"
2. "Which of our production lines process both tree nut and nut-free products, and are the cleaning protocols between runs validated for allergen removal?"
3. "We are reformulating Product X to be gluten-free - which ingredients need to be replaced, and which suppliers carry certified gluten-free alternatives?"

**Solution 13 - Asset Performance:** Remove Q2 ("If we defer turbine maintenance on Unit 5 by 30 days...") - overlaps with Q1's maintenance scheduling scenario.
Keep:
1. "Wind Turbine WT-510 needs gearbox maintenance. When should we schedule it?"
2. "Given the weather forecast for next week, which solar sites will underperform, and do we need to activate peaking capacity to meet grid obligations?"
3. "What is the optimal maintenance window for our top 10 assets in Q4 that minimizes both outage risk and revenue loss from reduced generation?"

---

### CHANGE 5C: Restructure Business Impact Data Model

**File:** `src/data/solutions.ts`

**What:** Change `businessImpact` from `string[]` to a structured array with extracted metrics. Update the Solution interface and all 13 solutions' data.

**New interface:**

```typescript
export interface BusinessImpactItem {
  metric: string;       // The number - e.g., "15-25%"
  label: string;        // What the number measures - e.g., "less waste and shrink"
  context: string;      // How - e.g., "through expiry prediction and proactive markdowns"
}

export interface Solution {
  // ... existing fields unchanged ...
  businessImpact: BusinessImpactItem[];  // was string[]
}
```

**New data for all 13 solutions:**

**Solution 1 - Inventory Optimization:**
```
{ metric: "15-25%", label: "Less waste and shrink", context: "Through expiry prediction and proactive markdown timing" }
{ metric: "20-30%", label: "Fewer stock-outs", context: "While simultaneously lowering total inventory levels" }
{ metric: "30-40%", label: "Better markdown recovery", context: "AI-driven timing and cross-store transfer recommendations" }
```

**Solution 2 - Customer Feedback:**
```
{ metric: "3-4 weeks", label: "Earlier quality issue detection", context: "Versus traditional monitoring and manual review cycles" }
{ metric: "40-60%", label: "Faster root cause identification", context: "By auto-linking complaints to supplier batches and production dates" }
{ metric: "2-3x", label: "More actionable product insights", context: "Structured feedback-to-SKU mapping informs reformulation priorities" }
```

**Solution 3 - DSD Copilot:**
```
{ metric: "10-15%", label: "More revenue per route", context: "Through better store-level restocking and placement decisions" }
{ metric: "20-30%", label: "Higher shelf compliance", context: "AI-prioritized visits based on real-time compliance scoring" }
{ metric: "25-35%", label: "Fewer missed delivery windows", context: "Weather-aware routing and proactive schedule adjustments" }
```

**Solution 4 - Promotion & Demand:**
```
{ metric: "25-40%", label: "Fewer promo stock-outs", context: "Pre-launch supplier capacity validation and store-level allocation" }
{ metric: "15-20%", label: "Higher promotional ROI", context: "Through better targeting, timing, and cannibalization modeling" }
{ metric: "100%", label: "Supplier shortfalls caught pre-launch", context: "Capacity checks run automatically before any promotion goes live" }
```

**Solution 5 - Supply Chain Risk:**
```
{ metric: "95%", label: "Faster disruption response", context: "From weeks to hours with pre-built playbooks and alternative sourcing" }
{ metric: "100%", label: "Single-source risks identified", context: "Before they become crises, with qualified backup suppliers mapped" }
{ metric: "5-10%", label: "Lower material costs", context: "Through proactive sourcing, hedging triggers, and dual-source rules" }
```

**Solution 6 - Production Planning:**
```
{ metric: "3-8%", label: "Higher cell yield", context: "Early defect prediction from cross-stage parameter correlation" }
{ metric: "50-70%", label: "Faster scrap root cause identification", context: "By correlating material batches, equipment settings, and shift data" }
{ metric: "10-15%", label: "More effective capacity", context: "Without capital investment, through bottleneck identification and scheduling" }
```

**Solution 7 - Regulatory & ESG:**
```
{ metric: "20-30%", label: "Lower compliance prep costs", context: "Proactive gap identification before audits and deadlines" }
{ metric: "6-12 mo", label: "Ahead on compliance deadlines", context: "Early detection of regulation changes mapped to product impact" }
{ metric: "100%", label: "Product-level traceability", context: "Material origins to smelter level for EU Battery Passport and IRA" }
```

**Solution 8 - Formulation & Recipe:**
```
{ metric: "90%", label: "Faster reformulation response", context: "From months to days when a supplier or ingredient changes" }
{ metric: "100%", label: "Regulatory coverage during transitions", context: "Automatic REACH/TSCA constraint checking on every substitution" }
{ metric: "3-5x", label: "Faster cross-product impact analysis", context: "Instant visibility into which formulations share an affected ingredient" }
```

**Solution 9 - Safety & Environmental:**
```
{ metric: "30-40%", label: "Less compliance reporting effort", context: "Automated data collection, gap identification, and report assembly" }
{ metric: "100%", label: "Permit violations prevented", context: "Proactive threshold monitoring before production exceeds limits" }
{ metric: "<15 min", label: "Incident response activation", context: "Pre-built protocols with equipment-specific isolation procedures" }
```

**Solution 10 - Plant Maintenance:**
```
{ metric: "20-35%", label: "Less unplanned downtime", context: "Learned vibration thresholds and predictive failure patterns" }
{ metric: "2-5 days", label: "Shorter turnarounds", context: "Optimized sequencing with parallel work paths and dependency mapping" }
{ metric: "15-25%", label: "Longer equipment life", context: "Better-timed maintenance based on actual condition, not fixed schedules" }
```

**Solution 11 - Drug Supply Chain:**
```
{ metric: "80-90%", label: "Faster quality investigations", context: "From weeks to days with automated batch-to-lot tracing" }
{ metric: "100%", label: "Single-source risks mapped", context: "Every API supplier's backup capacity and qualification status tracked" }
{ metric: "4-6x", label: "Faster regulatory response", context: "Complete traceability data ready when FDA or EMA asks" }
```

**Solution 12 - Allergen & Ingredient:**
```
{ metric: "50-70%", label: "Smaller recall scope", context: "Precise lot-level tracing instead of broad precautionary recalls" }
{ metric: "100%", label: "Cross-contact risks monitored", context: "Automated cleaning validation checks between allergen production runs" }
{ metric: "75-90%", label: "Faster allergen reformulations", context: "From months to weeks with pre-qualified ingredient alternatives" }
```

**Solution 13 - Asset Performance:**
```
{ metric: "10-20%", label: "Less maintenance revenue loss", context: "Optimized scheduling during low-output windows and off-peak periods" }
{ metric: "100%", label: "Grid commitment coverage verified", context: "Before any outage is scheduled, remaining capacity is checked" }
{ metric: "3-5 years", label: "Extended asset life", context: "Condition-based maintenance timing instead of fixed interval schedules" }
```

---

### CHANGE 5D: Restructure Capabilities Into 3 Categories

**File:** `src/data/solutions.ts`

**What:** Change `keyCapabilities` from `string[]` to a structured object with three categories. Update the Solution interface and all 13 solutions.

**New interface:**

```typescript
export interface KeyCapabilities {
  connects: string[];    // What the graph maps and integrates
  analyzes: string[];    // What patterns and predictions it identifies
  recommends: string[];  // What actions and outputs it provides
}

export interface Solution {
  // ... existing fields ...
  keyCapabilities: KeyCapabilities;  // was string[]
}
```

**New data for all 13 solutions:**

**Solution 1 - Inventory Optimization:**
```
connects: ["POS sell-through data to shelf life dates and supplier lead times", "Store-level demand patterns to warehouse inventory positions"]
analyzes: ["Expiry risk by SKU, store, and time window", "Safety stock thresholds adjusted for seasonal demand and lead time changes"]
recommends: ["Markdown timing and pricing by store and day of week", "Cross-store transfers to move at-risk inventory to higher-demand locations"]
```

**Solution 2 - Customer Feedback:**
```
connects: ["Reviews, surveys, social media, and in-store comments to specific SKUs and supplier batches", "Complaint timestamps to production lot dates and distribution paths"]
analyzes: ["Emerging quality issues correlated to supplier batches", "Regional sentiment patterns and seasonal complaint trends"]
recommends: ["Supplier investigation priorities with batch-level evidence", "Targeted response plans for social media spikes and review clusters"]
```

**Solution 3 - DSD Copilot:**
```
connects: ["Route stops to real-time sell-through rates and shelf compliance scores", "Promotional calendars to store planograms and competitor positioning"]
analyzes: ["Store-level restock urgency based on delivery cadence and demand", "Shelf compliance gaps versus top-performing stores"]
recommends: ["Weather-adjusted route reprioritization", "Opportunistic placement decisions based on surplus inventory and nearby demand"]
```

**Solution 4 - Promotion & Demand:**
```
connects: ["Promotional calendar to supplier capacity, warehouse inventory, and store allocation", "Historical promo lift data to current inventory positions"]
analyzes: ["Cannibalization and halo effects on adjacent SKUs", "Store-level readiness based on inventory depth and lead times"]
recommends: ["Go/no-go decisions with supplier capacity validation", "Store exclusion lists for under-stocked locations"]
```

**Solution 5 - Supply Chain Risk:**
```
connects: ["Raw materials through multi-tier suppliers to geographic origins and product lines", "Supplier risk profiles to customer contracts and compliance requirements"]
analyzes: ["Single-source dependencies and geopolitical exposure by material", "Price sensitivity and margin impact across the product portfolio"]
recommends: ["Disruption response playbooks with qualified alternative suppliers", "Forward contract timing and hedging triggers based on commodity signals"]
```

**Solution 6 - Production Planning:**
```
connects: ["Electrode preparation parameters to cell assembly conditions and formation data", "Material batch IDs to equipment settings, shift schedules, and quality results"]
analyzes: ["Cross-stage correlation between early parameters and final yield", "Shift-level yield patterns and equipment calibration drift"]
recommends: ["Root cause identification with specific parameter and batch attribution", "Capacity expansion priorities with bottleneck stage identification"]
```

**Solution 7 - Regulatory & ESG:**
```
connects: ["Regulations to specific product lines, material origins, and supplier certifications", "Carbon footprint and recycled content data to compliance thresholds"]
analyzes: ["Per-product compliance gap size for each active regulation", "Cost of remediation for different sourcing restructuring scenarios"]
recommends: ["Remediation plans ranked by cost-effectiveness and deadline proximity", "Proactive supply chain restructuring before regulation deadlines"]
```

**Solution 8 - Formulation & Recipe:**
```
connects: ["Formulations to ingredients, qualified suppliers, and regulatory constraints", "Customer specifications to formulation parameters and tolerance bands"]
analyzes: ["Cross-product impact when any single ingredient or supplier changes", "Substitution viability based on qualification status and regulatory clearance"]
recommends: ["Prioritized substitution plans with customer notification requirements", "Supplier qualification timelines for alternative ingredients"]
```

**Solution 9 - Safety & Environmental:**
```
connects: ["Chemicals to SDS data, storage requirements, and emission profiles", "Production processes to permits, thresholds, and reporting deadlines"]
analyzes: ["Emission threshold proximity when production volumes change", "Data gaps in compliance reporting with days-to-deadline urgency"]
recommends: ["Incident response protocols with equipment-specific isolation sequences", "Permit review triggers before production scaling decisions"]
```

**Solution 10 - Plant Maintenance:**
```
connects: ["Equipment to production line dependencies, spare parts, and maintenance history", "Vibration and sensor data to failure mode patterns and historical incidents"]
analyzes: ["Learned failure thresholds stricter than manufacturer specifications", "Downstream production impact of taking any asset offline"]
recommends: ["Bundled maintenance windows that minimize separate shutdowns", "Spare parts pre-ordering based on early degradation signals"]
```

**Solution 11 - Drug Supply Chain:**
```
connects: ["API lots through manufacturing, packaging, and distribution to patient endpoints", "Supplier quality scores to FDA inspection history and qualification status"]
analyzes: ["Downstream batch exposure when any API lot fails quality testing", "Cold chain excursion severity based on duration and product sensitivity"]
recommends: ["Recall scope with precise lot numbers and current distribution locations", "Supplier audit triggers and backup qualification priorities"]
```

**Solution 12 - Allergen & Ingredient:**
```
connects: ["Recipes to ingredients, allergen profiles, and production line cleaning protocols", "Supplier allergen certifications to expiry dates and product labels"]
analyzes: ["Cross-contact risk from shared production lines and cleaning gaps", "Label accuracy when any ingredient or supplier changes"]
recommends: ["Recall scoping with lot-level precision including cross-contact products", "Reformulation paths with pre-qualified allergen-free alternatives"]
```

**Solution 13 - Asset Performance:**
```
connects: ["Generation assets to grid commitment contracts and weather output models", "Maintenance schedules to spare parts inventory and contractor availability"]
analyzes: ["Revenue loss versus failure risk for every potential maintenance window", "Weather-correlated output forecasting with curtailment thresholds"]
recommends: ["Optimal maintenance windows during low-output periods", "Peaking capacity activation triggers based on forecast shortfalls"]
```

---

### Verification After All Changes

After implementing Changes 5A through 5D, verify:

1. **Every solution has exactly 3 questions.** No duplicates, no near-duplicates.
2. **Business impact renders as big metric cards.** 3 side-by-side on desktop, stacked on mobile. Metric numbers are visually prominent (text-4xl+, orange color).
3. **Capabilities render as 3-column layout.** "Connects / Analyzes / Recommends" headers visible. 2 items per column. Compact, not a checkbox list.
4. **Questions render as clean query cards.** Large quotation mark, left-border accent, no icon clutter, no italics.
5. **TypeScript compiles.** The interface changes (BusinessImpactItem, KeyCapabilities) must be updated everywhere they are referenced.
6. **Dark mode and light mode** both display correctly for all three redesigned sections.
7. **Mobile responsive:** Metric cards stack to single column. Capabilities columns stack. Questions remain single column.
8. **The solution detail CTA section** still references the correct industry name from the solution data.

---

## Change 004: How It Works Rewrite, Platform API Signal, CTA Fix, Em-Dash Cleanup

**Date:** 2026-04-02
**Files affected:** homepage.md, all `.tsx`/`.ts`/`.json` files across `src/`, all spec files
**Priority:** HIGH - Messaging accuracy and character cleanup

### Context

Four issues identified:

1. **Em-dashes everywhere.** The website uses " - " (em-dash U+2014) in copy and graph data. Replace with " - " (hyphen) across all files in the codebase. This is a global find-and-replace.
2. **"How It Works" is unrealistic.** The current 3-step version ("Connect your data -> Build the Context Graph -> Deploy AI that reasons") oversimplifies. In practice, the entity layer connects in Week 1-2, processes get seeded in Week 2-4, and skills accumulate over weeks/months. The section needs to reflect the real phased implementation.
3. **Platform as standalone knowledge layer.** Genzoic is primarily building the core AI/knowledge layer. The assistant is one delivery mechanism. Companies with existing AI tools should be able to connect to the Context Graph. This should be mentioned on the website - not as a headline, but as a quiet signal for CTOs and VPs of AI/ML.
4. **Final CTA overpromises.** "We will map a slice of your business" implies we build their specific graph before the first meeting. We cannot. What we CAN do is show an industry-specific Context Graph and run a diagnostic conversation.

---

### CHANGE 4A: Global Em-Dash Cleanup

**Files:** ALL `.tsx`, `.ts`, `.json`, `.md`, `.css` files in the project

**What:** Find and replace all instances of " - " (U+2014 em-dash) with " - " (regular hyphen with spaces).

**Implementation:** Run a global find-and-replace across the entire `src/` directory and any other content files. This includes:
- All graph JSON files in `src/data/graphs/` (node descriptions, answers)
- `src/data/fmcg-context-graph.json`
- `src/data/solutions.ts`
- `src/components/InteractiveGraph.tsx` (comments)
- Any other files containing em-dashes

**Regex:** Replace `\u2014` with ` - ` (ensure single space on each side; if the em-dash already has spaces around it like ` \u2014 `, replace with ` - ` to avoid double-spacing).

---

### CHANGE 4B: Rewrite "How It Works" Section

**File:** homepage.md Section 5 (Section 4 in original spec, shifted to 5 after Change 002's new Section 4)

**What:** Replace the current 3-step "Connect -> Build -> Deploy" with a 3-phase approach that honestly reflects how the Context Graph gets built.

**Replace the entire How It Works section content:**

**Current heading + subtext:**
```
Heading (H2): How it works
Subtext: Three steps. From data warehouse to autonomous reasoning.
```

**Replace with:**
```
Heading (H2): How it works

Subtext: Not a plug-and-play install. A phased build that delivers value in
week one and compounds from there.
```

**Current steps 1-3: Replace entirely.**

**New Phase 1:**
```
Number: 1 (in a circle, brand-primary background)
Title: Connect and map
Timeline badge: "Week 1-2" (small muted badge next to title)
Description: We connect to your existing systems - ERP, PLM, CRM, data
warehouse - and populate the entity graph using an industry-specific template.
Products, suppliers, plants, channels, customers. We also pull your org
hierarchy from Active Directory or HR systems to set up People and Department
nodes. You get a structural map of your business on day one.
```

**New Phase 2:**
```
Number: 2
Title: Seed and deploy
Timeline badge: "Week 2-4"
Description: We deploy AI assistants to your team, seed process nodes from
documented workflows, and run initial record ingestion on your ticket history,
emails, and case files to extract patterns. Your team starts working with the
assistants immediately. Every correction, every "no, we do it this way" becomes
a skill on the graph.
```

**New Phase 3:**
```
Number: 3
Title: Compound
Timeline badge: "Ongoing"
Description: The graph gets smarter every week. Employees teach it new
workflows. The assistant observes patterns in Slack and email. Skills accumulate
and compound across the organization. Knowledge stays even when people leave.
What starts as a structural map becomes institutional memory.
```

**Styling notes:**
- Timeline badges should be small, muted text (text-xs, text-slate-500) next to or below the phase title. Not prominent, but visible.
- Consider making Phase 3 visually distinct (slightly different card style or a subtle accent) to communicate that this is the ongoing value, not a one-time step.
- Keep the numbered circles with solid brand-primary background. No gradient.

---

### CHANGE 4C: Add "Context Graph as Knowledge Layer" to Platform Section

**File:** homepage.md Section 6 (Section 5 in original spec, shifted to 6 after Change 002)

**What:** Add one new card (Card 7) and a bottom-line statement to the Platform section. This signals that the Context Graph is available as a standalone knowledge layer, not just through Genzoic's assistants.

**Note:** Change 002E already updated this section to 6 cards with the heading "Skills that compound. Knowledge that stays." This change adds a 7th card and a bottom line.

**Add after the existing 6 cards (from Change 002E):**

```
CARD 7
Icon: Blocks (Lucide) or Puzzle
Title: Power your existing AI
Description: The Context Graph is also available as a standalone knowledge
layer. Connect it to your existing copilots, chatbots, or internal AI tools.
Same graph, same skills, your delivery mechanism.

Bottom line (muted text, centered, below all cards):
We build the brain. The assistant is one way to use it.
```

**Styling:** Same card style as the other 6. The bottom line is understated - text-sm, text-slate-500. Not a headline, not a sales pitch. A quiet signal for technical buyers who are already thinking about this.

**Grid adjustment:** 7 cards means the grid should be 3-col desktop (2 full rows + 1 card centered on last row), 2-col tablet, 1-col mobile.

---

### CHANGE 4D: Rewrite Final CTA Section

**File:** homepage.md Section 9 (Section 8 in original spec, shifted to 9 after Change 002)

**What:** Replace the CTA copy that overpromises ("map a slice of your business") with honest framing (industry-specific demo + diagnostic conversation).

**Current:**
```
Heading (H2): See your business on the graph

Subtext: Book a 30-minute demo. We will map a slice of your business and show
you what your AI has been missing.
```

**Replace with:**
```
Heading (H2): See what your AI has been missing

Subtext: Book a 30-minute call. We will walk you through a Context Graph built
for your industry and identify where your teams are losing critical knowledge
today.
```

**Keep the rest unchanged:**
```
CTA: [Book a Demo] (primary button, links to https://calendar.app.google/DezhnNr993pqnzhx5, new tab)

Below the button (small muted text): "No commitment. No credit card."
```

**Why this works:** It sets the right expectation. The prospect sees a real graph for their industry (manufacturing, pharma, energy - we have them). The conversation becomes diagnostic: "Where are your knowledge gaps?" This is honest, still compelling, and leads naturally into a paid engagement.

---

### Verification After All Changes

After implementing Changes 4A through 4D, verify:

1. **No em-dashes remain** anywhere in `src/` or spec files. Run `grep -rn "\u2014" src/` to confirm.
2. **How It Works** shows 3 phases with timeline badges (Week 1-2, Week 2-4, Ongoing). Phase descriptions are concrete and honest.
3. **Platform section** has 7 cards total (6 from Change 002E + 1 new "Power your existing AI"). Bottom line reads "We build the brain. The assistant is one way to use it."
4. **Final CTA** reads "See what your AI has been missing" with the industry demo framing.
5. **Section order** remains correct (9 sections, alternating backgrounds):
   1. Hero
   2. Problem
   3. Context Graph
   4. How Knowledge Gets Captured
   5. How It Works (updated)
   6. Platform (updated)
   7. Implementation Partnership
   8. Industry Solutions
   9. Final CTA (updated)

---

## Change 003: Intelligence Layer Questions + Solution Graph Overhaul

**Date:** 2026-04-02
**Files affected:** interactive-graph.md (homepage graph), solutions.md, all 13 graph JSON files in `src/data/graphs/`
**Priority:** HIGH - The homepage graph has intelligence layer nodes but only 1 of 5 questions uses them. None of the 13 solution graphs have intelligence layer nodes at all. This change fixes both.

### Context

Change 002 added Process, Skill, People, and Department nodes to the homepage FMCG graph spec and code. However:
- Only Question 5 ("TrueHarvest Co. shipment is 3 days late") triggers the intelligence layer. Questions 1-4 are pure entity traversal.
- All 13 solution-specific graphs (`src/data/graphs/*.json`) remain entity-only. None have Process, Skill, People, or Department nodes.

The user wants:
1. **Homepage:** 3 of 5 questions should trigger intelligence layers (Process/Skill/People/Department). The remaining 2 should be entity-only to show that basic graph traversal is also powerful.
2. **All 13 solutions:** Add intelligence layer nodes (Process, Skill, People, Department) with domain-relevant content.
3. **Validation:** Review every solution for relevance, fix issues, add better questions where needed.

---

### CHANGE 3A: Redesign Homepage Predefined Questions

**File:** `interactive-graph.md` (predefined questions section), `src/data/fmcg-context-graph.json`

**Current state:** 5 questions exist. Only Q5 triggers intelligence layers. Q1-Q4 are entity-only.

**New arrangement:** Reorder and rewrite so Q1-Q3 trigger intelligence layers, Q4-Q5 are entity-only. Drop old Q1 ("TrueHarvest can no longer supply") since it overlaps with the late-shipment scenario.

#### NEW Question 1: Supplier Late Shipment + Skill Invocation + Conflict Resolution
*(Moved from old Q5, refined)*

```
Question: "TrueHarvest Co. shipment is 3 days late. What happens?"

Reasoning steps:
1. TrueHarvest Co. flagged as 3 days late at supplier node.
2. Graph traversal: TrueHarvest supplies Mango Puree, Apple Puree, Fresh Tomatoes.
3. Products affected: Mango Chutney, Apple Cider Vinegar, Tomato Ketchup, Pesto Basilico.
4. Process node "Supplier Switch Rule" triggers on the late-shipment event.
5. Skill fires: "Backup Supplier Playbook" (Record Ingestion, Individual priority, created by Procurement Lead) recommends switching to FreshFarm Co. based on 47 past tickets.
6. Skill fires: "Mango Season Demand Spike" (Active Teaching, Executive priority, created by CEO) says to stockpile Mango Puree during peak season, not switch suppliers.
7. Conflict detected: two skills on the Mango Puree path disagree. System checks org hierarchy via Department nodes.
8. Resolution: CEO skill (Executive priority) overrides Procurement Lead skill (Individual priority). Stockpile recommendation wins for Mango Puree. FreshFarm Co. switch proceeds for Apple Puree and Fresh Tomatoes only.
9. People routed: Ops Manager and Procurement Lead both notified with resolution and full reasoning chain.

highlightNodes: TrueHarvest Co., FreshFarm Co., Mango Puree, Apple Puree, Fresh Tomatoes, Mango Chutney, Apple Cider Vinegar, Tomato Ketchup, Pesto Basilico, Supplier Switch Rule (Process), Backup Supplier Playbook (Skill), Mango Season Demand Spike (Skill), CEO (People), Ops Manager (People), Procurement Lead (People), Leadership (Department), Operations (Department)

highlightEdges: All edges connecting the above nodes.

Answer: "TrueHarvest is 3 days late, affecting 3 ingredients and 4 products. The Backup Supplier Playbook recommends switching to FreshFarm Co., but the CEO's Mango Season skill overrides this for Mango Puree during peak season. The system applies the switch for Apple Puree and Fresh Tomatoes only, preserving Mango Puree supply continuity per executive directive. Both the Ops Manager and Procurement Lead receive the decision with full reasoning."
```

**Why this is Q1:** It is the most compelling demo of the full architecture - entity traversal, process trigger, skill invocation, conflict resolution via org hierarchy, and people routing. Lead with the strongest example.

---

#### NEW Question 2: Plant Disruption + Process Node + Institutional Knowledge
*(Rewritten from old Q4 - was entity-only, now triggers intelligence layer)*

```
Question: "East Coast Production Facility goes offline. What is affected?"

Reasoning steps:
1. East Coast Production Facility marked offline.
2. Entity traversal: produces Mango Chutney, Tomato Ketchup, Hot Sauce 150ml, Garlic Aioli.
3. Channels affected: Retail Stores, E-Commerce DTC, Wholesale/B2B.
4. Stores affected: Whole Foods, Target, Mango Saree, White Vineyard.
5. Process node "Wastage Protocol" triggers - checks perishable inventory at the facility.
6. Skill fires: "Thursday Liquidation Timing" (Passive Observation, Department priority, created by Ops Manager) - learned from observing that markdowns on Thursdays at nearby retail stores recover 23% more revenue than weekend markdowns.
7. Skill fires: "Whole Foods Restock Cadence" (Conversational Learning, Department priority, created by Ops Manager) - Whole Foods requires 48-hour advance notice for schedule changes; system flags the notification deadline.
8. Midwest Processing Plant can absorb Hot Sauce and Tomato Ketchup. Mango Chutney and Garlic Aioli have NO alternative plant - production halts.
9. People routed: Ops Manager receives action plan; Procurement Lead receives supplier notification checklist.

highlightNodes: East Coast Production Facility, Mango Chutney, Tomato Ketchup, Hot Sauce 150ml, Garlic Aioli, Retail Stores, E-Commerce DTC, Wholesale/B2B, Whole Foods, Target, Mango Saree, White Vineyard, Midwest Processing Plant, Wastage Protocol (Process), Thursday Liquidation Timing (Skill), Whole Foods Restock Cadence (Skill), Ops Manager (People), Procurement Lead (People), Operations (Department)

highlightEdges: All edges connecting the above nodes.

Answer: "The East Coast facility produces 4 products serving all major channels and 4 store accounts. Hot Sauce and Tomato Ketchup can reroute to Midwest Plant. Mango Chutney and Garlic Aioli face supply interruption - no alternative plant exists. The Wastage Protocol triggers perishable inventory checks. The Ops Manager's Thursday Liquidation skill recommends immediate markdowns at nearby stores to recover revenue from at-risk inventory. Whole Foods requires 48-hour advance notice per the Restock Cadence skill - notification deadline is flagged."
```

**Why this is Q2:** Shows a different pattern than Q1 - here the skills add operational intelligence (liquidation timing, retailer notification rules) rather than conflict resolution. Demonstrates that skills encode the institutional knowledge a new employee would not have.

---

#### NEW Question 3: Employee Departure + Knowledge Retention
*(Brand new question - showcases People/Department nodes and knowledge retention)*

```
Question: "The Ops Manager just resigned. What knowledge is at risk?"

Reasoning steps:
1. Ops Manager People node flagged as departing.
2. System traces all skills created by Ops Manager:
   - "Thursday Liquidation Timing" (Passive Observation, Department priority) - anchored to Retail Stores + Liquidation Workflow
   - "Whole Foods Restock Cadence" (Conversational Learning, Department priority) - anchored to Whole Foods + Restock Trigger
3. System traces all entities the Ops Manager is marked RESPONSIBLE_FOR:
   - East Coast Production Facility
   - Midwest Processing Plant
4. Department node "Operations" checked - Procurement Lead also belongs to Operations but is Individual-level, not Department-level. No one inherits Department priority automatically.
5. Skills remain anchored to graph - they will continue to fire. But priority level may need reassignment.
6. System generates handover report:
   - 2 skills created by Ops Manager (with full procedure, trigger conditions, invocation history)
   - 2 facilities under their responsibility
   - Recommendation: incoming Operations lead should review and confirm both skills within 30 days
   - All skill invocation logs available for the new hire to understand context
7. CEO (via Leadership Department node) flagged for org hierarchy gap - Operations department now has no Department-level decision-maker.

highlightNodes: Ops Manager (People), Thursday Liquidation Timing (Skill), Whole Foods Restock Cadence (Skill), Retail Stores, Whole Foods, Liquidation Workflow (Process), Restock Trigger (Process), East Coast Production Facility, Midwest Processing Plant, Operations (Department), Leadership (Department), CEO (People), Procurement Lead (People)

highlightEdges: All CREATED_BY edges from skills to Ops Manager, BELONGS_TO edges, REPORTS_TO edges, RESPONSIBLE_FOR edges, ANCHORED_TO edges from the two skills.

Answer: "The Ops Manager created 2 skills and was responsible for 2 production facilities. Both skills (Thursday Liquidation Timing and Whole Foods Restock Cadence) remain anchored to the graph and will continue to fire - no knowledge is lost. However, both skills carry Department-level priority, and with the Ops Manager's departure, Operations has no Department-level decision-maker. The system generates a handover report with full skill procedures, invocation history, and entity responsibilities for the incoming hire. The CEO is flagged about the org hierarchy gap."
```

**Why this is Q3:** This is the knowledge retention story - the single most compelling argument for Skills-on-Graph over traditional approaches. An employee leaves, but every piece of knowledge they contributed stays, is traceable, and continues to function. Enterprise buyers care deeply about this.

---

#### Question 4: Product Traceability (Entity-Only)
*(Kept from old Q2, unchanged, renumbered)*

```
Question: "Which suppliers and ingredients go into Mango Chutney?"

Reasoning steps:
1. Mango Chutney uses: Mango Puree, Cane Sugar, Citric Acid, Cayenne Pepper
2. Supplied by: TrueHarvest Co. (Mango Puree), Natural Flavors Co. (Citric Acid), Kroger Ingredients (Cane Sugar, Cayenne Pepper)
3. Manufactured at: East Coast Production Facility
4. Sold through: Retail Stores, E-Commerce DTC

highlightNodes: Mango Chutney + all connected ingredient and supplier nodes + East Coast Production Facility + Retail Stores + E-Commerce DTC

Answer: "Mango Chutney depends on 4 ingredients from 3 suppliers. Mango Puree from TrueHarvest Co. is the most critical - it is single-sourced. The product is manufactured at the East Coast facility and distributed through retail and DTC channels."
```

**Why entity-only:** Shows that the graph is useful even without intelligence layers. Pure structural traversal answers a question that would otherwise require checking 4 different systems.

---

#### Question 5: Channel/Store Impact (Entity-Only)
*(Kept from old Q3, unchanged, renumbered)*

```
Question: "If we lose the Whole Foods account, which products are most affected?"

Reasoning steps:
1. Whole Foods carries: Mango Chutney, Garlic Aioli, Honey Mustard, Pesto Basilico, Apple Cider Vinegar
2. Of these, Mango Chutney and Pesto Basilico have Whole Foods as their largest retail account
3. Garlic Aioli and Honey Mustard are also in Target and Chicago Outlet
4. Revenue concentration risk is highest for Mango Chutney (40% of retail volume through Whole Foods)

highlightNodes: Whole Foods + all connected product nodes + alternative store nodes

Answer: "Whole Foods carries 5 of our 10 products. Mango Chutney and Pesto Basilico have the highest concentration risk, with 40% and 35% of retail volume respectively. Garlic Aioli and Honey Mustard have better diversification across Target and regional chains."
```

**Why entity-only:** Demonstrates channel dependency analysis - another structural insight that requires no skills.

---

#### Summary of Question Reordering

| # | Question | Intelligence Layer? | What it demonstrates |
|---|----------|-------------------|---------------------|
| Q1 | TrueHarvest 3 days late | YES | Skill invocation, conflict resolution, org hierarchy, people routing |
| Q2 | East Coast offline | YES | Process triggers, institutional knowledge skills, operational intelligence |
| Q3 | Ops Manager resigned | YES | Knowledge retention, skill provenance, handover report, org gap detection |
| Q4 | Mango Chutney traceability | No (entity-only) | Structural traversal, supplier dependency |
| Q5 | Lose Whole Foods account | No (entity-only) | Channel analysis, revenue concentration |

**Implementation note:** The graph data (nodes, edges) in `fmcg-context-graph.json` already contains Process, Skill, People, and Department nodes from Change 002. Only the `questions` array needs to be updated - reorder the 5 questions per the above spec, update Q2's reasoning/highlights to include intelligence layer nodes, and add Q3 as a brand new question.

---

### CHANGE 3B: Add Intelligence Layer Nodes to All 13 Solution Graphs

**Files:** `solutions.md`, all 13 JSON files in `src/data/graphs/`

**What:** Every solution graph currently contains only entity nodes (Product, Ingredient/Material, Supplier, Plant, Channel, Store + domain variants). Add Process, Skill, People, and Department nodes to each graph with domain-relevant content. Also add at least 1 new example question per solution that triggers the intelligence layer.

**Implementation approach:**
- Add 3-4 Process nodes per solution (domain-specific workflows, decision rules)
- Add 3-5 Skill nodes per solution (mix of capture modes, mix of priority levels)
- Add 2-3 People nodes per solution (mix of Executive, Department, Individual levels)
- Add 2 Department nodes per solution (one leadership, one operational)
- Add corresponding edges: TRIGGERS, ANCHORED_TO, CREATED_BY, BELONGS_TO, REPORTS_TO, RESPONSIBLE_FOR
- Add/replace at least 1 example question that shows intelligence layer in action
- Update the GraphNode type in InteractiveGraph.tsx to accept the new node types (if not already done from Change 002)

**Node type colors (consistent across all solutions):**

| Type | Light Mode | Dark Mode | Shape |
|------|-----------|-----------|-------|
| Process | `#6d28d9` (violet-800) | `#a78bfa` (violet-400) | Octagon |
| Skill | `#047857` (emerald-700) | `#34d399` (emerald-400) | Pill/rounded-rect |
| People | `#be123c` (rose-700) | `#fb7185` (rose-400) | Circle with ring |
| Department | `#a21caf` (fuchsia-700) | `#e879f9` (fuchsia-400) | Rounded square |

**Edge types to add (consistent across all solutions):**

| Relationship | Meaning | Style |
|-------------|---------|-------|
| TRIGGERS | Process node triggers on an event at entity/process | Dashed violet |
| ANCHORED_TO | Skill is anchored to entity/process node | Dotted emerald |
| CREATED_BY | Skill traces back to People node who created it | Dotted rose |
| BELONGS_TO | People node belongs to Department | Solid fuchsia |
| REPORTS_TO | Department reports to another Department | Solid fuchsia |
| RESPONSIBLE_FOR | People node is responsible for entity | Dotted gray |

---

#### Solution 1: Inventory Optimization & Expiry Prevention (Retail & FMCG)

**New Process nodes (3):**
- `proc-markdown-decision`  - "Markdown Decision Rule": When a product reaches X days before expiry, trigger markdown evaluation by store.
- `proc-restock-trigger`  - "Restock Trigger": When inventory at a store drops below safety stock, generate reorder signal factoring in lead time and demand forecast.
- `proc-expiry-escalation`  - "Expiry Escalation Workflow": When predicted waste exceeds threshold, escalate to category manager with transfer/markdown/donate options.

**New Skill nodes (4):**
- `skill-store42-holiday`  - "Store 42 Holiday Surge Pattern" | Mode: Active Teaching | Creator: Category Manager | Priority: Department | Description: Category manager taught that Store 42 sees 3x dairy demand during Thanksgiving week; pre-position 200% safety stock starting Monday before.
- `skill-dairy-markdown`  - "Dairy Markdown Timing" | Mode: Passive Observation | Creator: Store Ops Lead | Priority: Individual | Description: Observed that markdowns on Tuesdays at suburban stores recover 18% more than Friday markdowns. Pattern validated by Store Ops Lead.
- `skill-lead-time-buffer`  - "Long Lead Time Safety Stock" | Mode: Record Ingestion | Creator: Category Manager | Priority: Department | Description: Mined from 300 stockout incidents - when supplier lead time exceeds 21 days, increase safety stock by 40% rather than default 20%.
- `skill-seasonal-dairy-rotation`  - "Seasonal Dairy Rotation" | Mode: Conversational Learning | Creator: Store Ops Lead | Priority: Individual | Description: Learned from correction: "We rotate dairy endcap displays to yogurt in summer and cheese in winter - sales lift is 15%."

**New People nodes (2):**
- `people-cat-manager`  - "Category Manager" | Level: Department | Department: Merchandising
- `people-store-ops`  - "Store Ops Lead" | Level: Individual | Department: Store Operations

**New Department nodes (2):**
- `dept-merchandising`  - "Merchandising" | Reports to: (top-level)
- `dept-store-ops`  - "Store Operations" | Reports to: (top-level)

**New edges:** TRIGGERS edges from process nodes to relevant entities. ANCHORED_TO from skills to entities/processes. CREATED_BY from skills to people. BELONGS_TO from people to departments. RESPONSIBLE_FOR from Category Manager to product category entities.

**New example question (add as Q1, shift existing questions):**
```
Question: "Butter Croissants expire in 3 days at Store #07. What should happen?"
Reasoning steps:
1. Expiry Escalation Workflow process triggers at Store #07 for Butter Croissants.
2. Entity traversal: Butter Croissants -> Store #07 current inventory: 45 units, sell-through rate: 8/day. Predicted waste: 21 units.
3. Skill fires: "Dairy Markdown Timing" recommends Tuesday markdown (today is Monday) for suburban stores - Store #07 is suburban. Mark down tomorrow morning.
4. Skill fires: "Store 42 Holiday Surge Pattern" checks if holiday is approaching - no holiday this week, so no override.
5. Nearby stores checked via Restock Trigger process: Dark Store #D3 has only 5 units and higher sell-through. Transfer 15 units.
6. People routed: Store Ops Lead gets markdown + transfer action plan.
Answer: "45 Butter Croissants at Store #07 with 3 days to expiry and 8/day sell-through means 21 units at risk. The Dairy Markdown Timing skill recommends a Tuesday morning markdown (18% better recovery at suburban stores). 15 units should transfer to Dark Store #D3 which has higher demand. Store Ops Lead receives the combined action plan."
```

**Validation notes:** Current graph is solid for entity structure. Existing questions about lead times, shelf life, and safety stock are relevant. No issues found. Adding intelligence layer makes the "what should happen" questions actionable rather than just informational.

---

#### Solution 2: Customer Feedback Intelligence (Retail & FMCG)

**New Process nodes (3):**
- `proc-complaint-escalation`  - "Complaint Escalation Workflow": When negative sentiment for a product exceeds threshold in a 7-day window, escalate to Quality Manager with supplier batch correlation.
- `proc-quality-alert`  - "Quality Alert Trigger": When complaints from multiple stores correlate to a single supplier batch, trigger supplier quality investigation.
- `proc-review-response`  - "Review Response Protocol": When a 1-star review mentions a specific product defect, generate structured response and route to brand team.

**New Skill nodes (3):**
- `skill-dairy-batch-check`  - "Dairy Complaint to Batch Check" | Mode: Conversational Learning | Creator: Quality Manager | Priority: Department | Description: Learned from correction: "When we get taste complaints on dairy products, always check the supplier batch date first - 80% of the time it is a cold chain issue."
- `skill-social-spike-triage`  - "Social Media Sentiment Spike Triage" | Mode: Passive Observation | Creator: Brand Manager | Priority: Individual | Description: Observed that social media spikes on Mondays correlate with weekend in-store experiences. Validated by Brand Manager.
- `skill-review-pattern`  - "Seasonal Complaint Pattern" | Mode: Record Ingestion | Creator: Quality Manager | Priority: Department | Description: Mined from 2 years of feedback data: complaints about product texture spike 30% in summer due to heat exposure during delivery.

**New People nodes (2):**
- `people-quality-mgr`  - "Quality Manager" | Level: Department | Department: Quality Assurance
- `people-brand-mgr`  - "Brand Manager" | Level: Individual | Department: Marketing

**New Department nodes (2):**
- `dept-qa`  - "Quality Assurance"
- `dept-marketing`  - "Marketing"

**New example question (add as Q1):**
```
Question: "Almond Oat Milk complaints spiked 40% this week. What is the root cause and what should we do?"
Reasoning steps:
1. Complaint Escalation Workflow triggers: Almond Oat Milk negative sentiment exceeds 7-day threshold.
2. Entity traversal: complaints from Williamsburg, Flagship Store, and online reviews.
3. Skill fires: "Dairy Complaint to Batch Check" - cross-reference complaints with recent supplier batches from Summit Roasters (supplies almond extract).
4. Quality Alert Trigger fires: 3 stores with complaints in same week correlates with batch #B-2847 from Summit Roasters.
5. Skill fires: "Seasonal Complaint Pattern" checks if this is a known seasonal issue - summer month, but complaints are about taste, not texture. Not seasonal - likely batch issue.
6. People routed: Quality Manager gets supplier investigation action with batch number. Brand Manager gets social media response template.
Answer: "The spike correlates with Summit Roasters batch #B-2847, delivered to 3 stores showing complaints. The Dairy Complaint skill identified this as a supplier batch issue, not a seasonal pattern. Quality Manager should initiate supplier investigation for batch #B-2847. Brand Manager should deploy the response protocol for affected online reviews."
```

**Validation notes:** Graph structure is sound. Node types use `channel` for feedback channels (social media, surveys, etc.) which is a valid domain interpretation. The existing questions about complaint correlation and feedback coverage are relevant. Intelligence layer adds the "what to do about it" dimension.

---

#### Solution 3: DSD Copilot for Field Operations (Retail & FMCG)

**New Process nodes (3):**
- `proc-route-optimization`  - "Route Optimization Rule": Recalculate stop priority based on real-time sell-through, shelf compliance scores, and delivery constraints.
- `proc-shelf-reset`  - "Shelf Reset Protocol": When a store's shelf compliance drops below 70%, trigger priority visit with planogram instructions.
- `proc-opportunistic-placement`  - "Opportunistic Placement Decision": When truck has surplus inventory, evaluate nearby stores for unplanned placement based on demand signals.

**New Skill nodes (3):**
- `skill-back-door-delivery`  - "Store 87 Back Door Delivery" | Mode: Active Teaching | Creator: Route Manager | Priority: Department | Description: Route manager taught: "Store 87 only accepts deliveries through back entrance after 10am due to construction. Front entrance blocked Mon-Fri."
- `skill-rainy-day-route`  - "Rainy Day Route Adjustment" | Mode: Conversational Learning | Creator: Field Rep Lead | Priority: Individual | Description: Learned from correction: "When it rains, skip outdoor display stores (Times Square, Chelsea) and prioritize covered-dock stores first. Outdoor displays get restocked last because product gets damaged."
- `skill-promo-endcap-check`  - "Promotional Endcap Compliance" | Mode: Passive Observation | Creator: Route Manager | Priority: Department | Description: Observed that stores with endcap promotions that are not restocked within 24 hours of sell-through lose 35% of promotional lift.

**New People nodes (2):**
- `people-route-mgr`  - "Route Manager" | Level: Department | Department: Field Operations
- `people-field-rep`  - "Field Rep Lead" | Level: Individual | Department: Field Operations

**New Department nodes (2):**
- `dept-field-ops`  - "Field Operations"
- `dept-sales`  - "Sales"

**New example question (add as Q1):**
```
Question: "It is raining today and my Route B-07 has 22 stops. How should I reprioritize?"
Reasoning steps:
1. Route Optimization Rule triggers with weather context: rain detected for Route B-07 area.
2. Skill fires: "Rainy Day Route Adjustment" - skip outdoor display stores first (Times Square, Chelsea), prioritize covered-dock stores.
3. Entity traversal: Route B-07 -> 22 stores, 6 with outdoor-only receiving, 16 with covered docks.
4. Skill fires: "Promotional Endcap Compliance" - 3 stores have active endcap promos expiring today. These get top priority regardless of weather.
5. Shelf Reset Protocol checks: Store 87 compliance is at 65% - below threshold. Add as priority stop.
6. Skill fires: "Store 87 Back Door Delivery" - reminder: back entrance only after 10am.
7. People routed: Field Rep Lead gets optimized route with 3 promo-critical stops first, then covered-dock stores, then outdoor stores last.
Answer: "Reprioritized your 22 stops: 3 promo-endcap stores are top priority (expiring today, 35% lift at risk). Then Store 87 (compliance at 65%, use back entrance after 10am). Then 12 remaining covered-dock stores. 6 outdoor-display stores moved to end of route - product damage risk in rain. Estimated time savings: 45 minutes from skip-reorder."
```

**Validation notes:** Graph correctly models DSD routes, stores, and products. Uses `plant` type for distribution centers, which works. The existing questions about restocking and shelf placement are relevant. Intelligence layer adds weather-aware and compliance-aware operational intelligence.

---

#### Solution 4: Promotion & Demand Planning (Retail & FMCG)

**New Process nodes (3):**
- `proc-promo-approval`  - "Promotion Approval Workflow": Before launching a promotion, validate supplier capacity, warehouse inventory, and store-level allocation.
- `proc-cannibalization-check`  - "Cannibalization Impact Check": When a BOGO or deep discount is proposed, model the cannibalization effect on related products.
- `proc-post-promo-analysis`  - "Post-Promotion Analysis Trigger": 7 days after promotion ends, generate performance report comparing forecast vs. actual lift by store.

**New Skill nodes (3):**
- `skill-bogo-cannibalization`  - "BOGO Cannibalization Estimation" | Mode: Record Ingestion | Creator: Promotion Manager | Priority: Department | Description: Mined from 150 past BOGO promotions: average cannibalization of 12% on adjacent SKUs, but premium products see only 5% cannibalization.
- `skill-holiday-promo-timing`  - "Holiday Promo Launch Timing" | Mode: Active Teaching | Creator: Promotion Manager | Priority: Department | Description: Taught by Promotion Manager: "Launch Thanksgiving promos 3 weeks before, not 2. Supplier lead time needs the extra week and early shoppers drive 30% of promo volume."
- `skill-store-exclusion`  - "Low-Inventory Store Exclusion" | Mode: Conversational Learning | Creator: Supply Chain Planner | Priority: Individual | Description: Learned from correction: "Never include stores with less than 2 weeks of safety stock in a BOGO promo - they will stock out by day 3 and we lose customers."

**New People nodes (2):**
- `people-promo-mgr`  - "Promotion Manager" | Level: Department | Department: Marketing
- `people-sc-planner`  - "Supply Chain Planner" | Level: Individual | Department: Supply Chain

**New Department nodes (2):**
- `dept-marketing`  - "Marketing"
- `dept-supply-chain`  - "Supply Chain"

**New example question (add as Q1):**
```
Question: "We want to run a BOGO on Pumpkin Spice Latte Mix at 500 stores for Thanksgiving. Will it work?"
Reasoning steps:
1. Promotion Approval Workflow triggers: validate supplier capacity, inventory, allocation.
2. Skill fires: "Holiday Promo Launch Timing" - Thanksgiving is 4 weeks away, skill recommends launching in 1 week (3 weeks before), not 2. Extra week needed for supplier.
3. Entity traversal: Pumpkin Spice Latte Mix -> supplier HarvestPrime Meats (supplies spice blend) -> current capacity check.
4. Cannibalization Impact Check triggers: BOGO on Pumpkin Spice -> check adjacent SKUs.
5. Skill fires: "BOGO Cannibalization Estimation" - Pumpkin Spice is premium, expect only 5% cannibalization on regular coffee mixes (not 12% default).
6. Skill fires: "Low-Inventory Store Exclusion" - 47 of 500 stores have less than 2 weeks safety stock. Exclude them.
7. People routed: Promotion Manager gets go/no-go recommendation. Supply Chain Planner gets 47-store exclusion list.
Answer: "Launch in 1 week, not 2 - the Holiday Promo Timing skill says 3 weeks lead time is required. Supplier can handle volume for 453 stores (47 excluded due to low inventory). Expected cannibalization on adjacent coffee products is only 5% (premium product). Promotion Manager should approve with the adjusted timeline. Supply Chain Planner should expedite restocking for the 47 excluded stores if they want to be included."
```

**Validation notes:** Graph uses `channel` for promo channels (loyalty programs, digital coupons, endcap displays, social media ads, in-store sampling), which is a creative use of the type. Works well. Existing questions are relevant. Intelligence layer adds the pre-launch validation that real promo managers need.

---

#### Solution 5: Supply Chain Risk Monitor (Battery Manufacturing)

**New Process nodes (3):**
- `proc-disruption-response`  - "Supplier Disruption Response Protocol": When a tier-1 supplier is flagged for risk (geopolitical, financial, quality), trigger impact assessment and alternative sourcing evaluation.
- `proc-alt-sourcing`  - "Alternative Sourcing Evaluation": Score alternative suppliers on lead time, quality qualification status, cost delta, and sanctions compliance.
- `proc-price-hedge`  - "Price Hedge Trigger": When commodity price exceeds threshold, evaluate hedging options and contract renegotiation.

**New Skill nodes (4):**
- `skill-drc-cobalt-playbook`  - "DRC Cobalt Disruption Playbook" | Mode: Record Ingestion | Creator: Supply Chain VP | Priority: Executive | Description: Mined from 5 past DRC disruptions: switch to Australian cobalt within 14 days (qualified), but expect 22% cost increase. Always pre-position 6 weeks of cobalt buffer stock.
- `skill-lithium-hedge`  - "Lithium Price Hedge Trigger" | Mode: Active Teaching | Creator: Supply Chain VP | Priority: Executive | Description: Taught by VP: "When lithium carbonate spot price exceeds $25/kg, lock in 6-month forward contracts immediately. We got burned in 2022 waiting."
- `skill-sanctions-check`  - "Sanctions Compliance Quick Check" | Mode: Conversational Learning | Creator: Procurement Lead | Priority: Individual | Description: Learned from correction: "Always check OFAC SDN list before qualifying any new nickel supplier - we almost onboarded a sanctioned entity in 2024."
- `skill-dual-source-rule`  - "Critical Material Dual-Source Rule" | Mode: Active Teaching | Creator: Supply Chain VP | Priority: Executive | Description: "Any material in 3+ product lines must have at least 2 qualified suppliers. No exceptions."

**New People nodes (2):**
- `people-sc-vp`  - "Supply Chain VP" | Level: Executive | Department: Procurement
- `people-procurement-lead`  - "Procurement Lead" | Level: Individual | Department: Procurement

**New Department nodes (2):**
- `dept-procurement`  - "Procurement"
- `dept-risk-mgmt`  - "Risk Management"

**New example question (add as Q1):**
```
Question: "DRC cobalt mine just had a cave-in. 60-day production halt confirmed. What do we do?"
Reasoning steps:
1. Disruption Response Protocol triggers on Cobalt Mining Corp (DRC supplier).
2. Entity traversal: Cobalt Mining Corp supplies Battery-Grade Cobalt -> used in NMC 811 Cathode and NCA Cathode -> used in EV Pack 75kWh, Grid Storage 200kWh, Pouch Cell 50Ah.
3. Skill fires: "DRC Cobalt Disruption Playbook" (Executive priority) - switch to Australian Cobalt Refinery (qualified), expect 22% cost increase, pre-position 6 weeks buffer.
4. Alternative Sourcing Evaluation triggers: Australian Cobalt Refinery scored: lead time 14 days, qualified, +22% cost, no sanctions risk.
5. Skill fires: "Dual-Source Rule" confirms Australian source is already qualified (compliance).
6. Skill fires: "Sanctions Compliance Quick Check" - Australian Cobalt Refinery cleared on OFAC SDN.
7. Price Hedge Trigger checks: cobalt spot price likely to spike. Recommend locking forward contracts now.
8. People routed: Supply Chain VP gets executive summary with cost impact and contract recommendations. Procurement Lead gets supplier switch execution checklist.
Answer: "Cave-in affects 3 product lines through 2 cathode chemistries. The DRC Cobalt Playbook recommends immediate switch to Australian Cobalt Refinery (14-day lead time, qualified, +22% cost). 6-week buffer stock should be pre-positioned. Forward contracts recommended before spot price spikes. Supply Chain VP reviews cost impact; Procurement Lead executes the supplier switch."
```

**Validation notes:** Graph uses `channel` and `store` types for downstream distribution, which is slightly generic for battery manufacturing. Consider renaming display labels to "Distribution Channel" and "Customer Account" for clarity, but node types can remain. Core entity structure is sound for supply chain risk analysis. Intelligence layer adds the institutional memory of past disruptions.

---

#### Solution 6: Production Planning & Yield Optimization (Battery Manufacturing)

**New Process nodes (3):**
- `proc-yield-deviation`  - "Yield Deviation Investigation": When yield drops more than 2% from rolling average, trigger root cause analysis correlating material batches, equipment parameters, and shift data.
- `proc-line-changeover`  - "Line Changeover Protocol": Decision rules for switching production between cell formats - minimum batch size, cleaning requirements, calibration sequence.
- `proc-quality-gate`  - "Quality Gate Decision": At each production stage, pass/fail criteria with escalation paths for borderline results.

**New Skill nodes (3):**
- `skill-coating-correlation`  - "Coating Thickness Failure Correlation" | Mode: Passive Observation | Creator: Quality Engineer | Priority: Individual | Description: Observed pattern: when electrode coating variance exceeds 2.5 microns, formation failure rate jumps from 3% to 11%. Pattern validated by Quality Engineer.
- `skill-line3-calibration`  - "Line 3 Calibration Sweet Spot" | Mode: Active Teaching | Creator: Production Manager | Priority: Department | Description: Taught by Production Manager: "Line 3 calendering roller pressure works best at 142 bar, not the spec 145. We figured this out after 6 months of yield data. 145 causes micro-cracking in NMC cathodes."
- `skill-shift-pattern`  - "Night Shift Yield Adjustment" | Mode: Record Ingestion | Creator: Production Manager | Priority: Department | Description: Mined from 12 months of data: night shift yield averages 1.8% lower due to humidity fluctuation in the dry room. Compensate by reducing coating speed by 5%.

**New People nodes (2):**
- `people-prod-mgr`  - "Production Manager" | Level: Department | Department: Manufacturing
- `people-quality-eng`  - "Quality Engineer" | Level: Individual | Department: Quality

**New Department nodes (2):**
- `dept-manufacturing`  - "Manufacturing"
- `dept-quality`  - "Quality"

**New example question (add as Q1):**
```
Question: "Line 3 yield dropped 4% this week. Is it the new cathode batch or the calibration change from Tuesday?"
Reasoning steps:
1. Yield Deviation Investigation triggers: Line 3 yield below rolling average by 4%.
2. Entity traversal: Line 3 -> Electrode Coating stage -> current batch: NMC 811 Cathode Batch #C-447 from Cathode Supplier A.
3. Skill fires: "Line 3 Calibration Sweet Spot" (Department priority) - checks current roller pressure. Tuesday calibration set it to spec 145 bar. Skill says optimal is 142 bar for NMC cathodes.
4. Skill fires: "Coating Thickness Failure Correlation" - current coating variance at 3.1 microns (above 2.5 threshold), predicting 11% formation failure.
5. Skill fires: "Night Shift Yield Adjustment" - night shift contribution checked: yield drop is uniform across shifts, ruling out humidity as primary cause.
6. Quality Gate Decision triggers: recommend reverting to 142 bar and monitoring next 50 cells.
7. People routed: Production Manager gets calibration revert recommendation. Quality Engineer gets monitoring protocol.
Answer: "The 4% yield drop correlates with Tuesday's calibration change (145 bar), not the cathode batch. The Line 3 Calibration skill identifies that 142 bar is optimal for NMC cathodes - 145 causes micro-cracking. Coating variance at 3.1 microns predicts 11% formation failure. Night shift humidity is ruled out (drop is uniform across shifts). Recommended action: revert to 142 bar immediately and monitor 50 cells."
```

**Validation notes:** Graph models the battery production pipeline well (electrode coating, cell assembly, formation cycling, quality inspection). Uses domain-specific relationship types (ASSEMBLED_AT, GRADED_AT, INSPECTED_AT). Sound structure. Intelligence layer adds the tribal knowledge that makes manufacturing engineering effective.

---

#### Solution 7: Regulatory & ESG Compliance Tracker (Battery Manufacturing)

**New Process nodes (3):**
- `proc-compliance-gap`  - "Compliance Gap Remediation": When a regulation changes, scan all product lines for new gaps and generate remediation plans with cost estimates.
- `proc-audit-prep`  - "Audit Preparation Workflow": 30 days before scheduled audit, compile documentation, flag data gaps, and assign data collection tasks.
- `proc-reg-change-assessment`  - "Regulation Change Assessment": When a new regulation or amendment is published, map it to affected products, materials, and suppliers.

**New Skill nodes (3):**
- `skill-ira-calc`  - "IRA Content Calculation Shortcut" | Mode: Conversational Learning | Creator: Compliance Director | Priority: Department | Description: Learned from correction: "The IRA domestic content calculation uses the manufacturing cost method, not the weight method. Common mistake - weight method overestimates compliance by 10-15%."
- `skill-battery-passport-mapping`  - "EU Battery Passport Data Mapping" | Mode: Active Teaching | Creator: Sustainability Manager | Priority: Individual | Description: Taught by Sustainability Manager: "For the EU Battery Passport, carbon footprint data must be traced back to smelter level, not just refiner. Most teams miss this."
- `skill-cbam-reporting`  - "CBAM Quarterly Reporting" | Mode: Record Ingestion | Creator: Compliance Director | Priority: Department | Description: Mined from 8 quarters of CBAM reports: the embedded emissions calculation for imported cathode materials consistently requires manual adjustment for transport emissions, averaging 8% addition to supplier-reported values.

**New People nodes (2):**
- `people-compliance-dir`  - "Compliance Director" | Level: Department | Department: Legal & Compliance
- `people-sustainability-mgr`  - "Sustainability Manager" | Level: Individual | Department: Sustainability

**New Department nodes (2):**
- `dept-legal-compliance`  - "Legal & Compliance"
- `dept-sustainability`  - "Sustainability"

**New example question (add as Q1):**
```
Question: "IRA domestic content requirement increases to 80% in 2027. Which products qualify?"
Reasoning steps:
1. Regulation Change Assessment triggers: IRA domestic content threshold updated to 80%.
2. Entity traversal: All product lines -> material origins -> supplier locations.
3. Skill fires: "IRA Content Calculation Shortcut" (Department priority) - use manufacturing cost method, not weight method. Recalculates all products.
4. Compliance Gap Remediation triggers: Product lines below 80% identified with gap size.
5. Entity traversal: EV Pack 75kWh current domestic content: 73% (cost method). Grid Storage 200kWh: 81%. Pouch Cell 50Ah: 68%.
6. Skill fires: "Battery Passport Data Mapping" cross-checks: smelter-level origin data confirms domestic percentages.
7. People routed: Compliance Director gets gap remediation plan. Sustainability Manager gets data collection tasks for missing smelter-level traceability.
Answer: "Using the manufacturing cost method (not weight - common error), Grid Storage 200kWh qualifies at 81%. EV Pack 75kWh is 7% short at 73% - switching graphite to domestic source closes the gap. Pouch Cell 50Ah is 12% short at 68% - requires both cathode and anode material sourcing changes. Compliance Director gets the full remediation plan with cost estimates."
```

**Validation notes:** Graph models regulations as `channel` type nodes (EPA, EU Battery Regulation, IRA, CBAM) and compliance artifacts as `store` type (ESG Report, Audit Record). This is creative repurposing of entity types. Works functionally but display labels should clearly read as regulatory entities, not retail stores. Core structure is sound for compliance analysis.

---

#### Solution 8: Formulation & Recipe Management (Chemical Manufacturing)

**New Process nodes (3):**
- `proc-substitution-approval`  - "Ingredient Substitution Approval": When an ingredient becomes unavailable, evaluate alternatives against formulation specs, customer requirements, and regulatory constraints before approving switch.
- `proc-formulation-change-control`  - "Formulation Change Control": Any change to a formulation requires lab validation, customer notification (if spec change), and regulatory re-check.
- `proc-supplier-qualification`  - "Supplier Qualification Process": New suppliers must pass quality testing, provide documentation, and get approved before first order.

**New Skill nodes (3):**
- `skill-surfactant-matrix`  - "Surfactant Substitution Matrix" | Mode: Active Teaching | Creator: R&D Chemist | Priority: Department | Description: Taught by R&D Chemist: "For anionic surfactants in latex paints, SLES can substitute SLS at 0.85x concentration. For cationic surfactants, no direct substitution - requires full reformulation."
- `skill-reach-svhc-check`  - "REACH SVHC Quick Check" | Mode: Record Ingestion | Creator: Regulatory Specialist | Priority: Individual | Description: Mined from 200 formulation reviews: 15 of our ingredients appear on the REACH SVHC candidate list. Cross-reference any reformulation against this list before proceeding.
- `skill-customer-spec-override`  - "Customer Spec Override Rule" | Mode: Conversational Learning | Creator: R&D Chemist | Priority: Department | Description: Learned from correction: "Customer SprayMax has a tighter viscosity spec (200-400 cP) than our standard (200-600 cP). Any formulation change for products sold to SprayMax must hit the tighter band."

**New People nodes (2):**
- `people-rd-chemist`  - "R&D Chemist" | Level: Department | Department: R&D
- `people-reg-specialist`  - "Regulatory Specialist" | Level: Individual | Department: Regulatory Affairs

**New Department nodes (2):**
- `dept-rd`  - "R&D"
- `dept-reg-affairs`  - "Regulatory Affairs"

**New example question (add as Q1):**
```
Question: "Hexion discontinues Epoxy Resin DGEBA. What formulations are affected and what is the substitution plan?"
Reasoning steps:
1. Ingredient Substitution Approval triggers on Epoxy Resin DGEBA unavailability.
2. Entity traversal: Epoxy Resin DGEBA -> used in Anti-Corrosion Primer, Marine Hull Coating, Industrial Epoxy Floor Coat.
3. Alternative Sourcing: Dow Chemical supplies Epoxy Resin BADGE (qualified) and Olin Corporation supplies Epoxy Novolac (not yet qualified for floor coat).
4. Skill fires: "REACH SVHC Quick Check" - Epoxy Resin BADGE is not on SVHC candidate list. Clear to proceed.
5. Skill fires: "Customer Spec Override Rule" - Marine Hull Coating is sold to SprayMax. Tighter viscosity spec. Epoxy Resin BADGE meets the spec at 0.95x concentration.
6. Formulation Change Control triggers: Lab validation required for all 3 formulations. Customer notification required for SprayMax (spec-relevant change).
7. Supplier Qualification triggers for Olin Corporation (Epoxy Novolac) - not yet qualified. Lead time: 6-8 weeks.
8. People routed: R&D Chemist gets reformulation priorities (SprayMax first). Regulatory Specialist gets REACH documentation updates.
Answer: "3 formulations affected. Dow's Epoxy BADGE is qualified and SVHC-clear - can substitute in all 3 at 0.95x concentration. SprayMax customer requires notification due to spec-relevant change; their tighter viscosity band is met. Olin's Epoxy Novolac is an option for floor coat but needs 6-8 weeks qualification. R&D Chemist should prioritize SprayMax formulation validation. Regulatory Specialist updates REACH documentation."
```

**Validation notes:** Graph uses `channel` for distribution (industrial distributors, automotive OEM) and `store` for end customers (SprayMax, construction companies). Formulation-to-ingredient-to-supplier chain is well-modeled. Intelligence layer adds the reformulation expertise that lives in senior chemists' heads.

---

#### Solution 9: Safety & Environmental Compliance (Chemical Manufacturing)

**New Process nodes (3):**
- `proc-emission-threshold-alert`  - "Emission Threshold Alert": When production increase pushes estimated emissions past permit limits, alert EHS Manager before exceeding.
- `proc-permit-renewal`  - "Permit Renewal Workflow": 90 days before permit expiry, compile compliance data, flag gaps, and initiate renewal process.
- `proc-incident-response`  - "Chemical Incident Response Protocol": When a leak, spill, or release is detected, trigger safety systems, evacuation procedures, and regulatory notification chain.

**New Skill nodes (3):**
- `skill-tier2-collection`  - "Tier II Reporting Data Collection" | Mode: Active Teaching | Creator: EHS Manager | Priority: Department | Description: Taught by EHS Manager: "Start Tier II data collection 90 days before the filing deadline, not 60. Houston plant always has inventory reconciliation issues that take 4 weeks to resolve."
- `skill-emission-permit-review`  - "Emission Increase Permit Review" | Mode: Passive Observation | Creator: EHS Manager | Priority: Department | Description: Observed pattern: every time production volume increases over 15%, at least one air permit approaches threshold. Now proactively checks permits when production plans change.
- `skill-chlorine-response`  - "Chlorine Gas Leak Response" | Mode: Record Ingestion | Creator: Plant Director | Priority: Executive | Description: Mined from 12 incident reports: chlorine gas leaks at Houston plant always originate from valve manifold B3 or heat exchanger HX-7. First responders should isolate these two points first.

**New People nodes (2):**
- `people-ehs-mgr`  - "EHS Manager" | Level: Department | Department: EHS
- `people-plant-dir`  - "Plant Director" | Level: Executive | Department: Operations

**New Department nodes (2):**
- `dept-ehs`  - "EHS (Environment, Health & Safety)"
- `dept-operations`  - "Operations"

**New example question (add as Q1):**
```
Question: "Chlorine gas leak detected at Houston plant. What is the response?"
Reasoning steps:
1. Chemical Incident Response Protocol triggers immediately.
2. Skill fires: "Chlorine Gas Leak Response" (Executive priority, Plant Director) - isolate valve manifold B3 and heat exchanger HX-7 first. These are the source in 100% of past incidents.
3. Entity traversal: Houston Plant -> chlorine gas storage areas -> nearby production lines -> safety monitoring systems (gas detectors, emergency ventilation).
4. Process: Incident Response Protocol -> evacuation zones, regulatory notification (LEPC within 15 minutes for RQ exceedance), contractor hazmat team callout.
5. Entity traversal: Products manufactured at Houston using chlorine-related processes -> PVC Stabilizer, Water Treatment Chemicals. Production halted.
6. People routed: Plant Director gets incident command. EHS Manager gets regulatory notification checklist and timeline.
Answer: "Immediate action: isolate valve manifold B3 and heat exchanger HX-7 (source points in all past incidents per Plant Director's protocol). Evacuate affected zones. Notify LEPC within 15 minutes if RQ exceeded. Gas detection and emergency ventilation systems active. PVC Stabilizer and Water Treatment Chemical production halted. Plant Director assumes incident command. EHS Manager handles regulatory notifications."
```

**Validation notes:** Graph correctly models chemicals, safety systems, plants, and monitoring equipment. Uses `channel` for monitoring systems and `store` for regulatory endpoints. The existing questions about production increases and safety coverage are well-structured. Intelligence layer adds the institutional knowledge from past incidents that saves lives.

---

#### Solution 10: Plant Maintenance & Reliability (Chemical Manufacturing)

**New Process nodes (3):**
- `proc-maintenance-scheduling`  - "Maintenance Scheduling Rule": Balance maintenance need against production schedules - never schedule two critical-path assets simultaneously.
- `proc-failure-analysis`  - "Failure Mode Analysis": When an equipment alarm triggers, correlate with vibration data, temperature trends, and maintenance history to identify likely failure mode.
- `proc-turnaround-planning`  - "Turnaround Planning Process": Major maintenance events require sequencing all dependent work, contractor scheduling, spare parts verification, and production impact modeling.

**New Skill nodes (3):**
- `skill-reactor-vibration`  - "Reactor 4 Vibration Pattern" | Mode: Passive Observation | Creator: Reliability Engineer | Priority: Individual | Description: Observed pattern: when Gas Turbine Unit A bearing vibration exceeds 4.2 mm/s, failure occurs within 14 days (based on 3 occurrences). Standard threshold is 5.0 mm/s - too late.
- `skill-turnaround-sequence`  - "Optimal Turnaround Sequence" | Mode: Record Ingestion | Creator: Maintenance Manager | Priority: Department | Description: Mined from 8 past turnarounds: start with Cooling Tower (3 days), then Heat Exchanger (2 days), then Gas Turbine (5 days). Parallel paths save 4 days vs. serial approach.
- `skill-spare-parts-lead`  - "Critical Spare Parts Lead Time" | Mode: Active Teaching | Creator: Maintenance Manager | Priority: Department | Description: Taught: "Gas turbine blades from Siemens have 12-week lead time. Always keep 2 spare sets. Bearings from SKF are 4 weeks. Order at first sign of vibration anomaly, not at failure."

**New People nodes (2):**
- `people-maint-mgr`  - "Maintenance Manager" | Level: Department | Department: Maintenance
- `people-reliability-eng`  - "Reliability Engineer" | Level: Individual | Department: Engineering

**New Department nodes (2):**
- `dept-maintenance`  - "Maintenance"
- `dept-engineering`  - "Engineering"

**New example question (add as Q1):**
```
Question: "Gas Turbine Unit A vibration data shows 4.3 mm/s. Standard threshold is 5.0. Should we act?"
Reasoning steps:
1. Failure Mode Analysis triggers: vibration data anomaly on Gas Turbine Unit A.
2. Skill fires: "Reactor 4 Vibration Pattern" (Individual priority) - 4.3 mm/s exceeds the learned threshold of 4.2 mm/s. At this level, failure occurs within 14 days based on 3 past occurrences. Standard 5.0 threshold is too late.
3. Skill fires: "Critical Spare Parts Lead Time" (Department priority) - check bearing inventory. Bearings from SKF have 4-week lead time. If not in stock, order immediately.
4. Entity traversal: Gas Turbine Unit A -> connected to Steam Generator SG-2 -> feeds Distillation Column DC-1 -> affects Product Lines A, B, C.
5. Maintenance Scheduling Rule: check production calendar. Taking Unit A offline next week overlaps with Cooling Tower maintenance. Cannot do both - reschedule Cooling Tower.
6. Skill fires: "Optimal Turnaround Sequence" - if we are taking Unit A down, consider bundling Heat Exchanger maintenance (overdue by 2 weeks). Saves a future shutdown.
7. People routed: Reliability Engineer gets monitoring escalation. Maintenance Manager gets bundled maintenance proposal + spare parts status.
Answer: "Act now. The learned vibration threshold (4.2 mm/s) is stricter than the standard (5.0) for good reason - 3 past failures occurred within 14 days of this level. Check bearing inventory (4-week lead if not in stock). Propose bundled maintenance: Gas Turbine Unit A + overdue Heat Exchanger. Reschedule Cooling Tower to avoid overlap. Downstream impact: Steam Generator and Distillation Column will be offline for 5 days, affecting 3 product lines."
```

**Validation notes:** Graph models equipment dependencies, spare parts, and production lines well. Uses domain-specific types (installed_at, monitors, feeds_into). The existing questions about maintenance impact and spare parts are directly relevant. Intelligence layer adds the predictive maintenance expertise that experienced reliability engineers carry.

---

#### Solution 11: Drug Supply Chain Integrity (Pharmaceutical)

**New Process nodes (3):**
- `proc-quality-deviation`  - "Quality Deviation Investigation": When a batch fails any quality test, trace the deviation back through the manufacturing chain to identify root cause and scope of impact.
- `proc-lot-recall`  - "Lot Recall Execution Workflow": When a recall is initiated, trace affected lots through the distribution chain, identify current locations, and generate recall notifications.
- `proc-supplier-audit`  - "Supplier Audit Trigger": When a supplier quality score drops below threshold or an FDA warning letter is issued, trigger on-site audit within 30 days.

**New Skill nodes (3):**
- `skill-stability-batch-trace`  - "API Stability Failure Batch Trace" | Mode: Active Teaching | Creator: Quality Director | Priority: Executive | Description: Taught by Quality Director: "When an API fails stability at month 18, immediately check all downstream batches manufactured within 60 days of the API lot date. Do not wait for month 24 data."
- `skill-cold-chain-excursion`  - "Cold Chain Excursion Response" | Mode: Record Ingestion | Creator: Supply Chain Manager | Priority: Department | Description: Mined from 45 excursion events: 78% of excursions exceeding 2 hours but under 4 hours have no product impact. Above 4 hours, quarantine immediately. Under 2 hours, log and monitor.
- `skill-fda-inspection-prep`  - "FDA Inspection Preparation" | Mode: Conversational Learning | Creator: Quality Director | Priority: Executive | Description: Learned from correction: "When preparing for FDA inspection, always have the last 3 CAPA closures for each product line ready. Inspectors always ask for them and delays in pulling records trigger Form 483 observations."

**New People nodes (2):**
- `people-quality-dir`  - "Quality Director" | Level: Executive | Department: Quality Assurance
- `people-sc-manager`  - "Supply Chain Manager" | Level: Department | Department: Supply Chain

**New Department nodes (2):**
- `dept-quality-assurance`  - "Quality Assurance"
- `dept-supply-chain`  - "Supply Chain"

**New example question (add as Q1):**
```
Question: "Metformin API fails stability test at month 18. What is the exposure?"
Reasoning steps:
1. Quality Deviation Investigation triggers on Metformin Hydrochloride API stability failure.
2. Skill fires: "API Stability Failure Batch Trace" (Executive priority) - do not wait for month 24 data. Immediately check all downstream batches within 60 days of API lot date.
3. Entity traversal: Metformin API lot #M-7823 -> manufactured at Solid Dosage Plant PA -> downstream batches: 3 batches of Metformin 500mg tablets (lots #T-901, #T-902, #T-903).
4. Lot Recall Execution workflow evaluates: lot #T-901 at Hospital Distribution Network. #T-902 at Retail Pharmacy Chain. #T-903 still at Solid Dosage Plant PA (not yet released).
5. Skill fires: "Cold Chain Excursion Response" - checks transport logs. No excursions detected. Not a cold chain issue.
6. Supplier Audit Trigger evaluates: API Manufacturer India quality score checked. Recent score: 87/100 (above threshold). No audit triggered yet, but flag for next scheduled audit.
7. People routed: Quality Director gets batch impact assessment and recall recommendation. Supply Chain Manager gets distribution chain trace with current lot locations.
Answer: "API lot #M-7823 failure affects 3 downstream tablet batches. Lot #T-903 is still at the plant - hold immediately. Lots #T-901 and #T-902 are in distribution (hospital network and retail pharmacy chain). Quality Director should initiate the Batch Trace protocol immediately per the 60-day rule. Cold chain is not a factor. API Manufacturer India's quality score is borderline - flag for next audit cycle."
```

**Validation notes:** Graph correctly models the pharma supply chain from API to distribution. Uses `channel` for distribution channels (hospital, retail, specialty pharmacy, clinical trials) and `store` for regulatory entities (FDA, EMA, PMDA). This is slightly non-intuitive but functional. Consider relabeling display names. Core traceability structure is sound. Intelligence layer adds the institutional memory around quality investigations.

---

#### Solution 12: Allergen & Ingredient Compliance (Food & Beverage)

**New Process nodes (3):**
- `proc-cross-contact-check`  - "Allergen Cross-Contact Check": Before a production run, verify cleaning protocol was completed and validated between allergen and allergen-free products.
- `proc-recall-scoping`  - "Recall Scoping Workflow": When an allergen contamination is detected, trace affected lots, production runs, and distribution endpoints with precision.
- `proc-reformulation-approval`  - "Reformulation Approval Process": When reformulating for allergen removal, validate new ingredients, update labels, test for cross-reactivity, and obtain regulatory clearance.

**New Skill nodes (3):**
- `skill-line-changeover`  - "Line Changeover Cleaning Validation" | Mode: Active Teaching | Creator: Food Safety Manager | Priority: Department | Description: Taught by Food Safety Manager: "After any tree nut product run, the allergen swab test must show < 5 ppm before starting a nut-free product. Standard protocol says 10 ppm, but we had a near-miss at 8 ppm. Our internal standard is 5 ppm."
- `skill-allergen-cert-expiry`  - "Supplier Allergen Cert Expiry Alert" | Mode: Passive Observation | Creator: Food Safety Manager | Priority: Department | Description: Observed that 3 supplier allergen certifications expired without notice in 2024. System now alerts 60 days before expiry.
- `skill-label-cross-check`  - "Label Allergen Cross-Check" | Mode: Record Ingestion | Creator: R&D Lead | Priority: Individual | Description: Mined from 50 label reviews: 12% of label updates after reformulation miss updating the "may contain" advisory statement. Always cross-check advisory against shared equipment list.

**New People nodes (2):**
- `people-food-safety-mgr`  - "Food Safety Manager" | Level: Department | Department: Food Safety
- `people-rd-lead`  - "R&D Lead" | Level: Individual | Department: Product Development

**New Department nodes (2):**
- `dept-food-safety`  - "Food Safety"
- `dept-product-dev`  - "Product Development"

**New example question (add as Q1):**
```
Question: "Soy Lecithin from Supplier A found to contain undeclared milk protein. What is the exposure?"
Reasoning steps:
1. Recall Scoping Workflow triggers on allergen contamination.
2. Entity traversal: Soy Lecithin -> used in Chocolate Truffle Bar, Vanilla Bean Ice Cream, Protein Energy Bites (3 products).
3. Lot tracing: affected Soy Lecithin batches -> production lots at Bakery Plant NJ and Frozen Desserts Plant OH.
4. Distribution tracing: affected lots -> Specialty Grocery Chain, Organic Market Co-op, Amazon Fulfillment.
5. Skill fires: "Line Changeover Cleaning Validation" - checks production logs. Angel Food Cake Mix (allergen-free) was produced after Chocolate Truffle Bar on same line. Swab test showed 7 ppm (above our 5 ppm internal standard).
6. Skill fires: "Label Allergen Cross-Check" - Protein Energy Bites label says "dairy-free." This is now incorrect. Immediate label hold required.
7. Allergen Cross-Contact Check: Angel Food Cake Mix lot from that run is now suspect. Add to recall scope.
8. People routed: Food Safety Manager gets recall scope (4 products, not just 3) with lot numbers and retail locations. R&D Lead gets label correction priority list.
Answer: "Direct exposure: 3 products using Soy Lecithin across 2 plants. But the Changeover Cleaning skill catches a 4th product at risk - Angel Food Cake Mix was produced after Chocolate Truffle Bar with a 7 ppm swab result (above our 5 ppm standard). The Label Cross-Check skill flags Protein Energy Bites as labeled 'dairy-free' - requires immediate hold. Total recall scope: 4 products, 3 retail endpoints. Food Safety Manager gets full scope. R&D Lead corrects labels."
```

**Validation notes:** Graph is well-structured with allergen-specific types (allergen, certification, cleaning_protocol, recipe, label_claim). This is the most domain-customized graph of the 13. Existing questions about allergen risks and production line cross-contact are directly relevant. Intelligence layer adds the stricter-than-standard safety thresholds and label audit rules that prevent real recalls.

---

#### Solution 13: Asset Performance Management (Energy & Utilities)

**Current issue:** The graph JSON uses generic node types (`channel`, `ingredient`, `plant`, `product`, `store`, `supplier`) but represents energy assets (turbines, transformers, solar arrays) as `ingredient` or `product` type. Display labels should clearly read as energy domain entities. Functionally this works because the graph logic is type-agnostic, but consider relabeling node type display names for the solution detail page.

**New Process nodes (3):**
- `proc-maintenance-vs-generation`  - "Maintenance vs. Generation Decision": When maintenance is needed, model the revenue loss from taking the asset offline vs. the failure risk of deferral.
- `proc-grid-commitment-check`  - "Grid Commitment Check": Before scheduling any outage, verify that remaining assets can cover all grid commitment obligations plus required reserve margin.
- `proc-outage-planning`  - "Outage Planning Process": Coordinate maintenance windows across assets, contractor availability, spare parts, and weather forecasts.

**New Skill nodes (3):**
- `skill-seasonal-maintenance`  - "Unit 5 Seasonal Maintenance Window" | Mode: Active Teaching | Creator: Asset Manager | Priority: Department | Description: Taught by Asset Manager: "Always schedule Wind Turbine WT-510 maintenance in April or October. Wind speeds are lowest, so revenue impact is minimal. Never schedule in Jan-Feb (peak wind) or Jul-Aug (peak demand)."
- `skill-wind-output-correlation`  - "Wind Farm Output vs. Weather Correlation" | Mode: Passive Observation | Creator: Grid Ops Lead | Priority: Individual | Description: Observed: offshore wind output drops 40% when wave height exceeds 3m due to automatic safety curtailment. Weather forecast integration should trigger pre-positioning of peaking capacity 24 hours ahead.
- `skill-solar-degradation`  - "Solar Array Degradation Pattern" | Mode: Record Ingestion | Creator: Asset Manager | Priority: Department | Description: Mined from 5 years of data: Solar Array SA-200 output degrades 0.7%/year (industry average is 0.5%). Cleaning schedule and inverter replacement at year 7 (not year 10) significantly slows degradation.

**New People nodes (2):**
- `people-asset-mgr`  - "Asset Manager" | Level: Department | Department: Asset Management
- `people-grid-ops`  - "Grid Ops Lead" | Level: Individual | Department: Grid Operations

**New Department nodes (2):**
- `dept-asset-mgmt`  - "Asset Management"
- `dept-grid-ops`  - "Grid Operations"

**New example question (add as Q1):**
```
Question: "Wind Turbine WT-510 needs gearbox maintenance. When should we schedule it?"
Reasoning steps:
1. Maintenance vs. Generation Decision triggers: model revenue loss for each potential maintenance window.
2. Skill fires: "Unit 5 Seasonal Maintenance Window" (Department priority) - April or October only. Current month: check against skill. If outside those months, defer unless failure risk is critical.
3. Grid Commitment Check triggers: verify remaining assets can cover commitments during WT-510 downtime.
4. Skill fires: "Wind Farm Output vs. Weather Correlation" - check wave height forecast for the maintenance period. If waves exceed 3m, offshore maintenance crew cannot operate anyway - schedule during these windows for zero additional generation loss.
5. Entity traversal: WT-510 -> Grid Commitment Contract #GC-2024-07 -> required output: 45 MW. Other assets check: WT-500, Solar Array SA-200, Gas Peaker GP-1 can cover 52 MW combined.
6. Outage Planning Process: contractor availability, spare parts (gearbox in stock), weather window.
7. People routed: Asset Manager gets optimized schedule with revenue impact model. Grid Ops Lead gets commitment coverage verification.
Answer: "Schedule WT-510 gearbox maintenance during the next high-wave window (>3m) in April or October - zero additional generation loss since the turbine would be curtailed anyway. Grid commitments are covered: remaining assets provide 52 MW against 45 MW obligation. Gearbox is in stock. The Seasonal Maintenance skill confirms April/October as lowest-impact months. Asset Manager reviews the schedule; Grid Ops Lead confirms commitment coverage."
```

**Validation notes:** Graph currently uses generic entity types for energy-specific assets. Functionally correct but the display should be clear about what each node represents. The existing questions about vibration anomalies and solar underperformance are relevant. Intelligence layer adds the seasonal scheduling expertise and weather correlation that experienced asset managers use.

---

### CHANGE 3C: Update solutions.md With Intelligence Layer References

**File:** solutions.md

**What:** For each of the 13 solutions, add a new field to the spec that describes the intelligence layer additions. This provides the implementer with the spec for what to build into each solution's graph JSON.

**Add to the Solution interface:**

```typescript
export interface Solution {
  // ... existing fields ...
  intelligenceLayer?: {
    processNodes: string[];    // Names of process nodes to add
    skillNodes: string[];      // Names of skill nodes to add
    peopleNodes: string[];     // Names of people nodes to add
    departmentNodes: string[]; // Names of department nodes to add
    intelligenceQuestion: string;  // New example question that triggers intelligence layer
  };
}
```

**For each solution, add the intelligenceLayer field with the data specified in Change 3B above.** The full details (capture modes, priority levels, descriptions, reasoning steps) are in Change 3B. The solutions.ts data should include at minimum the node names and the new intelligence-layer question text.

**Also update each solution's contextGraphExample** to mention the intelligence layer:

For example, Solution 1's contextGraphExample currently says:
```
Products -> SKUs -> store locations -> supplier lead times -> shelf life dates -> historical demand patterns. Connects POS data to warehouse inventory to logistics schedules.
```

Update to:
```
Products -> SKUs -> store locations -> supplier lead times -> shelf life dates -> historical demand patterns. Connects POS data to warehouse inventory to logistics schedules. Intelligence layer adds: Markdown Decision Rules, Restock Triggers, learned expiry management skills from category managers and store operations staff.
```

Apply similar updates to all 13 solutions. The intelligence layer description should be 1-2 sentences appended to the existing contextGraphExample.

---

### CHANGE 3D: Update InteractiveGraph.tsx Node Type Handling (if needed)

**File:** `src/components/InteractiveGraph.tsx`

**What:** Verify that the InteractiveGraph component already handles the new node types (Process, Skill, People, Department) from Change 002. If it does, no changes needed. If any solution graphs use node type strings that do not match the expected types in InteractiveGraph.tsx, update the component to handle them.

**Check:** The current graph JSONs use lowercase type values (`product`, `ingredient`, `supplier`, `plant`, `channel`, `store`). The homepage FMCG graph uses capitalized types (`Product`, `Ingredient`, `Supplier`, `Plant`, `Channel`, `Store`, `Process`, `Skill`, `People`, `Department`). The implementer should ensure consistency - either normalize all to the same case, or make the component case-insensitive.

---

### Verification After All Changes

After implementing Changes 3A through 3D, verify:

1. **Homepage questions:** Q1-Q3 trigger intelligence layer nodes (highlighted Process, Skill, People, Department nodes). Q4-Q5 highlight entity nodes only.
2. **All 13 solution graphs:** Each has at least 3 Process nodes, 3 Skill nodes, 2 People nodes, 2 Department nodes with appropriate edges.
3. **New example questions:** Each solution has at least 1 question that demonstrates intelligence layer (skills firing, people routing, process triggers).
4. **Node type colors:** Consistent across all graphs (Process=violet, Skill=emerald, People=rose, Department=fuchsia).
5. **Edge types:** New relationship types (TRIGGERS, ANCHORED_TO, CREATED_BY, BELONGS_TO, REPORTS_TO, RESPONSIBLE_FOR) render correctly with distinct styles.
6. **Legend:** Each solution's graph legend shows both "Entity Nodes" and "Intelligence Layer" groupings.
7. **solutions.md data:** Each solution's contextGraphExample references the intelligence layer.
8. **Dark mode and light mode:** New node types display correctly in both themes.
9. **Mobile responsive:** Intelligence layer nodes do not clutter the graph on small screens. Consider hiding labels on Process/Skill nodes at small viewport widths.
10. **Performance:** Adding ~10-12 nodes and ~20-25 edges per graph should not impact rendering. Total nodes per solution graph will be ~30-50 (was ~20-40).

---

## Change 002: Skills-on-Graph Architecture Overhaul

**Date:** 2026-04-02
**Files affected:** homepage.md, interactive-graph.md, solutions.md, pages.md
**Priority:** HIGH - This is a positioning and architecture update, not cosmetic.

### Context

The Genzoic platform architecture has evolved from a structural entity-relationship graph to a **Skills-on-Graph** platform with five node types, four knowledge capture modes, and org-hierarchy-based conflict resolution. The current website reflects the old architecture (entity-only graph, assistants as features). This change updates the website to communicate the full value proposition to enterprise data & analytics leaders, CDOs, and VPs of AI/ML.

### What Changed in the Product

1. **Five node types** (was: 6 entity-only types). The Context Graph now contains:
   - **Entity Nodes** (existing): Products, Ingredients, Suppliers, Plants, Channels, Stores
   - **Process Nodes** (NEW): Workflows, decision rules, approval chains, escalation paths
   - **Skill Nodes** (NEW): Learned behaviors anchored to entity and process nodes - not stored in a flat registry
   - **People Nodes** (NEW): Employees with role, department, RBAC level, reporting chain
   - **Department Nodes** (NEW): Org hierarchy for conflict resolution and skill priority

2. **Skills are anchored to the graph** - the graph topology IS the orchestration engine. When an event occurs at an entity node, graph traversal finds attached skills. No keyword matching.

3. **Four knowledge capture modes** (all produce skill nodes anchored to graph):
   - Mode 1: Active Teaching - employee proactively teaches a workflow
   - Mode 2: Conversational Learning - assistant learns from corrections during work
   - Mode 3: Passive Observation - assistant observes Slack/email, prompts employee to validate patterns
   - Mode 4: Record Ingestion - mine historical tickets, emails, case files at scale

4. **Conflict resolution via org hierarchy**: CEO-level skills override department-level, which override individual-level. People Nodes and Department Nodes provide the mechanism.

5. **Knowledge retention with provenance**: Every skill traces back to its creator. When an employee leaves, the system knows exactly which skills they created and which entities they owned.

6. **Competitive positioning**: Genzoic is a strict superset of Interloom ($16.5M seed, record-mining only). Works in record-sparse industries where they cannot.

---

### CHANGE 2A: Update Hero Subtext

**File:** homepage.md, Section 1
**What:** Update the subtext to hint at the broader architecture (not just entity mapping).

**Current:**
```
Most enterprise AI sits on top of data tables. It can tell you what happened.
It cannot reason about what to do next. Genzoic builds the Context Graph -
a living map of how your business actually runs, not just the data it
generates - so AI can think like someone who actually works there.
```

**Replace with:**
```
Most enterprise AI sits on top of data tables. It can tell you what happened.
It cannot reason about what to do next. Genzoic builds the Context Graph -
a living map of your business structure, workflows, and institutional
knowledge - so AI can think like someone who actually works there.
```

**Why:** The old version implied the graph only maps data relationships. The new version communicates three layers: structure, workflows, knowledge.

---

### CHANGE 2B: Update Problem Section Bottom Paragraph

**File:** homepage.md, Section 2
**What:** Update the bottom paragraph to include process knowledge, not just entity knowledge.

**Current:**
```
The knowledge that drives real decisions - supplier dependencies,
plant capacities, product formulations, distribution channels,
pricing structures - lives in your people's heads, not in your data warehouse.
That is the gap.
```

**Replace with:**
```
The knowledge that drives real decisions - supplier dependencies,
plant capacities, product formulations, but also the workflows
nobody documented, the rules people just know, the judgment calls
that happen in Slack - lives in your people's heads, not in your
data warehouse. That is the gap.
```

**Why:** The old version only referenced structural knowledge. The new version names process and tacit knowledge - the exact gap that Skills-on-Graph solves.

---

### CHANGE 2C: Overhaul Section 3  - The Context Graph

**File:** homepage.md, Section 3
**What:** Major update. The graph section must now communicate five node types, skills anchored to graph, and four capture modes. The interactive demo should show process, skill, people, and department nodes alongside entity nodes.

**Replace Section 3 heading and subtext:**

**Current:**
```
Heading (H2): The Context Graph

Subtext: A structured map of your business that captures what data warehouses
cannot - the relationships, dependencies, and logic that drive real decisions.
```

**Replace with:**
```
Section label (small, brand-primary): THE CORE TECHNOLOGY

Heading (H2): The Context Graph

Subtext: More than a knowledge graph. The Context Graph maps your business
structure, encodes your workflows, and captures the institutional knowledge
your people carry - then uses that context to route AI to the right action
at the right time.
```

**Add NEW subsection between the subtext and the interactive graph:**

A horizontal row of 5 node-type cards, compact, showing what the graph contains. This is the first time visitors see that the graph has FIVE node types, not just entities.

```
NODE TYPE CARDS (5 across on desktop, scrollable on mobile):

1. Icon: Box (Lucide) | Color: brand-primary (#2563EB)
   Title: Entity Nodes
   Description: Products, suppliers, plants, channels, stores, contracts
   and how they connect.

2. Icon: GitBranch (Lucide) | Color: violet (#7c3aed)
   Title: Process Nodes
   Description: Workflows, decision rules, approval chains, escalation
   paths - how work actually flows.

3. Icon: Sparkles (Lucide) | Color: emerald (#059669)
   Title: Skill Nodes
   Description: Learned behaviors anchored to graph nodes. Taught by
   employees, learned from patterns, mined from records.

4. Icon: User (Lucide) | Color: rose (#e11d48)
   Title: People Nodes
   Description: Who teaches what, who owns what, who resolves conflicts.
   Role, department, RBAC level.

5. Icon: Building2 (Lucide) | Color: fuchsia (#d946ef)
   Title: Department Nodes
   Description: Org hierarchy for skill priority and conflict resolution.
   CEO overrides dept, dept overrides individual.
```

**Styling:** Each card is compact (not full card - more like a pill/badge with icon + title + 1-line description). Use the specified color as left-border accent. Flat solid colors, no gradients.

**Update the interactive graph component**  - see CHANGE 2G below for interactive-graph.md updates.

**Update the three scenario cards below the graph:**

The current cards show entity-only reasoning (supplier disruption, plant disruption, regulatory change). Update them to show skills firing during graph traversal.

**CARD 1 - Supplier Disruption (updated)**
```
Icon: AlertTriangle (Lucide)
Trigger: "Supplier X filed for bankruptcy"
What the Context Graph does:
Entity traversal: Raw materials from Supplier X -> products affected -> plants impacted -> customer orders at risk
Skill fires: "Backup Supplier Rule" (learned from 47 past procurement tickets) recommends switching to Supplier Y. 89% historical success rate.
Conflict check: Procurement lead's "lowest cost" skill conflicts with "fastest switch" skill. System escalates to VP Operations (department priority) for resolution.
People notified: Supply chain VP gets Slack alert with full impact map and recommended action.
```

**CARD 2 - Plant Disruption (updated)**
```
Icon: Factory (Lucide)
Trigger: "Tornado shuts down the Memphis plant"
What the Context Graph does:
Entity traversal: Products made at Memphis -> downstream inventory -> customer orders and SLA exposure
Skill fires: "Memphis Weather Protocol" (taught by plant manager) activates - halt outdoor operations, reroute qualified products to Dallas plant, route finished goods through Atlanta DC.
Process node: "EHS Incident Response" triggers safety checklist. Plant manager must approve restart.
Knowledge retained: Plant manager's weather protocol fires even if they are on vacation - the skill lives on the graph, not in their head.
```

**CARD 3 - Regulatory Change (updated)**
```
Icon: Scale (Lucide)
Trigger: "New FDA regulation on Ingredient Y in 90 days"
What the Context Graph does:
Entity traversal: Products containing Ingredient Y -> reformulation paths -> compliant alternative suppliers -> cost impact
Skill fires: "Regulatory Response Playbook" (learned from 3 past FDA changes via record ingestion) recommends starting reformulation 60 days before deadline based on historical R&D timelines.
People routed: R&D director (responsible for formulations) and regulatory affairs lead (responsible for compliance) both get structured action items based on their graph responsibilities.
Result: Not just "what is affected" but "what to do, in what order, based on what worked before."
```

---

### CHANGE 2D: Add NEW Section  - "How Knowledge Gets Captured" (Section 4, between Context Graph and How It Works)

**File:** homepage.md
**What:** Insert a NEW section after Section 3 (Context Graph) and before the current Section 4 (How It Works). All subsequent sections shift down by one.

This section is the core differentiator. It communicates the four capture modes and positions Genzoic as a superset of passive-mining-only competitors.

**Background:** `bg-slate-50 dark:bg-slate-900/50` (alternating)

**Layout:** Max-width 5xl. Heading centered, then 4-column card grid (2x2 on tablet, stacked on mobile).

```
Section label (small, brand-primary): THE DIFFERENTIATOR

Heading (H2):
Four ways your AI gets smarter

Subtext:
Other platforms mine your records. We do that too - plus three more ways to
capture the knowledge that records never contain. All four modes produce
structured skills anchored to the Context Graph.

CARD 1
Icon: GraduationCap (Lucide) | Accent color: emerald (#10b981)
Badge: "Mode 1"
Title: Employees teach it
Description: An employee says "I want to teach you something" and walks
through a workflow. The assistant asks clarifying questions, confirms
the logic, and creates a structured skill anchored to the right graph nodes.
The highest quality knowledge capture - intentional, explicit, complete.

CARD 2
Icon: MessageSquare (Lucide) | Accent color: blue (#3b82f6)
Badge: "Mode 2"
Title: It learns from corrections
Description: During normal work, employees correct the assistant. "No, we
stopped using that supplier - quality issues in 2023." That correction
becomes a skill on the supplier node. Natural, no extra effort required.

CARD 3
Icon: Eye (Lucide) | Accent color: violet (#8b5cf6)
Badge: "Mode 3"
Title: It observes and asks
Description: The assistant sits in Slack channels, CC'd on emails. When it
detects a pattern, it asks: "I noticed you always transfer excess dairy from
Store 7 to Store 9. Is there a reason?" Employee validates, it becomes a skill.

CARD 4
Icon: FileStack (Lucide) | Accent color: orange (#f97316)
Badge: "Mode 4"
Title: It mines your records
Description: Ingest historical emails, tickets, case files. Extract patterns
at scale. "Based on 500 resolved tickets, when a supplier is late by 3+ days,
78% of the time the team switches to the backup." Works at volume in
ticket-rich environments.

Bottom line (muted text, centered):
Competitors do Mode 4 only. We do all four. In industries where critical
knowledge never touches a digital system - manufacturing, construction,
field ops - Modes 1-3 are the only way to capture it.
```

**Styling notes:**
- Each card should have the mode number as a small badge in the accent color (top-left of card).
- Left-border accent matches the mode color.
- The bottom line is the competitive positioning statement. It should be visible but not aggressive - factual, not salesy.
- NO GRADIENTS. Flat solid colors only.

**Section order after this change:**
1. Hero
2. The Problem
3. The Context Graph in Action (with 5 node types and updated scenarios)
4. **How Knowledge Gets Captured (NEW)**
5. How It Works (id: how-it-works)
6. The Platform (id: platform)  - UPDATED, see Change 2E
7. Implementation Partnership
8. Industry Solutions
9. Final CTA

---

### CHANGE 2E: Update Section 6 (The Platform)  - Reframe Around Skills-on-Graph

**File:** homepage.md, currently Section 5 (becomes Section 6 after 2D)
**What:** The current "Platform" section treats assistants as the headline and skills as one feature among five. Reframe: the platform IS skills-on-graph, and assistants are the delivery mechanism.

**Replace heading and subtext:**

**Current:**
```
Heading (H2): AI assistants powered by the Context Graph
Subtext: Every employee gets an AI assistant that understands the business,
learns from their workflows, and retains knowledge even when people move on.
```

**Replace with:**
```
Section label (small, brand-primary): PLATFORM CAPABILITIES

Heading (H2): Skills that compound. Knowledge that stays.

Subtext: Skills are not stored in flat files - they are anchored to the
Context Graph. When something happens at a node, graph traversal finds
the relevant skills automatically. The business topology is the routing layer.
```

**Replace the 5 feature cards with 6 updated cards:**

```
CARD 1
Icon: Network (Lucide)
Title: Skills anchored to the graph
Description: Each skill is tied to specific entity and process nodes.
500 skills across 50 employees? The graph scopes to only the 8 relevant
ones when an event fires. No keyword matching.

CARD 2
Icon: Mail (Lucide)
Title: One assistant per employee
Description: Each assistant has its own email, lives in Slack and Teams,
mirrors the employee's access controls. Works where your people already work.

CARD 3
Icon: Crown (Lucide)
Title: Org-aware conflict resolution
Description: CEO-level skills override department-level, which override
individual-level. The org hierarchy in the graph provides the mechanism.
Conflicts surface to the right decision-maker automatically.

CARD 4
Icon: Shield (Lucide)
Title: Enterprise controls
Description: Role-based access. Full audit trail on every skill invocation.
Model-agnostic - works with Claude, GPT, Gemini. Your data, your environment.

CARD 5
Icon: UserMinus (Lucide)
Title: Knowledge survives turnover
Description: When an employee leaves, every skill they created stays anchored
to the graph. The system generates a handover report: which skills, which
entities, who should review.

CARD 6
Icon: BarChart3 (Lucide)
Title: Skills get smarter over time
Description: Every invocation is tracked. Was the skill useful? Did the
employee override it? Invocation data feeds back into skill ranking.
Low-value skills decay. High-value skills get promoted.
```

**Styling:** Same grid pattern as before (responsive, 3-col desktop, 2-col tablet, 1-col mobile). Cards should be compact with 2-line max descriptions.

---

### CHANGE 2F: Update How It Works (Section 5, now Section 5)

**File:** homepage.md, Section 4 (becomes Section 5 after 2D)
**What:** Update Step 2 and Step 3 descriptions to reflect the broader graph (not just entity mapping).

**Step 2  - Replace description:**

**Current:**
```
We map the relationships your data alone cannot capture - products to suppliers,
plants to channels, formulations to ingredients. Your business logic, made
explicit and traversable.
```

**Replace with:**
```
We map your business structure (entities and relationships), encode your
workflows (process nodes), and begin capturing your team's knowledge as
skills anchored to the graph. Your business logic, made explicit and
traversable.
```

**Step 3  - Replace description:**

**Current:**
```
Your team gets AI assistants that trace impact across the graph, simulate
scenarios, and surface insights no dashboard can show - because they understand
how your business actually works.
```

**Replace with:**
```
Your team gets AI assistants that invoke skills through graph traversal,
trace impact across the business, and get smarter as employees teach them.
Knowledge compounds across the organization - and stays when people leave.
```

---

### CHANGE 2G: Update Interactive Graph Spec

**File:** interactive-graph.md
**What:** Add Process, Skill, People, and Department nodes to the interactive demo. Update the data model, add new node types and colors, and add a scenario that demonstrates skill invocation and conflict resolution.

**Update the GraphNode interface:**

**Current:**
```typescript
type: "Product" | "Ingredient" | "Supplier" | "Plant" | "Channel" | "Store";
```

**Replace with:**
```typescript
type: "Product" | "Ingredient" | "Supplier" | "Plant" | "Channel" | "Store"
    | "Process" | "Skill" | "People" | "Department";
priority?: "Executive" | "Department" | "Individual";  // For Skill nodes
creator?: string;   // node id of the People node who created this skill
mode?: "Active Teaching" | "Conversational Learning" | "Passive Observation" | "Record Ingestion";
```

**Update the GraphEdge interface  - add new relationship types:**

**Current:**
```typescript
relationship: "SUPPLIES" | "USED_IN" | "MANUFACTURED_AT" | "SOLD_THROUGH" | "AVAILABLE_AT";
```

**Replace with:**
```typescript
relationship: "SUPPLIES" | "USED_IN" | "MANUFACTURED_AT" | "SOLD_THROUGH" | "AVAILABLE_AT"
            | "TRIGGERS" | "ANCHORED_TO" | "CREATED_BY" | "BELONGS_TO" | "REPORTS_TO" | "RESPONSIBLE_FOR";
```

**Add new node types to the color table:**

| Type | Light Mode Color | Dark Mode Color | Shape |
|------|-----------------|-----------------|-------|
| Product | `#b45309` (amber-700) | `#f59e0b` (amber-400) | Box |
| Ingredient | `#15803d` (green-700) | `#4ade80` (green-400) | Circle |
| Supplier | `#c2410c` (orange-700) | `#fb923c` (orange-400) | Hexagon |
| Plant | `#1d4ed8` (blue-700) | `#60a5fa` (blue-400) | Square |
| Channel | `#7c3aed` (violet-700) | `#a78bfa` (violet-400) | Diamond |
| Store | `#be185d` (pink-700) | `#f472b6` (pink-400) | Triangle |
| Process | `#6d28d9` (violet-800) | `#a78bfa` (violet-400) | Octagon |
| Skill | `#047857` (emerald-700) | `#34d399` (emerald-400) | Pill/rounded-rect |
| People | `#be123c` (rose-700) | `#fb7185` (rose-400) | Circle with ring |
| Department | `#a21caf` (fuchsia-700) | `#e879f9` (fuchsia-400) | Rounded square |

**Add sample Process, Skill, People, and Department nodes to the FMCG demo:**

```
PROCESS NODES (3-4):
- "Supplier Switch Rule" (Decision Rule)
- "Wastage Protocol" (Workflow)
- "Restock Trigger" (Workflow)
- "Liquidation Workflow" (Workflow)

SKILL NODES (4-5):
- "Backup Supplier Playbook" - anchored to TrueHarvest Co. + Supplier Switch Rule
  Mode: Record Ingestion | Creator: Procurement Lead | Priority: Individual
- "Thursday Liquidation Timing" - anchored to Retail Stores + Liquidation Workflow
  Mode: Passive Observation | Creator: Ops Manager | Priority: Department
- "Whole Foods Restock Cadence" - anchored to Whole Foods + Restock Trigger
  Mode: Conversational Learning | Creator: Ops Manager | Priority: Department
- "Mango Season Demand Spike" - anchored to Mango Chutney + Mango Puree
  Mode: Active Teaching | Creator: CEO | Priority: Executive

PEOPLE NODES (3):
- CEO (Executive level)
- Ops Manager (Department level, reports to CEO)
- Procurement Lead (Individual level, reports to Ops Manager)

DEPARTMENT NODES (2):
- Leadership (contains CEO)
- Operations (contains Ops Manager, Procurement Lead)
```

**Add new edges for these nodes:**
- Process -> Entity edges (dashed): Supplier Switch Rule -> TrueHarvest Co., Wastage Protocol -> each Store, etc.
- Skill -> Entity/Process edges (dotted green): each skill anchored to its graph path
- Skill -> People edges (dotted rose): each skill linked to its creator
- People -> Department edges: membership
- Department -> Department edges: reporting hierarchy
- People -> Entity edges (dotted): responsibility links

**Add a 5th predefined question that demonstrates skill invocation:**

```
Question 5: Skill Invocation + Conflict Resolution
Question: "TrueHarvest Co. shipment is 3 days late. What happens?"
Reasoning steps:
1. TrueHarvest Co. flagged as 3 days late at supplier node
2. Graph traversal: TrueHarvest supplies Mango Puree, Apple Puree, Fresh Tomatoes
3. Products affected: Mango Chutney, Apple Cider Vinegar, Tomato Ketchup, Pesto Basilico
4. Supplier Switch Rule process node triggers
5. Skill fires: "Backup Supplier Playbook" (learned from 47 tickets, Individual priority) recommends switching to FreshFarm Co.
6. CEO's "Mango Season Demand Spike" skill (Executive priority) also fires on the Mango Puree path - it says to stockpile, not switch suppliers during peak season
7. Conflict detected: two skills on the same path disagree. System checks org hierarchy.
8. CEO skill (Executive priority) overrides Procurement Lead skill (Individual priority). Stockpile recommendation wins for Mango Puree. FreshFarm Co. switch proceeds for Apple Puree and Fresh Tomatoes only.
9. Ops Manager and Procurement Lead both notified with resolution and reasoning.
Highlight: TrueHarvest Co. + affected ingredients + products + Backup Supplier skill + Mango Season skill + People nodes + Department nodes
Answer: "TrueHarvest is 3 days late, affecting 3 ingredients and 4 products. The Backup Supplier Playbook recommends switching to FreshFarm Co., but the CEO's Mango Season skill overrides this for Mango Puree during peak season. The system applies the switch for Apple Puree and Fresh Tomatoes only, preserving Mango Puree supply continuity per executive directive. Both the Ops Manager and Procurement Lead receive the decision with full reasoning."
```

**Update the node legend** to show all 10 node types (or group into "Entity Types" and "Intelligence Types" for cleaner display).

**Suggested legend grouping:**
```
BUSINESS ENTITIES          INTELLIGENCE LAYER
Product                    Process
Ingredient                 Skill (with capture mode indicator)
Supplier                   People
Plant                      Department
Channel
Store
```

---

### CHANGE 2H: Update Site Meta Description

**File:** site-spec.md (or directly in HTML head)
**What:** Update the meta description to reflect the broader positioning.

**Current:**
```
Genzoic builds the Context Graph - a living map of how your business actually
runs, not just the data it generates - so AI can think like someone who
actually works there.
```

**Replace with:**
```
Genzoic builds the Context Graph - mapping your business structure, encoding
your workflows, and capturing institutional knowledge as skills - so AI can
think and act like someone who actually works there.
```

---

### Verification After All Changes

After implementing Changes 2A through 2H, verify:

1. **Section order** is correct (9 sections total, alternating backgrounds):
   1. Hero: bg-white / dark:bg-slate-950
   2. Problem: bg-slate-50 / dark:bg-slate-900/50
   3. Context Graph: bg-white / dark:bg-slate-950
   4. **How Knowledge Gets Captured (NEW): bg-slate-50 / dark:bg-slate-900/50**
   5. How It Works: bg-white / dark:bg-slate-950
   6. The Platform (updated): bg-slate-50 / dark:bg-slate-900/50
   7. Implementation Partnership: bg-white / dark:bg-slate-950
   8. Industry Solutions: bg-slate-50 / dark:bg-slate-900/50
   9. Final CTA: bg-white / dark:bg-slate-950

2. **Interactive graph** renders all 5 node types with correct colors and legend grouping
3. **Skill nodes** show capture mode color indicators and priority badges
4. **People and Department nodes** appear in the graph with connecting edges
5. **Question 5** (skill invocation + conflict resolution) works with proper highlighting
6. **Scenario cards** show skills firing, not just entity traversal
7. **Dark mode and light mode** both display correctly
8. **Mobile responsive** - 5 node-type cards scroll horizontally, capture mode cards stack to 2x2
9. **No gradients anywhere** - flat solid colors only

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
