# Homepage Content Specification

> Reference: `site-spec.md` for design system, colors, and component patterns.
> CRITICAL: No gradients anywhere. Flat solid colors only.

The homepage is the entire pitch. An enterprise data/AI leader should be able to scroll through this page and understand exactly what Genzoic does, why it matters, and how it is different - in under 2 minutes.

---

## Section 1: Hero

**Background:** `bg-white dark:bg-slate-950` (primary background, no gradient)

**Layout:** Centered text, max-width 4xl, generous vertical padding (py-24 md:py-36).

**Content:**

```
Headline (H1):
AI that actually understands how your business works.

Subtext:
Most enterprise AI sits on top of data tables. It can tell you what happened.
It cannot reason about what to do next. Genzoic builds the Context Graph -
a living map of how your business actually runs, not just the data it
generates - so AI can think like someone who actually works there.

CTA buttons:
[See How It Works]  (secondary style, scrolls to #how-it-works)
[Book a Demo]       (primary style, links to https://calendar.app.google/DezhnNr993pqnzhx5, new tab)
```

**Notes:**
- The headline should NOT use gradient text. Use `text-slate-900 dark:text-white` for the first line. The phrase "how your business works" can be highlighted in the brand primary color (`text-blue-800 dark:text-blue-400`) but as a flat color, not a gradient.
- Keep the subtext to exactly these 3 sentences. They are carefully constructed to name the problem, introduce the concept, and state the value.

---

## Section 2: The Problem

**Background:** `bg-slate-50 dark:bg-slate-900/50` (alternating)

**Layout:** Max-width 5xl. Heading centered, then a two-column card layout.

**Content:**

```
Heading (H2):
Tables don't understand your business

Subtext:
Enterprises are connecting Snowflake and Databricks to AI assistants,
hoping the AI will figure out the business. It won't. Here is why.

LEFT CARD - "What AI does today" (muted styling, border-slate):
- Answers "what were total sales last quarter?"
- Identifies top-selling products
- Generates trend charts and dashboards
- Runs SQL queries on your data warehouse

RIGHT CARD - "What AI should be able to do" (emphasized, border-blue):
- "Our lithium supplier just filed for bankruptcy - what products are affected?"
- "A tornado hit our Memphis plant - which customer orders are at risk?"
- "New FDA regulation on Ingredient Y in 90 days - what is our exposure?"
- "If we discontinue Product Z, what happens to our channel commitments?"

Bottom paragraph (muted text, centered):
The knowledge that drives real decisions - supplier dependencies,
plant capacities, product formulations, distribution channels,
pricing structures - lives in your people's heads, not in your data warehouse.
That is the gap.
```

**Notes:**
- The left card should feel "fine but limited." Use muted colors, checkmarks.
- The right card should feel "this is what you actually need." Use the brand primary color for the arrow indicators. These should read as real questions a VP of Supply Chain would ask.
- Do NOT use gradient backgrounds on either card. Use solid bg-white/dark:bg-slate-800 for left, solid bg-blue-50/dark:bg-blue-900/20 for right.

---

## Section 3: The Context Graph in Action

**Background:** `bg-white dark:bg-slate-950` (primary)

**Layout:** Max-width 5xl. Heading centered, then 3-column card grid (stacks on mobile).

**Content:**

```
Heading (H2):
The Context Graph

Subtext:
A structured map of your business that captures what data warehouses cannot -
the relationships, dependencies, and logic that drive real decisions.

INTERACTIVE GRAPH:
Insert the interactive Context Graph component here (see interactive-graph.md
for full specification). This is a live, explorable FMCG demo graph with
clickable nodes and predefined questions. Visitors can click on Products,
Ingredients, Suppliers, Plants, Channels, and Stores to see how they connect,
then ask predefined questions like "What happens if this supplier goes down?"
and see the AI reasoning chain.

Below the interactive graph, show the three scenario cards:

CARD 1 - Supplier Disruption
Icon: AlertTriangle (Lucide)
Trigger: "Supplier X filed for bankruptcy"
What the AI traces:
Raw materials sourced exclusively from Supplier X
-> Products that depend on those materials
-> Plants where those products are manufactured
-> Customer orders at risk of delay
-> Alternative suppliers, lead times, and cost impact

CARD 2 - Plant Disruption
Icon: Factory (Lucide) or Building2
Trigger: "Tornado shuts down the Memphis plant"
What the AI traces:
Product lines running through Memphis
-> Current downstream inventory levels
-> Customer orders affected and SLA exposure
-> Rerouting options to Dallas plant
-> Capacity gap and timeline to resume

CARD 3 - Regulatory Change
Icon: Scale (Lucide) or FileText
Trigger: "New regulation on Ingredient Y in 90 days"
What the AI traces:
Products containing Ingredient Y
-> Reformulation paths and R&D timelines
-> Compliant alternative suppliers
-> Cost impact across the product portfolio
-> Customer communication requirements
```

**Notes:**
- Each card should have a clear visual hierarchy: icon + title at top, the trigger event in bold/emphasized text, then the reasoning chain below.
- The reasoning chain should feel like a flowchart. Use arrow symbols (→) between steps. This is the money shot of the whole site - it shows what the Context Graph enables that tables alone cannot.
- Cards: solid backgrounds, no gradients. Use subtle left-border accent in brand-primary or brand-accent color for visual interest.

---

## Section 4: How It Works

**id:** `how-it-works` (anchor target for hero CTA)

**Background:** `bg-slate-50 dark:bg-slate-900/50` (alternating)

**Layout:** Max-width 5xl. Heading centered, then 3-column numbered steps.

**Content:**

```
Heading (H2):
How it works

Subtext:
Three steps. From data warehouse to autonomous reasoning.

STEP 1
Number: 1 (in a circle, brand-primary background)
Title: Connect your data
Description: Point Genzoic at your existing data sources - Snowflake,
Databricks, ERPs, spreadsheets, APIs. We ingest your schema and understand
what you have.

STEP 2
Number: 2
Title: Build the Context Graph
Description: We map the relationships your data alone cannot capture -
products to suppliers, plants to channels, formulations to ingredients,
pricing to contracts. Your business logic, made explicit and traversable.

STEP 3
Number: 3
Title: Deploy AI that reasons
Description: Your team gets AI assistants that trace impact across the graph,
simulate scenarios, and surface insights no dashboard can show - because they
understand how your business actually works.
```

**Notes:**
- The numbered circles should use solid brand-primary color background with white text. No gradient.
- Consider adding subtle connector lines or arrows between steps on desktop.
- Step descriptions should be concrete. "Snowflake, Databricks, ERPs" - name real tools. Enterprise buyers want to see you speak their language.

---

## Section 5: The Platform

**id:** `platform`

**Background:** `bg-white dark:bg-slate-950` (primary)

**Layout:** Max-width 5xl. Heading centered, then a tight 2x2 or 3-column grid.

**Content:**

```
Heading (H2):
AI assistants powered by the Context Graph

Subtext:
Every employee gets an AI assistant that understands the business, learns
from their workflows, and retains knowledge even when people move on.

FEATURE 1
Icon: Mail (Lucide)
Title: Dedicated identity
Description: Each assistant gets its own email. CC it on threads.
Message it on Slack or Teams. It works where your people already work.

FEATURE 2
Icon: Brain (Lucide)
Title: Learns over time
Description: Picks up each employee's preferences, workflows, and
communication patterns. Gets more useful every week.

FEATURE 3
Icon: Puzzle (Lucide) or Blocks
Title: Teachable skills
Description: Comes with built-in capabilities. Employees teach it new
skills specific to their role. Skills compound across the organization.

FEATURE 4
Icon: Shield (Lucide)
Title: Enterprise controls
Description: Role-based access. Full audit trail. Model-agnostic - works
with Claude, GPT, Gemini. Your data, your environment.

FEATURE 5
Icon: ArrowLeftRight (Lucide) or Repeat
Title: Knowledge retention
Description: When an employee leaves, their assistant stays. Institutional
knowledge transfers seamlessly. No more lost context.
```

**Notes:**
- This section should be MORE COMPACT than the Context Graph section. The graph is the hero; the assistant platform is the delivery mechanism.
- 5 cards in a responsive grid: 1 col mobile, 2 col tablet, 3 col desktop (last row centered).
- Keep descriptions to 2 lines max. These are capability signals, not explanations.

---

## Section 6: Implementation Partnership

**Background:** `bg-slate-50 dark:bg-slate-900/50` (alternating)

**Layout:** Max-width 5xl. Heading centered, then 3-column card grid (stacks on mobile).

**Content:**

```
Heading (H2):
Built with you, not just for you

Subtext:
A Context Graph is not a plug-and-play product. It encodes how your specific
business operates - and getting that right requires working alongside your team.
We stay until AI is delivering measurable results.

CARD 1
Icon: Map (Lucide)
Title: Map your business
Description: We work with your domain experts to map the entities, relationships,
and decision logic that define how your business actually runs. Not a generic
template - your business, your graph.

CARD 2
Icon: Wrench (Lucide) or Settings
Title: Deploy and validate
Description: AI Assistants are configured with role-specific access, connected
to your systems, and validated against real operational scenarios before anyone
relies on them.

CARD 3
Icon: TrendingUp (Lucide)
Title: Stay until it works
Description: We measure adoption, accuracy, and business impact. We iterate
on the graph, refine assistant skills, and expand to new teams - until AI
is part of how your company operates, not a side experiment.

Bottom line (muted text, centered):
Think of it as forward-deployed engineering for your AI transformation.
We have skin in the game because your success is our success.
```

**Notes:**
- The three cards should follow the same visual pattern as the "How It Works" section (consistent card style, subtle left-border accent).
- The bottom line is intentionally understated. It names the model without making it the headline. The headline is about the customer, not about Genzoic's delivery methodology.
- Cards: solid backgrounds, no gradients. Same card pattern as rest of site.
- This section answers the unspoken enterprise buyer question: "What does working with you actually look like?"

---

## Section 7: Industry Solutions

**Background:** `bg-white dark:bg-slate-950` (primary)

**Layout:** Max-width 6xl. Heading centered, then solution cards in grid.

**Content:**

```
Heading (H2):
Built for your industry

Subtext:
Not generic AI. Purpose-built solutions powered by industry-specific
Context Graphs. Real depth, real use cases.

SOLUTION GRID:
Show 6 solution cards from the solutions data (see solutions.md).
Display: industry badge, solution name, one-line tagline, "Learn more" link.
Link each card to /solutions/{slug}.

Below the grid:
[View all solutions ->]  (links to /solutions)
```

**Notes:**
- Show a curated selection of 6 solutions that span multiple industries (pick one from each major vertical: Retail/FMCG, Battery Manufacturing, Chemical Manufacturing, Pharmaceutical, Food & Beverage, Energy).
- Do NOT include industry filter tabs on the homepage. Save those for the /solutions page. The homepage should just show a taste.
- Cards should be clean and minimal. Industry badge uses the brand-accent color scheme.

---

## Section 8: Final CTA

**Background:** `bg-slate-50 dark:bg-slate-900/50` (alternating)

**Layout:** Max-width 3xl. Centered. Clean and direct.

**Content:**

```
Heading (H2):
See your business on the graph

Subtext:
Book a 30-minute demo. We will map a slice of your business and show you
what your AI has been missing.

CTA:
[Book a Demo]  (primary button, links to https://calendar.app.google/DezhnNr993pqnzhx5, new tab)
```

**Notes:**
- This is the closing ask. No distractions. No secondary CTA. One button.
- Below the button, optionally add a small muted line: "No commitment. No credit card."

---

## Section Order Summary

1. Hero
2. The Problem
3. The Context Graph in Action
4. How It Works (id: how-it-works)
5. The Platform (id: platform)
6. Implementation Partnership
7. Industry Solutions
8. Final CTA

Eight sections. Each one earns its place.
