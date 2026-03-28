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

const DEMO_URL = "https://calendar.app.google/DezhnNr993pqnzhx5";

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

export default function Homepage() {
  return (
    <>
      {/* Section 1: Hero */}
      <section className="bg-white dark:bg-slate-950 py-24 md:py-36">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            AI that actually understands{" "}
            <span className="text-blue-800 dark:text-blue-400">
              how your business works.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Most enterprise AI sits on top of data tables. It can tell you what
            happened. It cannot reason about what to do next. Genzoic builds the
            Context Graph - a living map of how your business actually runs, not
            just the data it generates - so AI can think like someone who
            actually works there.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#how-it-works"
              className="px-6 py-3 rounded-lg font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 transition-colors"
            >
              See How It Works
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: The Problem */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tables don't understand your business
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Enterprises are connecting Snowflake and Databricks to AI
              assistants, hoping the AI will figure out the business. It won't.
              Here is why.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left card - what AI does today */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                What AI does today
              </h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                {[
                  'Answers "what were total sales last quarter?"',
                  "Identifies top-selling products",
                  "Generates trend charts and dashboards",
                  "Runs SQL queries on your data warehouse",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 text-slate-400 dark:text-slate-500 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right card - what AI should do */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-600 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                What AI should be able to do
              </h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                {[
                  "Our lithium supplier just filed for bankruptcy - what products are affected?",
                  "A tornado hit our Memphis plant - which customer orders are at risk?",
                  "New FDA regulation on Ingredient Y in 90 days - what is our exposure?",
                  "If we discontinue Product Z, what happens to our channel commitments?",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight
                      size={18}
                      className="mt-0.5 text-blue-800 dark:text-blue-400 shrink-0"
                    />
                    <span className="italic">&ldquo;{item}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            The knowledge that drives real decisions - supplier dependencies,
            plant capacities, product formulations, distribution channels,
            pricing structures - lives in your people's heads, not in your data
            warehouse. That is the gap.
          </p>
        </div>
      </section>

      {/* Section 3: The Context Graph in Action */}
      <section className="bg-white dark:bg-slate-950 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Context Graph
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A structured map of your business that captures what data
              warehouses cannot - the relationships, dependencies, and logic that
              drive real decisions.
            </p>
          </div>

          {/* Interactive Graph */}
          <div className="mb-16">
            <InteractiveGraph />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-8 border-l-4 border-l-blue-800 dark:border-l-blue-400"
              >
                <card.icon
                  size={24}
                  className="text-blue-800 dark:text-blue-400 mb-4"
                />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-300 mb-4">
                  &ldquo;{card.trigger}&rdquo;
                </p>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {card.chain.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {i > 0 && (
                        <span className="text-blue-800 dark:text-blue-400 shrink-0">
                          &rarr;
                        </span>
                      )}
                      {i === 0 && <span className="shrink-0">&bull;</span>}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section
        id="how-it-works"
        className="bg-slate-50 dark:bg-slate-900/50 py-20 md:py-28"
      >
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Three steps. From data warehouse to autonomous reasoning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: 1,
                title: "Connect your data",
                desc: "Point Genzoic at your existing data sources - Snowflake, Databricks, ERPs, spreadsheets, APIs. We ingest your schema and understand what you have.",
              },
              {
                num: 2,
                title: "Build the Context Graph",
                desc: "We map the relationships your data alone cannot capture - products to suppliers, plants to channels, formulations to ingredients, pricing to contracts. Your business logic, made explicit and traversable.",
              },
              {
                num: 3,
                title: "Deploy AI that reasons",
                desc: "Your team gets AI assistants that trace impact across the graph, simulate scenarios, and surface insights no dashboard can show - because they understand how your business actually works.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-800 dark:bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-5">
                  {step.num}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: The Platform */}
      <section id="platform" className="bg-white dark:bg-slate-950 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              AI assistants powered by the Context Graph
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Every employee gets an AI assistant that understands the business,
              learns from their workflows, and retains knowledge even when people
              move on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: "Dedicated identity",
                desc: "Each assistant gets its own email. CC it on threads. Message it on Slack or Teams. It works where your people already work.",
              },
              {
                icon: Brain,
                title: "Learns over time",
                desc: "Picks up each employee's preferences, workflows, and communication patterns. Gets more useful every week.",
              },
              {
                icon: Puzzle,
                title: "Teachable skills",
                desc: "Comes with built-in capabilities. Employees teach it new skills specific to their role. Skills compound across the organization.",
              },
              {
                icon: Shield,
                title: "Enterprise controls",
                desc: "Role-based access. Full audit trail. Model-agnostic - works with Claude, GPT, Gemini. Your data, your environment.",
              },
              {
                icon: ArrowLeftRight,
                title: "Knowledge retention",
                desc: "When an employee leaves, their assistant stays. Institutional knowledge transfers seamlessly. No more lost context.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <feature.icon
                  size={22}
                  className="text-blue-800 dark:text-blue-400 mb-3"
                />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Implementation Partnership */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built with you, not just for you
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A Context Graph is not a plug-and-play product. It encodes how
              your specific business operates - and getting that right requires
              working alongside your team. We stay until AI is delivering
              measurable results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Map,
                title: "Map your business",
                desc: "We work with your domain experts to map the entities, relationships, and decision logic that define how your business actually runs. Not a generic template - your business, your graph.",
              },
              {
                icon: Wrench,
                title: "Deploy and validate",
                desc: "AI Assistants are configured with role-specific access, connected to your systems, and validated against real operational scenarios before anyone relies on them.",
              },
              {
                icon: TrendingUp,
                title: "Stay until it works",
                desc: "We measure adoption, accuracy, and business impact. We iterate on the graph, refine assistant skills, and expand to new teams - until AI is part of how your company operates, not a side experiment.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-8 border-l-4 border-l-blue-800 dark:border-l-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <card.icon
                  size={22}
                  className="text-blue-800 dark:text-blue-400 mb-3"
                />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            Think of it as forward-deployed engineering for your AI
            transformation. We have skin in the game because your success is our
            success.
          </p>
        </div>
      </section>

      {/* Section 7: Industry Solutions */}
      <section className="bg-white dark:bg-slate-950 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for your industry
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Not generic AI. Purpose-built solutions powered by
              industry-specific Context Graphs. Real depth, real use cases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSolutions.map((solution) => (
              <Link
                key={solution.id}
                to={`/solutions/${solution.slug}`}
                className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors block"
              >
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300">
                  {solution.industry}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {solution.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {solution.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-800 dark:text-blue-400">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 dark:text-blue-400 hover:underline"
            >
              View all solutions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            See your business on the graph
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Book a 30-minute demo. We will map a slice of your business and show
            you what your AI has been missing.
          </p>
          <div className="mt-8">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
