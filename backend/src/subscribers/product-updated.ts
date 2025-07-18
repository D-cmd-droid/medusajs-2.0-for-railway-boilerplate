import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { STOREFRONT_URL, REVALIDATE_SECRET } from '../lib/constants'
import { randomUUID } from 'crypto'

export default async function productUpdatedHandler({
  event
}: SubscriberArgs<Record<string, any>>) {
  // Check if revalidation is configured
  if (!STOREFRONT_URL || !REVALIDATE_SECRET) {
    // Silent fail - revalidation is optional
    return
  }

  const correlationId = randomUUID()
  const timestamp = new Date().toISOString()

  console.log('[Product Revalidation] Subscriber triggered', {
    event: event.name,
    productId: event.data.id,
    correlationId,
    timestamp,
    STOREFRONT_URL: STOREFRONT_URL ? 'SET' : 'NOT SET',
    REVALIDATE_SECRET: REVALIDATE_SECRET ? 'SET' : 'NOT SET'
  })

  try {
    const revalidateUrl = `${STOREFRONT_URL}/api/revalidate?tags=products`
    
    console.log('[Product Revalidation] Sending request', {
      correlationId,
      url: revalidateUrl
    })

    const response = await fetch(revalidateUrl, {
      method: 'GET',
      headers: {
        'X-Revalidate-Secret': REVALIDATE_SECRET,
        'Content-Type': 'application/json',
        'User-Agent': 'Medusa-Product-Subscriber'
      }
    })

    if (response.ok) {
      console.log('[Product Revalidation] Success', {
        correlationId,
        status: response.status,
        productId: event.data.id,
        event: event.name
      })
    } else {
      console.error('[Product Revalidation] Failed', {
        correlationId,
        status: response.status,
        statusText: response.statusText,
        productId: event.data.id,
        event: event.name
      })
    }
  } catch (error) {
    console.error('[Product Revalidation] Error', {
      correlationId,
      error: error instanceof Error ? error.message : 'Unknown error',
      productId: event.data.id,
      event: event.name
    })
  }
}

export const config: SubscriberConfig = {
  event: [
    'product.updated',
    'product.created', 
    'product.deleted'
  ]
}