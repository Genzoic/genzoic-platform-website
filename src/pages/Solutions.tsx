import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { solutionsData, industries } from "@/data/solutions";
import { DEMO_URL } from "@/lib/constants";

const INDUSTRY_BADGE: Record<string, string> = {
  "Retail & FMCG":          "badge-retail",
  "Battery Manufacturing":  "badge-battery",
  "Chemical":               "badge-chemical",
  "Pharmaceutical":         "badge-pharma",
  "Food & Beverage":        "badge-food",
  "Energy & Utilities":     "badge-energy",
};

const FILTER_ACCENT: Record<string, string> = {
  "Retail & FMCG":          "#2563eb",
  "Battery Manufacturing":  "#15803d",
  "Chemical":               "#7e22ce",
  "Pharmaceutical":         "#b91c1c",
  "Food & Beverage":        "#b45309",
  "Energy & Utilities":     "#c2410c",
};

export default function Solutions() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? solutionsData
      : solutionsData.filter((s) => s.industry === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-soft py-20 md:py-28">
        <div className="hero-dots absolute inset-0 opacity-40" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-[50%] bg-blue-100/60 dark:bg-blue-600/[0.06] blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-4">
            Purpose-Built AI
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            Industry Solutions
          </h1>
          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Purpose-built AI solutions powered by industry-specific Context
            Graphs. Each solution maps the relationships that matter for your
            vertical — so AI can reason about your business, not just your data.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white dark:bg-[#05080f] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveFilter("All")}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={activeFilter === "All" ? {
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              } : {
                background: "transparent",
                color: "#64748b",
                border: "1.5px solid #e2e8f0",
              }}
            >
              All
            </button>
            {industries.map((tab) => {
              const isActive = activeFilter === tab;
              const accent = FILTER_ACCENT[tab] ?? "#2563eb";
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={isActive ? {
                    background: accent,
                    color: "#fff",
                    boxShadow: `0 0 18px ${accent}50`,
                  } : {
                    background: "transparent",
                    color: "#64748b",
                    border: "1.5px solid #e2e8f0",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Solution grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((solution) => (
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

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
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
    </>
  );
}
