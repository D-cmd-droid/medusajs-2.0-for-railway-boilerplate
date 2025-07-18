# SeaSun E-commerce Implementation

> **Premium Natural Tanning Oil E-commerce Platform**  
> Built with Medusa 2.0 backend and Next.js 14 storefront

## Live Deployment

- **🌐 Storefront**: https://medusajs-2-0-for-railway-boilerplat.vercel.app
- **⚙️ Backend API**: https://backend-production-4a9b.up.railway.app
- **👩‍💼 Admin Dashboard**: https://backend-production-4a9b.up.railway.app/app

## About SeaSun

SeaSun creates premium natural tanning oils that enhance your sun-kissed glow while nourishing your skin. This e-commerce platform showcases our product line with a focus on the beach lifestyle and natural beauty.

**Key Features:**
- Premium tanning oil product catalog
- Beach lifestyle branding and imagery
- Natural/organic product positioning
- Seamless checkout experience
- Mobile-optimized shopping experience

## Architecture Overview

This implementation consists of a Medusa 2.0 e-commerce backend and Next.js 14 storefront, deployed on Railway and Vercel respectively.

**Current Version**: Medusa 2.0 (latest) with Next.js 14

**Deployment Architecture:**
- **Backend**: Railway (PostgreSQL, Redis, MinIO, MeiliSearch)
- **Storefront**: Vercel (Next.js with static optimization)
- **CDN**: Vercel Edge Network for global performance

## Integrated Services

**Production Services:**
- **🗄️ MinIO File Storage**: Cloud storage for product images and media ([Module Documentation](backend/src/modules/minio-file/README.md))
- **📧 Resend Email**: Transactional emails with React Email templates ([Module Documentation](backend/src/modules/email-notifications/README.md))
- **💳 Stripe Payments**: Secure payment processing for tanning oil purchases
- **🔍 MeiliSearch**: Fast product search and filtering capabilities
- **📦 PostgreSQL**: Primary database for product catalog and orders
- **⚡ Redis**: Caching and session management

**SeaSun-Specific Customizations:**
- Custom email templates for tanning oil brand
- Product catalog optimized for natural beauty products
- Beach lifestyle imagery and branding
- Mobile-first responsive design

# Backend Setup

## Local Development

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.template .env
   ```
   Edit `.env` with your configuration or use Railway database URL for remote development.

4. **Initialize database:**
   ```bash
   pnpm ib  # Initialize backend - runs migrations and seeds
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

**Admin Dashboard**: http://localhost:9000/app

## Backend Requirements

**Production (Railway):**
- PostgreSQL database ✅ (automatically configured)
- Redis ✅ (automatically configured)
- MinIO file storage ✅ (automatically configured)
- MeiliSearch ✅ (automatically configured)

**Local Development:**
- PostgreSQL database (required)
- Redis (optional - fallback to simulated)
- MinIO (optional - fallback to local storage)
- MeiliSearch (optional - for search functionality)

## Backend Commands

```bash
cd backend/

# Initialize backend (migrations + seed data)
pnpm ib

# Development server (with admin dashboard)
pnpm dev

# Production build and start
pnpm build && pnpm start

# Email template development
pnpm email:dev
```

# Storefront Setup

## Local Development

1. **Navigate to storefront directory:**
   ```bash
   cd storefront
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.local.template .env.local
   ```
   Configure environment variables to point to your backend.

4. **Start development server:**
   ```bash
   pnpm dev
   ```

**Storefront**: http://localhost:8000

## Storefront Commands

```bash
cd storefront/

# Development server with hot reloading
pnpm dev

# Production build
pnpm build

# Production server
pnpm start

# Run E2E tests
pnpm test-e2e

# Lint code
pnpm lint
```

## Requirements

- Backend running on port 9000 (local) or configured backend URL
- All SeaSun product data and configurations

## Documentation & Resources

### Project Documentation
- **[Project Context](../context/)** - Business requirements and strategy
- **[Development Guides](../context/guides/)** - Technical guides and best practices
- **[Content Strategy](../context/content/)** - Brand messaging and positioning
- **[Brand Assets](../context/references/)** - Design materials and brand guidelines

### Technical Guides
- **[Quick Start Guide](../context/guides/medusa-nextjs-vercel-quick-start.md)** - 5-minute setup
- **[Development Best Practices](../context/guides/medusa-development-best-practices.md)** - Code quality standards
- **[Production Deployment](../context/guides/medusa-production-deployment-checklist.md)** - Deployment checklist
- **[Performance Optimization](../context/guides/medusa-performance-optimization.md)** - Scaling strategies

### Module Documentation
- **[Email Notifications](backend/src/modules/email-notifications/README.md)** - Resend integration
- **[MinIO File Storage](backend/src/modules/minio-file/README.md)** - Cloud storage setup

### External Resources
- **[Medusa Documentation](https://docs.medusajs.com)** - Official Medusa docs
- **[Next.js Documentation](https://nextjs.org/docs)** - Official Next.js docs

---

**Built for SeaSun** - Premium natural tanning oil e-commerce platform
