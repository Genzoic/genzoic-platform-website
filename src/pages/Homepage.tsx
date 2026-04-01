import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  Scale,
  Mail,
  Brain,
  Puzzle,
  Shield,
  ArrowLeftRight,
  ArrowRight,
  Check,
  Map,
  Wrench,
  TrendingUp,
} from "lucide-react";
import { solutionsData } from "@/data/solutions";
import InteractiveGraph from "@/components/InteractiveGraph";
import { DEMO_URL } from "@/lib/constants";

const FEATURED_SLUGS = [
  "inventory-optimization-expiry",
  "supply-chain-risk-monitor",
  "formulation-recipe-management",
  "drug-supply-chain-integrity",
  "allergen-ingredient-compliance",
  "asset-performance-management",
];

const featuredSolutions = solutionsData.filter((s) =>
  FEATURED_SLUGS.includes(s.slug)
);

const INDUSTRY_BADGE: Record<string, string> = {
  "Retail & FMCG":          "badge-retail",
  "Battery Manufacturing":  "badge-battery",
  "Chemical":               "badge-chemical",
  "Pharmaceutical":         "badge-pharma",
  "Food & Beverage":        "badge-food",
  "Energy & Utilities":     "badge-energy",
};

export default function Homepage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white dark:bg-[#05080f] py-16">
        {/* Dot grid */}
        <div className="hero-dots absolute inset-0 opacity-70" />

        {/* Gradient orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-[50%] bg-blue-200/50 dark:bg-blue-500/[0.12] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-200/40 dark:bg-sky-400/[0.08] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-0 w-72 h-72 rounded-full bg-indigo-100/30 dark:bg-indigo-500/[0.06] blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            <span className="block">AI that actually understands</span>
            <span className="gradient-text">how your business works.</span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Most enterprise AI sits on top of data tables. It can tell you what
            happened. It cannot reason about what to do next. Genzoic builds the
            Context Graph — a living map of how your business actually runs — so
            AI can think like someone who actually works there.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#how-it-works" className="ghost-btn">
              See How It Works
            </a>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
              Book a Demo <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────────────────────────── */}
      <section className="section-soft py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tables don't understand your business
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Enterprises are connecting Snowflake and Databricks to AI
              assistants, hoping the AI will figure out the business. It won't.
              Here is why.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Left — what AI does today */}
            <div className="bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-7 md:p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-5">
                What AI does today
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Answers questions about data
              </h3>
              <ul className="space-y-3.5 text-slate-600 dark:text-slate-300 text-sm">
                {[
                  'Returns total sales figures for last quarter',
                  'Identifies top-selling products by revenue',
                  'Generates trend charts and dashboards',
                  'Runs SQL queries on your data warehouse',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-0.5 text-slate-300 dark:text-slate-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — what AI should do */}
            <div className="bg-gradient-to-br from-blue-50 to-sky-50/60 dark:from-blue-950/40 dark:to-slate-900/60 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-7 md:p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-5">
                What AI should be able to do
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Reasons about your business
              </h3>
              <ul className="space-y-3.5 text-slate-700 dark:text-slate-300 text-sm">
                {[
                  "Our lithium supplier just filed for bankruptcy — what products are affected?",
                  "A tornado hit our Memphis plant — which customer orders are at risk?",
                  "New FDA regulation on Ingredient Y in 90 days — what is our exposure?",
                  "If we discontinue Product Z, what happens to our channel commitments?",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight size={15} className="mt-0.5 text-blue-500 dark:text-blue-400 shrink-0" />
                    <span className="italic text-slate-600 dark:text-slate-300">&ldquo;{item}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-500 dark:text-slate-500 max-w-3xl mx-auto text-sm leading-relaxed">
            The knowledge that drives real decisions — supplier dependencies,
            plant capacities, product formulations, distribution channels,
            pricing structures — lives in your people's heads, not in your data
            warehouse. That is the gap.
          </p>
        </div>
      </section>

      {/* ── The Context Graph ─────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#05080f] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              The Core Technology
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Context Graph
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              A structured map of your business that captures what data
              warehouses cannot — the relationships, dependencies, and logic that
              drive real decisions.
            </p>
          </div>

          <div className="mb-16">
            <InteractiveGraph />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: AlertTriangle,
                title: "Supplier Disruption",
                trigger: "Supplier X filed for bankruptcy",
                chain: [
                  "Raw materials sourced exclusively from Supplier X",
                  "Products that depend on those materials",
                  "Plants where those products are manufactured",
                  "Customer orders at risk of delay",
                  "Alternative suppliers, lead times, and cost impact",
                ],
                accent: "#f97316",
              },
              {
                icon: Building2,
                title: "Plant Disruption",
                trigger: "Tornado shuts down the Memphis plant",
                chain: [
                  "Product lines running through Memphis",
                  "Current downstream inventory levels",
                  "Customer orders affected and SLA exposure",
                  "Rerouting options to Dallas plant",
                  "Capacity gap and timeline to resume",
                ],
                accent: "#2563eb",
              },
              {
                icon: Scale,
                title: "Regulatory Change",
                trigger: "New regulation on Ingredient Y in 90 days",
                chain: [
                  "Products containing Ingredient Y",
                  "Reformulation paths and R&D timelines",
                  "Compliant alternative suppliers",
                  "Cost impact across the product portfolio",
                  "Customer communication requirements",
                ],
                accent: "#7c3aed",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="feature-card bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 md:p-7 overflow-hidden relative"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }} />
                <card.icon size={22} className="mb-4" style={{ color: card.accent }} />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: card.accent }}>
                  &ldquo;{card.trigger}&rdquo;
                </p>
                <div className="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                  {card.chain.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {i > 0 && <span className="text-slate-300 dark:text-slate-600 shrink-0">→</span>}
                      {i === 0 && <span className="text-slate-300 dark:text-slate-600 shrink-0">·</span>}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="section-soft py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              Three steps. From data warehouse to autonomous reasoning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connector line spanning circle 1 → circle 3 centers; circles sit on top via z-10 */}
            <div className="hidden md:block absolute h-px top-[22px] bg-blue-200 dark:bg-blue-800/60"
              style={{ left: "calc(16.67% + 22px)", right: "calc(16.67% + 22px)" }} />

            {[
              {
                num: 1,
                title: "Connect your data",
                desc: "Point Genzoic at your existing data sources — Snowflake, Databricks, ERPs, spreadsheets, APIs. We ingest your schema and understand what you have.",
              },
              {
                num: 2,
                title: "Build the Context Graph",
                desc: "We map the relationships your data alone cannot capture — products to suppliers, plants to channels, formulations to ingredients. Your business logic, made explicit and traversable.",
              },
              {
                num: 3,
                title: "Deploy AI that reasons",
                desc: "Your team gets AI assistants that trace impact across the graph, simulate scenarios, and surface insights no dashboard can show — because they understand how your business works.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-base relative z-10"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", boxShadow: "0 0 24px rgba(59,130,246,0.35)" }}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Platform ──────────────────────────────────────────────────────── */}
      <section id="platform" className="bg-white dark:bg-[#05080f] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Platform Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              AI assistants powered by the Context Graph
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Every employee gets an AI assistant that understands the business,
              learns from their workflows, and retains knowledge even when people
              move on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Mail,
                title: "Dedicated identity",
                desc: "Each assistant gets its own email. CC it on threads. Message it on Slack or Teams. It works where your people already work.",
                color: "#2563eb",
              },
              {
                icon: Brain,
                title: "Learns over time",
                desc: "Picks up each employee's preferences, workflows, and communication patterns. Gets more useful every week.",
                color: "#7c3aed",
              },
              {
                icon: Puzzle,
                title: "Teachable skills",
                desc: "Comes with built-in capabilities. Employees teach it new skills specific to their role. Skills compound across the organization.",
                color: "#0891b2",
              },
              {
                icon: Shield,
                title: "Enterprise controls",
                desc: "Role-based access. Full audit trail. Model-agnostic — works with Claude, GPT, Gemini. Your data, your environment.",
                color: "#059669",
              },
              {
                icon: ArrowLeftRight,
                title: "Knowledge retention",
                desc: "When an employee leaves, their assistant stays. Institutional knowledge transfers seamlessly. No more lost context.",
                color: "#d97706",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="feature-card bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${feature.color}15` }}>
                  <feature.icon size={19} style={{ color: feature.color }} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Implementation Partnership ─────────────────────────────────────────── */}
      <section className="section-soft py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built with you, not just for you
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              A Context Graph is not a plug-and-play product. It encodes how
              your specific business operates — and getting that right requires
              working alongside your team.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: Map,
                title: "Map your business",
                desc: "We work with your domain experts to map the entities, relationships, and decision logic that define how your business actually runs. Not a generic template — your business, your graph.",
                accent: "#2563eb",
              },
              {
                icon: Wrench,
                title: "Deploy and validate",
                desc: "AI Assistants are configured with role-specific access, connected to your systems, and validated against real operational scenarios before anyone relies on them.",
                accent: "#0891b2",
              },
              {
                icon: TrendingUp,
                title: "Stay until it works",
                desc: "We measure adoption, accuracy, and business impact. We iterate on the graph, refine assistant skills, and expand to new teams — until AI is part of how your company operates.",
                accent: "#059669",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="feature-card bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-7 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0.5 h-full rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${card.accent}, transparent)` }} />
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${card.accent}15` }}>
                  <card.icon size={19} style={{ color: card.accent }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-slate-400 dark:text-slate-500 max-w-2xl mx-auto text-sm">
            Think of it as forward-deployed engineering for your AI
            transformation. We have skin in the game because your success is our
            success.
          </p>
        </div>
      </section>

      {/* ── Industry Solutions ────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#05080f] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Industry Solutions
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for your industry
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Not generic AI. Purpose-built solutions powered by
              industry-specific Context Graphs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSolutions.map((solution) => (
              <Link
                key={solution.id}
                to={`/solutions/${solution.slug}`}
                className="feature-card block bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 group"
              >
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${INDUSTRY_BADGE[solution.industry] ?? "bg-slate-100 text-slate-600"}`}>
                  {solution.industry}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {solution.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {solution.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              View all 13 solutions <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="cta-dark-section relative overflow-hidden py-24 md:py-32">
        {/* Dot grid on dark background */}
        <div className="hero-dots absolute inset-0 opacity-30" />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-[50%] bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            See your business on{" "}
            <span className="gradient-text">the graph</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Book a 30-minute demo. We will map a slice of your business and show
            you what your AI has been missing.
          </p>
          <div className="mt-10">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Book a Demo <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
