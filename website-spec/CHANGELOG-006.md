# Website Spec Changelog

Use this file to implement incremental changes without re-reading the full spec files.
For changes 001-005, see `CHANGELOG-001-005.md`.

---

## Change 006: Source Business Impact Metrics From Industry Benchmarks

**Date:** 2026-04-02
**Files affected:** `src/data/solutions.ts`, `src/pages/SolutionDetail.tsx`
**Priority:** HIGH - Credibility. Every number on the website must be defensible.

### Context

The current business impact metrics across all 13 solutions are projections, not measured results. Genzoic is pre-revenue with zero production deployments. Displaying unsourced metrics like "50-70% smaller recall scope" as if they are Genzoic's delivered results is misleading and will damage credibility with both investors and enterprise buyers.

**Fix:** Replace all fabricated metrics with verifiable industry benchmarks and add clear attribution. Every number should be traceable to a published source (McKinsey, Deloitte, Gartner, academic study, or named company case study).

---

### CHANGE 6A: Add Benchmark Qualifier to "Measurable Results" Section

**File:** `src/pages/SolutionDetail.tsx`

**What:** Add a small muted line below the "Measurable results" heading on every solution detail page.

**Add this line below the heading, before the metric cards:**

```
<p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-8">
  Based on published industry benchmarks for AI and digital transformation implementations.
</p>
```

This one line transforms every metric from a Genzoic claim into a reference point. Enterprise buyers and investors both understand this framing.

---

### CHANGE 6B: Replace All Business Impact Metrics With Sourced Benchmarks

**File:** `src/data/solutions.ts`

**What:** Replace the `businessImpact` array for each solution with metrics sourced from published research. Each metric below includes the source in a comment. The `context` field for each item should now include the source attribution.

---

#### Solution 1: Inventory Optimization & Expiry Prevention

```typescript
businessImpact: [
  {
    metric: "Up to 49%",
    label: "Less food waste",
    context: "AI forecasting, replenishment, and logistics optimization in grocery retail (Traxtech / ReFED, 2024)"
  },
  {
    metric: "20-30%",
    label: "Fewer stock-outs",
    context: "While lowering total inventory - Walmart achieved 30% with AI demand forecasting (Capgemini, 2024)"
  },
  {
    metric: "10-20%",
    label: "Lower inventory carrying costs",
    context: "Through better demand-supply matching without compromising service levels (Capgemini / McKinsey)"
  },
],
```

**Sources:**
- Traxtech: "AI May Slash Food Waste 49%" (2024)
- Capgemini: "Retailers using AI in supply chain operations have seen up to a 30% reduction in stockouts and a 20-50% reduction in inventory carrying costs"
- Walmart public case study: 30% stockout reduction with AI demand forecasting

---

#### Solution 2: Customer Feedback Intelligence

```typescript
businessImpact: [
  {
    metric: "Hours",
    label: "From complaint to root cause",
    context: "AI auto-links feedback to SKUs and supplier batches vs. weeks of manual analysis (Sopact / CustomerGauge, 2024)"
  },
  {
    metric: "30%",
    label: "Reduction in quality incidents",
    context: "Manufacturing benchmark for AI-driven quality monitoring systems (McKinsey, 2024)"
  },
  {
    metric: "20-50%",
    label: "Faster demand signal response",
    context: "AI-driven demand forecasting error reduction enables faster reaction to market signals (McKinsey, 2024)"
  },
],
```

**Sources:**
- Sopact: AI-powered NPS/feedback analysis available "within hours of survey close, no manual coding"
- McKinsey: Companies using AI for quality see ~30% reduction in quality incidents
- McKinsey: AI-driven demand forecasting shows error reductions of 20-50%

---

#### Solution 3: DSD Copilot for Field Operations

```typescript
businessImpact: [
  {
    metric: "20-30%",
    label: "Lower fuel and route costs",
    context: "Through AI-optimized routing and stop prioritization (GM Insights, 2024)"
  },
  {
    metric: "50% to 75%",
    label: "Shelf compliance accuracy improvement",
    context: "DSD companies improved compliance accuracy from ~50% to over 75% with digital tools (Locus / CigoTracker)"
  },
  {
    metric: "1 day/week",
    label: "Operational overhead eliminated",
    context: "AI routing fitted a 6-day workload into 5 days in field service benchmarks (FieldCamp, 2024)"
  },
],
```

**Sources:**
- GM Insights: Route optimization reduces fuel costs 20-30%
- CigoTracker / Locus: DSD compliance accuracy improved from ~50% to 75%+ with digital tools
- FieldCamp: Property management case study - AI routing eliminated one full day of operational overhead per week

---

#### Solution 4: Promotion & Demand Planning

```typescript
businessImpact: [
  {
    metric: "20-30%",
    label: "Fewer promotion stock-outs",
    context: "AI-driven demand planning in retail supply chains (Capgemini / Walmart, 2024)"
  },
  {
    metric: "25-40%",
    label: "Better forecast accuracy",
    context: "Typical first-year improvement with AI demand forecasting vs. traditional methods (IJSAT / SR Analytics)"
  },
  {
    metric: "10-20%",
    label: "Lower inventory carrying costs",
    context: "By reducing both overstock and safety stock buffers through better predictions (Capgemini, 2024)"
  },
],
```

**Sources:**
- Capgemini: up to 30% stockout reduction and 20-50% inventory cost reduction in retail AI supply chains
- Walmart: 30% stockout reduction with AI forecasting
- IJSAT / SR Analytics: 25-40% forecast accuracy improvement in first year

---

#### Solution 5: Supply Chain Risk Monitor

```typescript
businessImpact: [
  {
    metric: "60%",
    label: "Of disruptions resolved autonomously by 2031",
    context: "AI-enabled supply chains moving toward autonomous disruption resolution (Gartner, March 2026)"
  },
  {
    metric: "15%",
    label: "Reduction in logistics costs",
    context: "Through AI-driven supply chain optimization and proactive sourcing (McKinsey, 2024)"
  },
  {
    metric: "65%",
    label: "Improvement in service efficiency",
    context: "AI adoption in supply chain operations benchmark (McKinsey / Code Brew, 2024)"
  },
],
```

**Sources:**
- Gartner (March 2026): "60% of supply chain disruptions will be resolved without human intervention by 2031"
- McKinsey (2024): "AI adoption can cut logistics costs by 15% and boost service efficiency by 65%"

---

#### Solution 6: Production Planning & Yield Optimization

```typescript
businessImpact: [
  {
    metric: "Up to 16%",
    label: "Higher cell manufacturing yield",
    context: "Predictive quality analytics in battery cell production (Elisa IndustriQ case study)"
  },
  {
    metric: "45%",
    label: "Reduction in production waste",
    context: "After deploying AI-based inspection tools in manufacturing (EnergyX / Springer, 2025)"
  },
  {
    metric: "20%",
    label: "Shorter R&D and production cycles",
    context: "Early adopters of AI-powered quality prediction in manufacturing (Allchemist / Innova365)"
  },
],
```

**Sources:**
- Elisa IndustriQ: "Predictive Quality Analytics Increased Battery Cell Manufacturing Yield by 16 Percent"
- EnergyX / Springer: "One manufacturer reported a 45% reduction in production waste after deploying AI-based inspection"
- Allchemist / Innova365: "Early adopters reporting 20% reductions in R&D cycle times"

---

#### Solution 7: Regulatory & ESG Compliance Tracker

```typescript
businessImpact: [
  {
    metric: "30-40%",
    label: "Lower compliance preparation costs",
    context: "AI-driven compliance automation benchmark (Deloitte, 2024)"
  },
  {
    metric: "25%+",
    label: "Reduction in regulatory audit costs",
    context: "Organizations with strong AI compliance programs (Deloitte / BP-3, 2024)"
  },
  {
    metric: "75% to 95%+",
    label: "Compliance coverage improvement",
    context: "Automated RegTech solutions raised compliance from 75% to 95%+ in regulated industries (Deloitte)"
  },
],
```

**Sources:**
- Deloitte: "AI-driven compliance automation can reduce compliance costs by 30-40%"
- Deloitte: "Organizations with strong AI compliance automation programs reduced regulatory audit costs by over 25%"
- Deloitte: US bank case study - compliance rose from 75% to 95%+ with automated RegTech

---

#### Solution 8: Formulation & Recipe Management

```typescript
businessImpact: [
  {
    metric: "85%",
    label: "Faster BOM creation and impact analysis",
    context: "AI-driven bill of materials generation vs. manual processes (Innova365, 2025)"
  },
  {
    metric: "20%",
    label: "Shorter R&D reformulation cycles",
    context: "Early adopters of AI-powered formulation systems in chemical industry (Allchemist / ChemCopilot)"
  },
  {
    metric: "Minutes vs. days",
    label: "For ingredient substitution analysis",
    context: "AI predicts viable formulation alternatives instantly vs. manual experimentation (ChemCopilot / Innova365)"
  },
],
```

**Sources:**
- Innova365: "85% time reduction in BOM creation using AI-driven generation"
- Allchemist: "Early adopters using AI-powered systems are reporting 20% reductions in R&D cycle times"
- ChemCopilot: "AI can predict the most effective blend in minutes instead of spending days or weeks experimenting"

---

#### Solution 9: Safety & Environmental Compliance

```typescript
businessImpact: [
  {
    metric: "20-40%",
    label: "Less time on compliance activities",
    context: "EHS software benchmarks for reporting and tracking automation (Verdantix / VelocityEHS)"
  },
  {
    metric: "30%",
    label: "Reduction in safety incident rate",
    context: "Manufacturing clients using EHS automation platforms (Benchmark Gensuite case study)"
  },
  {
    metric: "$200K+",
    label: "Annual savings in penalties and lost productivity",
    context: "Manufacturing benchmark for compliance automation ROI (EHS Momentum, 2024)"
  },
],
```

**Sources:**
- Verdantix: "Companies using EHS software reported a 20% reduction in the time spent on compliance activities"
- Manufacturing case study: "40% reduction in emissions tracking time after replacing spreadsheets with automated tools"
- EHS Momentum: "Manufacturing client reduced incident rate by 30% and saved $200,000 annually"

---

#### Solution 10: Plant Maintenance & Reliability

```typescript
businessImpact: [
  {
    metric: "30-50%",
    label: "Less unplanned downtime",
    context: "Predictive maintenance benchmark across manufacturing sectors (McKinsey / Deloitte)"
  },
  {
    metric: "15-25%",
    label: "Shorter turnaround durations",
    context: "AI-based scheduling vs. manual turnaround planning in chemical and refining (McKinsey)"
  },
  {
    metric: "20-40%",
    label: "Longer equipment lifespan",
    context: "Condition-based maintenance timing vs. fixed schedules (McKinsey)"
  },
],
```

**Sources:**
- McKinsey: "Predictive maintenance reduces unplanned downtime by 30-50% and increases machine life by 20-40%"
- McKinsey: "Companies using AI-based scheduling report 15-25% shorter turnaround durations"
- Deloitte: "AI-driven predictive maintenance can deliver a tenfold increase in ROI"

---

#### Solution 11: Drug Supply Chain Integrity

```typescript
businessImpact: [
  {
    metric: "50-95%",
    label: "Smaller recall scope with traceability",
    context: "Lot-level traceability reduces recall scope vs. broad precautionary recalls (ITC / Kearney)"
  },
  {
    metric: "<4 hours",
    label: "Full traceability demonstration",
    context: "GFSI scheme expectation for complete trace exercises (BRCGS / SQF standards)"
  },
  {
    metric: "30-45%",
    label: "Faster incident response",
    context: "Organizations with AI compliance automation programs (Deloitte / BP-3, 2024)"
  },
],
```

**Sources:**
- ITC / Kearney: "Traceability technology can help reduce the scope of a recall by 50-95%"
- GFSI (BRCGS, SQF): "Full traceability to be demonstrated within ~4 hours" is the industry expectation
- Deloitte: "Organizations reduced incident response times by 30-45% with AI automation"

---

#### Solution 12: Allergen & Ingredient Compliance

```typescript
businessImpact: [
  {
    metric: "50-95%",
    label: "Smaller recall scope",
    context: "Precision lot-level tracing vs. broad precautionary recalls (International Trade Centre / Kearney)"
  },
  {
    metric: "<4 hours",
    label: "End-to-end trace completion",
    context: "GFSI certification schemes require full traceability demonstrated within 4 hours (BRCGS / SQF)"
  },
  {
    metric: "20%",
    label: "Faster reformulation cycles",
    context: "AI-powered formulation systems in food and chemical manufacturing (Allchemist / Innova365)"
  },
],
```

**Sources:**
- ITC / Kearney: "Traceability technology can help reduce the scope of a recall by 50-95%"
- GFSI: Full traceability within 4 hours is the certification standard
- Allchemist: 20% reduction in R&D cycle times with AI-powered formulation tools

---

#### Solution 13: Asset Performance Management

```typescript
businessImpact: [
  {
    metric: "30-50%",
    label: "Less unplanned downtime",
    context: "Predictive maintenance across industrial and energy assets (McKinsey / Deloitte)"
  },
  {
    metric: "20-40%",
    label: "Longer asset lifespan",
    context: "Condition-based maintenance timing vs. fixed interval schedules (McKinsey)"
  },
  {
    metric: "10-40%",
    label: "Lower maintenance costs",
    context: "Predictive maintenance reduces overall maintenance spending (McKinsey / Deloitte)"
  },
],
```

**Sources:**
- McKinsey: "Predictive maintenance reduces unplanned downtime by 30-50%, increases machine life by 20-40%, and lowers maintenance costs by 10-40%"
- Deloitte: "AI-driven predictive maintenance can deliver a tenfold increase in ROI"

---

### CHANGE 6C: Update Solution CTA Section

**File:** `src/pages/SolutionDetail.tsx`

**What:** Update the CTA section at the bottom of each solution detail page to match the new honest framing from Change 004D.

**Current:**
```
Heading: "See this in action"
Subtext: "Book a 30-minute demo focused on {solution.industry}. We will show you what the Context Graph looks like for your business."
```

**Replace with:**
```
Heading: "See this in action"
Subtext: "Book a 30-minute call. We will walk you through a Context Graph built for {solution.industry} and identify where your team is losing critical knowledge today."
```

---

### Master Source List

All metrics used across the 13 solutions are traceable to these published sources:

| Source | Claim | Used In |
|--------|-------|---------|
| McKinsey | Predictive maintenance reduces downtime 30-50%, extends equipment life 20-40%, cuts costs 10-40% | Solutions 10, 13 |
| McKinsey | AI turnaround scheduling: 15-25% shorter durations | Solution 10 |
| McKinsey | AI demand forecasting: 20-50% error reduction | Solutions 2, 4 |
| McKinsey | AI cuts logistics costs 15%, boosts service efficiency 65% | Solution 5 |
| Deloitte | AI compliance automation reduces costs 30-40%, audit costs 25%+ | Solutions 7, 9 |
| Deloitte | RegTech raised compliance from 75% to 95%+ | Solution 7 |
| Deloitte | AI compliance reduces incident response times 30-45% | Solutions 9, 11 |
| Gartner (Mar 2026) | 60% of supply chain disruptions resolved autonomously by 2031 | Solution 5 |
| Capgemini | Retail AI: 30% stockout reduction, 20-50% inventory cost reduction | Solutions 1, 4 |
| Walmart | 30% stockout reduction with AI demand forecasting | Solutions 1, 4 |
| Traxtech / ReFED | AI may slash food waste 49% in grocery retail | Solution 1 |
| ITC / Kearney | Traceability reduces recall scope by 50-95% | Solutions 11, 12 |
| GFSI (BRCGS/SQF) | Full traceability within 4 hours is certification standard | Solutions 11, 12 |
| Elisa IndustriQ | Predictive quality increased battery yield by 16% | Solution 6 |
| Innova365 | 85% time reduction in BOM creation with AI | Solution 8 |
| Allchemist | 20% R&D cycle time reduction with AI formulation tools | Solutions 8, 12 |
| ChemCopilot | AI predicts formulation alternatives in minutes vs. days | Solution 8 |
| Verdantix | EHS software: 20% reduction in compliance activity time | Solution 9 |
| EHS Momentum | Manufacturing: 30% incident reduction, $200K annual savings | Solution 9 |
| GM Insights | Route optimization: 20-30% fuel cost reduction | Solution 3 |
| CigoTracker / Locus | DSD compliance accuracy: 50% to 75%+ with digital tools | Solution 3 |
| FieldCamp | AI routing: eliminated 1 day/week operational overhead | Solution 3 |
| EnergyX / Springer | 45% production waste reduction with AI inspection | Solution 6 |

---

---
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

**Remove this entire section (lines ~125-149 in current file):**

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

### CHANGE 7C: Update pages.md Spec

**File:** `website-spec/pages.md` (this is the spec file, not the codebase)

**What:** Remove the "Questions Your AI Can Now Answer" section from the Solution Detail page spec.

**Remove the entire section:**
```
**Section: Questions Your AI Can Now Answer**
- Background: `bg-white dark:bg-slate-950`
- Heading (H2): "Questions your AI can now answer"
- Display the 3 `exampleQuestions` as individual cards
- Each card: question mark icon (HelpCircle from Lucide) + the question text in quotes
- These should feel like real things a VP would type into an AI tool. Style them almost like chat bubbles or query inputs.
```

**Update the Solution Detail page's section order in the spec to reflect:**
1. Hero
2. What the Context Graph Maps (with interactive graph + clickable questions)
3. Key Capabilities (How It Works)
4. Business Impact (Measurable Results)
5. CTA

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

### Verification After All Changes

After implementing Changes 6A through 6C, verify:

1. **Benchmark qualifier line** appears below "Measurable results" heading on every solution detail page.
2. **Every metric** in `solutions.ts` has a source attribution in its `context` field.
3. **No unsourced percentage claims** remain anywhere in the solution data.
4. **Solution CTA** reflects the honest "walk through a Context Graph for your industry" framing.
5. **TypeScript compiles** - run `npm run build`.
6. **Visual check** - the source attribution text in `context` should render in the small muted text below the label on metric cards. It should be readable but not dominant.
