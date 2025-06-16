
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ComingSoon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white font-sans min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Clock className="w-24 h-24 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Coming Soon</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              This article is currently being crafted with care. Check back soon for the latest insights on AI, automation, and enterprise data.
            </p>
            <button 
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-8 text-left max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">In the meantime, you might enjoy:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Reading our featured article on "The Hidden Cost of Order Mistakes in Quick Commerce"
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Exploring our AI agent marketplace for ready-to-deploy solutions
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Learning about our comprehensive data and AI services
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
