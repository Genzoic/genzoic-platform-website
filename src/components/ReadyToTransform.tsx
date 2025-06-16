
import { useNavigate } from "react-router-dom";

const ReadyToTransform = () => {
  const navigate = useNavigate();

  const handleContactClick = (selectedIntent?: string) => {
    if (selectedIntent) {
      navigate('/contact', { state: { selectedIntent } });
    } else {
      navigate('/contact');
    }
  };

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready To Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Want to see how AI agents can revolutionize your operations? Join thousands of businesses already benefiting from intelligent automation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              onClick={() => handleContactClick('services')}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Book Free Discovery Call
            </button>
            <button 
              className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 transition-colors"
              onClick={() => navigate('/all-agents')}
            >
              Browse All Agents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToTransform;
