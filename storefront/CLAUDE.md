# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

```bash
# Install dependencies
pnpm install

# Start development server (includes backend waiting and launcher)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run only the Next.js build (without waiting for backend)
pnpm build:next

# Lint the codebase
pnpm lint

# Analyze bundle size
pnpm analyze

# Run E2E tests with Playwright
pnpm test-e2e
```

### Running the Application

1. Ensure you have the environment variables set up:
   ```bash
   cp .env.local.template .env.local
   ```

2. Make sure the Medusa backend is running on port 9000. If needed:
   ```bash
   cd ../backend
   pnpm install && pnpm ib && pnpm dev
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. The application will be available at http://localhost:8000

## Project Architecture

### Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Framework**: React 18
- **Styling**: Tailwind CSS with custom SEASUN design system
- **State Management**: React Hooks and Server Components
- **API Integration**: Medusa JS Client
- **Search**: MeiliSearch with react-instant-search-hooks-web
- **Testing**: Playwright for E2E tests
- **Package Manager**: pnpm

### Key Environment Variables

```bash
# Required variables
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000

# Optional features
NEXT_PUBLIC_MINIO_ENDPOINT=your-minio-endpoint # For file storage
NEXT_PUBLIC_SEARCH_ENDPOINT=http://localhost:7700 # For MeiliSearch
NEXT_PUBLIC_SEARCH_API_KEY=your_search_key
NEXT_PUBLIC_INDEX_NAME=products
NEXT_PUBLIC_STRIPE_KEY=your-stripe-public-key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
```

### Directory Structure

- `/src/app`: Next.js App Router pages and layouts
  - `/[countryCode]`: Root directory with dynamic route based on country code
    - `/(checkout)`: Route group for checkout flow with separate layout
    - `/(main)`: Route group for main site with shared layout
      - Various subdirectories for account, cart, products, etc.
  - `/api`: API routes including auth and revalidation endpoints

- `/src/lib`: Utilities and shared code
  - `/data`: Medusa JS client functions for data fetching
  - `/context`: React context providers
  - `/hooks`: Custom React hooks
  - `/util`: Helper functions and utilities

- `/src/modules`: Feature-based components and logic
  - Each subdirectory represents a section of the site (e.g., `/account`, `/cart`, `/products`)
  - Contains components, templates, and server actions specific to each feature

- `/src/styles`: Global CSS including Tailwind imports
  - `globals.css`: Main stylesheet with SEASUN brand colors and custom components

- `/src/types`: TypeScript type definitions

- `/e2e`: End-to-end tests using Playwright
  - `/tests`: Test files organized by feature
  - `/fixtures`: Test data and fixtures
  - `/utils`: Testing utilities

### Key Design Patterns

1. **Country-based Routing**:
   - All routes include a `[countryCode]` parameter
   - Used for region-specific pricing, languages, etc.
   - Middleware redirects to appropriate region based on user location

2. **Server Components & Actions**:
   - Extensive use of React Server Components for data fetching
   - Server Actions in `actions.ts` files for server-side mutations

3. **Feature-based Organization**:
   - Code is organized by feature/module rather than by type
   - Each module contains its own components, templates, and actions

4. **Custom Design System**:
   - SEASUN-specific design tokens in CSS variables
   - Custom typography and component styles
   - Responsive design with mobile-first approach

## Common Tasks

### Adding a New Page

1. Create a new directory in the appropriate route group under `/src/app/[countryCode]/(main)/`
2. Add a `page.tsx` file that exports a Server Component
3. Use the Medusa client to fetch any necessary data
4. Import components from the relevant module

Example:
```tsx
// /src/app/[countryCode]/(main)/new-page/page.tsx
import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import NewPageTemplate from "@modules/new-page/templates/new-page-template"

export const metadata: Metadata = {
  title: "New Page - SEASUN",
  description: "Description for the new page",
}

export default async function NewPage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)
  
  if (!region) {
    return null
  }
  
  return <NewPageTemplate region={region} />
}
```

### Working with the Medusa Client

Data fetching is centralized in `/src/lib/data/index.ts`, providing functions for various API operations:

```tsx
// Example of fetching a product
import { getProductByHandle } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

// In a Server Component:
const region = await getRegion(countryCode)
const product = await getProductByHandle("product-handle", region.id)
```

### Styling Components

Use Tailwind classes with SEASUN-specific design tokens:

```tsx
<div className="seasun-body font-light text-center" 
  style={{ 
    color: 'var(--seasun-deep-black)', 
    fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
    lineHeight: '1.6',
  }}>
  Content here
</div>
```

### Running E2E Tests

The project uses Playwright for end-to-end testing:

```bash
# Run all E2E tests
pnpm test-e2e

# Run a specific test file
npx playwright test e2e/tests/path/to/test.spec.ts
```

## Architecture Notes

1. The codebase makes extensive use of Next.js 14 features including:
   - App Router
   - Server Components
   - Server Actions
   - Streaming

2. The storefront integrates with a Medusa backend, with data fetching handled through the Medusa JS client.

3. The SEASUN design system includes:
   - Custom color variables (e.g., `--seasun-golden-tan`, `--seasun-deep-black`)
   - Typography classes (e.g., `.seasun-h1`, `.seasun-body`)
   - Animation utilities and keyframes

4. Payment processing is handled through Stripe and PayPal integrations.

5. Search functionality uses MeiliSearch by default but can be switched to Algolia.

6. File storage uses MinIO for cloud storage or falls back to local storage.