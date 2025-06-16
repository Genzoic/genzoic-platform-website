import { ArrowLeft, Calendar, Clock, User, ArrowUp, Database, Workflow, ShoppingCart, BarChart3, Shield, Users, TrendingUp, Target, Zap, Brain, Settings, AlertTriangle, CheckCircle, FileText, Search, MessageSquare, Globe, Lightbulb, PieChart, Gift, ChartLine, DollarSign, Award, Star, Briefcase, Building, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blog1AdditionalSections } from "../content/blog1-sections";
import { blog2AdditionalSections } from "../content/blog2-sections";
import { blog3AdditionalSections } from "../content/blog3-sections";
import { blog4AdditionalSections } from "../content/blog4-sections";
import { blog5AdditionalSections } from "../content/blog5-sections";

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Debug logging
  console.log('BlogDetail - URL id parameter:', id);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Blog data with slug-based keys
  const blogData = {
    'quick-commerce-insights': {
      id: 'quick-commerce-insights',
      category: 'Quick Commerce Insights',
      categoryColor: 'bg-indigo-100 text-indigo-800',
      heroGradient: 'from-indigo-600 to-purple-800',
      date: 'Dec 12, 2024',
      title: 'The Hidden Cost of Order Mistakes in Quick Commerce',
      description: 'How small errors at scale are silently eroding margins, customer trust, and your brand — and what you can do about it.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop&auto=format',
      readTime: '8 min read',
      author: 'Genzoic Research Team',
      sections: blog1AdditionalSections,
      relatedAgent: 'order-verification-agent',
      relatedAgentTitle: 'Order Verification Agent',
      exploreButtonText: 'Explore Order Verification Agent'
    },
    'laboratory-automation': {
      id: 'laboratory-automation',
      category: 'Laboratory Automation',
      categoryColor: 'bg-blue-100 text-blue-700',
      heroGradient: 'from-blue-600 to-cyan-800',
      date: 'Dec 10, 2024',
      title: 'From Chaos to Clarity: Automating Lab Supplies Procurement with AI',
      description: 'Why lab inventory and procurement workflows are broken — and how a purpose-built AI agent can fix them.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop&auto=format',
      readTime: '6 min read',
      author: 'Dr. Sarah Chen',
      sections: blog2AdditionalSections,
      relatedAgent: 'lab-supply-management-agent',
      relatedAgentTitle: 'Lab Supply Management Agent',
      exploreButtonText: 'Explore Lab Supply Management Agent'
    },
    'healthcare-ai': {
      id: 'healthcare-ai',
      category: 'Healthcare AI',
      categoryColor: 'bg-green-100 text-green-700',
      heroGradient: 'from-emerald-600 to-teal-800',
      date: 'Dec 8, 2024',
      title: 'AI-Powered Precision Medicine: Tailoring Treatments and Improving Patient Outcomes',
      description: 'Imagine a future where your doctor doesn\'t just treat the disease, but treats you, the individual, with all your unique biological quirks.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop&auto=format',
      readTime: '12 min read',
      author: 'Dr. Michael Rodriguez',
      sections: blog3AdditionalSections,
      relatedAgent: 'healthcare-operations',
      relatedAgentTitle: 'Healthcare AI Agents',
      exploreButtonText: 'Explore Healthcare AI Agents'
    },
    'ai-automation': {
      id: 'ai-automation',
      category: 'AI Automation',
      categoryColor: 'bg-purple-100 text-purple-700',
      heroGradient: 'from-purple-600 to-pink-800',
      date: 'Dec 5, 2024',
      title: 'Beyond Automation: Unpacking the "Agent" in Agentic AI with Genzoic',
      description: 'Ever feel like your business is on autopilot, handling the routine stuff efficiently, but lacking that spark of genuine intelligence?',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop&auto=format',
      readTime: '9 min read',
      author: 'Alex Thompson',
      sections: blog4AdditionalSections,
      relatedAgent: 'omnichannel-support-agent',
      relatedAgentTitle: 'Omnichannel Support Agent',
      exploreButtonText: 'Explore Omnichannel Support Agent'
    },
    'agriculture-tech': {
      id: 'agriculture-tech',
      category: 'Agriculture Tech',
      categoryColor: 'bg-teal-100 text-teal-700',
      heroGradient: 'from-green-600 to-emerald-800',
      date: 'Dec 3, 2024',
      title: 'Agentic AI: Revolutionizing Precision Agriculture in the US',
      description: 'What if the next generation of farmhands weren\'t human, but highly intelligent, tireless AI agents?',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop&auto=format',
      readTime: '11 min read',
      author: 'Emma Johnson',
      sections: blog5AdditionalSections,
      relatedAgent: 'agriculture-farming',
      relatedAgentTitle: 'Agriculture AI Agents',
      exploreButtonText: 'Explore Agriculture AI Agents'
    },
    'business-process': {
      id: 'business-process',
      category: 'Business Process',
      categoryColor: 'bg-orange-100 text-orange-700',
      heroGradient: 'from-orange-600 to-red-800',
      date: 'Dec 1, 2024',
      title: 'Agentic AI vs. RPA: Automating Complex Business Processes Intelligently',
      description: 'Beyond RPA: The Cognitive Leap of Agentic AI in Automating Complex Business Processes',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&auto=format',
      readTime: '12 min read',
      author: 'Jennifer Miller',
      sections: [
        {
          title: 'The Evolution Beyond RPA: From Automation to Intelligence',
          icon: Brain,
          content: [
            'Traditional Robotic Process Automation (RPA) has served businesses well for years, automating repetitive, rule-based tasks across various applications. However, as business processes become increasingly complex and dynamic, the limitations of RPA become apparent. This is where Agentic AI emerges as a transformative solution.',
            'Unlike RPA, which follows predetermined scripts and rules, Agentic AI brings genuine intelligence to business process automation. It can understand context, make decisions, adapt to changing circumstances, and learn from interactions. This cognitive leap represents a fundamental shift from mechanical automation to intelligent process management.'
          ]
        },
        {
          title: 'Understanding the Limitations of Traditional RPA',
          icon: AlertTriangle,
          content: [
            'While RPA excels at automating structured, predictable tasks, it struggles with exceptions, unstructured data, and processes requiring human judgment. RPA bots break when encountering unexpected scenarios, require extensive maintenance when systems change, and cannot handle complex decision-making.',
            'These limitations become costly bottlenecks as businesses scale and processes evolve. Organizations often find themselves maintaining fragile automation systems that require constant updates and manual intervention, defeating the purpose of automation.'
          ]
        },
        {
          title: 'How Agentic AI Transforms Complex Business Processes',
          icon: Zap,
          content: [
            'Agentic AI agents bring cognitive capabilities that transform how we approach business process automation. They can process unstructured data, understand natural language, make contextual decisions, and adapt to new situations without requiring extensive reprogramming.',
            'These intelligent agents can handle multi-step processes that involve research, analysis, communication, and decision-making. They excel in scenarios like customer service escalations, document processing, compliance monitoring, and workflow orchestration where human-like reasoning is essential.'
          ]
        },
        {
          title: 'Real-World Applications and Benefits',
          icon: CheckCircle,
          content: [
            'Organizations implementing Agentic AI for business processes report significant improvements in efficiency, accuracy, and scalability. Unlike RPA\'s rigid automation, Agentic AI adapts to business changes, reduces maintenance overhead, and provides intelligent insights.',
            'From automated resume screening that understands candidate qualifications contextually to intelligent customer service agents that handle complex inquiries, Agentic AI is revolutionizing how businesses operate. The technology offers a pathway to truly intelligent automation that grows with your business.'
          ]
        }
      ],
      relatedAgent: 'resume-screener-agent',
      relatedAgentTitle: 'Resume Screener Agent',
      exploreButtonText: 'Explore Resume Screener Agent'
    },
    'business-intelligence': {
      id: 'business-intelligence',
      category: 'Business Intelligence',
      categoryColor: 'bg-indigo-100 text-indigo-800',
      heroGradient: 'from-slate-600 to-blue-800',
      date: 'Nov 28, 2024',
      title: 'The ROI of Agentic AI: Benefits for Service-Based Businesses',
      description: 'Quantifying the financial impact and measurable returns of AI agent implementation.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format',
      readTime: '10 min read',
      author: 'David Kim',
      sections: [
        {
          title: 'Measuring the True ROI of AI Agent Implementation',
          icon: BarChart3,
          content: [
            'Service-based businesses are discovering that Agentic AI delivers measurable returns that extend far beyond simple cost savings. Unlike traditional automation tools, AI agents provide compound benefits that grow over time, creating sustainable competitive advantages.',
            'The ROI calculation for AI agents must consider direct cost reductions, productivity improvements, revenue enhancements, and quality improvements. Early adopters report ROI figures ranging from 200% to 500% within the first year of implementation, with returns accelerating as agents learn and improve.'
          ]
        },
        {
          title: 'Cost Reduction Through Intelligent Automation',
          icon: DollarSign,
          content: [
            'AI agents dramatically reduce operational costs by handling routine tasks, customer inquiries, and administrative work that traditionally required human intervention. Unlike human employees, AI agents work 24/7 without breaks, sick days, or vacation time.',
            'Service businesses report 60-80% reduction in routine task processing time, 70% decrease in customer response times, and significant reductions in human error rates. These improvements translate directly to bottom-line savings while freeing human employees for higher-value strategic work.'
          ]
        },
        {
          title: 'Revenue Enhancement and Customer Experience',
          icon: TrendingUp,
          content: [
            'Beyond cost savings, AI agents drive revenue growth by improving customer experience, enabling faster service delivery, and identifying new business opportunities. AI-powered customer service agents can handle complex inquiries instantly, leading to higher customer satisfaction and retention.',
            'Service businesses using AI agents report 25-40% improvement in customer satisfaction scores, 50% faster service delivery times, and 30% increase in upselling opportunities. These improvements translate to increased customer lifetime value and organic growth through referrals.'
          ]
        },
        {
          title: 'Scalability and Future-Proofing Your Business',
          icon: Building,
          content: [
            'The most significant long-term benefit of Agentic AI is scalability. As your business grows, AI agents can handle increased workload without proportional increases in costs. This scalability enables service businesses to pursue growth opportunities that would otherwise be constrained by staffing limitations.',
            'AI agents also future-proof your business by continuously learning and adapting to new challenges. They provide valuable insights into customer behavior, operational efficiency, and market trends, enabling data-driven decision making that drives sustainable growth.'
          ]
        }
      ],
      relatedAgent: 'ai-receptionist-agent',
      relatedAgentTitle: 'AI Receptionist Agent',
      exploreButtonText: 'Explore AI Receptionist Agent'
    },
    'marketing-ai': {
      id: 'marketing-ai',
      category: 'Marketing AI',
      categoryColor: 'bg-purple-100 text-purple-700',
      heroGradient: 'from-rose-600 to-purple-800',
      date: 'Nov 25, 2024',
      title: 'Hyper-Personalized D2C Marketing: Drive Sales & Loyalty',
      description: 'Agentic AI for Hyper-Personalized Marketing and Customer Retention in D2C.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop&auto=format',
      readTime: '14 min read',
      author: 'Sarah Williams',
      sections: [
        {
          title: 'The Evolution of D2C Marketing: From Mass to Micro',
          icon: Target,
          content: [
            'Direct-to-consumer brands face an unprecedented challenge: standing out in a saturated market where customers are bombarded with generic marketing messages. Traditional one-size-fits-all marketing approaches no longer drive the engagement and loyalty needed for sustainable growth.',
            'The solution lies in hyper-personalization powered by Agentic AI. Unlike basic automation tools, Agentic AI understands individual customer preferences, behaviors, and purchase patterns to create truly personalized experiences that feel human-crafted but operate at machine scale.'
          ]
        },
        {
          title: 'Understanding Your Customer at the Individual Level',
          icon: Users,
          content: [
            'Agentic AI goes beyond demographic segmentation to understand each customer as a unique individual. It analyzes purchase history, browsing behavior, engagement patterns, and even timing preferences to build comprehensive customer profiles that evolve in real-time.',
            'This deep understanding enables brands to predict what customers want before they know it themselves. The AI identifies micro-moments of intent, seasonal preferences, and life stage changes that traditional marketing tools miss, creating opportunities for perfectly timed, relevant outreach.'
          ]
        },
        {
          title: 'Dynamic Content Creation and Campaign Optimization',
          icon: Lightbulb,
          content: [
            'With Agentic AI, every piece of marketing content can be dynamically personalized. From email subject lines and product recommendations to social media ads and website experiences, the AI continuously tests and optimizes messaging for each individual customer.',
            'The system learns from every interaction, A/B testing thousands of variations simultaneously to identify what resonates with specific customer segments. This creates a feedback loop where marketing performance improves exponentially over time, driving higher conversion rates and customer lifetime value.'
          ]
        },
        {
          title: 'Building Long-Term Customer Loyalty Through Intelligent Engagement',
          icon: Award,
          content: [
            'Hyper-personalization extends beyond acquisition to retention and loyalty building. Agentic AI identifies at-risk customers before they churn, creates personalized win-back campaigns, and develops loyalty programs tailored to individual preferences and behaviors.',
            'By delivering consistently relevant experiences across all touchpoints, D2C brands can build emotional connections that transcend price competition. Customers feel understood and valued, leading to increased repeat purchases, higher average order values, and powerful word-of-mouth referrals that drive organic growth.'
          ]
        }
      ],
      relatedAgent: 'ai-marketeer-agent',
      relatedAgentTitle: 'AI Marketeer Agent',
      exploreButtonText: 'Explore AI Marketeer Agent'
    },
    'tax-finance': {
      id: 'tax-finance',
      category: 'Tax & Finance',
      categoryColor: 'bg-emerald-100 text-emerald-700',
      heroGradient: 'from-emerald-600 to-green-800',
      date: 'Nov 22, 2024',
      title: 'AI Tax Filing: Maximize Your Returns with Agentic AI',
      description: 'How Agentic AI is Revolutionizing Individual Tax Preparation and Optimization.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format',
      readTime: '9 min read',
      author: 'Robert Chen',
      sections: [
        {
          title: 'The Complex World of Tax Optimization Made Simple',
          icon: FileText,
          content: [
            'Tax preparation has traditionally been a time-consuming, error-prone process that leaves money on the table. Most individuals miss valuable deductions and credits simply because they don\'t know they exist or lack the expertise to identify them in their financial situations.',
            'Agentic AI transforms tax preparation from a reactive annual chore into a proactive, year-round optimization strategy. The AI continuously monitors your financial activities, identifies tax-saving opportunities, and ensures you\'re positioned to maximize returns while minimizing liability.'
          ]
        },
        {
          title: 'Intelligent Deduction Discovery and Documentation',
          icon: Search,
          content: [
            'Traditional tax software relies on users to know what deductions they qualify for. Agentic AI actively searches for deductions and credits by analyzing your financial data, employment situation, life changes, and spending patterns throughout the year.',
            'The AI identifies often-overlooked deductions like home office expenses for remote workers, educational credits, charitable contributions, and business expenses. It also ensures proper documentation and categorization, reducing audit risk while maximizing legitimate tax benefits.'
          ]
        },
        {
          title: 'Year-Round Tax Strategy and Planning',
          icon: Calendar,
          content: [
            'Rather than scrambling during tax season, Agentic AI provides ongoing tax planning throughout the year. It monitors income thresholds, suggests timing for major purchases or sales, and recommends retirement contributions to optimize your tax position.',
            'The AI can simulate different scenarios to show the tax implications of financial decisions before you make them. This proactive approach helps you make informed choices that reduce your overall tax burden while supporting your broader financial goals.'
          ]
        },
        {
          title: 'Accuracy, Compliance, and Peace of Mind',
          icon: Shield,
          content: [
            'Tax mistakes can be costly, leading to penalties, interest, and potential audits. Agentic AI ensures accuracy by cross-referencing multiple data sources, checking calculations, and staying current with the latest tax law changes and regulations.',
            'The AI maintains detailed audit trails and documentation for all deductions and credits claimed. In the event of an audit, you have comprehensive records and explanations readily available. This level of preparation and accuracy provides peace of mind and confidence in your tax filing.'
          ]
        }
      ],
      relatedAgent: 'finance-tracker',
      relatedAgentTitle: 'Finance Tracker Agent',
      exploreButtonText: 'Explore Finance Tracker Agent'
    },
    'data-management': {
      id: 'data-management',
      category: 'Data Management',
      categoryColor: 'bg-blue-100 text-blue-700',
      heroGradient: 'from-blue-600 to-indigo-800',
      date: 'Nov 19, 2024',
      title: 'Data Management & Analysis: Strategies for Success',
      description: 'Navigating Big Data: Strategies for Effective Data Management and Analysis.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&auto=format',
      readTime: '13 min read',
      author: 'Lisa Anderson',
      sections: [
        {
          title: 'The Foundation of Modern Data Strategy',
          icon: Database,
          content: [
            'In today\'s data-driven business landscape, effective data management has become the cornerstone of competitive advantage. Organizations are drowning in data from multiple sources - customer interactions, IoT devices, social media, and operational systems - yet struggling to extract meaningful insights.',
            'A robust data management strategy encompasses data collection, storage, processing, analysis, and governance. Without proper foundations, businesses risk making decisions based on incomplete, inaccurate, or outdated information, leading to missed opportunities and strategic missteps.'
          ]
        },
        {
          title: 'Breaking Down Data Silos for Unified Insights',
          icon: Workflow,
          content: [
            'One of the biggest challenges organizations face is data fragmentation across departments and systems. Marketing data lives in one platform, sales data in another, and customer service interactions in yet another system, creating disconnected views of the business.',
            'Modern data management solutions focus on creating unified data lakes and warehouses that bring together disparate data sources. This integration enables cross-functional analytics, revealing insights that would be impossible to discover when data remains siloed.'
          ]
        },
        {
          title: 'Ensuring Data Quality and Governance',
          icon: Shield,
          content: [
            'Data quality issues can undermine even the most sophisticated analytics initiatives. Inconsistent formats, duplicate records, missing values, and outdated information can lead to flawed analysis and poor decision-making.',
            'Implementing comprehensive data governance frameworks ensures data accuracy, consistency, and compliance with regulations like GDPR and CCPA. Automated data validation, cleansing processes, and clear data ownership policies are essential for maintaining high-quality datasets that drive reliable insights.'
          ]
        },
        {
          title: 'Advanced Analytics and Predictive Intelligence',
          icon: BarChart3,
          content: [
            'Modern data analysis goes far beyond traditional reporting and dashboards. Advanced analytics techniques including machine learning, predictive modeling, and statistical analysis unlock hidden patterns and forecast future trends.',
            'Organizations leveraging advanced analytics can predict customer behavior, optimize operations, identify risks before they materialize, and discover new revenue opportunities. The key is having clean, well-structured data and the right analytical tools to process it effectively.'
          ]
        }
      ],
      relatedAgent: 'lab-supply-management-agent',
      relatedAgentTitle: 'Lab Supply Management Agent',
      exploreButtonText: 'Explore Lab Supply Management Agent'
    },
    'workflow-automation': {
      id: 'workflow-automation',
      category: 'Workflow Automation',
      categoryColor: 'bg-teal-100 text-teal-700',
      heroGradient: 'from-teal-600 to-cyan-800',
      date: 'Nov 16, 2024',
      title: 'How AI Agents Streamline Your Daily Workflow',
      description: 'Personal Productivity: How AI Agents Transform Individual Workflows.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format',
      readTime: '8 min read',
      author: 'Michael Thompson',
      sections: [
        {
          title: 'The Evolution of Personal Productivity',
          icon: Briefcase,
          content: [
            'The modern professional juggles countless tasks, emails, meetings, and deadlines throughout their day. Traditional productivity tools like calendars, task lists, and note-taking apps help organize work but still require significant manual effort to maintain and coordinate.',
            'AI agents represent a fundamental shift in how we approach personal productivity. Instead of managing multiple disconnected tools, AI agents act as intelligent assistants that understand context, anticipate needs, and automate routine tasks, allowing professionals to focus on high-value creative and strategic work.'
          ]
        },
        {
          title: 'Intelligent Task Management and Prioritization',
          icon: Settings,
          content: [
            'AI agents excel at understanding the relative importance and urgency of different tasks based on deadlines, stakeholder involvement, project impact, and personal work patterns. They can automatically categorize incoming requests, suggest optimal scheduling, and even negotiate meeting times.',
            'These intelligent systems learn from your work habits and preferences, gradually becoming more effective at predicting what you need and when. They can identify patterns in your productivity cycles, suggest the best times for focused work, and help maintain work-life balance by managing availability.'
          ]
        },
        {
          title: 'Seamless Communication and Collaboration',
          icon: MessageSquare,
          content: [
            'Modern work involves constant communication across multiple channels - email, instant messaging, video calls, and collaborative documents. AI agents can monitor these channels, extract action items, schedule follow-ups, and ensure nothing falls through the cracks.',
            'They can draft responses based on your communication style, summarize long email threads, and even attend meetings to take notes and highlight key decisions. This automation significantly reduces the administrative burden of staying connected while ensuring important communications receive timely attention.'
          ]
        },
        {
          title: 'Data-Driven Insights and Continuous Improvement',
          icon: PieChart,
          content: [
            'AI agents continuously analyze your work patterns to identify bottlenecks, time wasters, and opportunities for improvement. They provide insights into how you spend your time, which activities generate the most value, and where automation could be most beneficial.',
            'This data-driven approach to productivity improvement helps professionals make informed decisions about how to structure their work. AI agents can suggest process improvements, recommend skill development areas, and help establish more effective routines that align with personal and professional goals.'
          ]
        }
      ],
      relatedAgent: 'ai-receptionist-agent',
      relatedAgentTitle: 'AI Receptionist Agent',
      exploreButtonText: 'Explore AI Receptionist Agent'
    },
    'ecommerce-ai': {
      id: 'ecommerce-ai',
      category: 'E-commerce AI',
      categoryColor: 'bg-pink-100 text-pink-700',
      heroGradient: 'from-pink-600 to-rose-800',
      date: 'Nov 13, 2024',
      title: 'Smart E-commerce: AI-Driven Customer Experience',
      description: 'Transforming online retail with intelligent customer service and personalization.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&auto=format',
      readTime: '10 min read',
      author: 'Amanda Rodriguez',
      sections: [
        {
          title: 'Revolutionizing Online Shopping Experiences',
          icon: Globe,
          content: [
            'The e-commerce landscape has evolved dramatically, with customer expectations reaching new heights. Modern shoppers demand personalized experiences, instant support, and seamless interactions across all touchpoints. Traditional e-commerce platforms struggle to meet these expectations at scale.',
            'AI-driven customer experience solutions transform online retail by providing intelligent, personalized interactions that adapt to individual customer preferences and behaviors. These systems create shopping experiences that feel personal and intuitive, driving higher engagement and conversion rates.'
          ]
        },
        {
          title: 'Intelligent Product Discovery and Recommendations',
          icon: Search,
          content: [
            'One of the biggest challenges in e-commerce is helping customers find the right products among thousands of options. Traditional search and filtering systems often fail to understand customer intent and preferences, leading to frustration and abandoned shopping sessions.',
            'AI-powered recommendation engines analyze customer behavior, purchase history, and product attributes to suggest relevant items at the right moment. These systems learn from every interaction, continuously improving their ability to match customers with products they love, significantly increasing average order values and customer satisfaction.'
          ]
        },
        {
          title: 'Proactive Customer Support and Issue Resolution',
          icon: Phone,
          content: [
            'Customer service in e-commerce traditionally operates reactively, responding to issues after customers reach out. This approach often leads to frustrated customers and increased support costs. AI agents transform this dynamic by providing proactive, intelligent support.',
            'Smart customer service agents can predict and prevent issues before they occur, provide instant answers to common questions, and escalate complex issues to human agents with full context. This approach reduces response times, improves resolution rates, and creates more positive customer experiences.'
          ]
        },
        {
          title: 'Dynamic Pricing and Inventory Optimization',
          icon: ChartLine,
          content: [
            'Successful e-commerce requires sophisticated pricing strategies that balance profitability with competitiveness while optimizing inventory levels. Manual approaches to pricing and inventory management cannot keep pace with market dynamics and customer demand patterns.',
            'AI systems continuously analyze market conditions, competitor pricing, demand forecasts, and inventory levels to optimize pricing and stock management in real-time. This intelligent approach maximizes revenue while minimizing stockouts and overstock situations, creating a more efficient and profitable operation.'
          ]
        }
      ],
      relatedAgent: 'shopping-assistant-agent',
      relatedAgentTitle: 'Shopping Assistant Agent',
      exploreButtonText: 'Explore Shopping Assistant Agent'
    }
  };

  console.log('BlogDetail - Available blog keys:', Object.keys(blogData));
  
  const blog = blogData[id as keyof typeof blogData];
  console.log('BlogDetail - Found blog:', blog ? blog.title : 'Not found');

  if (!blog) {
    console.log('BlogDetail - Blog not found for id:', id);
    return (
      <div className="bg-white font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <p className="text-gray-600 mb-4">Looking for blog with ID: {id}</p>
          <p className="text-gray-600 mb-4">Available blogs: {Object.keys(blogData).join(', ')}</p>
          <button 
            onClick={() => navigate('/blogs')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to blogs
          </button>
        </div>
      </div>
    );
  }

  const handleExploreAgent = () => {
    if (blog.relatedAgent === 'ai-marketeer-agent') {
      navigate('/agent/ai-marketeer-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'order-verification-agent') {
      navigate('/order-verification-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'omnichannel-support-agent') {
      navigate('/omnichannel-support-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'lab-supply-management-agent') {
      navigate('/agent/lab-supply-management-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'healthcare-operations') {
      navigate('/all-agents', { state: { selectedFunction: 'Healthcare Operations' } });
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'agriculture-farming') {
      navigate('/all-agents', { state: { selectedFunction: 'Agriculture & Farming' } });
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'resume-screener-agent') {
      navigate('/agent/resume-screener-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'ai-receptionist-agent') {
      navigate('/agent/ai-receptionist-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'finance-tracker') {
      navigate('/agent/finance-tracker');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (blog.relatedAgent === 'shopping-assistant-agent') {
      navigate('/agent/shopping-assistant-agent');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      navigate('/all-agents');
      setTimeout(() => {
        const allFunctionsSection = document.getElementById('all-functions');
        if (allFunctionsSection) {
          allFunctionsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleBrowseAllAgents = () => {
    navigate('/all-agents');
    setTimeout(() => {
      const allFunctionsSection = document.getElementById('all-functions');
      if (allFunctionsSection) {
        allFunctionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${blog.heroGradient} text-white py-16 relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/blogs')}
            className="flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to all articles
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${blog.categoryColor} bg-opacity-20 text-white`}>
                  {blog.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {blog.description}
              </p>
              
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:block">
              <img 
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-2xl" 
                src={blog.image} 
                alt={blog.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {blog.sections && blog.sections.length > 0 ? (
              blog.sections.map((section, index) => (
                <div key={index} className="mb-12">
                  <div className="flex items-center mb-6">
                    {section.icon && <section.icon className="w-8 h-8 text-blue-600 mr-4" />}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    {Array.isArray(section.content) ? (
                      section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-lg">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-lg">
                        {section.content}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Coming Soon</h2>
                <p className="text-gray-600">This article is being prepared and will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover how AI agents can solve the challenges discussed in this article. Explore specialized solutions or browse our complete marketplace of intelligent automation tools.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleExploreAgent}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
              {blog.exploreButtonText || `Explore ${blog.relatedAgentTitle}`}
            </button>
            <button 
              onClick={handleBrowseAllAgents}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-blue-500 hover:border-blue-400"
            >
              Browse All Agents
            </button>
          </div>
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

export default BlogDetail;
