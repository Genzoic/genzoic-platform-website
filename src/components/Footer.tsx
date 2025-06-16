
import { Building, Store, Wrench, ChartLine, Cloud, Target, CircleCheck, Headphones, Package, ArrowUp, ShoppingCart, Users, FlaskConical, Linkedin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface FooterProps {
  showMarketplaceSection?: boolean;
}

const Footer = ({ showMarketplaceSection = true }: FooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleServiceNavigation = (service: string) => {
    // Navigate to services page without highlighting
    if (location.pathname === '/services') {
      // Just scroll to the core services section
      setTimeout(() => {
        const coreServicesSection = document.getElementById('core-services');
        if (coreServicesSection) {
          coreServicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Navigate to services page and scroll to core services section
      navigate('/services');
      setTimeout(() => {
        const coreServicesSection = document.getElementById('core-services');
        if (coreServicesSection) {
          coreServicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/71ab56ff-2b1d-404f-a100-f7823bd0c4f3.png" 
              alt="Genzoic" 
              className="h-8 brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed">
              Data & AI Services + Vertical AI Agents for Real Business Impact.
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <Building className="text-blue-400 w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Services</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleServiceNavigation('data-engineering')}>Data Engineering</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleServiceNavigation('data-governance')}>Data Governance</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleServiceNavigation('analytics-bi')}>Analytics & BI</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleServiceNavigation('devops-dataops')}>DevOps & DataOps</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleServiceNavigation('ai-ml-solutions')}>AI/ML Solutions</span></li>
            </ul>
          </div>
          
          {showMarketplaceSection && (
            <div>
              <div className="flex items-center mb-4">
                <Store className="text-blue-400 w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold">Marketplace</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNavigation('/marketplace')}>Browse Agents</span></li>
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center mb-4">
              <Building className="text-blue-400 w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Company</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNavigation('/about')}>About</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNavigation('/contact')}>Contact</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNavigation('/blogs')}>Blogs</span></li>
            </ul>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <Headphones className="text-blue-400 w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Connect</h3>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/genzoic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://x.com/genzoic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Genzoic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
