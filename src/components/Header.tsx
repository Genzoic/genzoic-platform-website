

import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/genzoic-02.png" 
              alt="Genzoic" 
              className="h-8 cursor-pointer"
              onClick={() => handleNavigation('/')}
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            <span 
              className={`transition-colors cursor-pointer text-sm font-medium ${
                isActive('/') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-800'
              }`}
              onClick={() => handleNavigation('/')}
            >
              Home
            </span>
            <span 
              className={`transition-colors cursor-pointer text-sm font-medium ${
                isActive('/services') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-800'
              }`}
              onClick={() => handleNavigation('/services')}
            >
              Services
            </span>
            <span 
              className={`transition-colors cursor-pointer text-sm font-medium ${
                isActive('/all-agents') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-800'
              }`}
              onClick={() => handleNavigation('/all-agents')}
            >
              Marketplace
            </span>
            <span 
              className={`transition-colors cursor-pointer text-sm font-medium ${
                isActive('/blogs') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-800'
              }`}
              onClick={() => handleNavigation('/blogs')}
            >
              Blogs
            </span>
            <span 
              className={`transition-colors cursor-pointer text-sm font-medium ${
                isActive('/about') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-800'
              }`}
              onClick={() => handleNavigation('/about')}
            >
              About
            </span>
            <span 
              className={`transition-colors cursor-pointer text-sm font-medium ${
                isActive('/contact') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-800'
              }`}
              onClick={() => handleNavigation('/contact')}
            >
              Contact
            </span>
          </nav>
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
