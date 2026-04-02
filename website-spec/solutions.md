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
  keyCapabilities: KeyCapabilities;  // { connects: string[], analyzes: string[], recommends: string[] }
  businessImpact: BusinessImpactItem[];  // { metric: string, label: string, context: string }[]
}
```

Export as `solutionsData` array and `industries` string array (unique industry names).

## Industries

1. Retail & FMCG
2. Battery Manufacturing
3. Chemical Manufacturing
4. Pharmaceutical
5. Food & Beverage

---

## Solution 1: Inventory Optimization & Expiry Prevention

- **Industry:** Retail & FMCG
- **Slug:** `inventory-optimization-expiry`
- **Icon:** `Package`
- **Tagline:** Predict demand, optimize stock levels, eliminate waste from expired goods
- **Image:** `https://images.unsplash.com/photo-1633613286991-611bcf299461?w=800&h=500&fit=crop&auto=format`
- **Description:** Modern retailers face the dual challenge of stockouts that lose sales and overstock that expires on shelves. The Context Graph connects product sales velocity, supplier lead times, store-specific demand patterns, and expiry dates to enable AI to recommend optimal stock levels by location and predict which SKUs will expire before sale.
- **Context Graph maps:** Products -> SKUs -> store locations -> supplier lead times -> shelf life dates -> historical demand patterns. Connects POS data to warehouse inventory to logistics schedules.
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

## Solution 2: DSD Copilot for Field Operations

- **Industry:** Retail & FMCG
- **Slug:** `dsd-copilot`
- **Icon:** `Truck`
- **Tagline:** Route intelligence, account management, and shelf compliance for field reps
- **Image:** `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format`
- **Description:** Direct Store Delivery reps manage dozens of accounts daily with minimal context on each store's unique patterns. The Context Graph connects route data, store planograms, order history, promotional calendars, and competitor shelf positioning to give every rep an AI copilot that knows each store as well as a veteran driver would.
- **Context Graph maps:** Routes -> store accounts -> order history -> planograms -> promotional schedules -> competitor positioning -> delivery constraints. Links in-store execution data to distribution center inventory.
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

## Solution 3: Supply Chain Risk & Compliance

- **Industry:** Battery Manufacturing
- **Slug:** `supply-chain-risk-monitor`
- **Icon:** `AlertTriangle`
- **Tagline:** Map material dependencies, monitor supplier risk, track IRA and EU Battery Passport compliance
- **Image:** `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop&auto=format`
- **Description:** Battery manufacturing depends on critical raw materials sourced from geopolitically sensitive regions through complex multi-tier supply chains - and faces a rapidly evolving regulatory landscape including IRA domestic content requirements, EU Battery Passport, and CBAM. The Context Graph maps every material to its suppliers, geographic origins, downstream products, and applicable regulations, enabling AI to simulate disruption scenarios, identify compliance gaps, and recommend mitigation strategies before problems materialize.
- **Context Graph maps:** Raw materials (lithium, cobalt, nickel) -> tier-1 and tier-2 suppliers -> geographic origins -> refining facilities -> cell chemistries -> battery product lines -> customer contracts -> compliance requirements (IRA, EU Battery Passport, CBAM). Intelligence layer adds: Supplier Disruption Response Protocols, IRA Content Calculations, EU Battery Passport Data Mapping, learned disruption playbooks and sanctions check skills from supply chain leadership and compliance directors.
- **Key capabilities:**
  - connects: Raw materials through multi-tier suppliers to geographic origins, product lines, and regulatory requirements; IRA domestic content, EU Battery Passport, and CBAM thresholds to specific material sourcing configurations
  - analyzes: Single-source dependencies and geopolitical exposure by material; Per-product compliance gap size for each active regulation with cost of remediation
  - recommends: Disruption response playbooks with qualified alternative suppliers and sanctions checks; Proactive supply chain restructuring before regulation deadlines with cost-effectiveness ranking
- **Business impact:**
  - 60% of disruptions resolved autonomously by 2031 (Gartner, March 2026)
  - 30-40% lower compliance preparation costs (Deloitte, 2024)
  - 75% to 95%+ compliance coverage improvement (Deloitte)

---

## Solution 4: Production Planning & Yield Optimization

- **Industry:** Battery Manufacturing
- **Slug:** `production-planning-yield`
- **Icon:** `Zap`
- **Tagline:** Optimize cell production scheduling, track yield, predict quality issues
- **Image:** `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop&auto=format`
- **Description:** Battery cell manufacturing involves tightly coupled processes where a quality deviation at one stage cascades through the entire line. The Context Graph connects electrode preparation parameters, cell assembly conditions, formation cycling data, and quality inspection results across production lines, shifts, and material batches, enabling AI to identify the root cause of yield losses and predict quality issues before cells complete the formation process.
- **Context Graph maps:** Production lines -> process stages (mixing, coating, calendering, assembly, formation) -> equipment parameters -> material batches -> shift schedules -> quality inspection data -> yield metrics -> customer specifications.
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

## Solution 5: Formulation & Recipe Management

- **Industry:** Chemical Manufacturing
- **Slug:** `formulation-recipe-management`
- **Icon:** `FlaskConical`
- **Tagline:** Manage chemical formulations, track ingredient sourcing, handle substitutions when suppliers change
- **Image:** `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop&auto=format`
- **Description:** Chemical manufacturers manage hundreds of formulations, each with specific ingredient requirements, supplier qualifications, and regulatory constraints. When a supplier changes or a raw material becomes unavailable, the ripple effects across the product portfolio are difficult to assess manually. The Context Graph connects formulations to ingredients, qualified suppliers, production processes, and regulatory requirements, enabling AI to instantly identify impact and recommend substitutions.
- **Context Graph maps:** Formulations -> ingredients with concentration ranges -> qualified suppliers per ingredient -> regulatory constraints (REACH, TSCA) -> production processes -> customer specifications -> pricing and margin models.
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

## Solution 6: Safety & Environmental Compliance

- **Industry:** Chemical Manufacturing
- **Slug:** `safety-environmental-compliance`
- **Icon:** `ShieldAlert`
- **Tagline:** Map chemicals to safety requirements, track permits, predict regulatory impact on operations
- **Image:** `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&auto=format`
- **Description:** Chemical plants operate under layered environmental permits, safety regulations, and reporting requirements that connect to specific chemicals, processes, and emission points. The Context Graph maps chemicals to their safety data, production processes to their emission profiles, and permits to their specific conditions and renewal dates, enabling AI to predict compliance risks and optimize reporting.
- **Context Graph maps:** Chemicals -> SDS data -> storage requirements -> production processes -> emission points -> permits (air, water, waste) -> reporting requirements -> inspection schedules -> incident history.
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

## Solution 7: Plant Maintenance & Reliability

- **Industry:** Chemical Manufacturing
- **Slug:** `plant-maintenance-reliability`
- **Icon:** `Wrench`
- **Tagline:** Connect equipment to production lines, predict failures, optimize maintenance schedules
- **Image:** `https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=500&fit=crop&auto=format`
- **Description:** Maintenance decisions in chemical plants have cascading effects - taking a heat exchanger offline affects the reactor it feeds, the distillation column downstream, and the product lines that depend on all of them. The Context Graph maps equipment dependencies, production line configurations, spare parts inventory, and maintenance history, enabling AI to schedule maintenance that minimizes production impact and predict failures before they cause unplanned downtime.
- **Context Graph maps:** Equipment assets -> production line configurations -> process dependencies -> maintenance history -> spare parts inventory -> work order history -> production schedules -> failure mode data.
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

## Solution 8: Drug Supply Chain Integrity

- **Industry:** Pharmaceutical
- **Slug:** `drug-supply-chain-integrity`
- **Icon:** `Pill`
- **Tagline:** Track ingredients through suppliers, monitor cold chain, ensure lot traceability from API to patient
- **Image:** `https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=500&fit=crop&auto=format`
- **Description:** Pharmaceutical supply chains require complete traceability from active pharmaceutical ingredients through formulation, manufacturing, packaging, and distribution to the patient. The Context Graph maps API suppliers, excipient sources, manufacturing sites, quality test results, lot numbers, and distribution channels, enabling AI to trace any quality issue to its origin and predict supply disruptions across the product portfolio.
- **Context Graph maps:** APIs -> excipients -> qualified suppliers -> manufacturing sites -> batch/lot records -> quality test results -> stability data -> distribution channels -> cold chain requirements -> regulatory filings (DMFs, ANDAs, NDAs).
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

## Solution 9: Allergen & Ingredient Compliance

- **Industry:** Food & Beverage
- **Slug:** `allergen-ingredient-compliance`
- **Icon:** `Wheat`
- **Tagline:** Manage recipes, track allergens across the supply chain, handle recalls with precision
- **Image:** `https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=500&fit=crop&auto=format`
- **Description:** Food manufacturers must track allergens across recipes, ingredient suppliers, production lines, and labeling - where a single undeclared allergen can trigger recalls affecting millions of units. The Context Graph connects recipes to ingredients, suppliers to allergen certifications, production lines to cleaning schedules, and products to labeling requirements, enabling AI to catch allergen risks before products ship and execute targeted recalls when needed.
- **Context Graph maps:** Recipes -> ingredients -> allergen profiles -> supplier certifications -> production lines -> cleaning protocols -> shared equipment -> labeling requirements -> distribution and retail endpoints.
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

