export interface BusinessImpactItem {
  metric: string;
  label: string;
  context: string;
}

export interface KeyCapabilities {
  connects: string[];
  analyzes: string[];
  recommends: string[];
}

export interface Solution {
  id: number;
  name: string;
  slug: string;
  industry: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  contextGraphExample: string;

  keyCapabilities: KeyCapabilities;
  businessImpact: BusinessImpactItem[];
  graphFile?: string;
}

export const industries = [
  "Retail & FMCG",
  "Battery Manufacturing",
  "Chemical Manufacturing",
  "Pharmaceutical",
  "Food & Beverage",
];

export const solutionsData: Solution[] = [
  {
    id: 1,
    name: "Inventory Optimization & Expiry Prevention",
    slug: "inventory-optimization-expiry",
    industry: "Retail & FMCG",
    tagline: "Predict demand, optimize stock levels, eliminate waste from expired goods",
    icon: "Package",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=500&fit=crop&auto=format",
    description: "Modern retailers face the dual challenge of stockouts that lose sales and overstock that expires on shelves. The Context Graph connects product sales velocity, supplier lead times, store-specific demand patterns, and expiry dates to enable AI to recommend optimal stock levels by location and predict which SKUs will expire before sale.",
    contextGraphExample: "Products -> SKUs -> store locations -> supplier lead times -> shelf life dates -> historical demand patterns. Connects POS data to warehouse inventory to logistics schedules. Intelligence layer adds: Markdown Decision Rules, Restock Triggers, learned expiry management skills from category managers and store operations staff.",
    keyCapabilities: {
      connects: ["POS sell-through data to shelf life dates and supplier lead times", "Store-level demand patterns to warehouse inventory positions"],
      analyzes: ["Expiry risk by SKU, store, and time window", "Safety stock thresholds adjusted for seasonal demand and lead time changes"],
      recommends: ["Markdown timing and pricing by store and day of week", "Cross-store transfers to move at-risk inventory to higher-demand locations"],
    },
    businessImpact: [
      { metric: "Up to 49%", label: "Less food waste", context: "AI forecasting, replenishment, and logistics optimization in grocery retail (Traxtech / ReFED, 2024)" },
      { metric: "20-30%", label: "Fewer stock-outs", context: "While lowering total inventory - Walmart achieved 30% with AI demand forecasting (Capgemini, 2024)" },
      { metric: "10-20%", label: "Lower inventory carrying costs", context: "Through better demand-supply matching without compromising service levels (Capgemini / McKinsey)" },
    ],
    graphFile: "inventory-optimization-expiry",
  },
  {
    id: 2,
    name: "DSD Copilot for Field Operations",
    slug: "dsd-copilot",
    industry: "Retail & FMCG",
    tagline: "Route intelligence, account management, and shelf compliance for field reps",
    icon: "Truck",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format",
    description: "Direct Store Delivery reps manage dozens of accounts daily with minimal context on each store's unique patterns. The Context Graph connects route data, store planograms, order history, promotional calendars, and competitor shelf positioning to give every rep an AI copilot that knows each store as well as a veteran driver would.",
    contextGraphExample: "Routes -> store accounts -> order history -> planograms -> promotional schedules -> competitor positioning -> delivery constraints. Links in-store execution data to distribution center inventory. Intelligence layer adds: Route Optimization Rules, Shelf Reset Protocols, learned delivery and weather-adjustment skills from route managers and field reps.",
    keyCapabilities: {
      connects: ["Route stops to real-time sell-through rates and shelf compliance scores", "Promotional calendars to store planograms and competitor positioning"],
      analyzes: ["Store-level restock urgency based on delivery cadence and demand", "Shelf compliance gaps versus top-performing stores"],
      recommends: ["Weather-adjusted route reprioritization", "Opportunistic placement decisions based on surplus inventory and nearby demand"],
    },
    businessImpact: [
      { metric: "20-30%", label: "Lower fuel and route costs", context: "Through AI-optimized routing and stop prioritization (GM Insights, 2024)" },
      { metric: "50% to 75%", label: "Shelf compliance accuracy improvement", context: "DSD companies improved compliance accuracy from ~50% to over 75% with digital tools (Locus / CigoTracker)" },
      { metric: "1 day/week", label: "Operational overhead eliminated", context: "AI routing fitted a 6-day workload into 5 days in field service benchmarks (FieldCamp, 2024)" },
    ],
    graphFile: "dsd-copilot",
  },
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
  {
    id: 4,
    name: "Production Planning & Yield Optimization",
    slug: "production-planning-yield",
    industry: "Battery Manufacturing",
    tagline: "Optimize cell production scheduling, track yield, predict quality issues",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop&auto=format",
    description: "Battery cell manufacturing involves tightly coupled processes where a quality deviation at one stage cascades through the entire line. The Context Graph connects electrode preparation parameters, cell assembly conditions, formation cycling data, and quality inspection results across production lines, shifts, and material batches, enabling AI to identify the root cause of yield losses and predict quality issues before cells complete the formation process.",
    contextGraphExample: "Production lines -> process stages (mixing, coating, calendering, assembly, formation) -> equipment parameters -> material batches -> shift schedules -> quality inspection data -> yield metrics -> customer specifications. Intelligence layer adds: Yield Deviation Investigation, Line Changeover Protocols, learned calibration and shift-adjustment skills from production managers and quality engineers.",
    keyCapabilities: {
      connects: ["Electrode preparation parameters to cell assembly conditions and formation data", "Material batch IDs to equipment settings, shift schedules, and quality results"],
      analyzes: ["Cross-stage correlation between early parameters and final yield", "Shift-level yield patterns and equipment calibration drift"],
      recommends: ["Root cause identification with specific parameter and batch attribution", "Capacity expansion priorities with bottleneck stage identification"],
    },
    businessImpact: [
      { metric: "Up to 16%", label: "Higher cell manufacturing yield", context: "Predictive quality analytics in battery cell production (Elisa IndustriQ case study)" },
      { metric: "45%", label: "Reduction in production waste", context: "After deploying AI-based inspection tools in manufacturing (EnergyX / Springer, 2025)" },
      { metric: "20%", label: "Shorter R&D and production cycles", context: "Early adopters of AI-powered quality prediction in manufacturing (Allchemist / Innova365)" },
    ],
    graphFile: "production-planning-yield",
  },
  {
    id: 5,
    name: "Formulation & Recipe Management",
    slug: "formulation-recipe-management",
    industry: "Chemical Manufacturing",
    tagline: "Manage chemical formulations, track ingredient sourcing, handle substitutions when suppliers change",
    icon: "FlaskConical",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop&auto=format",
    description: "Chemical manufacturers manage hundreds of formulations, each with specific ingredient requirements, supplier qualifications, and regulatory constraints. When a supplier changes or a raw material becomes unavailable, the ripple effects across the product portfolio are difficult to assess manually. The Context Graph connects formulations to ingredients, qualified suppliers, production processes, and regulatory requirements, enabling AI to instantly identify impact and recommend substitutions.",
    contextGraphExample: "Formulations -> ingredients with concentration ranges -> qualified suppliers per ingredient -> regulatory constraints (REACH, TSCA) -> production processes -> customer specifications -> pricing and margin models. Intelligence layer adds: Ingredient Substitution Approval workflows, Formulation Change Control, learned surfactant substitution and customer spec override skills from R&D chemists and regulatory specialists.",
    keyCapabilities: {
      connects: ["Formulations to ingredients, qualified suppliers, and regulatory constraints", "Customer specifications to formulation parameters and tolerance bands"],
      analyzes: ["Cross-product impact when any single ingredient or supplier changes", "Substitution viability based on qualification status and regulatory clearance"],
      recommends: ["Prioritized substitution plans with customer notification requirements", "Supplier qualification timelines for alternative ingredients"],
    },
    businessImpact: [
      { metric: "85%", label: "Faster BOM creation and impact analysis", context: "AI-driven bill of materials generation vs. manual processes (Innova365, 2025)" },
      { metric: "20%", label: "Shorter R&D reformulation cycles", context: "Early adopters of AI-powered formulation systems in chemical industry (Allchemist / ChemCopilot)" },
      { metric: "Minutes vs. days", label: "For ingredient substitution analysis", context: "AI predicts viable formulation alternatives instantly vs. manual experimentation (ChemCopilot / Innova365)" },
    ],
    graphFile: "formulation-recipe-management",
  },
  {
    id: 6,
    name: "Safety & Environmental Compliance",
    slug: "safety-environmental-compliance",
    industry: "Chemical Manufacturing",
    tagline: "Map chemicals to safety requirements, track permits, predict regulatory impact on operations",
    icon: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&auto=format",
    description: "Chemical plants operate under layered environmental permits, safety regulations, and reporting requirements that connect to specific chemicals, processes, and emission points. The Context Graph maps chemicals to their safety data, production processes to their emission profiles, and permits to their specific conditions and renewal dates, enabling AI to predict compliance risks and optimize reporting.",
    contextGraphExample: "Chemicals -> SDS data -> storage requirements -> production processes -> emission points -> permits (air, water, waste) -> reporting requirements -> inspection schedules -> incident history. Intelligence layer adds: Emission Threshold Alerts, Chemical Incident Response Protocols, learned Tier II collection timing and chlorine response skills from EHS managers and plant directors.",
    keyCapabilities: {
      connects: ["Chemicals to SDS data, storage requirements, and emission profiles", "Production processes to permits, thresholds, and reporting deadlines"],
      analyzes: ["Emission threshold proximity when production volumes change", "Data gaps in compliance reporting with days-to-deadline urgency"],
      recommends: ["Incident response protocols with equipment-specific isolation sequences", "Permit review triggers before production scaling decisions"],
    },
    businessImpact: [
      { metric: "20-40%", label: "Less time on compliance activities", context: "EHS software benchmarks for reporting and tracking automation (Verdantix / VelocityEHS)" },
      { metric: "30%", label: "Reduction in safety incident rate", context: "Manufacturing clients using EHS automation platforms (Benchmark Gensuite case study)" },
      { metric: "$200K+", label: "Annual savings in penalties and lost productivity", context: "Manufacturing benchmark for compliance automation ROI (EHS Momentum, 2024)" },
    ],
    graphFile: "safety-environmental-compliance",
  },
  {
    id: 7,
    name: "Plant Maintenance & Reliability",
    slug: "plant-maintenance-reliability",
    industry: "Chemical Manufacturing",
    tagline: "Connect equipment to production lines, predict failures, optimize maintenance schedules",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=500&fit=crop&auto=format",
    description: "Maintenance decisions in chemical plants have cascading effects - taking a heat exchanger offline affects the reactor it feeds, the distillation column downstream, and the product lines that depend on all of them. The Context Graph maps equipment dependencies, production line configurations, spare parts inventory, and maintenance history, enabling AI to schedule maintenance that minimizes production impact and predict failures before they cause unplanned downtime.",
    contextGraphExample: "Equipment assets -> production line configurations -> process dependencies -> maintenance history -> spare parts inventory -> work order history -> production schedules -> failure mode data. Intelligence layer adds: Maintenance Scheduling Rules, Failure Mode Analysis, learned vibration threshold and turnaround sequencing skills from maintenance managers and reliability engineers.",
    keyCapabilities: {
      connects: ["Equipment to production line dependencies, spare parts, and maintenance history", "Vibration and sensor data to failure mode patterns and historical incidents"],
      analyzes: ["Learned failure thresholds stricter than manufacturer specifications", "Downstream production impact of taking any asset offline"],
      recommends: ["Bundled maintenance windows that minimize separate shutdowns", "Spare parts pre-ordering based on early degradation signals"],
    },
    businessImpact: [
      { metric: "30-50%", label: "Less unplanned downtime", context: "Predictive maintenance benchmark across manufacturing sectors (McKinsey / Deloitte)" },
      { metric: "15-25%", label: "Shorter turnaround durations", context: "AI-based scheduling vs. manual turnaround planning in chemical and refining (McKinsey)" },
      { metric: "20-40%", label: "Longer equipment lifespan", context: "Condition-based maintenance timing vs. fixed schedules (McKinsey)" },
    ],
    graphFile: "plant-maintenance-reliability",
  },
  {
    id: 8,
    name: "Drug Supply Chain Integrity",
    slug: "drug-supply-chain-integrity",
    industry: "Pharmaceutical",
    tagline: "Track ingredients through suppliers, monitor cold chain, ensure lot traceability from API to patient",
    icon: "Pill",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=500&fit=crop&auto=format",
    description: "Pharmaceutical supply chains require complete traceability from active pharmaceutical ingredients through formulation, manufacturing, packaging, and distribution to the patient. The Context Graph maps API suppliers, excipient sources, manufacturing sites, quality test results, lot numbers, and distribution channels, enabling AI to trace any quality issue to its origin and predict supply disruptions across the product portfolio.",
    contextGraphExample: "APIs -> excipients -> qualified suppliers -> manufacturing sites -> batch/lot records -> quality test results -> stability data -> distribution channels -> cold chain requirements -> regulatory filings (DMFs, ANDAs, NDAs). Intelligence layer adds: Quality Deviation Investigation, Lot Recall Execution Workflows, learned API batch trace and cold chain response skills from quality directors and supply chain managers.",
    keyCapabilities: {
      connects: ["API lots through manufacturing, packaging, and distribution to patient endpoints", "Supplier quality scores to FDA inspection history and qualification status"],
      analyzes: ["Downstream batch exposure when any API lot fails quality testing", "Cold chain excursion severity based on duration and product sensitivity"],
      recommends: ["Recall scope with precise lot numbers and current distribution locations", "Supplier audit triggers and backup qualification priorities"],
    },
    businessImpact: [
      { metric: "50-95%", label: "Smaller recall scope with traceability", context: "Lot-level traceability reduces recall scope vs. broad precautionary recalls (ITC / Kearney)" },
      { metric: "<4 hours", label: "Full traceability demonstration", context: "GFSI scheme expectation for complete trace exercises (BRCGS / SQF standards)" },
      { metric: "30-45%", label: "Faster incident response", context: "Organizations with AI compliance automation programs (Deloitte / BP-3, 2024)" },
    ],
    graphFile: "drug-supply-chain-integrity",
  },
  {
    id: 9,
    name: "Allergen & Ingredient Compliance",
    slug: "allergen-ingredient-compliance",
    industry: "Food & Beverage",
    tagline: "Manage recipes, track allergens across the supply chain, handle recalls with precision",
    icon: "Wheat",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=500&fit=crop&auto=format",
    description: "Food manufacturers must track allergens across recipes, ingredient suppliers, production lines, and labeling - where a single undeclared allergen can trigger recalls affecting millions of units. The Context Graph connects recipes to ingredients, suppliers to allergen certifications, production lines to cleaning schedules, and products to labeling requirements, enabling AI to catch allergen risks before products ship and execute targeted recalls when needed.",
    contextGraphExample: "Recipes -> ingredients -> allergen profiles -> supplier certifications -> production lines -> cleaning protocols -> shared equipment -> labeling requirements -> distribution and retail endpoints. Intelligence layer adds: Allergen Cross-Contact Checks, Recall Scoping Workflows, learned line changeover cleaning and label cross-check skills from food safety managers and R&D leads.",
    keyCapabilities: {
      connects: ["Recipes to ingredients, allergen profiles, and production line cleaning protocols", "Supplier allergen certifications to expiry dates and product labels"],
      analyzes: ["Cross-contact risk from shared production lines and cleaning gaps", "Label accuracy when any ingredient or supplier changes"],
      recommends: ["Recall scoping with lot-level precision including cross-contact products", "Reformulation paths with pre-qualified allergen-free alternatives"],
    },
    businessImpact: [
      { metric: "50-95%", label: "Smaller recall scope", context: "Precision lot-level tracing vs. broad precautionary recalls (International Trade Centre / Kearney)" },
      { metric: "<4 hours", label: "End-to-end trace completion", context: "GFSI certification schemes require full traceability demonstrated within 4 hours (BRCGS / SQF)" },
      { metric: "20%", label: "Faster reformulation cycles", context: "AI-powered formulation systems in food and chemical manufacturing (Allchemist / Innova365)" },
    ],
    graphFile: "allergen-ingredient-compliance",
  },
];
