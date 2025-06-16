import { ArrowLeft, ArrowUp, Megaphone, Target, MessageSquare, BarChart3, CheckCircle, Send, Calendar, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { submitToGoogleSheets } from "../utils/googleSheets";

const AiMarketeerAgent = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      additionalCustomizations: "",
      timeline: ""
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToMarketplace = () => {
    navigate('/all-agents');
    setTimeout(() => {
      const allFunctionsSection = document.getElementById('all-functions');
      if (allFunctionsSection) {
        allFunctionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = {
        fullName: data.fullName,
        email: data.email,
        companyName: data.companyName,
        additionalCustomizations: data.additionalCustomizations,
        timeline: data.timeline,
        agentName: 'AI Marketeer Agent',
        agentSlug: 'ai-marketeer-agent',
        source: 'AI Marketeer Agent Page'
      };

      const result = await submitToGoogleSheets(formData, 'agent_request');
      
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setIsSubmitted(false);
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

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={handleBackToMarketplace}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Marketplace
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-2 py-1 text-xs rounded-full ${getTagColor('Marketing')}`}>
                  Marketing
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getTagColor('Content Creation')}`}>
                  Content Creation
                </span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                AI Marketeer Agent
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Manage campaigns, publish content, and grow your brand — without hiring a full team.
              </p>
              <button 
                onClick={scrollToForm}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Request this agent
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format"
                alt="AI Marketeer Agent"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, seamless, and smart marketing automation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learns Your Business</h3>
              <p className="text-gray-600 mb-4">The agent studies your business, messaging, and goals to understand your unique brand voice and target audience.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Plans & Executes</h3>
              <p className="text-gray-600 mb-4">Creates and executes content and campaigns across social media and email platforms automatically.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tracks & Optimizes</h3>
              <p className="text-gray-600 mb-4">Monitors performance metrics and continuously optimizes messaging for better results and scales successful campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Capabilities</h2>
            <p className="text-xl text-gray-600">Everything you need for successful marketing automation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="text-pink-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Creation</h3>
              <p className="text-gray-600">Generate engaging posts, articles, and marketing copy tailored to your brand.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tone Adaptation</h3>
              <p className="text-gray-600">Automatically adjust messaging tone for different platforms and audiences.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Send className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Campaign Automation</h3>
              <p className="text-gray-600">Schedule and execute multi-channel campaigns without manual intervention.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Tracking</h3>
              <p className="text-gray-600">Monitor engagement, conversions, and ROI across all marketing channels.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="text-yellow-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Interface</h3>
              <p className="text-gray-600">Communicate with your agent through intuitive chat and email interfaces.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Optimization</h3>
              <p className="text-gray-600">Continuously improve campaigns based on data and trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Request This Agent</h2>
            <p className="text-xl text-gray-600">
              This agent is currently available via custom implementation. Request access and our team will get in touch.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Get Your Custom Agent</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours with a customized solution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                required 
                                className="font-sans"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                {...field} 
                                required 
                                className="font-sans"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your company name" 
                              {...field} 
                              required 
                              className="font-sans"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="additionalCustomizations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional customizations request (if any) (not mandatory)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe any additional customizations you'd like..."
                              className="min-h-[120px] font-sans"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Implementation Timeline</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <option value="">Select timeline</option>
                              <option value="asap">ASAP – we're ready to roll</option>
                              <option value="1-3-months">Within 1–3 months</option>
                              <option value="3-6-months">In 3–6 months – planning ahead</option>
                              <option value="6-plus-months">6+ months – still exploring</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Request Agent"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Your request has been submitted successfully. Our team will get back to you within 24 hours with a customized solution.
                  </p>
                  <Button 
                    onClick={handleSubmitAnother}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    Submit Another Response
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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

export default AiMarketeerAgent;
