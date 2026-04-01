import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

import logoLight from "/logos-and-favicons/genzoic-logo-light.png";
import logoDark from "/logos-and-favicons/genzoic-logo-dark.png";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-slate-200/70 dark:border-white/[0.06] bg-white dark:bg-[#05080f]">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="Genzoic"
              className="h-7 mb-3"
            />
            <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
              AI that understands how your business works.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#platform" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-slate-300 dark:text-slate-600">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-300 dark:text-slate-600">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-widest mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://linkedin.com/company/genzoic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/genzoic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200/70 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-600">
          <span>&copy; {new Date().getFullYear()} Genzoic Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
