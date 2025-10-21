import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

// Default configuration when database is not available
const DEFAULT_CONFIG = {
  paymentMode: 'LIFETIME',
  lifetimePrice: 49,
  monthlyPrice: 9,
  annualPrice: 90,
}

export async function GET() {
  try {
    logger.debug('Fetching pricing configuration', { context: 'api-config' })

    const config = await prisma.siteConfig.findUnique({
      where: { id: 'site-config' },
      select: {
        paymentMode: true,
        lifetimePrice: true,
        monthlyPrice: true,
        annualPrice: true,
      },
    })

    if (!config) {
      logger.info('No config found, using defaults', { context: 'api-config' })
      return NextResponse.json(DEFAULT_CONFIG)
    }

    return NextResponse.json({
      paymentMode: config.paymentMode,
      lifetimePrice: Number(config.lifetimePrice),
      monthlyPrice: Number(config.monthlyPrice),
      annualPrice: Number(config.annualPrice),
    })
  } catch (error) {
    // If database is not available, return default config instead of error
    logger.warn('Database not available, using default pricing config', { 
      context: 'api-config',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
    })
    
    return NextResponse.json(DEFAULT_CONFIG)
  }
}

