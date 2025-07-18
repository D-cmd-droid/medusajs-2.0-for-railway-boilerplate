# SeaSun Storefront - Next.js E-commerce

> **Premium Natural Tanning Oil E-commerce Storefront**  
> Built with Medusa's modules and Next.js 14 features for a performant storefront

## Live Deployment

- **🌐 Production**: https://medusajs-2-0-for-railway-boilerplat.vercel.app
- **⚡ CDN**: Vercel Edge Network
- **🔗 Backend**: https://backend-production-4a9b.up.railway.app
- **📦 Package Manager**: pnpm (configured via packageManager field)
- **🔧 Environment Variables**: 7 configured (see Vercel dashboard)

## About SeaSun

SeaSun creates premium natural tanning oils that enhance your sun-kissed glow while nourishing your skin. This storefront showcases our beach lifestyle products with a focus on natural beauty and optimal user experience.

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

### Prerequisites

To use the SeaSun storefront, you should have the SeaSun Medusa backend running locally on port 9000.
For a quick setup, run:

```shell
cd ../backend
pnpm install && pnpm ib && pnpm dev
```

**Current Environment Variables (7 configured):**
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Backend API endpoint
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - Medusa store API key
- `NEXT_PUBLIC_MINIO_ENDPOINT` - MinIO file storage endpoint
- `NEXT_PUBLIC_INDEX_NAME` - MeiliSearch index name
- `MEILISEARCH_API_KEY` - Search API key
- `NEXT_PUBLIC_BASE_URL` - Storefront base URL
- `REVALIDATE_SECRET` - Next.js revalidation secret

Check out [Backend Setup Guide](../backend/README.md) for more details and troubleshooting.

# Overview

The Medusa Next.js Starter is built with:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Medusa](https://medusajs.com/)

Features include:

- Full ecommerce support:
  - Product Detail Page
  - Product Overview Page
  - Search with Algolia / MeiliSearch
  - Product Collections
  - Cart
  - Checkout with PayPal and Stripe
  - User Accounts
  - Order Details
- Full Next.js 14 support:
  - App Router
  - Next fetching/caching
  - Server Components
  - Server Actions
  - Streaming
  - Static Pre-Rendering
- File Storage:
  - MinIO integration (optional)
  - Local file fallback


# Quickstart

### Setting up the environment variables

Navigate into your projects directory and get your environment variables ready:

```shell
cd storefront/
cp .env.local.template .env.local
```

### Install dependencies

Use pnpm to install all dependencies.

```shell
pnpm install
```

### Start developing

You are now ready to start up your project.

```shell
pnpm dev
```

### Open the code and start customizing

Your SeaSun storefront is now running at http://localhost:8000!

# File Storage Integration

SeaSun uses MinIO for cloud storage of product images with a fallback to local storage. 

**Production Configuration:**
- MinIO endpoint: `bucket-production-8544.up.railway.app`
- Automatically configured for product images and media
- Current environment: `NEXT_PUBLIC_MINIO_ENDPOINT=bucket-production-8544.up.railway.app`

**Local Development:**
1. Add your MinIO endpoint to `.env.local`:
```shell
NEXT_PUBLIC_MINIO_ENDPOINT=your-minio-endpoint
```

2. The storefront will automatically use MinIO for serving images when the endpoint is configured.

**Vercel CLI Commands:**
```bash
# View environment variables
vercel env ls

# Check deployment status
vercel ls

# Inspect current deployment
vercel inspect medusajs-2-0-for-railway-boilerplat.vercel.app
```

## Railway Switch Deployment

**Cost-Effective Backup Strategy:**
Railway storefront deployment can be activated on-demand for backup or testing purposes:

**Switch File**: `../zrailwaystorefrontbuild` (Railway watches this file)  
**Trigger**: Modify the switch file to initiate Railway deployment  
**Purpose**: Backup deployment without ongoing Railway hosting costs  

**To Activate Railway Deployment:**
```bash
# From project root
echo "Deploy $(date)" >> zrailwaystorefrontbuild
git add zrailwaystorefrontbuild
git commit -m "Trigger Railway storefront deployment"
git push
```

**Benefits:**
- Cost-effective: Railway service stays idle until needed
- Backup option: Alternative deployment if Vercel has issues
- Testing: Deploy experimental builds without affecting main Vercel deployment

No additional configuration is needed - if MinIO is not configured, the storefront will use local file storage for development.

# Payment integrations

SeaSun supports the following payment integrations for purchasing tanning oil products:

- [Stripe](https://stripe.com/) - Primary payment processor
- [Paypal](https://www.paypal.com/) - Alternative payment option

**Production:** Payment integrations are automatically configured via Railway environment variables.

**Local Development:** Add the following to your `.env.local` file:

```shell
NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your-paypal-client-id>
```

You will also need to setup the integrations in your Medusa server. See the [Medusa documentation](https://docs.medusajs.com) for more information on how to configure [Stripe](https://docs.medusajs.com/add-plugins/stripe) and [PayPal](https://docs.medusajs.com/add-plugins/paypal) in your Medusa project.

# Search integration

SeaSun uses MeiliSearch for fast product search and discovery.

**Production Configuration:**
- MeiliSearch endpoint: `https://meilisearch-production-4cc0.up.railway.app`
- Automatically configured for product search
- Index name: `products`

**Local Development:** Enable search by adding to your `.env.local`:
```shell
NEXT_PUBLIC_SEARCH_ENDPOINT=http://localhost:7700
NEXT_PUBLIC_SEARCH_API_KEY=your_search_key
NEXT_PUBLIC_INDEX_NAME=products
```

The search is pre-configured in the backend with the `medusa-search-meilisearch` plugin. For more information, see the [Medusa documentation](https://docs.medusajs.com/add-plugins/meilisearch).

The search components in this starter are developed with Algolia's `react-instant-search-hooks-web` library which should make it possible for you to seemlesly change your search provider to Algolia instead of MeiliSearch.

To do this you will need to add `algoliasearch` to the project, by running

```shell
pnpm add algoliasearch
```

After this you will need to switch the current MeiliSearch `SearchClient` out with a Alogolia client. To do this update `@lib/search-client`.

```ts
import algoliasearch from "algoliasearch/lite"

const appId = process.env.NEXT_PUBLIC_SEARCH_APP_ID || "test_app_id" // You should add this to your environment variables

const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || "test_key"

export const searchClient = algoliasearch(appId, apiKey)

export const SEARCH_INDEX_NAME =
  process.env.NEXT_PUBLIC_INDEX_NAME || "products"
```

Then, in `src/app/(main)/search/actions.ts`, remove the MeiliSearch code (line 10-16) and uncomment the Algolia code.

```ts
"use server"

import { searchClient, SEARCH_INDEX_NAME } from "@lib/search-client"

/**
 * Uses MeiliSearch or Algolia to search for a query
 * @param {string} query - search query
 */
export async function search(query: string) {
  const index = searchClient.initIndex(SEARCH_INDEX_NAME)
  const { hits } = await index.search(query)

  return hits
}
```

After this you will need to set up Algolia with your Medusa server, and then you should be good to go. For a more thorough walkthrough of using Algolia with Medusa – [see our documentation](https://docs.medusajs.com/add-plugins/algolia), and the [documentation for using `react-instantsearch-hooks-web`](https://www.algolia.com/doc/guides/building-search-ui/getting-started/react-hooks/).

## App structure

For the new version, the main folder structure remains unchanged. The contents have changed quite a bit though.

```
.
└── src
    ├── app
    ├── lib
    ├── modules
    ├── styles
    ├── types
    └── middleware.ts

```

### `/app` directory

The app folder contains all Next.js App Router pages and layouts, and takes care of the routing.

```
.
└── [countryCode]
    ├── (checkout)
        └── checkout
    └── (main)
        ├── account
        │   ├── addresses
        │   └── orders
        │       └── details
        │           └── [id]
        ├── cart
        ├── categories
        │   └── [...category]
        ├── collections
        │   └── [handle]
        ├── order
        │   └── confirmed
        │       └── [id]
        ├── products
        │   └── [handle]
        ├── results
        │   └── [query]
        ├── search
        └── store
```

The app router folder structure represents the routes of the SeaSun storefront. In this case, the structure is as follows:

- The root directory is represented by the `[countryCode]` folder. This indicates a dynamic route based on the country code. The this will be populated by the countries you set up in your Medusa server. The param is then used to fetch region specific prices, languages, etc.
- Within the root directory, there two Route Groups: `(checkout)` and `(main)`. This is done because the checkout flow uses a different layout.  All other parts of the app share the same layout and are in subdirectories of the `(main)` group. Route Groups do not affect the url.
- Each of these subdirectories may have further subdirectories. For instance, the `account` directory has `addresses` and `orders` subdirectories. The `orders` directory further has a `details` subdirectory, which itself has a dynamic `[id]` subdirectory.
- This nested structure allows for specific routing to various pages within the application. For example, a URL like `/account/orders/details/123` would correspond to the `account > orders > details > [id]` path in the router structure, with `123` being the dynamic `[id]`.

This structure enables efficient routing and organization of different parts of the SeaSun storefront.

### `/lib` **directory**

The lib directory contains all utilities like the Medusa JS client functions, util functions, config and constants. 

The most important file here is `/lib/data/index.ts`. This file defines various functions for interacting with the Medusa API, using the JS client. The functions cover a range of actions related to shopping carts, orders, shipping, authentication, customer management, regions, products, collections, and categories. It also includes utility functions for handling headers and errors, as well as some functions for sorting and transforming product data.

These functions are used in different Server Actions.

### `/modules` directory

This is where all the components, templates and Server Actions are, grouped by section. Some subdirectories have an `actions.ts` file. These files contain all Server Actions relevant to that section of the app.

### `/styles` directory

`global.css` imports Tailwind classes and defines a couple of global CSS classes. Tailwind and Medusa UI classes are used for styling throughout the app.

### `/types` directory

Contains global TypeScript type defintions.

### `middleware.ts`

Next.js Middleware, which is basically an Edge function that runs before (almost) every request. In our case it enforces a `countryCode` in the url. So when a user visits any url on your storefront without a `countryCode` param, it will redirect the user to the url for the most relevant region.

The region will be decided as follows:

- When deployed on Vercel and you're active in the user's current country, it will use the country code from the `x-vercel-ip-country` header.
- Else, if you have defined a `NEXT_PUBLIC_DEFAULT_REGION` environment variable, it will redirect to that.
- Else, it will redirect the user to the first region it finds on your Medusa server.

If you want to use the `countryCode` param in your code, there's two ways to do that:

1. On the server in any `page.tsx` - the `countryCode` is in the `params` object:
    
    ```tsx
    export default async function Page({
      params: { countryCode },
    }: {
      params: { countryCode: string }
    }) {
      const region = await getRegion(countryCode)
    
    // rest of code
    ```
    
2. From client components, with the `useParam` hook:
    
    ```tsx
    import { useParams } from "next/navigation"
    
    const Component = () => {
    	const { countryCode } = useParams()
    	
    	// rest of code
    ```
    

The middleware also sets a cookie based on the onboarding status of a user. This is related to the Medusa Admin onboarding flow, and may be safely removed in your production storefront.

# Resources

## SeaSun Project Documentation

- **[Project Context](../../context/)** - Business requirements and strategy ([Browse Context](../../context/INDEX.md))
- **[Development Guides](../../context/guides/)** - Technical guides and best practices ([Browse Guides](../../context/guides/INDEX.md))
- **[Content Strategy](../../context/content/)** - Brand messaging and positioning ([Browse Content](../../context/content/INDEX.md))
- **[Brand Assets](../../context/references/)** - Design materials and brand guidelines ([Browse References](../../context/references/INDEX.md))
- **[Backend Setup](../backend/README.md)** - SeaSun backend configuration

## Technical Guides

- **[Quick Start Guide](../../context/guides/medusa-nextjs-vercel-quick-start.md)** - 5-minute setup
- **[Development Best Practices](../../context/guides/medusa-development-best-practices.md)** - Code quality standards
- **[Performance Optimization](../../context/guides/medusa-performance-optimization.md)** - Scaling strategies
- **[Production Deployment](../../context/guides/medusa-production-deployment-checklist.md)** - Deployment checklist

## Framework Documentation

### Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentation](https://docs.medusajs.com/)

### Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)

---

**SeaSun Storefront** - Premium natural tanning oil e-commerce experience
