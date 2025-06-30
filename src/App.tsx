
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import AgentDetails from "./pages/AgentDetails";
import OmnichannelSupportAgent from "./pages/OmnichannelSupportAgent";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import AiMarketeerAgent from "./pages/AiMarketeerAgent";
import OrderVerificationAgent from "./pages/OrderVerificationAgent";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/all-agents" element={<Marketplace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/agent/:slug" element={<AgentDetails />} />
          <Route path="/omnichannel-support-agent" element={<OmnichannelSupportAgent />} />
          <Route path="/agent/ai-marketeer-agent" element={<AiMarketeerAgent />} />
          <Route path="/order-verification-agent" element={<OrderVerificationAgent />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
