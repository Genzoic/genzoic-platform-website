# Solutions Data Specification

> Reference: `site-spec.md` for design system. `pages.md` for solution listing and detail page layout.

## Data Structure

Each solution should be a TypeScript object with this interface:

```typescript
export interface Solution {
  id: number;
  name: string;
  slug: string;           // URL-safe, used in /solutions/:slug
  industry: string;       // One of the industries below
  tagline: string;        // One-line description (under 80 chars)
  description: string;    // 2-3 sentence problem + solution explanation
  icon: string;           // Lucide icon name (as string)
  image: string;          // Unsplash URL with ?w=800&h=500&fit=crop&auto=format
  contextGraphExample: string;  // What the Context Graph maps for this use case
  exampleQuestions: string[];   // 3 real questions the AI can answer with the graph
  keyCapabilities: string[];    // 4-5 concrete capabilities
  businessImpact: string[];     // 3 measurable business outcomes
}
```

Export as `solutionsData` array and `industries` string array (unique industry names).

## Industries

1. Retail & FMCG
2. Battery Manufacturing
3. Chemical Manufacturing
4. Pharmaceutical
5. Food & Beverage
6. Energy & Utilities

---

## Solution 1: Inventory Optimization & Expiry Prevention

- **Industry:** Retail & FMCG
- **Slug:** `inventory-optimization-expiry`
- **Icon:** `Package`
- **Tagline:** Predict demand, optimize stock levels, eliminate waste from expired goods
- **Image:** `https://images.unsplash.com/photo-1633613286991-611bcf299461?w=800&h=500&fit=crop&auto=format`
- **Description:** Modern retailers face the dual challenge of stockouts that lose sales and overstock that expires on shelves. The Context Graph connects product sales velocity, supplier lead times, store-specific demand patterns, and expiry dates to enable AI to recommend optimal stock levels by location and predict which SKUs will expire before sale.
- **Context Graph maps:** Products -> SKUs -> store locations -> supplier lead times -> shelf life dates -> historical demand patterns. Connects POS data to warehouse inventory to logistics schedules.
- **Example questions:**
  1. Which stores will have SKU #4521 expire in the next 14 days, and what is the optimal markdown strategy by location?
  2. Given our supplier lead time for category X just increased from 21 to 35 days, which stores should we increase safety stock for?
  3. What is our optimal stock level for this product at Store #42 considering its seasonal demand, weather patterns, and current inventory?
- **Key capabilities:**
  - Demand forecasting by store, category, and season
  - Expiry-date aware inventory planning
  - Supplier lead-time integration
  - Markdown optimization recommendations
  - Stock-out risk alerts by location
- **Business impact:**
  - Reduce shrink/waste by 15-25% through better expiry management
  - Decrease stock-outs by 20-30% while lowering total inventory
  - Improve markdown effectiveness with AI-driven timing and pricing

---

## Solution 2: Customer Feedback Intelligence

- **Industry:** Retail & FMCG
- **Slug:** `customer-feedback-intelligence`
- **Icon:** `MessageSquare`
- **Tagline:** Connect feedback across channels to products, stores, and suppliers - then drive action
- **Image:** `https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&auto=format`
- **Description:** Customer feedback scattered across reviews, surveys, social media, and in-store comments is often disconnected from the products, stores, and suppliers it references. The Context Graph stitches feedback to specific SKUs, store locations, brands, and time periods, enabling AI to identify emerging quality issues, regional preferences, and supplier impact before they become crises.
- **Context Graph maps:** Feedback channels -> sentiment scores -> SKU references -> store locations -> supplier batches -> time periods. Links complaints to specific product batches and supply chain origins.
- **Example questions:**
  1. Are complaints about Product X correlated with a specific supplier batch or manufacturing date?
  2. Which stores in the Southeast region have seen a spike in negative feedback on our private-label dairy products in the last 30 days?
  3. What product categories are generating the most improvement requests, and how do those map to our planned reformulations?
- **Key capabilities:**
  - Multi-channel feedback aggregation (reviews, surveys, social, in-store)
  - Automatic linking of feedback to SKUs, stores, and suppliers
  - Emerging quality issue detection
  - Regional preference analysis
  - Supplier quality correlation
- **Business impact:**
  - Detect quality issues 3-4 weeks earlier than traditional monitoring
  - Reduce negative review volume by addressing root causes faster
  - Inform product development with structured feedback-to-SKU insights

---

## Solution 3: DSD Copilot for Field Operations

- **Industry:** Retail & FMCG
- **Slug:** `dsd-copilot`
- **Icon:** `Truck`
- **Tagline:** Route intelligence, account management, and shelf compliance for field reps
- **Image:** `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format`
- **Description:** Direct Store Delivery reps manage dozens of accounts daily with minimal context on each store's unique patterns. The Context Graph connects route data, store planograms, order history, promotional calendars, and competitor shelf positioning to give every rep an AI copilot that knows each store as well as a veteran driver would.
- **Context Graph maps:** Routes -> store accounts -> order history -> planograms -> promotional schedules -> competitor positioning -> delivery constraints. Links in-store execution data to distribution center inventory.
- **Example questions:**
  1. For my route today, which stores are likely to need restocking based on their sell-through rates since last delivery?
  2. Store #87 has underperformed on the new promotion - what is different about their shelf placement compared to top-performing stores?
  3. If I have 200 extra units of Product Y on my truck, which three stores on my route would benefit most from an opportunistic placement?
- **Key capabilities:**
  - AI-optimized route and stop prioritization
  - Store-level demand prediction
  - Shelf compliance monitoring and recommendations
  - Promotional execution tracking
  - Real-time inventory and delivery coordination
- **Business impact:**
  - Increase revenue per route by 10-15% through better store-level decisions
  - Improve shelf compliance scores by 20-30%
  - Reduce missed delivery windows and out-of-stock incidents

---

## Solution 4: Promotion & Demand Planning

- **Industry:** Retail & FMCG
- **Slug:** `promotion-demand-planning`
- **Icon:** `TrendingUp`
- **Tagline:** Plan promotions with full context of supplier capacity, inventory, and channel performance
- **Image:** `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format`
- **Description:** Promotion planning typically happens in silos - marketing decides the offer, supply chain scrambles to fulfill it, and stores deal with the aftermath. The Context Graph connects promotional history, supplier production capacity, current inventory positions, store-level performance data, and channel constraints so AI can model the full impact of a promotion before it launches.
- **Context Graph maps:** Promotional calendar -> product assortments -> supplier capacity -> warehouse inventory -> store-level historical lift -> channel constraints -> margin models.
- **Example questions:**
  1. If we run a BOGO promotion on Product X in 500 stores next month, can our current supplier handle the demand surge?
  2. Which stores should we exclude from the promotion because their current inventory levels cannot support the expected lift?
  3. Based on the last three promotions of similar products, what is the expected cannibalization effect on Products Y and Z?
- **Key capabilities:**
  - Full-chain promotion impact modeling
  - Supplier capacity validation before launch
  - Store-level promotion allocation optimization
  - Cannibalization and halo effect prediction
  - Post-promotion performance analysis
- **Business impact:**
  - Reduce out-of-stocks during promotions by 25-40%
  - Improve promotional ROI by 15-20% through better targeting
  - Eliminate surprise supplier shortfalls with pre-launch capacity checks

---

## Solution 5: Supply Chain Risk Monitor

- **Industry:** Battery Manufacturing
- **Slug:** `supply-chain-risk-monitor`
- **Icon:** `AlertTriangle`
- **Tagline:** Trace raw material dependencies, monitor supplier risk, simulate disruptions in real time
- **Image:** `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop&auto=format`
- **Description:** Battery manufacturing depends on a concentrated set of critical raw materials - lithium, cobalt, nickel, manganese - sourced from geopolitically sensitive regions through complex multi-tier supply chains. The Context Graph maps every material to its suppliers, their geographic locations, alternative sources, and downstream product dependencies, enabling AI to simulate disruption scenarios and recommend mitigation strategies before problems materialize.
- **Context Graph maps:** Raw materials (lithium, cobalt, nickel) -> tier-1 and tier-2 suppliers -> geographic origins -> refining facilities -> cell chemistries -> battery product lines -> customer contracts -> compliance requirements (IRA, EU Battery Passport).
- **Example questions:**
  1. If our primary cobalt supplier in the DRC faces a 60-day production halt, which cell product lines are affected and what alternative sourcing options exist?
  2. What percentage of our nickel supply comes from regions with sanctions risk, and which finished products would be impacted?
  3. If lithium carbonate prices increase by 30%, what is the margin impact across our product portfolio, and which customer contracts have price adjustment clauses?
- **Key capabilities:**
  - Multi-tier supplier dependency mapping
  - Geopolitical and ESG risk scoring by material and supplier
  - Real-time disruption impact simulation
  - Alternative supplier identification with lead-time estimates
  - Price sensitivity modeling across the product portfolio
- **Business impact:**
  - Reduce supply disruption response time from weeks to hours
  - Identify single-source risks before they become crises
  - Save 5-10% on material costs through proactive sourcing strategies

---

## Solution 6: Production Planning & Yield Optimization

- **Industry:** Battery Manufacturing
- **Slug:** `production-planning-yield`
- **Icon:** `Zap`
- **Tagline:** Optimize cell production scheduling, track yield, predict quality issues
- **Image:** `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop&auto=format`
- **Description:** Battery cell manufacturing involves tightly coupled processes where a quality deviation at one stage cascades through the entire line. The Context Graph connects electrode preparation parameters, cell assembly conditions, formation cycling data, and quality inspection results across production lines, shifts, and material batches, enabling AI to identify the root cause of yield losses and predict quality issues before cells complete the formation process.
- **Context Graph maps:** Production lines -> process stages (mixing, coating, calendering, assembly, formation) -> equipment parameters -> material batches -> shift schedules -> quality inspection data -> yield metrics -> customer specifications.
- **Example questions:**
  1. Line 3 has seen a 4% yield drop this week - is it correlated with the new cathode material batch or the equipment calibration change on Tuesday?
  2. Based on electrode coating thickness data from the last 8 hours, which cells in formation are likely to fail final quality inspection?
  3. If we need to increase production of our 4680 cells by 20% next quarter, which line should we prioritize, and what are the bottleneck stages?
- **Key capabilities:**
  - Cross-stage production data correlation
  - Predictive quality modeling from early-stage parameters
  - Bottleneck identification and capacity simulation
  - Material batch traceability
  - Shift and operator performance analysis
- **Business impact:**
  - Improve cell yield by 3-8% through early defect prediction
  - Reduce scrap rates by identifying process deviations faster
  - Increase effective capacity 10-15% without capital investment

---

## Solution 7: Regulatory & ESG Compliance Tracker

- **Industry:** Battery Manufacturing
- **Slug:** `regulatory-esg-compliance`
- **Icon:** `Scale`
- **Tagline:** Track battery regulations, map compliance gaps, prepare for EU Battery Passport and IRA requirements
- **Image:** `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop&auto=format`
- **Description:** Battery manufacturers face a rapidly evolving regulatory landscape - the EU Battery Passport, IRA domestic content requirements, CBAM, and emerging recycled content mandates. The Context Graph maps each regulation to specific product lines, material sourcing origins, and supply chain configurations, enabling AI to identify compliance gaps and model the cost of remediation before deadlines hit.
- **Context Graph maps:** Regulations (EU Battery Passport, IRA, CBAM) -> compliance requirements -> product lines -> material origins -> supplier certifications -> recycled content percentages -> carbon footprint data -> customer contract obligations.
- **Example questions:**
  1. Which of our product lines currently do not meet the EU Battery Passport carbon footprint threshold, and what sourcing changes would bring them into compliance?
  2. If the IRA domestic content percentage requirement increases to 80% in 2027, which products qualify and which need supply chain restructuring?
  3. What is our current recycled content percentage by product line, and what would it cost to reach the 2030 EU minimum requirements?
- **Key capabilities:**
  - Multi-regulation tracking and deadline management
  - Per-product compliance gap analysis
  - Supply chain origin mapping for domestic content calculations
  - Carbon footprint tracking by material and product line
  - Remediation cost modeling and scenario planning
- **Business impact:**
  - Avoid regulatory penalties and market access restrictions
  - Reduce compliance preparation costs by 20-30% through proactive gap identification
  - Gain competitive advantage by achieving compliance ahead of deadlines

---

## Solution 8: Formulation & Recipe Management

- **Industry:** Chemical Manufacturing
- **Slug:** `formulation-recipe-management`
- **Icon:** `FlaskConical`
- **Tagline:** Manage chemical formulations, track ingredient sourcing, handle substitutions when suppliers change
- **Image:** `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop&auto=format`
- **Description:** Chemical manufacturers manage hundreds of formulations, each with specific ingredient requirements, supplier qualifications, and regulatory constraints. When a supplier changes or a raw material becomes unavailable, the ripple effects across the product portfolio are difficult to assess manually. The Context Graph connects formulations to ingredients, qualified suppliers, production processes, and regulatory requirements, enabling AI to instantly identify impact and recommend substitutions.
- **Context Graph maps:** Formulations -> ingredients with concentration ranges -> qualified suppliers per ingredient -> regulatory constraints (REACH, TSCA) -> production processes -> customer specifications -> pricing and margin models.
- **Example questions:**
  1. If Supplier A discontinues Chemical Compound X, which formulations are affected, and which alternative suppliers are qualified to supply an equivalent?
  2. We need to reformulate Product Y to remove a SVHC substance - what are the viable substitute chemicals, and which have already been qualified in our system?
  3. What is the total cost impact across our portfolio if we switch from Supplier A to Supplier B for our primary surfactant?
- **Key capabilities:**
  - Full formulation-to-supplier dependency mapping
  - Ingredient substitution recommendation with qualification tracking
  - Regulatory constraint checking (REACH, TSCA, customer restrictions)
  - Cross-product impact analysis for ingredient changes
  - Supplier qualification status tracking
- **Business impact:**
  - Reduce reformulation response time from months to days
  - Avoid production stoppages from unexpected supplier changes
  - Maintain regulatory compliance during ingredient transitions

---

## Solution 9: Safety & Environmental Compliance

- **Industry:** Chemical Manufacturing
- **Slug:** `safety-environmental-compliance`
- **Icon:** `ShieldAlert`
- **Tagline:** Map chemicals to safety requirements, track permits, predict regulatory impact on operations
- **Image:** `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&auto=format`
- **Description:** Chemical plants operate under layered environmental permits, safety regulations, and reporting requirements that connect to specific chemicals, processes, and emission points. The Context Graph maps chemicals to their safety data, production processes to their emission profiles, and permits to their specific conditions and renewal dates, enabling AI to predict compliance risks and optimize reporting.
- **Context Graph maps:** Chemicals -> SDS data -> storage requirements -> production processes -> emission points -> permits (air, water, waste) -> reporting requirements -> inspection schedules -> incident history.
- **Example questions:**
  1. If we increase production of Product X by 25%, which environmental permits need to be reviewed for emission threshold compliance?
  2. Which chemicals currently on-site require updated emergency response plans based on recent regulatory changes?
  3. Our Tier II reporting is due in 60 days - which facilities have inventory data gaps that need to be resolved?
- **Key capabilities:**
  - Chemical inventory to regulatory requirement mapping
  - Permit condition tracking with automated threshold monitoring
  - Proactive compliance risk identification
  - Emission modeling for production scenario planning
  - Reporting automation and data gap identification
- **Business impact:**
  - Reduce compliance reporting effort by 30-40%
  - Avoid permit violations and associated fines
  - Enable production scaling decisions with built-in regulatory awareness

---

## Solution 10: Plant Maintenance & Reliability

- **Industry:** Chemical Manufacturing
- **Slug:** `plant-maintenance-reliability`
- **Icon:** `Wrench`
- **Tagline:** Connect equipment to production lines, predict failures, optimize maintenance schedules
- **Image:** `https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=500&fit=crop&auto=format`
- **Description:** Maintenance decisions in chemical plants have cascading effects - taking a heat exchanger offline affects the reactor it feeds, the distillation column downstream, and the product lines that depend on all of them. The Context Graph maps equipment dependencies, production line configurations, spare parts inventory, and maintenance history, enabling AI to schedule maintenance that minimizes production impact and predict failures before they cause unplanned downtime.
- **Context Graph maps:** Equipment assets -> production line configurations -> process dependencies -> maintenance history -> spare parts inventory -> work order history -> production schedules -> failure mode data.
- **Example questions:**
  1. If we take Reactor 4 offline for maintenance next week, what is the downstream production impact, and can other reactors absorb the load?
  2. Based on vibration data trends, which pumps are likely to need unplanned maintenance in the next 30 days, and do we have spare parts in stock?
  3. What is the optimal turnaround schedule for Q3 that minimizes total production loss while addressing all overdue maintenance items?
- **Key capabilities:**
  - Equipment dependency mapping across production lines
  - Predictive maintenance with production impact modeling
  - Spare parts inventory correlation
  - Turnaround planning optimization
  - Failure mode and root cause analysis
- **Business impact:**
  - Reduce unplanned downtime by 20-35%
  - Optimize turnaround duration, saving 2-5 days per major event
  - Extend equipment life through better-timed maintenance interventions

---

## Solution 11: Drug Supply Chain Integrity

- **Industry:** Pharmaceutical
- **Slug:** `drug-supply-chain-integrity`
- **Icon:** `Pill`
- **Tagline:** Track ingredients through suppliers, monitor cold chain, ensure lot traceability from API to patient
- **Image:** `https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=500&fit=crop&auto=format`
- **Description:** Pharmaceutical supply chains require complete traceability from active pharmaceutical ingredients through formulation, manufacturing, packaging, and distribution to the patient. The Context Graph maps API suppliers, excipient sources, manufacturing sites, quality test results, lot numbers, and distribution channels, enabling AI to trace any quality issue to its origin and predict supply disruptions across the product portfolio.
- **Context Graph maps:** APIs -> excipients -> qualified suppliers -> manufacturing sites -> batch/lot records -> quality test results -> stability data -> distribution channels -> cold chain requirements -> regulatory filings (DMFs, ANDAs, NDAs).
- **Example questions:**
  1. Lot #7823 failed a stability test at month 18 - which downstream batches used the same API lot, and where are they in the distribution chain?
  2. If our primary API supplier for Drug X fails their next FDA inspection, what is our qualified backup capacity and how quickly can we switch?
  3. Which products in our portfolio have single-source API suppliers, and what is the risk profile for each?
- **Key capabilities:**
  - End-to-end lot traceability from API to patient
  - Multi-tier supplier qualification tracking
  - Quality deviation impact assessment
  - Cold chain monitoring integration
  - Regulatory filing and approval status mapping
- **Business impact:**
  - Reduce quality investigation time from weeks to days
  - Identify and mitigate single-source supply risks before disruption
  - Accelerate regulatory response with complete traceability data

---

## Solution 12: Allergen & Ingredient Compliance

- **Industry:** Food & Beverage
- **Slug:** `allergen-ingredient-compliance`
- **Icon:** `Wheat`
- **Tagline:** Manage recipes, track allergens across the supply chain, handle recalls with precision
- **Image:** `https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=500&fit=crop&auto=format`
- **Description:** Food manufacturers must track allergens across recipes, ingredient suppliers, production lines, and labeling - where a single undeclared allergen can trigger recalls affecting millions of units. The Context Graph connects recipes to ingredients, suppliers to allergen certifications, production lines to cleaning schedules, and products to labeling requirements, enabling AI to catch allergen risks before products ship and execute targeted recalls when needed.
- **Context Graph maps:** Recipes -> ingredients -> allergen profiles -> supplier certifications -> production lines -> cleaning protocols -> shared equipment -> labeling requirements -> distribution and retail endpoints.
- **Example questions:**
  1. If Supplier A's soy lecithin is found to contain undeclared milk protein, which products, production lots, and retail locations are potentially affected?
  2. Which of our production lines process both tree nut and nut-free products, and are the cleaning protocols between runs validated for allergen removal?
  3. We are reformulating Product X to be gluten-free - which ingredients need to be replaced, and which suppliers carry certified gluten-free alternatives?
- **Key capabilities:**
  - Recipe-to-allergen traceability across the full supply chain
  - Supplier allergen certification management
  - Production line cross-contact risk assessment
  - Targeted recall scoping with lot and location precision
  - Label compliance verification
- **Business impact:**
  - Reduce recall scope by 50-70% through precise lot-level tracing
  - Prevent undeclared allergen incidents with proactive cross-contact monitoring
  - Accelerate allergen-related reformulations from months to weeks

---

## Solution 13: Asset Performance Management

- **Industry:** Energy & Utilities
- **Slug:** `asset-performance-management`
- **Icon:** `Activity`
- **Tagline:** Map generation assets to grid commitments, optimize maintenance against output obligations
- **Image:** `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop&auto=format`
- **Description:** Energy producers balance asset maintenance needs against generation commitments, grid obligations, and market prices - where taking a unit offline at the wrong time can mean millions in penalties or missed revenue. The Context Graph maps generation assets to their maintenance schedules, grid commitments, weather-dependent output profiles, fuel contracts, and market positions, enabling AI to optimize the maintenance-versus-generation tradeoff.
- **Context Graph maps:** Generation assets (turbines, transformers, solar arrays) -> maintenance schedules -> grid commitment contracts -> weather/output models -> fuel supply contracts -> market positions -> spare parts inventory -> regulatory inspection requirements.
- **Example questions:**
  1. If we defer turbine maintenance on Unit 5 by 30 days, what is the failure probability increase, and can we cover our grid commitment from other units?
  2. Given the weather forecast for next week, which solar sites will underperform, and do we need to activate peaking capacity to meet grid obligations?
  3. What is the optimal maintenance window for our top 10 assets in Q4 that minimizes both outage risk and revenue loss from reduced generation?
- **Key capabilities:**
  - Asset-to-commitment dependency mapping
  - Maintenance window optimization with revenue impact modeling
  - Weather-integrated output forecasting
  - Grid commitment tracking and penalty risk assessment
  - Spare parts and contractor availability coordination
- **Business impact:**
  - Reduce maintenance-related revenue loss by 10-20%
  - Avoid grid commitment penalties through better outage planning
  - Extend asset life by 3-5 years through optimized maintenance timing
