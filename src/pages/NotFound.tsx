import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-slate-950 py-28 md:py-40 text-center">
      <div className="mx-auto max-w-xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 rounded-lg font-semibold text-sm bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Go to homepage
        </Link>
      </div>
    </section>
  );
}
