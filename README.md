# Genzoic Platform Website

The official website for Genzoic.com - showcasing AI agents and automation solutions for businesses.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm or bun package manager

### Installation & Development

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev

# Server runs on http://localhost:8080
```

### Build & Deploy

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Development build (for debugging)
npm run build:dev

# Lint code
npm run lint
```

## 📁 Project Structure

```
genzoic-platform-website/
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── lovable-uploads/        # Local images (logos, UI assets)
├── src/
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Header.tsx          # Site header/navigation
│   │   ├── Footer.tsx          # Site footer
│   │   └── ReadyToTransform.tsx # CTA component
│   ├── pages/                  # Page components (routes)
│   │   ├── Index.tsx           # Homepage
│   │   ├── About.tsx           # About page
│   │   ├── Services.tsx        # Services page
│   │   ├── Marketplace.tsx     # All agents listing
│   │   ├── Blogs.tsx           # Blog listing
│   │   ├── BlogDetail.tsx      # Individual blog posts
│   │   ├── Contact.tsx         # Contact form
│   │   ├── AgentDetails.tsx    # Dynamic agent pages
│   │   └── ...                 # Other pages
│   ├── content/                # Blog content data
│   │   ├── blog1-sections.ts   # Blog post content
│   │   └── ...                 # More blog files
│   ├── utils/                  # Utility functions & data
│   │   ├── agentData.ts        # Agent information
│   │   └── googleSheets.ts     # Google Sheets integration
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Shared utilities
│   ├── App.tsx                 # Main app component & routing
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── vercel.json                 # Vercel deployment config
```

## 🎨 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Vercel

## 📝 Key Concepts

### Image Strategy
- **Local Images:** Only for logos and UI assets (stored in `/public/lovable-uploads/`)
- **Content Images:** All blog and agent images use external Unsplash URLs
- **Optimization:** Unsplash URLs include size/format parameters

### Component Architecture
- **shadcn/ui:** Pre-built, customizable UI components in `/src/components/ui/`
- **Page Components:** Each route has its own component in `/src/pages/`
- **Shared Components:** Header, Footer, and reusable components in `/src/components/`

### Data Management
- **Static Data:** Agent information in `/src/utils/agentData.ts`
- **Blog Content:** Individual files in `/src/content/` directory
- **No Database:** All content is statically defined in TypeScript files

### Routing Structure
```
/ → Homepage (Index.tsx)
/about → About page
/services → Services page
/all-agents → Marketplace (all agents)
/agent/:slug → Dynamic agent details
/blogs → Blog listing
/blog/:id → Individual blog posts
/contact → Contact form
```

## 🛠️ Development Guide

### Adding New Agents

1. **Add agent data** in `/src/utils/agentData.ts`:
```typescript
{
  id: 25,
  name: "Your Agent Name",
  slug: "your-agent-slug",
  description: "Agent description",
  tags: ["Tag1", "Tag2"],
  icon: YourIcon, // Lucide React icon
  image: "https://images.unsplash.com/...", // Unsplash URL
  howItWorks: ["Step 1", "Step 2"],
  keyCapabilities: ["Feature 1", "Feature 2"],
  useCases: ["Use case 1", "Use case 2"]
}
```

2. **Create route** (if needed) in `/src/App.tsx`
3. **Test** the agent page at `/agent/your-agent-slug`

### Adding New Blog Posts

1. **Create content file** in `/src/content/blog[N]-sections.ts`:
```typescript
export const blog[N]Sections = {
  hero: {
    title: "Your Blog Title",
    image: "https://images.unsplash.com/...",
    // ... other fields
  },
  sections: [
    {
      title: "Section Title",
      content: "Section content...",
      // ... other fields
    }
  ]
};
```

2. **Add to blog data** - check how blogs are loaded in `BlogDetail.tsx`

### Styling Guidelines

- **Use Tailwind classes** for styling
- **Follow existing patterns** in components
- **Use shadcn/ui components** when possible
- **Maintain consistent spacing** and typography
- **Test dark mode** if applicable (theme system is configured)

### Common Tasks

**Update Navigation:**
- Edit `/src/components/Header.tsx`

**Update Footer:**
- Edit `/src/components/Footer.tsx`

**Add New Page:**
1. Create component in `/src/pages/`
2. Add route in `/src/App.tsx`
3. Update navigation if needed

**Update Company Logos:**
- Homepage logos are in `/src/pages/Index.tsx`
- Upload new images to `/public/lovable-uploads/`
- Update image references

## 🔧 Configuration Files

- **`vite.config.ts`:** Vite build configuration, aliases, plugins
- **`tailwind.config.ts`:** Tailwind CSS customization, theme, colors
- **`tsconfig.json`:** TypeScript compiler options
- **`eslint.config.js`:** Code linting rules
- **`vercel.json`:** Deployment configuration for Vercel

## 🚨 Important Notes

### Security Vulnerabilities
- Current moderate vulnerabilities in esbuild/vite (development only)
- Run `npm audit` to check status
- These don't affect production builds

### Performance
- Images are externally hosted (Unsplash dependency)
- Bundle size optimized with Vite
- Consider image optimization for local assets

### Deployment
- Configured for Vercel deployment
- Build command: `vite build`
- Output directory: `dist/`

## 📞 Support

For technical questions about this codebase:
1. Check existing code patterns first
2. Review this README
3. Check component documentation in `/src/components/ui/`

## 🔄 Common Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Check code quality

# Package Management
npm install          # Install dependencies
npm audit           # Check vulnerabilities
npm audit fix       # Fix vulnerabilities

# Git
git status          # Check changes
git add .           # Stage all changes
git commit -m "..."  # Commit changes
```