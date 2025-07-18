# SeaSun Website Implementation

**Purpose**: Navigation hub for Medusa e-commerce backend and Next.js storefront code  
**Repository**: Implementation repository (independent from main documentation repo)  
**Package Manager**: pnpm (configured via packageManager field)
**Cross-reference**: See [Context Documentation](../context/) for project strategy and requirements

## Project Architecture

### 🏗️ Repository Structure
- **Backend**: `backend/` - Medusa 2.0 e-commerce backend
- **Storefront**: `storefront/` - Next.js 14 storefront application
- **Documentation**: `README.md` - Complete setup and deployment guide

### 📦 Package Management
- **Implementation Code**: Uses pnpm (configured via packageManager field)
- **Commands**: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm ib`
- **Lock File**: `pnpm-lock.yaml` (package manager enforced by configuration)

## Backend Structure (`backend/`)

### 🔧 Core Configuration
- [Setup Guide](backend/README.md) - Local development setup
- [Config File](backend/medusa-config.js) - Medusa configuration
- [Dependencies](backend/package.json) - Backend package dependencies

### 🚀 Key Modules
- **API Routes**: `src/api/` - Custom API endpoints
- **Admin Panel**: `src/admin/` - Administrative interface customizations
- **Email Services**: `src/modules/email-notifications/` - Resend email integration
- **File Storage**: `src/modules/minio-file/` - MinIO cloud storage integration
- **Workflows**: `src/workflows/` - Business logic workflows
- **Subscribers**: `src/subscribers/` - Event handling and notifications

### 🔌 Integrations
- **Payment**: Stripe payment processing
- **Search**: MeiliSearch product search
- **Email**: Resend email notifications
- **Storage**: MinIO file storage with local fallback

## Storefront Structure (`storefront/`)

### 🏠 Application Core
- [Setup Guide](storefront/README.md) - Next.js storefront setup
- [Config File](storefront/next.config.js) - Next.js configuration
- [Dependencies](storefront/package.json) - Frontend package dependencies

### 📱 App Router Structure (`src/app/`)
- **Dynamic Routes**: `[countryCode]/` - Region-specific routing
- **Checkout Flow**: `(checkout)/` - Isolated checkout experience
- **Main App**: `(main)/` - Primary application routes
- **API Routes**: `api/` - Next.js API endpoints

### 🧩 Component Architecture (`src/modules/`)
- **Account**: User account management and authentication
- **Cart**: Shopping cart functionality
- **Checkout**: Multi-step checkout process
- **Products**: Product display and interaction
- **Search**: Product search and filtering
- **Common**: Shared UI components and utilities

### 🎨 Styling & Assets
- **Styles**: `src/styles/globals.css` - Global CSS and Tailwind imports
- **Public Assets**: `public/` - Static assets and favicon
- **Tailwind Config**: `tailwind.config.js` - Styling configuration

## Development Workflow

### 🚀 Quick Start
1. **Backend Setup**: `cd backend && pnpm install && pnpm ib && pnpm dev`
2. **Storefront Setup**: `cd storefront && pnpm install && pnpm dev`
3. **Environment**: Copy `.env.template` files and configure

### 🔧 Common Commands
- **Development**: `pnpm dev` - Start development server
- **Build**: `pnpm build` - Production build
- **Initialize**: `pnpm ib` - Initialize backend database
- **Database**: `pnpm ib` - Initialize backend database

### 🧪 Testing
- **E2E Tests**: `storefront/e2e/` - Playwright end-to-end tests
- **Test Config**: `storefront/playwright.config.ts` - Test configuration

## Key Configuration Files

### Backend Configuration
- `medusa-config.js` - Medusa server configuration
- `package.json` - Backend dependencies and scripts
- `tsconfig.json` - TypeScript configuration

### Storefront Configuration
- `next.config.js` - Next.js application configuration
- `tailwind.config.js` - Tailwind CSS styling configuration
- `package.json` - Frontend dependencies and scripts

## Cross-References

### Documentation
- [Product Requirements](../context/prd.md) - Feature requirements and specifications
- [Technical Specifications](../context/technical.md) - Technical implementation details
- [Architecture Decisions](../context/architecture.md) - System design decisions

### Development Guides
- [Quick Start Guide](../context/guides/medusa-nextjs-vercel-quick-start.md) - 5-minute setup
- [Development Best Practices](../context/guides/medusa-development-best-practices.md) - Code quality standards
- [Performance Optimization](../context/guides/medusa-performance-optimization.md) - Scaling strategies

### Reference Materials
- [Environment Variables](../context/guides/reference/environment-variables-reference.md) - Configuration reference
- [API Documentation](../context/guides/reference/api-endpoints-reference.md) - API endpoint reference

## Quick Access

### 🔥 Frequently Modified
- **Backend Config**: `backend/medusa-config.js`
- **Storefront Config**: `storefront/next.config.js`
- **Global Styles**: `storefront/src/styles/globals.css`
- **API Routes**: `backend/src/api/` and `storefront/src/app/api/`

### 📋 Setup Files
- **Backend Environment**: `backend/.env.template`
- **Storefront Environment**: `storefront/.env.local.template`
- **Package Files**: `*/package.json`

### 🛠️ Development Tools
- **VS Code Config**: `.vscode/` - Development environment settings
- **Git Config**: `.gitignore` - Version control exclusions
- **TypeScript**: `*/tsconfig.json` - Type checking configuration