
import { Building, Store, Wrench, ChartLine, Cloud, Target, CircleCheck, Headphones, Package, ArrowUp, ShoppingCart, Users, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleServicesClick = () => {
    navigate('/services');
  };

  const handleMarketplaceClick = () => {
    navigate('/all-agents');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleContactClick = (selectedIntent?: string) => {
    if (selectedIntent) {
      navigate('/contact', { state: { selectedIntent } });
    } else {
      navigate('/contact');
    }
  };

  const handleBlogsClick = () => {
    navigate('/blogs');
  };

  const handleCompanyClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  const handleAgentLearnMore = (agentId: number | string) => {
    if (agentId === 'omnichannel') {
      navigate('/omnichannel-support-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (agentId === 1) {
      navigate(`/agent/ai-receptionist-agent`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (agentId === 19) {
      navigate(`/agent/lab-supply-management-agent`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      navigate(`/all-agents`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('comprehensive-solutions');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/services');
    }
  };

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

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 h-[600px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Data & AI Services + Vertical AI Agents<br />
            <span className="text-blue-600">for Real Business Impact</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Built for enterprises & SMBs. Engineered for outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors"
              onClick={handleServicesClick}
            >
              Explore Our Services
            </button>
            <button 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              onClick={handleMarketplaceClick}
            >
              Browse Agents
            </button>
          </div>
        </div>
      </section>

      {/* Split Intro Section */}
      <section id="comprehensive-solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-2xl transition-all duration-300 hover:shadow-lg">
              <div className="mb-6">
                <Building className="text-4xl text-blue-600 mb-4 w-10 h-10" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Data & AI Services</h3>
                <p className="text-gray-600 mb-6">Modern data architecture, governance, analytics, and AI solutions tailored to your enterprise needs. From strategy to implementation, we help you build scalable foundations for smart decision-making.</p>
              </div>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                onClick={handleServicesClick}
              >
                See Our Capabilities
              </button>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl transition-all duration-300 hover:shadow-lg">
              <div className="mb-6">
                <Store className="text-4xl text-blue-600 mb-4 w-10 h-10" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">GenAI Agent Marketplace</h3>
                <p className="text-gray-600 mb-6">Ready-to-deploy vertical AI agents for specific industries and use cases. Use them as-is, or request customizations to fit your exact business needs. Get started in minutes, not months.</p>
              </div>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                onClick={handleMarketplaceClick}
              >
                Browse Agents
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Genzoic */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Genzoic</h2>
            <p className="text-xl text-gray-600">What sets us apart in the AI landscape</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
              <Wrench className="text-3xl text-blue-600 mb-4 w-8 h-8" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Built by Builders</h4>
              <p className="text-gray-600 transition-all duration-300">We've built mission-critical platforms — from credit bureaus to enterprise-grade data and AI. That experience now drives results for you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
              <ChartLine className="text-3xl text-blue-600 mb-4 w-8 h-8" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Vertical-First Approach</h4>
              <p className="text-gray-600 transition-all duration-300">From agentic GenAI solutions to tailored services, we focus on depth over breadth — solving industry-specific problems with precision.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
              <Cloud className="text-3xl text-blue-600 mb-4 w-8 h-8" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Think. Build. Ship.</h4>
              <p className="text-gray-600 transition-all duration-300">No fluff, no endless decks. We move fast to design, build, and ship solutions that deliver measurable impact — from pilots to production.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
              <Target className="text-3xl text-blue-600 mb-4 w-8 h-8" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Engage Your Way</h4>
              <p className="text-gray-600 transition-all duration-300">Quick POC, strategic project or talent to boost your team? We offer outcome-driven, fixed-price or augmentative models - Flexible to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Agents</h2>
            <p className="text-xl text-gray-600">Explore some of our most popular and high-impact AI agents</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col h-full">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop&auto=format" 
                alt="AI Receptionist Agent"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Receptionist Agent</h3>
              <p className="text-gray-600 mb-4 flex-grow">Handle calls, schedule appointments, and provide 24/7 customer support with intelligent automation.</p>
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors mt-auto"
                onClick={() => handleAgentLearnMore(1)}
              >
                Learn More
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col h-full">
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&auto=format" 
                alt="Lab Supply Management Agent"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lab Supply Management Agent</h3>
              <p className="text-gray-600 mb-4 flex-grow">Automate lab inventory tracking and procurement to keep your scientists focused on research.</p>
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors mt-auto"
                onClick={() => handleAgentLearnMore(19)}
              >
                Learn More
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col h-full">
              <img 
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop&auto=format" 
                alt="Omnichannel Support AI Agent"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Omnichannel Support AI Agent</h3>
              <p className="text-gray-600 mb-4 flex-grow">Talk, text, or chat — your AI-powered front desk that works across all customer touchpoints.</p>
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors mt-auto"
                onClick={() => handleAgentLearnMore('omnichannel')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Trusted by our early customers and partners</h3>
          <div className="flex justify-center items-center space-x-12 flex-wrap gap-8">
            <div onClick={() => handleCompanyClick('https://upsidehealth.in/')}>
              <img 
                src="/lovable-uploads/3f2f36fb-059b-4ba7-82e3-fc785b2231fb.png" 
                alt="Upside Health"
                className="h-16 w-auto object-contain cursor-pointer"
              />
            </div>
            <div onClick={() => handleCompanyClick('https://peer-consulting.com/')}>
              <img 
                src="/lovable-uploads/4d972c79-af2b-46a8-a0f2-7b5ff015e6b4.png" 
                alt="Peer Consulting"
                className="h-16 w-auto object-contain cursor-pointer"
              />
            </div>
            <div onClick={() => handleCompanyClick('https://switchclimatetech.com/')}>
              <img 
                src="/lovable-uploads/f74d9f09-709b-4c01-ae51-674f429b897b.png" 
                alt="Switch Climate Tech"
                className="h-16 w-auto object-contain cursor-pointer"
              />
            </div>
            <div onClick={() => handleCompanyClick('https://phinite.ai/')}>
              <img 
                src="/lovable-uploads/d0179083-d2f4-4828-92ae-0bca1db5c3b5.png" 
                alt="Phinite AI"
                className="h-16 w-auto object-contain cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Two simple ways to get started with Genzoic — pick the path that fits your business.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-2xl transition-all duration-300 hover:shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Launch a vertical AI agent in 3 simple steps</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Browse Agents</h4>
                    <p className="text-gray-600">Explore our ready-to-deploy vertical agents built for specific industries and workflows.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Subscribe or Customize</h4>
                    <p className="text-gray-600">Choose a pricing tier that works for you or request a custom version tailored to your needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Deploy & Use</h4>
                    <p className="text-gray-600">Go live in minutes with full support, usage tracking, and built-in optimization.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  onClick={handleMarketplaceClick}
                >
                  Browse Agents
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl transition-all duration-300 hover:shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Let's build something custom — fast</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Talk to Our Experts</h4>
                    <p className="text-gray-600">Reach out with your challenge — data, AI, governance, or all of the above.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Plan with Purpose</h4>
                    <p className="text-gray-600">We co-define a fast POC or full project based on your goals and constraints.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Deliver Real Outcomes</h4>
                    <p className="text-gray-600">Flexible engagements — from fixed-price solutions to expert team extensions.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  onClick={() => handleContactClick('explore')}
                >
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still exploring? Let's make AI real for your business.
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">From strategy to deployment, Genzoic helps you turn complex AI goals into working solutions.</p>
          <button 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => handleContactClick('explore')}
          >
            Book Free Discovery Call
          </button>
        </div>
      </section>

      <Footer showMarketplaceSection={true} />

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

export default Index;
