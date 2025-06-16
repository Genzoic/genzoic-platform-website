import { Phone, MessageCircle, Target, Calendar, Globe, MessageSquare, Database, Building2, PhoneCall, ArrowUp, Send, CircleCheck, Users, ShoppingCart, FileText, Stethoscope, Apple, UserCheck, Megaphone, Zap, Home, TrendingUp, Headphones, Settings, Handshake, ChartLine, Calculator, Gavel, Package, Boxes, Truck, Lightbulb, ChartBar, Server, Clock, FlaskConical, BarChart3, AlertTriangle, CheckCircle, Truck as TruckIcon, Wheat, Tractor } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { agentsData } from "../utils/agentData";

const Marketplace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState('All Functions');
  const [sortBy, setSortBy] = useState('Most Popular');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAllFunctions = () => {
    const allFunctionsSection = document.getElementById('all-functions');
    if (allFunctionsSection) {
      allFunctionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation from blog pages
  useEffect(() => {
    if (location.state?.selectedFunction) {
      setSelectedFunction(location.state.selectedFunction);
      setTimeout(() => {
        const allFunctionsSection = document.getElementById('all-functions');
        if (allFunctionsSection) {
          allFunctionsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

  // Function to get category from agent tags
  const getCategoryFromTags = (tags: string[]) => {
    const categoryMap: { [key: string]: string } = {
      'Sales': 'Sales',
      'Lead Generation': 'Sales',
      'Pipeline Management': 'Sales',
      'Marketing': 'Marketing',
      'Content Creation': 'Marketing',
      'Customer Service': 'Customer Support',
      'Customer Support': 'Customer Support',
      'Multi-Channel': 'Customer Support',
      'HR': 'HR',
      'Recruitment': 'HR',
      'Finance': 'Finance',
      'Analytics': 'Analytics',
      'E-commerce': 'Sales',
      'Fraud Detection': 'Finance',
      'Real Estate': 'Sales',
      'Health': 'Customer Support',
      'Laboratory': 'Inventory',
      'Inventory Management': 'Inventory',
      'Operations': 'IT/DevOps',
      'Automation': 'IT/DevOps',
      'Enterprise Ready': 'IT/DevOps'
    };
    
    for (const tag of tags) {
      if (categoryMap[tag]) {
        return categoryMap[tag];
      }
    }
    return 'Other';
  };

  // Function to get consistent tag colors based on tag content
  const getTagColor = (tag: string) => {
    const tagColorMap: { [key: string]: string } = {
      'Customer Service': 'bg-blue-100 text-blue-800',
      'Customer Support': 'bg-blue-100 text-blue-800',
      'Enterprise Ready': 'bg-purple-100 text-purple-800',
      'Laboratory': 'bg-green-100 text-green-800',
      'Inventory Management': 'bg-orange-100 text-orange-800',
      'Multi-Channel': 'bg-cyan-100 text-cyan-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Content Creation': 'bg-rose-100 text-rose-800',
      'Real Estate': 'bg-indigo-100 text-indigo-800',
      'Lead Generation': 'bg-yellow-100 text-yellow-800',
      'Finance': 'bg-emerald-100 text-emerald-800',
      'Analytics': 'bg-teal-100 text-teal-800',
      'HR': 'bg-violet-100 text-violet-800',
      'Recruitment': 'bg-fuchsia-100 text-fuchsia-800',
      'E-commerce': 'bg-lime-100 text-lime-800',
      'Sales': 'bg-red-100 text-red-800',
      'Pipeline Management': 'bg-amber-100 text-amber-800',
      'Health': 'bg-sky-100 text-sky-800'
    };
    
    return tagColorMap[tag] || 'bg-gray-100 text-gray-800';
  };

  // Filter agents based on selected function
  const filteredAgents = selectedFunction === 'All Functions' 
    ? agentsData 
    : agentsData.filter(agent => {
        const category = getCategoryFromTags(agent.tags);
        // Special handling for Supply Chain to show Lab Supply Management agent
        if (selectedFunction === 'Supply Chain') {
          return agent.id === 19; // Lab Supply Management Agent
        }
        // Special handling for Health to show Nutrition Guru agent  
        if (selectedFunction === 'Health') {
          return agent.id === 14; // Nutrition Guru AI Agent
        }
        return category === selectedFunction;
      });

  // Sort filtered agents
  const filteredAndSortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return b.id - a.id;
      case 'Alphabetical':
        return a.name.localeCompare(b.name);
      case 'Price Low to High':
      case 'Price High to Low':
      case 'Most Popular':
      default:
        return 0; // Keep original order for now
    }
  });

  // Function to capitalize first letter of each word
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-8">
            The World's First<br />
            Vertical AI Agent<br />
            <span className="text-blue-200">Marketplace</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
            Vertical AI agents engineered for enterprise-grade use cases.
          </p>
          <Button 
            onClick={scrollToAllFunctions}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Agents
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started with AI agents in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse Agents</h3>
              <p className="text-gray-600">Explore our curated marketplace of specialized AI agents designed for specific industries and business functions.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe or Request Custom</h3>
              <p className="text-gray-600">Choose from ready-made agents or request a custom solution tailored to your unique business needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Deploy & Use</h3>
              <p className="text-gray-600">Integrate your AI agent seamlessly into your workflow and start seeing results immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Functions */}
      <section id="all-functions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Functions</h2>
            
            {/* Function Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                onClick={() => setSelectedFunction('All Functions')}
                variant={selectedFunction === 'All Functions' ? 'default' : 'outline'}
                className="text-sm"
              >
                All Functions
              </Button>
              <Button
                onClick={() => setSelectedFunction('Sales')}
                variant={selectedFunction === 'Sales' ? 'default' : 'outline'}
                className="text-sm"
              >
                📈 Sales
              </Button>
              <Button
                onClick={() => setSelectedFunction('Marketing')}
                variant={selectedFunction === 'Marketing' ? 'default' : 'outline'}
                className="text-sm"
              >
                💬 Marketing
              </Button>
              <Button
                onClick={() => setSelectedFunction('Customer Support')}
                variant={selectedFunction === 'Customer Support' ? 'default' : 'outline'}
                className="text-sm"
              >
                👥 Customer Support
              </Button>
              <Button
                onClick={() => setSelectedFunction('HR')}
                variant={selectedFunction === 'HR' ? 'default' : 'outline'}
                className="text-sm"
              >
                👥 HR
              </Button>
              <Button
                onClick={() => setSelectedFunction('Finance')}
                variant={selectedFunction === 'Finance' ? 'default' : 'outline'}
                className="text-sm"
              >
                💰 Finance
              </Button>
              <Button
                onClick={() => setSelectedFunction('Health')}
                variant={selectedFunction === 'Health' ? 'default' : 'outline'}
                className="text-sm"
              >
                🍎 Health
              </Button>
              <Button
                onClick={() => setSelectedFunction('Healthcare Operations')}
                variant={selectedFunction === 'Healthcare Operations' ? 'default' : 'outline'}
                className="text-sm"
                data-function="Healthcare Operations"
              >
                🏥 Healthcare Operations
              </Button>
              <Button
                onClick={() => setSelectedFunction('Legal')}
                variant={selectedFunction === 'Legal' ? 'default' : 'outline'}
                className="text-sm"
              >
                ⚖️ Legal
              </Button>
              <Button
                onClick={() => setSelectedFunction('Procurement')}
                variant={selectedFunction === 'Procurement' ? 'default' : 'outline'}
                className="text-sm"
              >
                🛒 Procurement
              </Button>
              <Button
                onClick={() => setSelectedFunction('Inventory')}
                variant={selectedFunction === 'Inventory' ? 'default' : 'outline'}
                className="text-sm"
              >
                📦 Inventory
              </Button>
              <Button
                onClick={() => setSelectedFunction('Supply Chain')}
                variant={selectedFunction === 'Supply Chain' ? 'default' : 'outline'}
                className="text-sm"
              >
                🚛 Supply Chain
              </Button>
              <Button
                onClick={() => setSelectedFunction('Agriculture & Farming')}
                variant={selectedFunction === 'Agriculture & Farming' ? 'default' : 'outline'}
                className="text-sm"
                data-function="Agriculture & Farming"
              >
                🌾 Agriculture & Farming
              </Button>
              <Button
                onClick={() => setSelectedFunction('Product')}
                variant={selectedFunction === 'Product' ? 'default' : 'outline'}
                className="text-sm"
              >
                🔧 Product
              </Button>
              <Button
                onClick={() => setSelectedFunction('Analytics')}
                variant={selectedFunction === 'Analytics' ? 'default' : 'outline'}
                className="text-sm"
              >
                📊 Analytics
              </Button>
              <Button
                onClick={() => setSelectedFunction('IT/DevOps')}
                variant={selectedFunction === 'IT/DevOps' ? 'default' : 'outline'}
                className="text-sm"
              >
                💻 IT/DevOps
              </Button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="Newest">Newest</option>
                  <option value="Price Low to High">Price Low to High</option>
                  <option value="Price High to Low">Price High to Low</option>
                  <option value="Alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredAndSortedAgents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedAgents.map(agent => (
                <div key={agent.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-48 object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <agent.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{agent.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{agent.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.map((tag, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded-full ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button 
                      onClick={() => {
                        if (agent.slug === 'omnichannel-support-agent') {
                          navigate('/omnichannel-support-agent');
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                        } else if (agent.slug === 'ai-marketeer-agent') {
                          navigate('/agent/ai-marketeer-agent');
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                        } else if (agent.slug === 'order-verification-agent') {
                          navigate('/order-verification-agent');
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                        } else {
                          navigate(`/agent/${agent.slug}`);
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                        }
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                We are coming soon with agents under {selectedFunction}
              </h3>
              <Button 
                onClick={() => navigate('/contact', { state: { selectedIntent: 'custom' } })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                {capitalizeWords(`Build Your Custom Agent Under ${selectedFunction}`)}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Agent Request Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can't find the perfect agent? Let's build one for you.
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our team of AI experts will create a custom agent tailored to your specific business needs.
          </p>
          <button 
            onClick={() => navigate('/contact', { state: { selectedIntent: 'custom' } })}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Request Custom Agent
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

export default Marketplace;
