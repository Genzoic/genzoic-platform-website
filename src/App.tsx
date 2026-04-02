import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Homepage from "@/pages/Homepage";
import SolutionDetail from "@/pages/SolutionDetail";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function HashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <HashScroll />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
