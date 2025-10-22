import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { paddle } from '@/lib/paddle'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('paddle-signature') || ''

    // Verify webhook signature (skip for mock)
    const isValid = signature === 'mock-signature' || paddle.verifyWebhookSignature(body, signature)

    if (!isValid) {
      logger.error('Invalid webhook signature', undefined, { context: 'paddle-webhook' })
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    logger.info('Paddle webhook received', {
      context: 'paddle-webhook',
      metadata: { eventType: event.alert_name },
    })

    // Handle different webhook events
    switch (event.alert_name) {
      case 'subscription_created':
        await handleSubscriptionCreated(event)
        break

      case 'subscription_updated':
        await handleSubscriptionUpdated(event)
        break

      case 'subscription_cancelled':
        await handleSubscriptionCancelled(event)
        break

      case 'subscription_payment_succeeded':
        await handlePaymentSucceeded(event)
        break

      case 'subscription_payment_failed':
        await handlePaymentFailed(event)
        break

      case 'payment_succeeded':
        // One-time payment (lifetime)
        await handleLifetimePayment(event)
        break

      default:
        logger.warn('Unhandled webhook event', {
          context: 'paddle-webhook',
          metadata: { eventType: event.alert_name },
        })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    logger.error('Webhook processing error', error, { context: 'paddle-webhook' })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSubscriptionCreated(event: any) {
  const { user_id, subscription_id, subscription_plan_id, status, next_bill_date } = event

  await prisma.subscription.create({
    data: {
      userId: user_id,
      paddleSubscriptionId: subscription_id,
      paymentMode: 'SUBSCRIPTION',
      interval: subscription_plan_id.includes('monthly') ? 'MONTHLY' : 'ANNUALLY',
      status: 'ACTIVE',
      currentPeriodEnd: new Date(next_bill_date),
      price: parseFloat(event.unit_price),
      currency: event.currency,
    },
  })

  logger.info('Subscription created', {
    context: 'paddle-webhook',
    metadata: { subscriptionId: subscription_id },
  })
}

async function handleSubscriptionUpdated(event: any) {
  const { subscription_id, status, next_bill_date } = event

  await prisma.subscription.update({
    where: { paddleSubscriptionId: subscription_id },
    data: {
      status: status === 'active' ? 'ACTIVE' : 'PAUSED',
      currentPeriodEnd: new Date(next_bill_date),
    },
  })

  logger.info('Subscription updated', {
    context: 'paddle-webhook',
    metadata: { subscriptionId: subscription_id },
  })
}

async function handleSubscriptionCancelled(event: any) {
  const { subscription_id } = event

  await prisma.subscription.update({
    where: { paddleSubscriptionId: subscription_id },
    data: {
      status: 'CANCELLED',
      cancelAtPeriodEnd: true,
    },
  })

  logger.info('Subscription cancelled', {
    context: 'paddle-webhook',
    metadata: { subscriptionId: subscription_id },
  })
}

async function handlePaymentSucceeded(event: any) {
  const { subscription_id, next_bill_date } = event

  await prisma.subscription.update({
    where: { paddleSubscriptionId: subscription_id },
    data: {
      status: 'ACTIVE',
      currentPeriodEnd: new Date(next_bill_date),
    },
  })

  logger.info('Payment succeeded', {
    context: 'paddle-webhook',
    metadata: { subscriptionId: subscription_id },
  })
}

async function handlePaymentFailed(event: any) {
  const { subscription_id } = event

  await prisma.subscription.update({
    where: { paddleSubscriptionId: subscription_id },
    data: {
      status: 'PAUSED',
    },
  })

  logger.error('Payment failed', undefined, {
    context: 'paddle-webhook',
    metadata: { subscriptionId: subscription_id },
  })
}

async function handleLifetimePayment(event: any) {
  const { passthrough, email, order_id } = event

  // Parse user ID from passthrough data
  const customData = JSON.parse(passthrough || '{}')
  const userId = customData.userId

  if (!userId) {
    logger.error('No user ID in lifetime payment', undefined, { context: 'paddle-webhook' })
    return
  }

  try {
    // Check if subscription already exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId },
    })

    if (existingSubscription) {
      // Update existing subscription
      await prisma.subscription.update({
        where: { userId },
        data: {
          paymentMode: 'LIFETIME',
          status: 'ACTIVE',
          lifetimePurchaseDate: new Date(),
          price: parseFloat(event.unit_price),
          currency: event.currency,
          paddleCustomerId: event.customer_id,
        },
      })
      logger.info('Lifetime payment updated existing subscription', {
        context: 'paddle-webhook',
        metadata: { userId, orderId: order_id },
      })
    } else {
      // Create new subscription
      await prisma.subscription.create({
        data: {
          userId,
          paymentMode: 'LIFETIME',
          status: 'ACTIVE',
          lifetimePurchaseDate: new Date(),
          price: parseFloat(event.unit_price),
          currency: event.currency,
          paddleCustomerId: event.customer_id,
        },
      })
      logger.info('Lifetime payment processed - new subscription created', {
        context: 'paddle-webhook',
        metadata: { userId, orderId: order_id },
      })
    }
  } catch (error) {
    logger.error('Error processing lifetime payment', error, {
      context: 'paddle-webhook',
      metadata: { userId, orderId: order_id },
    })
    throw error
  }
}

