import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, HelpCircle, Check, TrendingUp, ArrowRight } from "lucide-react";
import { solutionsData } from "@/data/solutions";
import InteractiveGraph, { type GraphData } from "@/components/InteractiveGraph";
import { DEMO_URL } from "@/lib/constants";

const graphModules = import.meta.glob<{ default: GraphData }>("@/data/graphs/*.json", { eager: false });

const INDUSTRY_BADGE: Record<string, string> = {
  "Retail & FMCG": "badge-retail",
  "Battery Manufacturing": "badge-battery",
  "Chemical": "badge-chemical",
  "Pharmaceutical": "badge-pharma",
  "Food & Beverage": "badge-food",
  "Energy & Utilities": "badge-energy",
};

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const solution = solutionsData.find((s) => s.slug === slug);
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  useEffect(() => {
    if (!solution?.graphFile) return;
    const key = `/src/data/graphs/${solution.graphFile}.json`;
    const loader = graphModules[key];
    if (!loader) return;
    let cancelled = false;
    loader().then((mod) => {
      if (!cancelled) setGraphData(mod.default);
    });
    return () => { cancelled = true; };
  }, [solution?.graphFile]);

  if (!solution) {
    return (
      <section className="bg-white dark:bg-[#05080f] py-20 md:py-28 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Solution not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          The solution you are looking for does not exist.
        </p>
        <Link to="/solutions" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          Back to Solutions
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-[#05080f] py-12 md:py-20">
        <div className="hero-dots absolute inset-0 opacity-30" />
        <div className="absolute -top-20 left-0 w-125 h-100 rounded-[50%] bg-blue-50/80 dark:bg-blue-600/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          {/* Back nav */}
          <div className="mb-8">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Solutions
            </Link>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${INDUSTRY_BADGE[solution.industry] ?? "bg-slate-100 text-slate-600"}`}>
                {solution.industry}
              </span>
              <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {solution.name}
              </h1>
              <p className="mt-3 text-lg text-blue-600 dark:text-blue-400 font-medium">
                {solution.tagline}
              </p>
              <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                {solution.description}
              </p>
              <div className="mt-7">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
                  Book a Demo <ArrowRight size={14} />
                </a>
              </div>
            </div>
          <div className="md:col-span-2">
              <Link to="/solutions" className="block relative group overflow-hidden rounded-2xl">
                <img
                  src={solution.image}
                  alt={solution.name}
                  className="w-full h-64 md:h-80 object-cover shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">View More</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Context Graph */}
      <section className="section-soft py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
            Context Graph
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            What the Context Graph maps
          </h2>
          <div className="bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 md:p-7 mb-8 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl" style={{ background: "linear-gradient(180deg, #2563eb, #38bdf8, transparent)" }} />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono text-sm pl-3">
              {solution.contextGraphExample}
            </p>
          </div>
          {graphData && <InteractiveGraph data={graphData} />}
        </div>
      </section>

      {/* Example Questions */}
      <section className="bg-white dark:bg-[#05080f] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
            AI Reasoning
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Questions your AI can now answer
          </h2>
          <div className="grid gap-3">
            {solution.exampleQuestions.map((q, i) => (
              <div
                key={i}
                className="feature-card bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(37,99,235,0.1)" }}>
                  <HelpCircle size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-200 italic text-sm leading-relaxed">
                  &ldquo;{q}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="section-soft py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Key capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {solution.keyCapabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(37,99,235,0.12)" }}>
                  <Check size={11} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="bg-white dark:bg-[#05080f] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 dark:text-orange-400 mb-3">
            Business Impact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Expected business impact
          </h2>
          <div className="grid gap-3">
            {solution.businessImpact.map((impact, i) => (
              <div
                key={i}
                className="feature-card bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(234,88,12,0.1)" }}>
                  <TrendingUp size={16} className="text-orange-500 dark:text-orange-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-200 font-medium text-sm leading-relaxed">
                  {impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-dark-section relative overflow-hidden py-20 md:py-24">
        <div className="hero-dots absolute inset-0 opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-[50%] bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            See this in action
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
            Book a 30-minute demo focused on {solution.industry}. We will show
            you what the Context Graph looks like for your business.
          </p>
          <div className="mt-8">
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
              Book a Demo <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
