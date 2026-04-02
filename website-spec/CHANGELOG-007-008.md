# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.
For changes 001-005, see `CHANGELOG-001-005.md`.
For change 006, see `CHANGELOG-006.md`.

---

## Change 007: Remove Redundant "Questions Your AI Can Answer" Section

**Date:** 2026-04-02
**Files affected:** `src/pages/SolutionDetail.tsx`, `src/data/solutions.ts`, spec files (`pages.md`, `solutions.md`)
**Priority:** MEDIUM - UX cleanup. Removes visual redundancy on solution detail pages.

### Context

Every solution detail page currently has two places showing sample questions:

1. **The interactive context graph** - renders clickable questions from the graph JSON file under an "ASK THE CONTEXT GRAPH" heading. When clicked, these animate the graph to highlight the reasoning path. This is the compelling, interactive version.

2. **"Questions your AI can answer" section** - renders static query cards from `solution.exampleQuestions` in `solutions.ts`. These are the same or very similar questions displayed as plain text cards below the graph.

The interactive graph already demonstrates what questions the AI can answer - and does it better by showing *how* the graph reasons about them. The static section below is redundant and dilutes the graph's impact. Remove it.

---

### CHANGE 7A: Remove Questions Section from SolutionDetail.tsx

**File:** `src/pages/SolutionDetail.tsx`

**What:** Delete the entire "Questions your AI can answer" section (the `{/* Questions */}` block).

**Remove this entire section:**

```tsx
      {/* Questions */}
      <section className="bg-white dark:bg-[#05080f] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
            AI Reasoning
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Questions your AI can answer
          </h2>
          <div className="grid gap-4">
            {solution.exampleQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/[0.07] rounded-xl p-6 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-blue-500" />
                <span className="text-4xl font-serif text-blue-500/20 dark:text-blue-400/20 leading-none select-none">&ldquo;</span>
                <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed -mt-4 pl-1">
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
```

**Page flow after removal:**
Hero -> Context Graph (with interactive questions) -> How It Works (Capabilities) -> Measurable Results (Business Impact) -> CTA

---

### CHANGE 7B: Remove exampleQuestions from Solution Interface and Data

**File:** `src/data/solutions.ts`

**What:** Remove the `exampleQuestions` field entirely.

1. **Remove from interface:** Delete the `exampleQuestions: string[];` line from the `Solution` interface.

2. **Remove from all 13 solution objects:** Delete the `exampleQuestions` array from every solution object. The questions are already preserved in the corresponding graph JSON files under each graph's `questions` array - no data is lost.

---

### CHANGE 7C: Update pages.md Spec (ALREADY DONE)

**File:** `website-spec/pages.md`

**Status:** Already applied. The "Questions Your AI Can Now Answer" section has been removed from the Solution Detail page spec.

---

### CHANGE 7D: Update solutions.md Spec

**File:** `website-spec/solutions.md`

**What:** Remove `exampleQuestions` from the Solution data model and from all 13 solution data entries. The field is no longer used.

1. Remove `exampleQuestions: string[]` from the Solution interface documentation.
2. Remove the `exampleQuestions` array from each of the 13 solution entries.

---

### Verification After All Changes (007)

After implementing Changes 7A through 7D, verify:

1. **No "Questions your AI can answer" section** appears on any solution detail page.
2. **Interactive graph still shows clickable questions** - these come from graph JSON files, not from solutions.ts, so they should be unaffected.
3. **No TypeScript errors** - `exampleQuestions` is fully removed from interface and all usages. Run `npm run build`.
4. **Page flow is tighter** - Hero -> Context Graph -> Capabilities -> Business Impact -> CTA. No redundant section.
5. **No references to `exampleQuestions` remain** in any `.ts` or `.tsx` file in `src/`.

---
---

## Change 008: Remove Weak Solutions, Merge Regulatory Into Supply Chain Risk

**Date:** 2026-04-02
**Files affected:** `src/data/solutions.ts`, `src/data/graphs/*.json` (4 files deleted, 1 updated), `website-spec/solutions.md`
**Priority:** HIGH - Content credibility. Fewer, stronger solutions > padded list.

### Context

Critical evaluation of all 13 solutions identified 4 that should be removed:

- **Solution 2 (Customer Feedback Intelligence)** - REMOVE. Sentiment analysis + product linking is commoditized (Medallia, Qualtrics, Sprinklr). The Context Graph adds marginal value here - it is a data integration problem, not a relationship reasoning problem.
- **Solution 4 (Promotion & Demand Planning)** - REMOVE. Overlaps heavily with Solution 1 (Inventory Optimization). Nearly identical business impact metrics. Promo planning space is dominated by Blue Yonder, o9, Anaplan.
- **Solution 7 (Regulatory & ESG Compliance Tracker)** - MERGE into Solution 5. In battery manufacturing, supply chain risk and regulatory compliance are the same problem. IRA, EU Battery Passport, and CBAM all depend on the same supplier-material-geography mapping that Solution 5 already covers.
- **Solution 13 (Asset Performance Management)** - REMOVE. Business impact metrics are identical to Solution 10 (Plant Maintenance) - same McKinsey/Deloitte numbers. The energy-specific layer is too thin to justify a standalone solution. Eliminates Energy & Utilities vertical, but a fake solution is worse than no solution.

**After this change: 9 solutions across 5 verticals.**

| Vertical | Solutions | Count |
|---|---|---|
| Retail & FMCG | Inventory Optimization, DSD Copilot | 2 |
| Battery Manufacturing | Supply Chain Risk & Compliance, Production & Yield | 2 |
| Chemical Manufacturing | Formulation & Recipe, Safety & Environmental, Plant Maintenance | 3 |
| Pharmaceutical | Drug Supply Chain Integrity | 1 |
| Food & Beverage | Allergen & Ingredient Compliance | 1 |

---

### CHANGE 8A: Remove 3 Solutions From solutions.ts

**File:** `src/data/solutions.ts`

**What:** Delete the following solution objects from the `solutionsData` array:

1. Solution with `slug: "customer-feedback-intelligence"` (id 2)
2. Solution with `slug: "promotion-demand-planning"` (id 4)
3. Solution with `slug: "asset-performance-management"` (id 13)

**Also:** Remove `"Energy & Utilities"` from the `industries` array since no solutions remain in that vertical.

**Also:** Renumber the remaining solution `id` fields sequentially (1 through 9) so there are no gaps. The new id mapping:

| Old ID | Solution | New ID |
|--------|----------|--------|
| 1 | Inventory Optimization & Expiry Prevention | 1 |
| 3 | DSD Copilot for Field Operations | 2 |
| 5 | Supply Chain Risk & Compliance (merged) | 3 |
| 6 | Production Planning & Yield Optimization | 4 |
| 8 | Formulation & Recipe Management | 5 |
| 9 | Safety & Environmental Compliance | 6 |
| 10 | Plant Maintenance & Reliability | 7 |
| 11 | Drug Supply Chain Integrity | 8 |
| 12 | Allergen & Ingredient Compliance | 9 |

---

### CHANGE 8B: Merge Solution 7 Into Solution 5 (Supply Chain Risk Monitor)

**File:** `src/data/solutions.ts`

**What:** Expand Solution 5 to absorb Solution 7's regulatory/compliance scope. Replace the current Solution 5 object with this merged version:

```typescript
{
  id: 3,
  name: "Supply Chain Risk & Compliance",
  slug: "supply-chain-risk-monitor",
  industry: "Battery Manufacturing",
  tagline: "Map material dependencies, monitor supplier risk, track IRA and EU Battery Passport compliance",
  icon: "AlertTriangle",
  image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop&auto=format",
  description: "Battery manufacturing depends on critical raw materials sourced from geopolitically sensitive regions through complex multi-tier supply chains - and faces a rapidly evolving regulatory landscape including IRA domestic content requirements, EU Battery Passport, and CBAM. The Context Graph maps every material to its suppliers, geographic origins, downstream products, and applicable regulations, enabling AI to simulate disruption scenarios, identify compliance gaps, and recommend mitigation strategies before problems materialize.",
  contextGraphExample: "Raw materials (lithium, cobalt, nickel) -> tier-1 and tier-2 suppliers -> geographic origins -> refining facilities -> cell chemistries -> battery product lines -> customer contracts -> compliance requirements (IRA, EU Battery Passport, CBAM). Intelligence layer adds: Supplier Disruption Response Protocols, IRA Content Calculations, EU Battery Passport Data Mapping, learned disruption playbooks and sanctions check skills from supply chain leadership and compliance directors.",
  keyCapabilities: {
    connects: [
      "Raw materials through multi-tier suppliers to geographic origins, product lines, and regulatory requirements",
      "IRA domestic content, EU Battery Passport, and CBAM thresholds to specific material sourcing configurations"
    ],
    analyzes: [
      "Single-source dependencies and geopolitical exposure by material",
      "Per-product compliance gap size for each active regulation with cost of remediation"
    ],
    recommends: [
      "Disruption response playbooks with qualified alternative suppliers and sanctions checks",
      "Proactive supply chain restructuring before regulation deadlines with cost-effectiveness ranking"
    ],
  },
  businessImpact: [
    {
      metric: "60%",
      label: "Of disruptions resolved autonomously by 2031",
      context: "AI-enabled supply chains moving toward autonomous disruption resolution (Gartner, March 2026)"
    },
    {
      metric: "30-40%",
      label: "Lower compliance preparation costs",
      context: "AI-driven compliance automation benchmark (Deloitte, 2024)"
    },
    {
      metric: "75% to 95%+",
      label: "Compliance coverage improvement",
      context: "Automated RegTech solutions raised compliance from 75% to 95%+ in regulated industries (Deloitte)"
    },
  ],
  graphFile: "supply-chain-risk-monitor",
},
```

---

### CHANGE 8C: Update Supply Chain Risk Graph JSON

**File:** `src/data/graphs/supply-chain-risk-monitor.json`

**What:** Add regulatory/compliance nodes from the old regulatory-esg-compliance graph to the supply chain risk graph. This enriches the graph with the compliance dimension without replacing the existing supply chain content.

**Add these nodes** to the existing `nodes` array:

```json
{ "id": "reg-ira", "label": "IRA Domestic Content", "type": "channel", "description": "Inflation Reduction Act domestic content requirements for battery manufacturing tax credits" },
{ "id": "reg-eu-passport", "label": "EU Battery Passport", "type": "channel", "description": "EU regulation requiring digital product passport with full supply chain traceability" },
{ "id": "reg-cbam", "label": "CBAM", "type": "channel", "description": "Carbon Border Adjustment Mechanism - embedded emissions reporting for imported materials" },
{ "id": "proc-compliance-gap", "label": "Compliance Gap Remediation", "type": "Process", "description": "When a regulation changes, scan all product lines for new gaps and generate remediation plans with cost estimates." },
{ "id": "proc-reg-change", "label": "Regulation Change Assessment", "type": "Process", "description": "When a new regulation or amendment is published, map it to affected products, materials, and suppliers." },
{ "id": "skill-ira-calc", "label": "IRA Content Calculation Shortcut", "type": "Skill", "description": "Learned from correction: The IRA domestic content calculation uses the manufacturing cost method, not the weight method. Weight method overestimates compliance by 10-15%.", "mode": "Conversational Learning", "creator": "people-compliance-dir", "priority": "Department" },
{ "id": "skill-battery-passport", "label": "EU Battery Passport Data Mapping", "type": "Skill", "description": "Taught by Compliance Director: For the EU Battery Passport, carbon footprint data must be traced back to smelter level, not just refiner. Most teams miss this.", "mode": "Active Teaching", "creator": "people-compliance-dir", "priority": "Department" },
{ "id": "people-compliance-dir", "label": "Compliance Director", "type": "People", "description": "Department level. Manages regulatory compliance, audit preparation, and reporting across all battery product lines." },
{ "id": "dept-compliance", "label": "Legal & Compliance", "type": "Department", "description": "Manages regulatory compliance, legal affairs, and audit preparation." }
```

**Add these edges** to the existing `edges` array:

```json
{ "source": "prod-01", "target": "reg-ira", "relationship": "SUBJECT_TO" },
{ "source": "prod-02", "target": "reg-ira", "relationship": "SUBJECT_TO" },
{ "source": "prod-01", "target": "reg-eu-passport", "relationship": "SUBJECT_TO" },
{ "source": "prod-02", "target": "reg-eu-passport", "relationship": "SUBJECT_TO" },
{ "source": "sup-01", "target": "reg-cbam", "relationship": "SUBJECT_TO" },
{ "source": "sup-02", "target": "reg-cbam", "relationship": "SUBJECT_TO" },
{ "source": "sup-03", "target": "reg-cbam", "relationship": "SUBJECT_TO" },
{ "source": "sup-04", "target": "reg-cbam", "relationship": "SUBJECT_TO" },
{ "source": "proc-reg-change", "target": "reg-ira", "relationship": "MONITORS" },
{ "source": "proc-reg-change", "target": "reg-eu-passport", "relationship": "MONITORS" },
{ "source": "proc-reg-change", "target": "reg-cbam", "relationship": "MONITORS" },
{ "source": "proc-compliance-gap", "target": "prod-01", "relationship": "TRIGGERS" },
{ "source": "proc-compliance-gap", "target": "prod-02", "relationship": "TRIGGERS" },
{ "source": "skill-ira-calc", "target": "reg-ira", "relationship": "ANCHORED_TO" },
{ "source": "skill-ira-calc", "target": "proc-compliance-gap", "relationship": "ANCHORED_TO" },
{ "source": "skill-battery-passport", "target": "reg-eu-passport", "relationship": "ANCHORED_TO" },
{ "source": "skill-battery-passport", "target": "sup-01", "relationship": "ANCHORED_TO" },
{ "source": "skill-ira-calc", "target": "people-compliance-dir", "relationship": "CREATED_BY" },
{ "source": "skill-battery-passport", "target": "people-compliance-dir", "relationship": "CREATED_BY" },
{ "source": "people-compliance-dir", "target": "dept-compliance", "relationship": "BELONGS_TO" },
{ "source": "dept-compliance", "target": "dept-risk-mgmt", "relationship": "REPORTS_TO" },
{ "source": "people-compliance-dir", "target": "reg-ira", "relationship": "RESPONSIBLE_FOR" },
{ "source": "people-compliance-dir", "target": "reg-eu-passport", "relationship": "RESPONSIBLE_FOR" }
```

**Add this question** to the existing `questions` array (as the 5th question):

```json
{
  "id": "q-ira-compliance-check",
  "question": "IRA domestic content threshold increases to 80% next year. Which product lines are at risk?",
  "answer": "Using the manufacturing cost method (not weight - common error that overestimates by 10-15%), EV Battery Pack 75kWh is at risk due to DRC cobalt and Chinese graphite sourcing. Grid Storage Module has the same exposure. The Cathode Precursor Plant in Finland helps (low-carbon energy), but upstream material origins from Chile, DRC, China, and Indonesia pull domestic content below 80%. Compliance Director gets remediation plan with cost estimates for each sourcing restructuring scenario.",
  "highlightNodes": ["prod-01", "prod-02", "reg-ira", "sup-01", "sup-02", "sup-03", "sup-04", "plant-03", "proc-compliance-gap", "proc-reg-change", "skill-ira-calc", "skill-battery-passport", "people-compliance-dir"],
  "highlightEdges": ["prod-01->reg-ira", "prod-02->reg-ira", "proc-reg-change->reg-ira", "proc-compliance-gap->prod-01", "proc-compliance-gap->prod-02", "skill-ira-calc->reg-ira", "skill-ira-calc->proc-compliance-gap", "sup-01->ing-01", "sup-02->ing-02", "sup-03->ing-03", "sup-04->ing-04", "skill-ira-calc->people-compliance-dir"],
  "reasoningSteps": [
    "Regulation Change Assessment triggers: IRA domestic content threshold updated to 80%.",
    "Entity traversal: All product lines -> material origins -> supplier geographic locations.",
    "Skill fires: \"IRA Content Calculation Shortcut\" (Department priority) - use manufacturing cost method, not weight. Recalculates both products.",
    "Compliance Gap Remediation triggers: Both EV Battery Pack and Grid Storage Module fall below 80% due to imported material sourcing.",
    "Skill fires: \"EU Battery Passport Data Mapping\" cross-checks smelter-level origin data for traceability.",
    "People routed: Compliance Director gets gap remediation plan with cost-ranked restructuring scenarios."
  ]
}
```

---

### CHANGE 8D: Delete Removed Solution Graph Files

**What:** Delete these 4 graph JSON files from `src/data/graphs/`:

1. `customer-feedback-intelligence.json`
2. `promotion-demand-planning.json`
3. `regulatory-esg-compliance.json`
4. `asset-performance-management.json`

These files are no longer referenced by any solution.

---

### CHANGE 8E: Update solutions.md Spec

**File:** `website-spec/solutions.md`

**What:** Update the spec to reflect the new 9-solution, 5-vertical structure.

1. **Remove "Energy & Utilities" from the Industries list** (line ~34).
2. **Delete the spec entries for:** Solution 2 (Customer Feedback Intelligence), Solution 4 (Promotion & Demand Planning), Solution 7 (Regulatory & ESG Compliance Tracker), Solution 13 (Asset Performance Management).
3. **Update Solution 5's spec entry** to match the merged version from Change 8B (new name, tagline, description, capabilities, business impact).
4. **Renumber all remaining solutions** 1 through 9.
5. **Update the Solution interface** if it still has the old `keyCapabilities: string[]` and `businessImpact: string[]` types - these should reflect the current interfaces from solutions.ts (KeyCapabilities object, BusinessImpactItem array).

---

### CHANGE 8F: Update Homepage Graph Reference (if needed)

**File:** `src/data/fmcg-context-graph.json` and any homepage components

**What:** Check that the homepage interactive graph does not reference any removed solutions. The homepage graph (`fmcg-context-graph.json`) is its own file and should be unaffected, but verify no homepage component references `customer-feedback-intelligence`, `promotion-demand-planning`, or `asset-performance-management` by slug or name.

---

### Verification After All Changes (008)

After implementing Changes 8A through 8F, verify:

1. **`solutionsData` array has exactly 9 objects** with sequential IDs 1-9.
2. **`industries` array has exactly 5 entries** (no "Energy & Utilities").
3. **Solution 3 (old 5)** has the merged name "Supply Chain Risk & Compliance" with regulatory capabilities and business impact.
4. **No references** to removed slugs (`customer-feedback-intelligence`, `promotion-demand-planning`, `regulatory-esg-compliance`, `asset-performance-management`) exist in any `.ts`, `.tsx`, or `.json` file.
5. **4 graph JSON files deleted** and no import errors from `import.meta.glob`.
6. **Supply chain risk graph** has regulatory nodes, edges, and the new compliance question.
7. **TypeScript compiles** - run `npm run build`.
8. **All 9 solution detail pages load** - navigate to each `/solutions/:slug` and verify graph + content render.
9. **Solutions listing page** shows 9 cards across 5 industry filter tabs (no "Energy & Utilities" tab).
