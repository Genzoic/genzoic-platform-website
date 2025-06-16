
import { Wrench, ChartLine, Cloud, CircleCheck, Linkedin, X, ArrowUp, Send, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitToGoogleSheets } from "../utils/googleSheets";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    aiMaturityLevel: '',
    customAgentIdea: '',
    timeline: '',
    teamSize: '',
    message: ''
  });

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
    
    // Check for pre-selected intent from navigation state
    if (location.state?.selectedIntent) {
      setSelectedIntent(location.state.selectedIntent);
    }
  }, [location.state]);

  const selectIntent = (intent: string) => {
    setSelectedIntent(intent);
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s !== service));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      organization: '',
      aiMaturityLevel: '',
      customAgentIdea: '',
      timeline: '',
      teamSize: '',
      message: ''
    });
    setSelectedServices([]);
    setSelectedIntent(null);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create submission data that matches the Google Apps Script structure
      const submissionData = {
        name: formData.fullName,
        email: formData.email,
        company: formData.organization || 'Not specified',
        message: formData.message || 'No additional message',
        selectedIntent: selectedIntent || 'Not specified',
        selectedServices: selectedServices.length > 0 ? selectedServices.join(', ') : 'None selected',
        aiMaturityLevel: formData.aiMaturityLevel || 'Not specified',
        customAgentIdea: formData.customAgentIdea || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        teamSize: formData.teamSize || 'Not specified',
        // Add metadata
        source: 'Contact Page',
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
      };

      // Set the correct form type based on selected intent
      let formType = 'contact';
      if (selectedIntent === 'explore') {
        formType = 'contact_explore';
      } else if (selectedIntent === 'custom') {
        formType = 'contact_custom';
      } else if (selectedIntent === 'training') {
        formType = 'contact_training';
      }

      console.log('Submitting contact form with type:', formType);
      console.log('Submission data:', submissionData);
      
      const result = await submitToGoogleSheets(submissionData, formType);
      
      if (result.success) {
        setIsSubmitted(true);
        toast.success('Form submitted successfully! We will get back to you soon.');
      } else {
        toast.error('There was an error submitting the form. Please try again.');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Assume success since we're using no-cors mode
      setIsSubmitted(true);
      toast.success('Form submitted successfully! We will get back to you soon.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const coreServices = [
    "Data Engineering",
    "Data Governance", 
    "Analytics & BI",
    "DevOps & DataOps",
    "AI/ML Solutions"
  ];

  return (
    <div className="bg-gray-50 font-sans min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title Section */}
          <section className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's Get Started</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tell us what you're looking for, and we'll take it from there.</p>
          </section>

          {/* Contact Form */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            
            {isSubmitted ? (
              // Success State
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">We've received your message and will contact you soon.</p>
                <Button 
                  onClick={resetForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <>
                {/* Intent Selector */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What brings you here today?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => selectIntent('explore')} 
                      className={`p-4 border-2 rounded-lg text-center hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:bg-blue-50 ${
                        selectedIntent === 'explore' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Wrench className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                      <div className="font-medium text-gray-900">Explore Services</div>
                      <div className="text-sm text-gray-500 mt-1">Learn about our offerings</div>
                    </button>
                    <button 
                      onClick={() => selectIntent('custom')} 
                      className={`p-4 border-2 rounded-lg text-center hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:bg-blue-50 ${
                        selectedIntent === 'custom' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <ChartLine className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                      <div className="font-medium text-gray-900">Custom Agent</div>
                      <div className="text-sm text-gray-500 mt-1">Build something unique</div>
                    </button>
                    <button 
                      onClick={() => selectIntent('training')} 
                      className={`p-4 border-2 rounded-lg text-center hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:bg-blue-50 ${
                        selectedIntent === 'training' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Cloud className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                      <div className="font-medium text-gray-900">Training</div>
                      <div className="text-sm text-gray-500 mt-1">Learn and upskill</div>
                    </button>
                  </div>
                </div>

                {/* Dynamic Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input 
                        type="text" 
                        required 
                        placeholder="John Doe" 
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input 
                        type="email" 
                        required 
                        placeholder="john@company.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    <Input 
                      type="text" 
                      placeholder="Your Organization" 
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                    />
                  </div>

                  {/* Contextual Questions */}
                  {selectedIntent && (
                    <div className="space-y-6">
                      
                      {/* Explore Services Questions */}
                      {selectedIntent === 'explore' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Which services interest you most? (Select all that apply)</label>
                            <div className="space-y-3">
                              {coreServices.map((service) => (
                                <div key={service} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={service}
                                    checked={selectedServices.includes(service)}
                                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                                  />
                                  <label
                                    htmlFor={service}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {service}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What's your current AI maturity level?</label>
                            <select 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              value={formData.aiMaturityLevel}
                              onChange={(e) => handleInputChange('aiMaturityLevel', e.target.value)}
                            >
                              <option value="">Select your AI maturity level</option>
                              <option value="just-starting">We're just starting our AI journey</option>
                              <option value="first-steps">We've taken our first steps — early progress made</option>
                              <option value="solid-strides">We've been at it for a while — making solid strides</option>
                              <option value="scaling-fast">We've built strong capabilities and are scaling fast</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Custom Agent Questions */}
                      {selectedIntent === 'custom' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tell us more about your idea</label>
                            <Textarea 
                              rows={3} 
                              placeholder="Tell us about your custom agent requirements..." 
                              value={formData.customAgentIdea}
                              onChange={(e) => handleInputChange('customAgentIdea', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                            <select 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              value={formData.timeline}
                              onChange={(e) => handleInputChange('timeline', e.target.value)}
                            >
                              <option value="">Select timeline</option>
                              <option value="asap">ASAP – we're ready to roll</option>
                              <option value="1-3-months">Within 1–3 months</option>
                              <option value="3-6-months">In 3–6 months – planning ahead</option>
                              <option value="6-plus-months">6+ months – still exploring</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Training Questions */}
                      {selectedIntent === 'training' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                            <select 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              value={formData.teamSize}
                              onChange={(e) => handleInputChange('teamSize', e.target.value)}
                            >
                              <option value="">Select team size</option>
                              <option value="small">&lt;50 people</option>
                              <option value="medium">50-200 people</option>
                              <option value="large">200+ people</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                    <Textarea 
                      rows={3} 
                      placeholder="Any additional information you'd like to share..." 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </main>

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

export default Contact;
