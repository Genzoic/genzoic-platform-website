import { ArrowRight, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReadyToTransform from "../components/ReadyToTransform";

const Blogs = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [loadMoreCount, setLoadMoreCount] = useState(0);

  const handleBlogClick = (slug: string) => {
    console.log('Blogs - Navigating to blog with slug:', slug);
    console.log('Blogs - Full URL will be:', `/blog/${slug}`);
    navigate(`/blog/${slug}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    if (loadMoreCount < 2) {
      setVisibleBlogs(prev => prev + 3);
      setLoadMoreCount(prev => prev + 1);
    }
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

  useEffect(() => {
    setVisibleBlogs(6);
    setLoadMoreCount(0);
  }, [sortBy]);

  // Random AI-related images
  const aiImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format'
  ];

  const getRandomImage = (index: number) => {
    return aiImages[index % aiImages.length];
  };

  const allBlogPosts = [
    {
      id: 'quick-commerce-insights',
      slug: 'quick-commerce-insights',
      category: 'Quick Commerce Insights',
      categoryColor: 'bg-indigo-100 text-indigo-800',
      date: 'Dec 12, 2024',
      title: 'The Hidden Cost of Order Mistakes in Quick Commerce',
      description: 'How small errors at scale are silently eroding margins, customer trust, and your brand — and what you can do about it.',
      image: getRandomImage(0),
      readTime: '8 min read',
      contentSections: [
        {
          title: 'Hidden Time Costs',
          subtitle: 'Research shows that delivery mistakes consume 25% of customer service resources',
          icon: '⏰'
        },
        {
          title: 'Cost Optimization',
          subtitle: 'AI reduces order errors by 85% through real-time verification',
          icon: '💰'
        },
        {
          title: 'Customer Impact',
          subtitle: 'One mistake costs 3x more than prevention through automation',
          icon: '👥'
        }
      ]
    },
    {
      id: 'laboratory-automation',
      slug: 'laboratory-automation',
      category: 'Laboratory Automation',
      categoryColor: 'bg-blue-100 text-blue-700',
      date: 'Dec 10, 2024',
      title: 'From Chaos to Clarity: Automating Lab Supplies Procurement with AI',
      description: 'Why lab inventory and procurement workflows are broken — and how a purpose-built AI agent can fix them.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop&auto=format',
      readTime: '6 min read',
      contentSections: [
        {
          title: 'Revolutionary AI Solution',
          subtitle: 'Our purpose-built AI agent transforms lab procurement from a time-consuming burden into an automated, intelligent process that anticipates needs and optimizes every purchase decision.',
          icon: '🤖'
        },
        {
          title: 'How it Works – Step by Step',
          subtitle: 'The system continuously monitors inventory levels, scans vendor catalogs for pricing optimization, provides intelligent suggestions, and automates approval workflows.',
          icon: '⚙️'
        },
        {
          title: 'Tangible Business Benefits',
          subtitle: 'Reduce procurement-related tasks by 75%, achieve 15-20% savings through intelligent vendor selection, eliminate manual mistakes, and prevent costly stockouts.',
          icon: '📈'
        }
      ]
    },
    {
      id: 'healthcare-ai',
      slug: 'healthcare-ai',
      category: 'Healthcare AI',
      categoryColor: 'bg-green-100 text-green-700',
      date: 'Dec 8, 2024',
      title: 'AI-Powered Precision Medicine: Tailoring Treatments and Improving Patient Outcomes',
      description: 'Imagine a future where your doctor doesn\'t just treat the disease, but treats you, the individual, with all your unique biological quirks.',
      image: getRandomImage(2),
      readTime: '12 min read',
      contentSections: [
        {
          title: 'Personalized Treatment Planning',
          subtitle: 'AI systems analyze patient data to create highly customized treatment plans',
          icon: '🩺'
        },
        {
          title: 'Drug Discovery Revolution',
          subtitle: 'AI algorithms identify potential drug candidates with remarkable speed',
          icon: '💊'
        },
        {
          title: 'Precision Medicine Benefits',
          subtitle: 'Understanding individual variability in genes, environment, and lifestyle',
          icon: '🧬'
        }
      ]
    },
    {
      id: 'ai-automation',
      slug: 'ai-automation',
      category: 'AI Automation',
      categoryColor: 'bg-purple-100 text-purple-700',
      date: 'Dec 5, 2024',
      title: 'Beyond Automation: Unpacking the "Agent" in Agentic AI with Genzoic',
      description: 'Ever feel like your business is on autopilot, handling the routine stuff efficiently, but lacking that spark of genuine intelligence?',
      image: getRandomImage(3),
      readTime: '9 min read',
      contentSections: [
        {
          title: 'Autonomous Decision-Making',
          subtitle: 'AI agents operate independently without constant external direction',
          icon: '🤖'
        },
        {
          title: 'Reasoning Intelligence',
          subtitle: 'Problem-solving beyond data processing to understanding contexts',
          icon: '🧠'
        },
        {
          title: 'Complex Workflow Automation',
          subtitle: 'Automate processes previously too complex for traditional tools',
          icon: '⚡'
        }
      ]
    },
    {
      id: 'agriculture-tech',
      slug: 'agriculture-tech',
      category: 'Agriculture Tech',
      categoryColor: 'bg-teal-100 text-teal-700',
      date: 'Dec 3, 2024',
      title: 'Agentic AI: Revolutionizing Precision Agriculture in the US',
      description: 'What if the next generation of farmhands weren\'t human, but highly intelligent, tireless AI agents?',
      image: getRandomImage(4),
      readTime: '11 min read',
      contentSections: [
        {
          title: 'Smart Farming Applications',
          subtitle: 'AI-driven robots identify weeds, drones capture plant health data',
          icon: '🌱'
        },
        {
          title: 'Resource Optimization',
          subtitle: 'Intelligent systems optimize water, fertilizer, and pesticide usage',
          icon: '💧'
        },
        {
          title: 'Sustainable Agriculture',
          subtitle: 'Reduced environmental impact and improved food security',
          icon: '🌍'
        }
      ]
    },
    {
      id: 'business-process',
      slug: 'business-process',
      category: 'Business Process',
      categoryColor: 'bg-orange-100 text-orange-700',
      date: 'Dec 1, 2024',
      title: 'Agentic AI vs. RPA: Automating Complex Business Processes Intelligently',
      description: 'Beyond RPA: The Cognitive Leap of Agentic AI in Automating Complex Business Processes',
      image: getRandomImage(5),
      readTime: '12 min read',
      contentSections: [
        {
          title: 'End-to-End Processing',
          subtitle: 'From invoice receipt to payment with minimal human intervention',
          icon: '📄'
        },
        {
          title: 'Intelligent Claims Processing',
          subtitle: 'AI analyzes documents and makes initial approval decisions',
          icon: '⚖️'
        },
        {
          title: 'Strategic Advantages',
          subtitle: 'Increased efficiency, reduced errors, enhanced scalability',
          icon: '🚀'
        }
      ]
    },
    // Additional unique blogs 
    {
      id: 'business-intelligence',
      slug: 'business-intelligence',
      category: 'Business Intelligence',
      categoryColor: 'bg-indigo-100 text-indigo-800',
      date: 'Nov 28, 2024',
      title: 'The ROI of Agentic AI: Benefits for Service-Based Businesses',
      description: 'Quantifying the financial impact and measurable returns of AI agent implementation.',
      image: getRandomImage(6),
      readTime: '10 min read',
      contentSections: [
        {
          title: 'Measurable Returns',
          subtitle: 'Quantifying the financial impact of AI agents on service businesses',
          icon: '📊'
        },
        {
          title: 'Cost Reduction',
          subtitle: 'Dramatic reduction in operational costs through automation',
          icon: '💰'
        },
        {
          title: 'Revenue Growth',
          subtitle: 'Increased revenue through improved service delivery and efficiency',
          icon: '📈'
        }
      ]
    },
    {
      id: 'marketing-ai',
      slug: 'marketing-ai',
      category: 'Marketing AI',
      categoryColor: 'bg-purple-100 text-purple-700',
      date: 'Nov 25, 2024',
      title: 'Hyper-Personalized D2C Marketing: Drive Sales & Loyalty',
      description: 'Agentic AI for Hyper-Personalized Marketing and Customer Retention in D2C.',
      image: getRandomImage(7),
      readTime: '14 min read',
      contentSections: [
        {
          title: 'Personalization at Scale',
          subtitle: 'AI-driven customer segmentation and targeted campaigns',
          icon: '🎯'
        },
        {
          title: 'Customer Journey Optimization',
          subtitle: 'Optimizing every touchpoint for maximum engagement',
          icon: '🛤️'
        },
        {
          title: 'Loyalty Programs',
          subtitle: 'Intelligent loyalty systems that adapt to customer behavior',
          icon: '❤️'
        }
      ]
    },
    {
      id: 'tax-finance',
      slug: 'tax-finance',
      category: 'Tax & Finance',
      categoryColor: 'bg-emerald-100 text-emerald-700',
      date: 'Nov 22, 2024',
      title: 'AI Tax Filing: Maximize Your Returns with Agentic AI',
      description: 'How Agentic AI is Revolutionizing Individual Tax Preparation and Optimization.',
      image: getRandomImage(8),
      readTime: '9 min read',
      contentSections: [
        {
          title: 'Automated Tax Preparation',
          subtitle: 'AI agents handle complex tax scenarios with precision',
          icon: '📋'
        },
        {
          title: 'Deduction Optimization',
          subtitle: 'Finding every possible deduction to maximize returns',
          icon: '💰'
        },
        {
          title: 'Compliance Assurance',
          subtitle: 'Ensuring accuracy and regulatory compliance',
          icon: '✅'
        }
      ]
    },
    {
      id: 'data-management',
      slug: 'data-management',
      category: 'Data Management',
      categoryColor: 'bg-blue-100 text-blue-700',
      date: 'Nov 19, 2024',
      title: 'Data Management & Analysis: Strategies for Success',
      description: 'Navigating Big Data: Strategies for Effective Data Management and Analysis.',
      image: getRandomImage(9),
      readTime: '13 min read',
      contentSections: [
        {
          title: 'Data Strategy',
          subtitle: 'Building comprehensive data management frameworks',
          icon: '📊'
        },
        {
          title: 'Analytics Intelligence',
          subtitle: 'Extracting actionable insights from complex datasets',
          icon: '🔍'
        },
        {
          title: 'Scalable Solutions',
          subtitle: 'Future-proof data architectures for growing businesses',
          icon: '🏗️'
        }
      ]
    },
    {
      id: 'workflow-automation',
      slug: 'workflow-automation',
      category: 'Workflow Automation',
      categoryColor: 'bg-teal-100 text-teal-700',
      date: 'Nov 16, 2024',
      title: 'How AI Agents Streamline Your Daily Workflow',
      description: 'Personal Productivity: How AI Agents Transform Individual Workflows.',
      image: getRandomImage(10),
      readTime: '8 min read',
      contentSections: [
        {
          title: 'Personal Productivity',
          subtitle: 'AI agents that enhance individual work performance',
          icon: '⚡'
        },
        {
          title: 'Task Automation',
          subtitle: 'Automating repetitive tasks for maximum efficiency',
          icon: '🤖'
        },
        {
          title: 'Workflow Optimization',
          subtitle: 'Intelligent scheduling and priority management',
          icon: '📅'
        }
      ]
    },
    {
      id: 'ecommerce-ai',
      slug: 'ecommerce-ai',
      category: 'E-commerce AI',
      categoryColor: 'bg-pink-100 text-pink-700',
      date: 'Nov 13, 2024',
      title: 'Smart E-commerce: AI-Driven Customer Experience',
      description: 'Transforming online retail with intelligent customer service and personalization.',
      image: getRandomImage(11),
      readTime: '10 min read',
      contentSections: [
        {
          title: 'Customer Service Automation',
          subtitle: 'AI chatbots provide 24/7 intelligent customer support',
          icon: '💬'
        },
        {
          title: 'Personalized Recommendations',
          subtitle: 'Machine learning algorithms predict customer preferences',
          icon: '🎯'
        },
        {
          title: 'Inventory Management',
          subtitle: 'Predictive analytics optimize stock levels and reduce waste',
          icon: '📦'
        }
      ]
    }
  ];

  // Sort blogs based on selected option
  const getSortedBlogs = () => {
    if (sortBy === 'recent') {
      return allBlogPosts;
    } else {
      // For "Most Popular", put lab automation and quick commerce first
      const popularFirst = [
        allBlogPosts.find(blog => blog.slug === 'laboratory-automation'),
        allBlogPosts.find(blog => blog.slug === 'quick-commerce-insights'),
      ].filter(Boolean);
      
      // Then add the rest, excluding the ones already added
      const remaining = allBlogPosts.filter(blog => 
        blog.slug !== 'quick-commerce-insights' && blog.slug !== 'laboratory-automation'
      );
      
      return [...popularFirst, ...remaining];
    }
  };

  const sortedBlogs = getSortedBlogs();
  const blogPosts = sortedBlogs.slice(0, visibleBlogs);
  const hasMore = visibleBlogs < sortedBlogs.length && loadMoreCount < 2;

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white h-[400px] flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights & Articles</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore deep dives, use cases, and thought leadership from the world of AI agents, automation, and enterprise data.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 opacity-10">
          <div className="w-32 h-32 bg-blue-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <div className="w-24 h-24 bg-blue-400 rounded-full"></div>
        </div>
      </section>

      {/* Sorting Controls */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button 
                onClick={() => setSortBy('recent')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  sortBy === 'recent' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Most Recent
              </button>
              <button 
                onClick={() => setSortBy('popular')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  sortBy === 'popular' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Most Popular
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full max-h-[580px]"
                onClick={() => {
                  console.log('Blogs - Article clicked:', post.title, 'slug:', post.slug);
                  handleBlogClick(post.slug);
                }}
              >
                <img 
                  className="w-full h-40 object-cover rounded-t-xl" 
                  src={post.image} 
                  alt={post.title}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{post.description}</p>
                  
                  {/* Dynamic Content Sections */}
                  {post.contentSections && (
                    <div className="space-y-2 mb-4 flex-grow">
                      {post.contentSections.slice(0, 2).map((section, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-start gap-2">
                            <span className="text-sm">{section.icon}</span>
                            <div>
                              <h4 className="font-semibold text-xs text-gray-900">{section.title}</h4>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{section.subtitle}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center text-sm">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      {hasMore && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button 
              onClick={handleLoadMore}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Load More Articles
            </button>
            <p className="text-gray-600 mt-4">
              Showing {visibleBlogs} of {sortedBlogs.length} articles
            </p>
          </div>
        </section>
      )}

      <ReadyToTransform />
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

export default Blogs;
