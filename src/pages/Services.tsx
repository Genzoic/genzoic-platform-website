
import { Database, ShieldHalf, ChartLine, Cloud, Brain, ArrowUp, Handshake, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [highlightedService, setHighlightedService] = useState<string | null>(null);

  const handleContactClick = (selectedIntent?: string) => {
    if (selectedIntent) {
      navigate('/contact', { state: { selectedIntent } });
    } else {
      navigate('/contact');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('core-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceNavigation = (service: string) => {
    navigate(`/services?service=${service}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced effect to handle both initial load and URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
      setHighlightedService(serviceParam);
      
      // Always scroll to top first
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Then scroll to services section with a slight delay
      setTimeout(() => {
        scrollToServices();
      }, 100);
    } else {
      // If no service param, just scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      setHighlightedService(null);
    }
  }, [location.search]); // Watch for URL search changes

  const getServiceCardClasses = (serviceType: string) => {
    const baseClasses = "p-8 rounded-xl transition-all duration-700 ease-out relative";
    if (highlightedService === serviceType) {
      return `${baseClasses} bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-500 shadow-2xl transform scale-95 translate-y-[-30px] z-30 animate-[scale-in_0.7s_ease-out] ring-4 ring-blue-200`;
    }
    return `${baseClasses} bg-gray-50 hover:shadow-lg border border-gray-200`;
  };

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">AI & Data Services Designed for the Modern Enterprise</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">
            We help organizations modernize their data systems, deploy cutting-edge AI solutions, and improve business performance through strategic consulting and seamless implementation.
          </p>
          <button 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={scrollToServices}
          >
            Explore Our Services
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section id="core-services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions to transform your data and AI capabilities</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={getServiceCardClasses('data-engineering')}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                highlightedService === 'data-engineering'
                  ? 'bg-blue-600' 
                  : 'bg-blue-600'
              }`}>
                <Database className="text-white w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${
                highlightedService === 'data-engineering'
                  ? 'text-blue-900' 
                  : 'text-gray-900'
              }`}>Data Engineering</h3>
              <p className={`${
                highlightedService === 'data-engineering'
                  ? 'text-blue-700' 
                  : 'text-gray-600'
              }`}>Build robust data pipelines, implement cloud platforms, and create scalable data architectures that power your business intelligence.</p>
            </div>

            <div className={getServiceCardClasses('data-governance')}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                highlightedService === 'data-governance'
                  ? 'bg-blue-600' 
                  : 'bg-blue-600'
              }`}>
                <ShieldHalf className="text-white w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${
                highlightedService === 'data-governance'
                  ? 'text-blue-900' 
                  : 'text-gray-900'
              }`}>Data Governance</h3>
              <p className={`${
                highlightedService === 'data-governance'
                  ? 'text-blue-700' 
                  : 'text-gray-600'
              }`}>Ensure data quality, establish lineage tracking, and maintain compliance with industry regulations and standards.</p>
            </div>

            <div className={getServiceCardClasses('analytics-bi')}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                highlightedService === 'analytics-bi'
                  ? 'bg-blue-600' 
                  : 'bg-blue-600'
              }`}>
                <ChartLine className="text-white w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${
                highlightedService === 'analytics-bi'
                  ? 'text-blue-900' 
                  : 'text-gray-900'
              }`}>Analytics & BI</h3>
              <p className={`${
                highlightedService === 'analytics-bi'
                  ? 'text-blue-700' 
                  : 'text-gray-600'
              }`}>Create interactive dashboards, enable self-service analytics, and em power data-driven decision making across your organization.</p>
            </div>

            <div className={getServiceCardClasses('devops-dataops')}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                highlightedService === 'devops-dataops'
                  ? 'bg-blue-600' 
                  : 'bg-blue-600'
              }`}>
                <Cloud className="text-white w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${
                highlightedService === 'devops-dataops'
                  ? 'text-blue-900' 
                  : 'text-gray-900'
              }`}>DevOps & DataOps</h3>
              <p className={`${
                highlightedService === 'devops-dataops'
                  ? 'text-blue-700' 
                  : 'text-gray-600'
              }`}>Implement CI/CD pipelines, automate data workflows, and establish orchestration frameworks for seamless operations.</p>
            </div>

            <div className={getServiceCardClasses('ai-ml-solutions') + " lg:col-span-2"}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                highlightedService === 'ai-ml-solutions'
                  ? 'bg-blue-600' 
                  : 'bg-blue-600'
              }`}>
                <Brain className="text-white w-6 h-6" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 ${
                highlightedService === 'ai-ml-solutions'
                  ? 'text-blue-900' 
                  : 'text-gray-900'
              }`}>AI/ML Solutions</h3>
              <p className={`${
                highlightedService === 'ai-ml-solutions'
                  ? 'text-blue-700' 
                  : 'text-gray-600'
              }`}>Build custom machine learning models, implement MLOps practices, and integrate large language models to unlock intelligent automation and insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GenAI Training */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">GenAI Training for Enterprises</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Empower your workforce with comprehensive training on generative AI tools and best practices. 
              From prompt engineering to AI ethics, we prepare your teams for the AI-driven future.
            </p>
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => handleContactClick('training')}
            >
              Contact Us To Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Engagement Models</h2>
            <p className="text-xl text-gray-600">Choose the approach that best fits your organization's needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-8 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <ArrowUp className="text-white w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Swift Projects</h3>
              </div>
              <p className="text-gray-600">Fixed-scope initiatives delivered with speed and precision — ideal for proofs of concept, assessments, or launching specific solutions.</p>
            </div>

            <div className="border border-gray-200 p-8 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Handshake className="text-white w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Ongoing Partnership</h3>
              </div>
              <p className="text-gray-600">A retainer-based model for continuous support, strategic collaboration, and priority access to our data and AI expertise.</p>
            </div>

            <div className="border border-gray-200 p-8 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Users className="text-white w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Team Extension</h3>
              </div>
              <p className="text-gray-600">Embed our skilled specialists into your team to boost capacity, speed up delivery, or fill capability gaps — without long ramp-up times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built by Builders */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built by Builders</h2>
            <p className="text-xl text-gray-600">Real experience. Real platforms. Real results.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our founding team has led the design, development, and delivery of mission-critical data and AI platforms — from building the world's largest microfinance credit bureau tech stack to deploying data engineering, governance, MLOps, and Generative BI platforms used by large enterprises.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">We bring deep, hands-on expertise across:</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Cloud className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Modern data platforms</h4>
                      <p className="text-gray-600 text-sm">Snowflake, Databricks, BigQuery etc.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Pipeline orchestration</h4>
                      <p className="text-gray-600 text-sm">Airflow, dbt, Matillion, Informatica and more</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ShieldHalf className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Data governance frameworks</h4>
                      <p className="text-gray-600 text-sm">Alation, Collibra, Atlan or custom solutions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">ML</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">ML infrastructure & MLOps</h4>
                      <p className="text-gray-600 text-sm">End-to-end machine learning platforms</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 md:col-span-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Generative AI tools & LLM integrations</h4>
                      <p className="text-gray-600 text-sm">Agent design, prompt engineering, and enterprise AI deployment</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                When you work with us, you get a team that's done it before — and knows how to make it work in your context, fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's talk about what's next</h2>
          <p className="text-xl text-blue-100 mb-10">
            Whether you're building your first data stack or scaling AI across teams, we can help you plan, prioritize, and deliver — fast.
          </p>
          <button 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            onClick={() => handleContactClick('explore')}
          >
            Book Free Discovery Call
          </button>
        </div>
      </section>

      <Footer />

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

export default Services;
