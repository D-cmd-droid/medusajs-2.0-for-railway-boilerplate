# SeaSun Backend - Medusa E-commerce API

> **Premium Tanning Oil E-commerce Backend**  
> Built with Medusa 2.0 and deployed on Railway

## Production Deployment

- **API Endpoint**: https://backend-production-4a9b.up.railway.app
- **Admin Dashboard**: https://backend-production-4a9b.up.railway.app/app
- **Railway Project**: handsome-clarity
- **Environment**: production
- **Package Manager**: pnpm (configured via packageManager field)

## SeaSun-Specific Features

**Custom Modules:**
- **Email Notifications**: Resend integration with React Email templates for tanning oil brand
- **File Storage**: MinIO cloud storage for product images and media
- **Search**: MeiliSearch for fast product discovery

**Product Catalog:**
- Natural tanning oil products
- Beach lifestyle imagery
- Premium product positioning
- Seasonal collections

## Production Services (Railway)

**Deployed Services:**
- **Backend**: https://backend-production-4a9b.up.railway.app
- **Database**: PostgreSQL (managed)
- **Redis**: Redis (managed)
- **MinIO**: https://bucket-production-8544.up.railway.app
- **MeiliSearch**: https://meilisearch-production-4cc0.up.railway.app
- **Console**: https://console-production-1bb8.up.railway.app

**Railway CLI Commands:**
```bash
# Check deployment status
railway status

# View logs
railway logs

# Connect to production database
railway connect
```

## Local Development Setup

### Prerequisites
- Node.js 22.x
- pnpm 9.10.0+ (configured via packageManager field)
- PostgreSQL database

### Setup Instructions

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment configuration:**
   ```bash
   cp .env.template .env
   ```
   
   **For local development**, edit `.env` with:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/seasun_local
   MEDUSA_ADMIN_EMAIL=admin@seasun.com
   MEDUSA_ADMIN_PASSWORD=your_password
   ```
   
   **For Railway connection**, use the production database URL from Railway dashboard.

3. **Initialize database:**
   ```bash
   pnpm ib  # Initialize backend - migrations and seed data
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```

**Access Points:**
- Admin Dashboard: http://localhost:9000/app
- API Endpoint: http://localhost:9000

## Available Commands

```bash
# Initialize backend (migrations + seed)
pnpm ib

# Development server
pnpm dev

# Production build
pnpm build

# Production server
pnpm start

# Database seeding
pnpm seed

# Email template development
pnpm email:dev
```

## Custom Modules

### Email Notifications
- **Location**: `src/modules/email-notifications/`
- **Provider**: Resend
- **Templates**: React Email with SeaSun branding
- **Documentation**: [README](src/modules/email-notifications/README.md)

### MinIO File Storage
- **Location**: `src/modules/minio-file/`
- **Provider**: MinIO Cloud Storage
- **Features**: Automatic bucket creation, public access, ULID naming
- **Documentation**: [README](src/modules/minio-file/README.md)

## Environment Variables

**Required:**
```env
DATABASE_URL=postgresql://...
MEDUSA_ADMIN_EMAIL=admin@seasun.com
MEDUSA_ADMIN_PASSWORD=secure_password
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

**Optional Services:**
```env
# Resend Email
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=orders@seasun.com

# MinIO Storage
MINIO_ENDPOINT=your-minio-endpoint
MINIO_ACCESS_KEY=your_access_key
MINIO_SECRET_KEY=your_secret_key

# MeiliSearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_MASTER_KEY=your_master_key

# Stripe Payments
STRIPE_API_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Troubleshooting

**Configuration Changes:**
If you modify environment variables or module configuration:
1. Stop the Medusa server
2. Delete the `.medusa/server` directory
3. Restart the server

**Common Issues:**
- **Database connection**: Verify DATABASE_URL format
- **Module errors**: Check `.medusa/server` directory for cached config
- **File uploads**: Ensure MinIO configuration is correct
- **Search not working**: Verify MeiliSearch connection

## Documentation

- **[Project Context](../../context/)** - Business requirements and strategy ([Browse Context](../../context/INDEX.md))
- **[Development Guides](../../context/guides/)** - Technical guides and best practices ([Browse Guides](../../context/guides/INDEX.md))
- **[Module Documentation](src/modules/)** - Custom module implementation details
- **[API Reference](../../context/guides/reference/api-endpoints-reference.md)** - API endpoint documentation
- **[Environment Variables Reference](../../context/guides/reference/environment-variables-reference.md)** - Configuration guide

---

**SeaSun Backend** - Powering premium tanning oil e-commerce
