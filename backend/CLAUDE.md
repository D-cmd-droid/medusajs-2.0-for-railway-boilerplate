# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Local Development

```bash
# Install dependencies
pnpm install

# Initialize backend (run migrations + seed data)
pnpm ib

# Start development server
pnpm dev

# Access points:
# - Admin Dashboard: http://localhost:9000/app
# - API Endpoint: http://localhost:9000
```

### Email Development

```bash
# Start email template development server
pnpm email:dev
# Access email templates at http://localhost:3002
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Database

```bash
# Seed database with initial data
pnpm seed

# Connect to Railway production database
railway connect
```

### Deployment (Railway)

```bash
# Check deployment status
railway status

# View logs
railway logs
```

## Code Architecture

This is a Medusa 2.0 e-commerce backend for the SeaSun tanning oil brand, structured as follows:

### Directory Structure

- `/src/admin/` - Admin dashboard customizations
- `/src/api/` - API routes (admin, store, key-exchange)
- `/src/jobs/` - Background jobs
- `/src/lib/` - Common utilities and libraries
- `/src/migrations/` - Database migrations
- `/src/modules/` - Custom modules
  - `/email-notifications/` - React Email templates with Resend integration
  - `/minio-file/` - MinIO file storage integration
- `/src/scripts/` - Utility scripts (seeding, post-build)
- `/src/subscribers/` - Event subscribers
- `/src/workflows/` - Custom workflow definitions

### Key Technologies

- **Framework**: Medusa 2.0 E-commerce
- **Database**: PostgreSQL in production, SQLite in development
- **ORM**: MikroORM 6.x
- **Storage**: MinIO Cloud Storage for assets
- **Email**: Resend with React Email templates
- **Search**: MeiliSearch for product discovery
- **Payment**: Stripe integration

### Custom Modules

1. **Email Notifications Module**
   - Extends Medusa's notification system using Resend
   - Implements React Email templates for consistent branding
   - Located in `/src/modules/email-notifications/`
   - Email template development with `pnpm email:dev`

2. **MinIO File Storage Module**
   - Custom file storage provider for Medusa
   - Handles product images and assets
   - Provides automatic bucket creation and public read access
   - Located in `/src/modules/minio-file/`

### Event-Driven Architecture

Medusa uses an event-driven architecture where:

1. Services emit events when core actions occur (order placed, product updated)
2. Subscribers in `/src/subscribers/` listen for these events
3. Custom logic is executed in response to events

Important subscribers:
- `invite-created.ts`: Sends invitation emails
- `order-placed.ts`: Handles order confirmation notifications
- `product-updated.ts`: Updates search index when products change

### Environment Variables

Key environment variables required for development:
- `DATABASE_URL`: PostgreSQL connection string
- `MEDUSA_ADMIN_EMAIL` and `MEDUSA_ADMIN_PASSWORD`: Admin credentials
- `JWT_SECRET` and `COOKIE_SECRET`: Security tokens
- `RESEND_API_KEY` and `RESEND_FROM_EMAIL`: For email notifications
- `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`: For file storage

## Development Workflows

### Adding a New Email Template

1. Create template component in `/src/modules/email-notifications/templates/`
2. Add template key to `EmailTemplates` enum
3. Register template in `generateEmailTemplate` function
4. Trigger via `notificationModuleService.createNotifications()`

### Working with File Storage

Files are automatically handled via MinIO when properly configured, or fall back to local storage. When working with files:

1. Use Medusa's file service API for upload/download
2. Files are stored with ULID-generated unique names
3. Public access is enabled by default
4. Original filenames are preserved in metadata

### Troubleshooting

When configuration changes don't take effect:
1. Stop the Medusa server
2. Delete the `.medusa/server` directory to clear cached config
3. Restart the server

Common issues:
- Database connection: Verify DATABASE_URL format
- Module errors: Check `.medusa/server` directory for cached config
- File uploads: Ensure MinIO configuration is correct
- Search not working: Verify MeiliSearch connection