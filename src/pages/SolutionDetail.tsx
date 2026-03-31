import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, HelpCircle, Check, TrendingUp } from "lucide-react";
import { solutionsData } from "@/data/solutions";
import InteractiveGraph, { type GraphData } from "@/components/InteractiveGraph";

const graphModules = import.meta.glob<{ default: GraphData }>("@/data/graphs/*.json", { eager: false });

const DEMO_URL = "https://calendar.app.google/DezhnNr993pqnzhx5";

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
      <section className="bg-white dark:bg-slate-950 py-20 md:py-28 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Solution not found
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The solution you are looking for does not exist.
        </p>
        <Link
          to="/solutions"
          className="text-blue-800 dark:text-blue-400 font-medium hover:underline"
        >
          Back to Solutions
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Back nav */}
      <div className="bg-white dark:bg-slate-950 pt-6 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Solutions
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white dark:bg-slate-950 py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300">
                {solution.industry}
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {solution.name}
              </h1>
              <p className="mt-2 text-lg text-blue-800 dark:text-blue-400 font-medium">
                {solution.tagline}
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {solution.description}
              </p>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-6 py-3 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Book a Demo
              </a>
            </div>
            <div className="md:col-span-2">
              <img
                src={solution.image}
                alt={solution.name}
                className="rounded-xl w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Context Graph */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            What the Context Graph maps
          </h2>
          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-8 border-l-4 border-l-blue-800 dark:border-l-blue-400 mb-8">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono text-sm">
              {solution.contextGraphExample}
            </p>
          </div>
          {graphData && <InteractiveGraph data={graphData} />}
        </div>
      </section>

      {/* Example Questions */}
      <section className="bg-white dark:bg-slate-950 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Questions your AI can now answer
          </h2>
          <div className="grid gap-4">
            {solution.exampleQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex items-start gap-4"
              >
                <HelpCircle
                  size={20}
                  className="text-blue-800 dark:text-blue-400 shrink-0 mt-0.5"
                />
                <p className="text-slate-700 dark:text-slate-200 italic">
                  &ldquo;{q}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Key capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {solution.keyCapabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-start gap-3"
              >
                <Check
                  size={18}
                  className="text-blue-800 dark:text-blue-400 shrink-0 mt-0.5"
                />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="bg-white dark:bg-slate-950 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Expected business impact
          </h2>
          <div className="grid gap-4">
            {solution.businessImpact.map((impact, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex items-start gap-4"
              >
                <TrendingUp
                  size={20}
                  className="text-fuchsia-600 dark:text-fuchsia-400 shrink-0 mt-0.5"
                />
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  {impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            See this in action
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Book a 30-minute demo focused on {solution.industry}. We will show
            you what the Context Graph looks like for your business.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-8 py-3.5 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </section>
    </>
  );
}
