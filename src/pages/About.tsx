
import { Building, Store, Wrench, ChartLine, Cloud, Target, CircleCheck, Headphones, Package, Linkedin, X, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleDiscoveryCall = () => {
    navigate('/contact', { state: { selectedIntent: 'explore' } });
  };

  return (
    <div className="bg-gray-50 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Mission Statement Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Making AI Real for Every Business</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We build intelligent agents and modern data platforms that fit your workflows — not the other way around.
          </p>
        </div>
      </section>

      {/* We've Built Before Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">We've built before. At scale.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Before Genzoic, our team built and scaled some of the most impactful data and AI platforms in the world:
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CircleCheck className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Highmark Credit Bureau (now CRIF Highmark):</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    The world's largest microfinance database, built from scratch — powering millions of credit reports and risk models.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CircleCheck className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">AugmentIQ Data Sciences:</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Creators of MaxIQ, a Spark-Kafka based data engineering platform used by major banks like HDFC and Experian.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CircleCheck className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Fosfor (LTIMindtree):</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    After our acquisition in 2016, we expanded MaxIQ into an enterprise-grade data + AI platform with MLOps and Generative BI capabilities — used by PepsiCo, OTIS, The Salvation Army, Clarios, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Genzoic Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Genzoic Story</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-semibold text-gray-900 mb-8">The Founding Idea</h3>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>From the start of the GenAI wave, we knew general-purpose agents had limits. They were great at broad, horizontal tasks - like marketing or recruiting - but clumsy at navigating the messy, specific workflows real businesses rely on every day.</p>
                  
                  <p className="font-medium text-gray-900">We started Genzoic to solve that.</p>
                  
                  <p>Our mission is to craft custom AI agents that act more like smart new team members than generic bots. We build agents that fit your business, your tools, your rules.</p>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-blue-600">
                    <p className="font-medium text-gray-900 mb-2">The name?</p>
                    <p>Genzoic = GenAI + Cenozoic — the current era we live in. Because this is the age of applied intelligence.</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">It began with a challenge:</p>
                    <p className="italic">"Can you build an AI agent for a real-world ops use case in food delivery?"</p>
                    <p className="mt-3 font-medium text-green-700">30 minutes later, we had two. Today, those agents are live in 20+ distribution centers across 3 cities — automating hours of manual work, every day.</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-3xl">
                    <img 
                      className="w-full h-80 rounded-2xl object-cover shadow-lg" 
                      src="/lovable-uploads/2ca998b7-0f45-461a-883a-2881b88fa85c.png" 
                      alt="Modern startup office with AI development team working"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">20+ Live Agents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem, Solution, Impact cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">The Problem</h4>
              <p className="text-gray-600 leading-relaxed">Businesses needed AI solutions but lacked access to quality expertise, facing high costs and uncertain outcomes.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-2xl transform scale-105 shadow-xl">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Our Solution</h4>
              <p className="text-blue-100 leading-relaxed">A dual approach: expert AI services for complex projects and a curated marketplace for specialized AI agents.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <ChartLine className="text-green-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">The Impact</h4>
              <p className="text-gray-600 leading-relaxed">Democratized AI access, reduced implementation costs, and accelerated business transformation across industries.</p>
            </div>
          </div>

          {/* Services + Marketplace section */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-10 rounded-3xl">
            <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">How Services + Marketplace Work Together</h3>
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mr-4">
                    <Wrench className="text-blue-600 w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-blue-600">AI Services</h4>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">Custom AI development, strategy consulting, and implementation support for complex enterprise needs.</p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CircleCheck className="text-green-500 w-4 h-4 mr-3" />
                    <span>Enterprise-grade solutions</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CircleCheck className="text-green-500 w-4 h-4 mr-3" />
                    <span>Full-service support</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CircleCheck className="text-green-500 w-4 h-4 mr-3" />
                    <span>Strategic consulting</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mr-4">
                    <Store className="text-purple-600 w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-purple-600">Agent Marketplace</h4>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">Ready-to-deploy AI agents for specific business functions, vetted for quality and performance.</p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CircleCheck className="text-green-500 w-4 h-4 mr-3" />
                    <span>Instant deployment</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CircleCheck className="text-green-500 w-4 h-4 mr-3" />
                    <span>Cost-effective solutions</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CircleCheck className="text-green-500 w-4 h-4 mr-3" />
                    <span>Specialized expertise</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to be part of the next wave of AI transformation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already leveraging AI to drive growth, efficiency, and innovation.
          </p>
          <button 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={handleDiscoveryCall}
          >
            Book Free Discovery Call
          </button>
        </div>
      </section>

      <Footer showMarketplaceSection={false} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default About;
