import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { solutionsData, industries } from "@/data/solutions";

const DEMO_URL = "https://calendar.app.google/DezhnNr993pqnzhx5";

export default function Solutions() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? solutionsData
      : solutionsData.filter((s) => s.industry === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            Industry Solutions
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Purpose-built AI solutions powered by industry-specific Context
            Graphs. Each solution maps the relationships that matter for your
            vertical - so AI can reason about your business, not just your data.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white dark:bg-slate-950 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["All", ...industries].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === tab
                    ? "bg-blue-800 dark:bg-blue-600 text-white"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Solution grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((solution) => (
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

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Don't see your industry? We build custom Context Graphs for any
              vertical.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
