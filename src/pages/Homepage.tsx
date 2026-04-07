import { Link } from "react-router-dom";
import { DEMO_URL } from "@/lib/constants";
import { solutionsData } from "@/data/solutions";
import InteractiveGraph from "@/components/InteractiveGraph";
import { AlertTriangle, Building2, Scale, Mail, Shield, ArrowRight, Check, Map, Wrench, TrendingUp, Box, GitBranch, Sparkles, User, GraduationCap, MessageSquare, Eye, FileStack, Network, Crown, UserMinus, BarChart3 } from "lucide-react";

const INDUSTRY_BADGE: Record<string, string> = {
  "Retail & FMCG": "badge-retail",
  "Battery Manufacturing": "badge-battery",
  "Chemical": "badge-chemical",
  "Pharmaceutical": "badge-pharma",
  "Food & Beverage": "badge-food",
};

export default function Homepage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 min-h-[calc(100dvh-4rem)] flex flex-col justify-center">
        {/* Dot grid */}
        <div className="hero-dots absolute inset-0 opacity-70" />

        {/* Gradient orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full bg-blue-200/50 dark:bg-blue-500/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-200/40 dark:bg-sky-400/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-0 w-72 h-72 rounded-full bg-indigo-100/30 dark:bg-indigo-500/6 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            <span className="block">AI that actually understands</span>
            <span className="gradient-text">how your business works.</span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Most enterprise AI sits on top of data tables. It can tell you what
            happened. It cannot reason about what to do next. Genzoic builds the
            Context Graph - a living map of your business structure, workflows,
            and institutional knowledge - so AI can think like someone who
            actually works there.
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
      <section className="section-soft py-20 md:py-28 min-h-dvh flex flex-col justify-center">
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
            {/* Left - what AI does today */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-7 md:p-8">
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

            {/* Right - what AI should do */}
            <div className="bg-linear-to-br from-blue-50 to-sky-50/60 dark:from-blue-950/40 dark:to-slate-900/60 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-7 md:p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-5">
                What AI should be able to do
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Reasons about your business
              </h3>
              <ul className="space-y-3.5 text-slate-700 dark:text-slate-300 text-sm">
                {[
                  "Our lithium supplier just filed for bankruptcy - what products are affected?",
                  "A tornado hit our Memphis plant - which customer orders are at risk?",
                  "New FDA regulation on Ingredient Y in 90 days - what is our exposure?",
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
            The knowledge that drives real decisions - supplier dependencies,
            plant capacities, product formulations, but also the workflows
            nobody documented, the rules people just know, the judgment calls
            that happen in Slack - lives in your people's heads, not in your
            data warehouse. That is the gap.
          </p>
        </div>
      </section>

      {/* ── The Context Graph ─────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-950 py-20 md:py-28 min-h-dvh flex flex-col justify-center">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              The Core Technology
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Context Graph
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              More than a knowledge graph. The Context Graph maps your business
              structure, encodes your workflows, and captures the institutional
              knowledge your people carry - then uses that context to route AI
              to the right action at the right time.
            </p>
          </div>

          {/* Node type cards */}
          <div className="flex gap-3 mb-14 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-5">
            {[
              { icon: Box, color: "#2563EB", title: "Entity Nodes", desc: "Products, suppliers, plants, channels, stores, contracts and how they connect." },
              { icon: GitBranch, color: "#7c3aed", title: "Process Nodes", desc: "Workflows, decision rules, approval chains, escalation paths - how work actually flows." },
              { icon: Sparkles, color: "#059669", title: "Skill Nodes", desc: "Learned behaviors anchored to graph nodes. Taught by employees, learned from patterns, mined from records." },
              { icon: User, color: "#e11d48", title: "People Nodes", desc: "Who teaches what, who owns what, who resolves conflicts. Role, department, RBAC level." },
              { icon: Building2, color: "#d946ef", title: "Department Nodes", desc: "Org hierarchy for skill priority and conflict resolution. CEO overrides dept, dept overrides individual." },
            ].map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-3 min-w-56 md:min-w-0 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 px-4 py-3 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0.5 h-full" style={{ background: card.color }} />
                <card.icon size={18} className="shrink-0 mt-0.5" style={{ color: card.color }} />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{card.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{card.desc}</p>
                </div>
              </div>
            ))}
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
                  { label: "Entity traversal", text: "Raw materials from Supplier X \u2192 products affected \u2192 plants impacted \u2192 customer orders at risk" },
                  { label: "Skill fires", text: "\"Backup Supplier Rule\" (learned from 47 past procurement tickets) recommends switching to Supplier Y. 89% historical success rate." },
                  { label: "Conflict check", text: "Procurement lead's \"lowest cost\" skill conflicts with \"fastest switch\" skill. System escalates to VP Operations (department priority) for resolution." },
                  { label: "People notified", text: "Supply chain VP gets Slack alert with full impact map and recommended action." },
                ],
                accent: "#f97316",
              },
              {
                icon: Building2,
                title: "Plant Disruption",
                trigger: "Tornado shuts down the Memphis plant",
                chain: [
                  { label: "Entity traversal", text: "Products made at Memphis \u2192 downstream inventory \u2192 customer orders and SLA exposure" },
                  { label: "Skill fires", text: "\"Memphis Weather Protocol\" (taught by plant manager) activates \u2014 halt outdoor operations, reroute qualified products to Dallas plant." },
                  { label: "Process node", text: "\"EHS Incident Response\" triggers safety checklist. Plant manager must approve restart." },
                  { label: "Knowledge retained", text: "Plant manager's weather protocol fires even if they are on vacation \u2014 the skill lives on the graph, not in their head." },
                ],
                accent: "#2563eb",
              },
              {
                icon: Scale,
                title: "Regulatory Change",
                trigger: "New FDA regulation on Ingredient Y in 90 days",
                chain: [
                  { label: "Entity traversal", text: "Products containing Ingredient Y \u2192 reformulation paths \u2192 compliant alternative suppliers \u2192 cost impact" },
                  { label: "Skill fires", text: "\"Regulatory Response Playbook\" (learned from 3 past FDA changes via record ingestion) recommends starting reformulation 60 days before deadline." },
                  { label: "People routed", text: "R&D director (formulations) and regulatory affairs lead (compliance) both get structured action items based on their graph responsibilities." },
                  { label: "Result", text: "Not just \"what is affected\" but \"what to do, in what order, based on what worked before.\"" },
                ],
                accent: "#7c3aed",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="feature-card bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-7 overflow-hidden relative"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: card.accent }} />
                <div className="flex items-center justify-center gap-2 mb-4">
                  <card.icon size={22} style={{ color: card.accent }} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm font-medium mb-4" style={{ color: card.accent }}>
                  &ldquo;{card.trigger}&rdquo;
                </p>
                <div className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                  {card.chain.map((step, i) => (
                    <div key={i}>
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{step.label}</span>
                      <p className="mt-0.5 text-xs leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Knowledge Gets Captured ──────────────────────────────────────── */}
      <section className="section-soft py-20 md:py-28 min-h-dvh flex flex-col justify-center">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              The Differentiator
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Four ways your AI gets smarter
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Other platforms mine your records. We do that too - plus three more
              ways to capture the knowledge that records never contain. All four
              modes produce structured skills anchored to the Context Graph.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: GraduationCap,
                mode: "Mode 1",
                title: "Employees teach it",
                desc: "An employee says \"I want to teach you something\" and walks through a workflow. The assistant asks clarifying questions, confirms the logic, and creates a structured skill anchored to the right graph nodes. The highest quality knowledge capture - intentional, explicit, complete.",
                accent: "#10b981",
              },
              {
                icon: MessageSquare,
                mode: "Mode 2",
                title: "It learns from corrections",
                desc: "During normal work, employees correct the assistant. \"No, we stopped using that supplier - quality issues in 2023.\" That correction becomes a skill on the supplier node. Natural, no extra effort required.",
                accent: "#3b82f6",
              },
              {
                icon: Eye,
                mode: "Mode 3",
                title: "It observes and asks",
                desc: "The assistant sits in Slack channels, CC'd on emails. When it detects a pattern, it asks: \"I noticed you always transfer excess dairy from Store 7 to Store 9. Is there a reason?\" Employee validates, it becomes a skill.",
                accent: "#8b5cf6",
              },
              {
                icon: FileStack,
                mode: "Mode 4",
                title: "It mines your records",
                desc: "Ingest historical emails, tickets, case files. Extract patterns at scale. \"Based on 500 resolved tickets, when a supplier is late by 3+ days, 78% of the time the team switches to the backup.\" Works at volume in ticket-rich environments.",
                accent: "#f97316",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="feature-card bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-7 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0.5 h-full" style={{ background: card.accent }} />
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${card.accent}20`, color: card.accent }}>
                    {card.mode}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${card.accent}15` }}>
                    <card.icon size={19} style={{ color: card.accent }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-slate-400 dark:text-slate-500 max-w-3xl mx-auto text-sm">
            Competitors do Mode 4 only. We do all four. In industries where
            critical knowledge never touches a digital system  -
            manufacturing, construction, field ops - Modes 1–3 are the only
            way to capture it.
          </p>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white dark:bg-slate-950 py-20 md:py-28 min-h-dvh flex flex-col justify-center">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Not a plug-and-play install. A phased build that delivers value in
              week one and compounds from there.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connector line spanning circle 1 - circle 3 centers; circles sit on top via z-10 */}
            <div className="hidden md:block absolute h-px top-5.5 bg-blue-200 dark:bg-blue-800/60"
              style={{ left: "calc(16.67% + 22px)", right: "calc(16.67% + 22px)" }} />

            {[
              {
                num: 1,
                title: "Connect and map",
                badge: "Week 1-2",
                desc: "We connect to your existing systems - ERP, PLM, CRM, data warehouse - and populate the entity graph using an industry-specific template. Products, suppliers, plants, channels, customers. We also pull your org hierarchy from Active Directory or HR systems to set up People and Department nodes. You get a structural map of your business on day one.",
              },
              {
                num: 2,
                title: "Seed and deploy",
                badge: "Week 2-4",
                desc: "We deploy AI assistants to your team, seed process nodes from documented workflows, and run initial record ingestion on your ticket history, emails, and case files to extract patterns. Your team starts working with the assistants immediately. Every correction, every \"no, we do it this way\" becomes a skill on the graph.",
              },
              {
                num: 3,
                title: "Compound",
                badge: "Ongoing",
                desc: "The graph gets smarter every week. Employees teach it new workflows. The assistant observes patterns in Slack and email. Skills accumulate and compound across the organization. Knowledge stays even when people leave. What starts as a structural map becomes institutional memory.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-base relative z-10"
                  style={{ background: "#2563eb" }}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <span className="inline-block text-xs text-slate-400 dark:text-slate-500 mb-3">
                  {step.badge}
                </span>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Platform ──────────────────────────────────────────────────────── */}
      <section id="platform" className="section-soft py-20 md:py-28 min-h-dvh flex flex-col justify-center">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Platform Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Skills that compound. Knowledge that stays.
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Skills are not stored in flat files - they are anchored to the
              Context Graph. When something happens at a node, graph traversal
              finds the relevant skills automatically. The business topology is
              the routing layer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Network,
                title: "Skills anchored to the graph",
                desc: "Each skill is tied to specific entity and process nodes. 500 skills across 50 employees? The graph scopes to only the 8 relevant ones when an event fires. No keyword matching.",
                color: "#2563eb",
              },
              {
                icon: Mail,
                title: "One assistant per employee",
                desc: "Each assistant has its own email, lives in Slack and Teams, mirrors the employee's access controls. Works where your people already work.",
                color: "#7c3aed",
              },
              {
                icon: Crown,
                title: "Org-aware conflict resolution",
                desc: "CEO-level skills override department-level, which override individual-level. The org hierarchy in the graph provides the mechanism. Conflicts surface to the right decision-maker automatically.",
                color: "#0891b2",
              },
              {
                icon: Shield,
                title: "Enterprise controls",
                desc: "Role-based access. Full audit trail on every skill invocation. Model-agnostic - works with Claude, GPT, Gemini. Your data, your environment.",
                color: "#059669",
              },
              {
                icon: UserMinus,
                title: "Knowledge survives turnover",
                desc: "When an employee leaves, every skill they created stays anchored to the graph. The system generates a handover report: which skills, which entities, who should review.",
                color: "#d97706",
              },
              {
                icon: BarChart3,
                title: "Skills get smarter over time",
                desc: "Every invocation is tracked. Was the skill useful? Did the employee override it? Invocation data feeds back into skill ranking. Low-value skills decay. High-value skills get promoted.",
                color: "#e11d48",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="feature-card bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6"
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

          <p className="mt-10 text-center text-slate-400 dark:text-slate-500 max-w-2xl mx-auto text-sm">
            We build the brain. The assistant is one way to use it.
          </p>
        </div>
      </section>

      {/* ── Implementation Partnership ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-950 py-20 md:py-28 min-h-dvh flex flex-col justify-center">
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
              your specific business operates - and getting that right requires
              working alongside your team.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: Map,
                title: "Map your business",
                desc: "We work with your domain experts to map the entities, relationships, and decision logic that define how your business actually runs. Not a generic template - your business, your graph.",
                accent: "#2563eb",
              },
              {
                icon: Wrench,
                title: "Deploy and validate",
                desc: "AI Assistants are configured with role-specific access, connected to your systems, and validated against real operational scenarios before anyone relies on them.",
                accent: "#7c3aed",
              },
              {
                icon: TrendingUp,
                title: "Stay until it works",
                desc: "We measure adoption, accuracy, and business impact. We iterate on the graph, refine assistant skills, and expand to new teams - until AI is part of how your company operates.",
                accent: "#0891b2",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="feature-card bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-7 relative overflow-hidden"
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
      <section id="solutions" className="section-soft py-20 md:py-28 min-h-dvh flex flex-col justify-center">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
              Industry Solutions
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for your industry
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
              Purpose-built AI solutions powered by industry-specific
              Context Graphs. Each solution maps the relationships that
              matter for your vertical - so AI can reason about your
              business, not just your data.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutionsData.map((solution) => (
              <Link
                key={solution.id}
                to={`/solutions/${solution.slug}`}
                className="feature-card block bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 relative group transition-all"
              >
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${INDUSTRY_BADGE[solution.industry] ?? "bg-slate-100 text-slate-600"}`}>
                  {solution.industry}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {solution.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  {solution.tagline}
                </p>
                <span className="absolute bottom-6 right-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline transition-all">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-5 text-sm">
              Don't see your industry? We build custom Context Graphs for any vertical.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Talk to us <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="cta-dark-section relative overflow-hidden py-24 md:py-32">
        {/* Dot grid on dark background */}
        <div className="hero-dots absolute inset-0 opacity-30" />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            See what your AI{" "}
            <span className="gradient-text">has been missing</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Book a 30-minute call. We will walk you through a Context Graph
            built for your industry and identify where your teams are losing
            critical knowledge today.
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
