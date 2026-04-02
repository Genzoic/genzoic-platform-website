import { useState, type FormEvent } from "react";
import { Calendar, Send, ArrowRight, Mail } from "lucide-react";
import { DEMO_URL } from "@/lib/constants";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-soft py-20 md:py-28">
        <div className="hero-dots absolute inset-0 opacity-40" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-[50%] bg-blue-100/60 dark:bg-blue-600/[0.06] blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 md:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-4">
            Let's talk
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Book a demo to see the Context Graph in action, or send us a note.
          </p>
        </div>
      </section>

      {/* Two columns */}
      <section className="bg-white dark:bg-[#05080f] pb-20 md:pb-28 pt-2">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-5">

            {/* Book a Demo */}
            <div className="relative overflow-hidden rounded-2xl p-7 md:p-9 flex flex-col"
              style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f1e35 50%, #0c1a2e 100%)" }}>
              {/* Subtle dot grid inside card */}
              <div className="hero-dots absolute inset-0 opacity-20" />
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #2563eb, #38bdf8, transparent)" }} />

              <div className="relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(59,130,246,0.2)" }}>
                  <Calendar size={20} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Book a demo
                </h3>
                <p className="text-slate-400 mb-8 flex-1 leading-relaxed text-sm">
                  30 minutes. We will map a slice of your business and show you
                  what your AI has been missing. No slides - just your actual
                  business on the graph.
                </p>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn self-start"
                >
                  Schedule on Google Calendar <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-[#0d1628] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-7 md:p-9">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-slate-100 dark:bg-white/[0.06]">
                <Send size={18} className="text-slate-500 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Send us a message
              </h3>

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(5,150,105,0.12)" }}>
                    <span className="text-emerald-500 text-xl">✓</span>
                  </div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    Thanks! We'll be in touch shortly.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    We typically respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-red-400 normal-case tracking-normal">*</span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      placeholder="Jane Smith"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="work-email" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                      Work Email <span className="text-red-400 normal-case tracking-normal">*</span>
                    </label>
                    <input
                      id="work-email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Your company"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Tell us about your project..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="cta-btn w-full justify-center"
                  >
                    Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            <a
              href="mailto:info@genzoic.com"
              className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail size={15} /> info@genzoic.com
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="https://linkedin.com/company/genzoic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
