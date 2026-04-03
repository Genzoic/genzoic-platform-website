import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

import logoLight from "/logos-and-favicons/genzoic-logo-light.png";
import logoDark from "/logos-and-favicons/genzoic-logo-dark.png";
import { DEMO_URL } from "@/lib/constants";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashClick = (id: string) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-slate-950/70 backdrop-blur-2xl backdrop-saturate-150 shadow-sm shadow-slate-200/50 dark:shadow-none">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-6 h-16">
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Genzoic"
            className="h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 shrink-0" aria-label="Desktop navigation">
          <button
            onClick={() => handleHashClick("platform")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Platform
          </button>
          <button
            onClick={() => handleHashClick("solutions")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Solutions
          </button>

          <div className="w-px h-4 bg-slate-300/70 dark:bg-white/10 mx-2" />

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn ml-2 whitespace-nowrap"
          >
            Book a Demo
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-slate-950/85 backdrop-blur-2xl px-4 py-5 space-y-1" aria-label="Mobile navigation">
          <button
            onClick={() => handleHashClick("platform")}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Platform
          </button>
          <button
            onClick={() => handleHashClick("solutions")}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Solutions
          </button>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Contact
          </Link>
          <div className="pt-2">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn w-full justify-center"
            >
              Book a Demo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
