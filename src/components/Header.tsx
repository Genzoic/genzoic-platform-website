import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

import logoLight from "/logos-and-favicons/genzoic-logo-light.png";
import logoDark from "/logos-and-favicons/genzoic-logo-dark.png";

const DEMO_URL = "https://calendar.app.google/DezhnNr993pqnzhx5";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePlatformClick = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById("platform")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#platform");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-6 h-16">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Genzoic"
            className="h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={handlePlatformClick}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Platform
          </button>
          <Link
            to="/solutions"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Solutions
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Book a Demo
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-4 space-y-4">
          <button
            onClick={handlePlatformClick}
            className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            Platform
          </button>
          <Link
            to="/solutions"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            Solutions
          </Link>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-2.5 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Book a Demo
          </a>
        </div>
      )}
    </header>
  );
}
