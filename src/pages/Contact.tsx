import { useState, type FormEvent } from "react";
import { Calendar, Send } from "lucide-react";

const DEMO_URL = "https://calendar.app.google/DezhnNr993pqnzhx5";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-white dark:bg-slate-950 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Book a demo to see the Context Graph in action, or send us a note.
          </p>
        </div>
      </section>

      {/* Two columns */}
      <section className="bg-white dark:bg-slate-950 pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Book a Demo */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-600 rounded-xl p-6 md:p-8 flex flex-col">
              <Calendar
                size={28}
                className="text-blue-800 dark:text-blue-400 mb-4"
              />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Book a demo
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 flex-1">
                30 minutes. We will map a slice of your business and show you
                what your AI has been missing.
              </p>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-6 py-3 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Schedule on Google Calendar
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-8">
              <Send
                size={24}
                className="text-slate-500 dark:text-slate-400 mb-4"
              />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Send us a message
              </h3>

              {submitted ? (
                <div className="py-8 text-center">
                  <p className="text-lg font-medium text-slate-900 dark:text-white">
                    Thanks! We will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white border border-slate-200 dark:border-slate-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400 space-x-4">
            <a href="mailto:info@genzoic.com" className="hover:underline">
              info@genzoic.com
            </a>
            <span>&middot;</span>
            <a
              href="https://linkedin.com/company/genzoic"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
