import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createLogger } from '@lib/util/logger'

export async function GET(request: NextRequest) {
  const correlationId = crypto.randomUUID()
  const timestamp = new Date().toISOString()
  
  const logger = createLogger('revalidation-api')

  logger.info('Endpoint called', {
    correlationId,
    timestamp,
    headers: {
      'X-Revalidate-Secret': request.headers.get('X-Revalidate-Secret') ? 'PRESENT' : 'MISSING',
      'User-Agent': request.headers.get('User-Agent')
    }
  })

  // Validate secret
  const secret = request.headers.get('X-Revalidate-Secret')
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    logger.warn('Unauthorized', {
      correlationId,
      secret: secret ? 'PROVIDED' : 'MISSING',
      envSecret: process.env.REVALIDATE_SECRET ? 'SET' : 'NOT SET'
    })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get tags from query parameters
  const searchParams = request.nextUrl.searchParams
  const tags = searchParams.get('tags') as string

  if (!tags) {
    logger.warn('No tags provided', { correlationId })
    return NextResponse.json({ error: 'No tags provided' }, { status: 400 })
  }

  logger.info('Processing tags', {
    correlationId,
    tags
  })

  try {
    const tagsArray = tags.split(',')
    
    await Promise.all(
      tagsArray.map(async (tag) => {
        switch (tag.trim()) {
          case 'products':
            // Revalidate all product-related pages using revalidatePath
            logger.info('Revalidating product pages', { correlationId })
            
            // Store page
            revalidatePath('/[countryCode]/(main)/store', 'page')
            
            // Product detail pages
            revalidatePath('/[countryCode]/(main)/products/[handle]', 'page')
            
            // Category pages
            revalidatePath('/[countryCode]/(main)/categories/[...category]', 'page')
            
            // Collection pages
            revalidatePath('/[countryCode]/(main)/collections/[handle]', 'page')
            
            // Search pages
            revalidatePath('/[countryCode]/(main)/search', 'page')
            revalidatePath('/[countryCode]/(main)/results/[query]', 'page')
            
            // Home page (might have product listings)
            revalidatePath('/[countryCode]/(main)', 'page')
            
            break
            
          default:
            logger.warn('Unknown tag', { correlationId, tag })
            break
        }
      })
    )

    logger.info('Success', {
      correlationId,
      tags,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      message: 'Revalidated successfully',
      tags: tagsArray,
      timestamp: new Date().toISOString(),
      correlationId
    })

  } catch (error) {
    logger.error('Error', {
      correlationId,
      error: error instanceof Error ? error.message : 'Unknown error',
      tags
    })

    return NextResponse.json(
      { 
        error: 'Revalidation failed',
        correlationId
      }, 
      { status: 500 }
    )
  }
}