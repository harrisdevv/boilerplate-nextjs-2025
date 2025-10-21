# Documentation Index

Welcome to the boilerplate documentation! This page contains links to all available documentation.

## 📚 Documentation Overview

### Getting Started
- **[[README.md]]**: Complete project documentation with features, setup, and deployment
  - Overview of all features and capabilities
  - Installation and configuration instructions
  - Database, authentication, and payment setup
  - API references and examples

- **[[QUICK_START.md]]**: Get your app running in 10 minutes
  - Minimal setup for local development
  - Step-by-step quick start guide
  - Common issues and troubleshooting

- **[[PROJECT_OVERVIEW.md]]**: Understand the project structure and architecture
  - Directory structure explained
  - Key concepts and patterns
  - Common use cases and examples
  - Development workflow

### Deployment & Infrastructure
- **[[document/replit-setup.md]]**: Deploy to Replit and configure custom domains
  - How to deploy your app on Replit
  - Setting up custom domain on Replit
  - Environment variables configuration
  - Replit-specific optimizations

### Authentication
- **[[document/google-auth-setup.md]]**: Complete Google OAuth setup guide
  - Creating Google OAuth credentials
  - Configuring authorized redirect URIs
  - Adding Replit URLs to Google Auth
  - Testing and troubleshooting authentication

### Payments
- **[[document/paddle-setup.md]]**: Paddle payment integration guide
  - Setting up lifetime (one-time) payments
  - Configuring monthly and yearly subscriptions
  - Creating products and prices in Paddle Dashboard
  - Webhook configuration and testing
  - Going to production checklist
  - Managing subscriptions and pricing strategies

### AI & Advanced Features
- **[[document/ai-setup.md]]**: AI integration with OpenRouter
  - OpenRouter setup and API keys
  - Available models and recommendations
  - Building AI agents and workflows
  - Best practices and cost optimization
  - Integration examples

### Version History
- **[[document/changelog.md]]**: Track all changes and updates
  - Version history with detailed changelog
  - New features and improvements
  - Bug fixes and breaking changes
  - Migration guides

### Content & SEO
- **[[HYBRID_BLOG_GUIDE.md]]**: Complete hybrid blog system documentation
  - Using markdown and database posts
  - SEO best practices
  - Content management

- **[[HYBRID_BLOG_SUMMARY.md]]**: Quick reference for the blog system
  - Quick tips and common tasks

### Contributing
- **[[CONTRIBUTING.md]]**: How to contribute to this project
  - Contribution guidelines
  - Code standards
  - Pull request process

## 🚀 Quick Links by Topic

### For First-Time Users
1. Start with [[QUICK_START.md]] to get running locally
2. Read [[PROJECT_OVERVIEW.md]] to understand the architecture
3. Review [[README.md]] for comprehensive documentation

### For Deployment
1. [[document/replit-setup.md]] - Deploy to Replit
2. [[document/google-auth-setup.md]] - Setup authentication
3. [[document/paddle-setup.md]] - Setup payments
4. [[README.md#deployment]] - General deployment guide

### For AI Features
1. [[document/ai-setup.md]] - Complete AI setup guide
2. [[README.md#openrouter-ai-integration]] - Basic AI integration
3. Check the OpenRouter implementation in `src/lib/openrouter.ts`

### For Payments
1. [[document/paddle-setup.md]] - Complete Paddle setup guide
2. [[README.md#payment-setup-with-paddle]] - Basic payment setup
3. Choose between lifetime or subscription pricing

### For Development
1. [[PROJECT_OVERVIEW.md#development-workflow]] - Development workflow
2. [[document/changelog.md]] - See what's new
3. [[CONTRIBUTING.md]] - Contribution guidelines

## 📖 Additional Resources

### External Documentation
- [Next.js Documentation](https://nextjs.org/docs) - Next.js 14 App Router
- [Prisma Documentation](https://www.prisma.io/docs) - Database ORM
- [NextAuth.js Documentation](https://next-auth.js.org) - Authentication
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling
- [shadcn/ui Documentation](https://ui.shadcn.com) - UI components
- [OpenRouter Documentation](https://openrouter.ai/docs) - AI models
- [Paddle Documentation](https://developer.paddle.com) - Payments
- [Replit Documentation](https://docs.replit.com) - Replit platform

### Community & Support
- Check existing documentation before opening issues
- Review changelog for recent updates
- Read troubleshooting sections in relevant guides

## 🛠️ Document Structure

```
boilerplate/
├── README.md                           # Main documentation
├── QUICK_START.md                      # Quick setup guide
├── PROJECT_OVERVIEW.md                 # Architecture overview
├── CONTRIBUTING.md                     # Contribution guide
├── HYBRID_BLOG_GUIDE.md               # Blog system guide
├── HYBRID_BLOG_SUMMARY.md             # Blog quick reference
└── document/
    ├── index.md                        # This file
    ├── changelog.md                    # Version history
    ├── replit-setup.md                # Replit deployment
    ├── google-auth-setup.md           # Google OAuth setup
    ├── paddle-setup.md                # Paddle payment setup
    └── ai-setup.md                    # AI integration guide
```

## 📝 Documentation Updates

This documentation is actively maintained. Last updated: **October 21, 2025**

When adding new features, please update:
1. Relevant documentation files
2. This index page
3. The changelog (`document/changelog.md`)

---

**Need help?** Start with the documentation most relevant to your task, or read through the [[QUICK_START.md]] guide first.

