import { Phone, MessageCircle, Target, Calendar, Globe, MessageSquare, Database, Building2, PhoneCall, Send, CircleCheck, Users, ShoppingCart, FileText, Stethoscope, Apple, UserCheck, Megaphone, Zap, Home, TrendingUp, Headphones, Settings, Handshake, ChartLine, Calculator, Gavel, Package, Boxes, Truck, Lightbulb, ChartBar, Server, Clock, FlaskConical, BarChart3, AlertTriangle, CheckCircle } from "lucide-react";

export interface AgentData {
  id: number;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  icon: any;
  image: string;
  howItWorks?: string[];
  keyCapabilities?: string[];
  useCases?: string[];
}

export const agentsData: AgentData[] = [
  {
    id: 1,
    name: "AI Receptionist Agent",
    slug: "ai-receptionist-agent",
    description: "Handle calls, schedule appointments, and provide 24/7 customer support with intelligent automation.",
    tags: ["Customer Service", "Enterprise Ready"],
    icon: Phone,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The AI Receptionist Agent integrates with your existing phone system and calendar.",
      "It answers calls, schedules appointments, and provides information to customers.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "24/7 availability",
      "Intelligent call routing",
      "Appointment scheduling",
      "Customer support"
    ],
    useCases: [
      "Medical offices",
      "Law firms",
      "Real estate agencies"
    ]
  },
  {
    id: 19,
    name: "Lab Supply Management Agent",
    slug: "lab-supply-management-agent",
    description: "Automate lab inventory tracking and procurement to keep your scientists focused on research.",
    tags: ["Laboratory", "Inventory Management"],
    icon: FlaskConical,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Lab Supply Management Agent integrates with your existing inventory system.",
      "It tracks inventory levels and automatically reorders supplies when needed.",
      "The agent learns from past orders to optimize inventory levels and reduce waste."
    ],
    keyCapabilities: [
      "Automated inventory tracking",
      "Automated reordering",
      "Inventory optimization",
      "Waste reduction"
    ],
    useCases: [
      "Pharmaceutical companies",
      "Biotech companies",
      "Research institutions"
    ]
  },
  {
    id: 20,
    name: "Omnichannel Support AI Agent",
    slug: "omnichannel-support-agent",
    description: "Talk, text, or chat — your AI-powered front desk that works across all customer touchpoints.",
    tags: ["Customer Support", "Multi-Channel"],
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Omnichannel Support AI Agent integrates with your existing customer support channels.",
      "It answers customer inquiries via phone, email, and chat.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "24/7 availability",
      "Intelligent call routing",
      "Email and chat support",
      "Customer support"
    ],
    useCases: [
      "E-commerce companies",
      "Software companies",
      "Any company with a large customer base"
    ]
  },
  {
    id: 21,
    name: "AI Marketeer Agent",
    slug: "ai-marketeer-agent",
    description: "Manage campaigns, publish content, and grow your brand — without hiring a full team.",
    tags: ["Marketing", "Content Creation"],
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The agent studies your business, messaging, and goals to understand your unique brand voice and target audience.",
      "It creates and executes content and campaigns across social media and email platforms automatically.",
      "The agent monitors performance metrics and continuously optimizes messaging for better results.",
      "It provides detailed analytics and scales successful campaigns across multiple channels and audiences."
    ],
    keyCapabilities: [
      "Content Creation",
      "Tone Adaptation",
      "Campaign Automation",
      "Performance Tracking",
      "Smart Interface",
      "Smart Optimization"
    ],
    useCases: [
      "Small Businesses",
      "Growing Companies",
      "Marketing Teams"
    ]
  },
  {
    id: 22,
    name: "Order Verification AI Agent",
    slug: "order-verification-agent",
    description: "Ensure accurate, complete orders in hyper-fast quick-commerce operations.",
    tags: ["E-commerce", "Customer Support"],
    icon: CheckCircle,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "Agent joins your existing chat channels and integrates seamlessly with your workflow.",
      "Verifies items, expiry dates, and order completeness in real-time.",
      "Suggests replacements and provides actionable feedback to improve operations."
    ],
    keyCapabilities: [
      "Chat-Based Integration",
      "Automated Accuracy Checks",
      "Smart Substitutions & Feedback",
      "Automated Flags",
      "Chat Integration"
    ],
    useCases: [
      "Quick-commerce companies",
      "E-commerce fulfillment centers",
      "Grocery delivery services"
    ]
  },
  {
    id: 4,
    name: "RealEstate Bot",
    slug: "realestate-bot",
    description: "Lead qualification and property recommendations with intelligent market analysis.",
    tags: ["Real Estate", "Lead Generation"],
    icon: Home,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The RealEstate Bot integrates with your existing CRM and MLS.",
      "It qualifies leads and recommends properties based on their needs.",
      "The bot learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "Lead qualification",
      "Property recommendations",
      "Market analysis",
      "24/7 availability"
    ],
    useCases: [
      "Real estate agencies",
      "Real estate agents",
      "Real estate investors"
    ]
  },
  {
    id: 5,
    name: "FinanceTracker",
    slug: "finance-tracker",
    description: "Expense tracking and financial reporting automation with real-time insights.",
    tags: ["Finance", "Analytics"],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The FinanceTracker integrates with your existing accounting software.",
      "It tracks expenses and generates financial reports automatically.",
      "The agent learns from past transactions to improve its performance over time."
    ],
    keyCapabilities: [
      "Expense tracking",
      "Financial reporting",
      "Real-time insights",
      "Automated reconciliation"
    ],
    useCases: [
      "Small businesses",
      "Accountants",
      "Financial advisors"
    ]
  },
  {
    id: 11,
    name: "Resume Screener Agent",
    slug: "resume-screener-agent",
    description: "Speed up hiring by automatically reviewing resumes and shortlisting top candidates.",
    tags: ["HR", "Recruitment"],
    icon: Users,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Resume Screener Agent integrates with your existing applicant tracking system.",
      "It automatically reviews resumes and shortlists top candidates.",
      "The agent learns from past hiring decisions to improve its performance over time."
    ],
    keyCapabilities: [
      "Automated resume screening",
      "Candidate shortlisting",
      "Skills matching",
      "Bias detection"
    ],
    useCases: [
      "HR departments",
      "Recruiting agencies",
      "Any company with a high volume of resumes"
    ]
  },
  {
    id: 12,
    name: "Shopping Assistant Agent",
    slug: "shopping-assistant-agent",
    description: "Help customers find what they need faster with intelligent product recommendations.",
    tags: ["E-commerce", "Customer Support"],
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Shopping Assistant Agent integrates with your existing e-commerce platform.",
      "It provides intelligent product recommendations to customers.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "Product recommendations",
      "Personalized shopping experience",
      "Customer support",
      "24/7 availability"
    ],
    useCases: [
      "E-commerce companies",
      "Online retailers",
      "Any company that sells products online"
    ]
  },
  {
    id: 13,
    name: "Outbound SDR Agent",
    slug: "outbound-sdr-agent",
    description: "Reach out, follow up, and book qualified sales calls automatically with personalized outbound campaigns.",
    tags: ["Sales", "Lead Generation"],
    icon: PhoneCall,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Outbound SDR Agent integrates with your existing CRM and marketing automation platform.",
      "It reaches out to leads, follows up, and books qualified sales calls automatically.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "Lead outreach",
      "Lead follow-up",
      "Sales call booking",
      "Personalized campaigns"
    ],
    useCases: [
      "Sales teams",
      "Marketing teams",
      "Any company that generates leads"
    ]
  },
  {
    id: 14,
    name: "Nutrition Guru AI Agent",
    slug: "nutrition-guru-ai-agent",
    description: "Answer customer questions about nutrition and guide their food choices with scientific backing.",
    tags: ["Health", "Customer Support"],
    icon: Apple,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Nutrition Guru AI Agent integrates with your existing customer support channels.",
      "It answers customer questions about nutrition and guides their food choices with scientific backing.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "Nutrition information",
      "Food recommendations",
      "Customer support",
      "24/7 availability"
    ],
    useCases: [
      "Health and wellness companies",
      "Nutritionists",
      "Dietitians"
    ]
  },
  {
    id: 17,
    name: "Inbound AI SDR Agent",
    slug: "inbound-ai-sdr-agent",
    description: "Instantly engage and convert every lead across voice calls, chat, and email.",
    tags: ["Sales", "Lead Generation"],
    icon: Zap,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Inbound AI SDR Agent integrates with your existing CRM and marketing automation platform.",
      "It instantly engages and converts every lead across voice calls, chat, and email.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "Lead engagement",
      "Lead conversion",
      "Sales call booking",
      "Personalized campaigns"
    ],
    useCases: [
      "Sales teams",
      "Marketing teams",
      "Any company that generates leads"
    ]
  },
  {
    id: 18,
    name: "Sales Pro Agent",
    slug: "sales-pro-agent",
    description: "Advanced sales automation with lead qualification, pipeline management, and deal closing assistance.",
    tags: ["Sales", "Pipeline Management"],
    icon: Target,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
    howItWorks: [
      "The Sales Pro Agent integrates with your existing CRM and sales automation platform.",
      "It provides advanced sales automation with lead qualification, pipeline management, and deal closing assistance.",
      "The agent learns from each interaction to improve its performance over time."
    ],
    keyCapabilities: [
      "Lead qualification",
      "Pipeline management",
      "Deal closing assistance",
      "Sales automation"
    ],
    useCases: [
      "Sales teams",
      "Sales managers",
      "Any company that wants to improve its sales process"
    ]
  }
];

export const getAgentBySlug = (slug: string): AgentData | undefined => {
  return agentsData.find(agent => agent.slug === slug);
};

export const getAgentById = (id: number): AgentData | undefined => {
  return agentsData.find(agent => agent.id === id);
};
