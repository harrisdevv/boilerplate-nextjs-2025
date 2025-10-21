# Paddle Payment Setup Guide

Complete guide to setting up Paddle payments with lifetime (one-time) and subscription (monthly/yearly) billing for your Next.js application.

## 📋 Table of Contents

- [Overview](#overview)
- [Paddle Account Setup](#paddle-account-setup)
- [Creating Products](#creating-products)
- [Setting Up Prices](#setting-up-prices)
- [Configuring Webhooks](#configuring-webhooks)
- [Environment Variables](#environment-variables)
- [Testing Payments](#testing-payments)
- [Going to Production](#going-to-production)
- [Managing Subscriptions](#managing-subscriptions)
- [Troubleshooting](#troubleshooting)

## Overview

This boilerplate supports two payment models:

**Lifetime Payment (One-Time):**
- ✅ Single payment for lifetime access
- ✅ No recurring billing
- ✅ Simple pricing model
- ✅ Higher upfront cost, better long-term value

**Subscription (Recurring):**
- ✅ Monthly or yearly billing
- ✅ Automatic renewals
- ✅ Lower entry price
- ✅ Predictable recurring revenue

**Why Paddle?**
- 🌐 **Merchant of Record**: Handles global tax compliance
- 💳 **Multiple Payment Methods**: Cards, PayPal, Apple Pay, Google Pay
- 🔒 **PCI Compliant**: Secure payment processing
- 🌍 **Global Coverage**: Supports 195 countries
- 📊 **Analytics**: Built-in revenue analytics
- 💰 **Automatic Tax**: Handles VAT, sales tax globally

## Paddle Account Setup

### Step 1: Create Paddle Account

1. **Go to [Paddle.com](https://www.paddle.com)**
2. Click **"Get Started"** or **"Sign Up"**
3. Choose your account type:
   - **Paddle Billing** (Recommended for SaaS)
   - **Paddle Classic** (Legacy, not recommended for new projects)
4. Fill in business details:
   - Company name
   - Email address
   - Password
   - Country
5. Verify your email address

### Step 2: Complete Business Profile

1. **Log in to Paddle Dashboard**
2. Navigate to **"Settings"** → **"Business Information"**
3. Complete all required fields:
   - Legal business name
   - Business address
   - Tax ID / VAT number (if applicable)
   - Business type
   - Contact information
4. **Upload documents** (for verification):
   - Business registration documents
   - Government ID
   - Proof of address

> ⚠️ **Note:** Verification can take 1-3 business days. You can use sandbox mode while waiting.

### Step 3: Get API Credentials

1. In Paddle Dashboard, go to **"Developer Tools"** → **"Authentication"**
2. Click **"Create API Key"**
3. Give it a name: `Production API Key` or `Development API Key`
4. Copy and save securely:
   - **API Key**: `paddle_live_xxxxx` or `paddle_test_xxxxx`
   - **Vendor ID**: Your seller ID (in Settings)

## Creating Products

### What Are Products?

Products represent what you're selling. Each product can have multiple prices (one-time, monthly, yearly).

### Step 1: Navigate to Products

1. **Log in to Paddle Dashboard**
2. Click **"Catalog"** → **"Products"** in the sidebar
3. Click **"Create Product"**

### Step 2: Create Lifetime Product

For one-time lifetime payments:

1. **Product Information:**
   - **Name**: `Lifetime Access` or `Your App - Lifetime`
   - **Description**: `Get lifetime access to all features`
   - **Product Image**: Upload your product image (optional)
   - **Product Type**: Select **"Standard"**

2. **Tax Category:**
   - Select **"SaaS"** or **"Digital Services"**
   - This determines how tax is calculated globally

3. Click **"Save Product"**

4. **Note the Product ID**: `pro_xxxxx` (you'll need this)

### Step 3: Create Subscription Product

For recurring monthly/yearly subscriptions:

1. **Product Information:**
   - **Name**: `Subscription Plan` or `Your App - Pro Plan`
   - **Description**: `Monthly or yearly subscription with all features`
   - **Product Type**: Select **"Standard"**

2. **Tax Category:**
   - Select **"SaaS"** or **"Digital Services"**

3. Click **"Save Product"**

4. **Note the Product ID**: `pro_xxxxx`

## Setting Up Prices

### Understanding Prices

Each product can have multiple prices with different billing intervals:
- **One-time**: For lifetime purchases
- **Monthly**: Recurring every month
- **Yearly**: Recurring every year

### Step 1: Create Lifetime Price

1. **Navigate to your Lifetime Product**
2. Click **"Add Price"**
3. **Configure Price:**
   
   - **Price Name**: `Lifetime - $97` (internal name)
   - **Description**: `One-time payment for lifetime access`
   - **Billing Period**: Select **"One-time"**
   - **Amount**: `97.00` USD
   - **Currency**: Select **USD** (or your preferred currency)

4. **Trial Period**: Leave empty (not applicable for one-time)

5. **Quantity**: 
   - **Minimum**: 1
   - **Maximum**: 1

6. Click **"Save Price"**

7. **Note the Price ID**: `pri_xxxxx` (critical for checkout!)

### Step 2: Create Monthly Price

1. **Navigate to your Subscription Product**
2. Click **"Add Price"**
3. **Configure Price:**
   
   - **Price Name**: `Monthly - $9.99`
   - **Description**: `Monthly subscription`
   - **Billing Period**: Select **"Monthly"**
   - **Billing Interval**: `1` month
   - **Amount**: `9.99` USD
   - **Currency**: USD

4. **Trial Period** (optional):
   - Enable **"Free trial"**
   - **Trial Duration**: `7` days or `14` days

5. Click **"Save Price"**

6. **Note the Price ID**: `pri_xxxxx`

### Step 3: Create Yearly Price

1. **Navigate to your Subscription Product**
2. Click **"Add Price"**
3. **Configure Price:**
   
   - **Price Name**: `Yearly - $99` (offer discount vs monthly)
   - **Description**: `Annual subscription - save 17%`
   - **Billing Period**: Select **"Yearly"**
   - **Billing Interval**: `1` year
   - **Amount**: `99.00` USD (vs $119.88 monthly)
   - **Currency**: USD

4. **Trial Period**: Same as monthly if desired

5. Click **"Save Price"**

6. **Note the Price ID**: `pri_xxxxx`

### Price IDs Summary

Keep these Price IDs handy:

```bash
# Lifetime
PADDLE_LIFETIME_PRICE_ID="pri_xxxxx"

# Subscription
PADDLE_MONTHLY_PRICE_ID="pri_xxxxx"
PADDLE_YEARLY_PRICE_ID="pri_xxxxx"
```

## Configuring Webhooks

Webhooks notify your app when payments succeed, subscriptions renew, etc.

### Step 1: Create Webhook Endpoint

1. **In Paddle Dashboard**, go to **"Developer Tools"** → **"Notifications"**
2. Click **"Create Notification Destination"**
3. **Configure Webhook:**
   
   - **Destination URL**: 
     ```
     https://yourdomain.com/api/paddle/webhook
     ```
     Or for Replit:
     ```
     https://your-repl-name.your-username.repl.co/api/paddle/webhook
     ```
   
   - **Description**: `Production Webhook` or `Development Webhook`

4. **Select Events** (check all that apply):
   
   **For Lifetime Payments:**
   - ✅ `transaction.completed`
   - ✅ `transaction.payment_failed`
   
   **For Subscriptions:**
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.activated`
   - ✅ `subscription.canceled`
   - ✅ `subscription.past_due`
   - ✅ `transaction.completed`
   - ✅ `transaction.payment_failed`

5. Click **"Save"**

6. **Copy Webhook Secret Key**: Keep this secure!

### Step 2: Test Webhook

Paddle provides a **"Test notification"** button:

1. Click **"Send test notification"**
2. Check your server logs to ensure it's received
3. Verify your webhook handler processes it correctly

## Environment Variables

### Update .env File

Add these to your `.env` file:

```bash
# Paddle Configuration
PADDLE_VENDOR_ID="12345"                    # Your Paddle Seller ID
PADDLE_API_KEY="paddle_live_xxxxx"          # Your Paddle API key
PADDLE_PUBLIC_KEY="paddle_live_pk_xxxxx"    # Your Paddle public key
PADDLE_ENVIRONMENT="production"              # or "sandbox" for testing
PADDLE_WEBHOOK_SECRET="pdl_ntfset_xxxxx"    # Webhook secret key

# Price IDs
PADDLE_LIFETIME_PRICE_ID="pri_01xxxxx"      # Lifetime price ID
PADDLE_MONTHLY_PRICE_ID="pri_02xxxxx"       # Monthly price ID
PADDLE_YEARLY_PRICE_ID="pri_03xxxxx"        # Yearly price ID

# Payment Mode (toggle between lifetime and subscription)
PAYMENT_MODE="lifetime"                      # or "subscription"

# Success/Cancel URLs
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Replit Secrets

If deploying to Replit, add these in **Secrets** tab:

1. Click **"Secrets"** (lock icon)
2. Add each variable as key-value pair
3. Redeploy your app

## Testing Payments

### Sandbox Mode

Paddle provides a sandbox environment for testing:

1. **Enable Sandbox in Dashboard:**
   - Toggle to **"Sandbox"** mode in top-left corner
   - All products/prices are separate from production

2. **Update Environment:**
   ```bash
   PADDLE_ENVIRONMENT="sandbox"
   PADDLE_API_KEY="paddle_test_xxxxx"  # Use sandbox key
   ```

3. **Test Cards:**
   Paddle provides test card numbers:
   
   **Successful Payment:**
   ```
   Card: 4242 4242 4242 4242
   Expiry: Any future date
   CVC: Any 3 digits
   ```
   
   **Failed Payment:**
   ```
   Card: 4000 0000 0000 0002
   ```

4. **Test Checkout Flow:**
   - Click "Buy Now" on your app
   - Use test card
   - Check webhook receives payment event
   - Verify subscription created in database

### Testing Lifetime Payment

1. Set `PAYMENT_MODE="lifetime"` in `.env`
2. Restart your app
3. Navigate to pricing page
4. Click **"Buy Lifetime Access"**
5. Complete checkout with test card
6. Verify:
   - Webhook received `transaction.completed`
   - Subscription created with `mode: "LIFETIME"`
   - User can access dashboard

### Testing Subscription

1. Set `PAYMENT_MODE="subscription"` in `.env`
2. Restart your app
3. Navigate to pricing page
4. Click **"Subscribe Monthly"** or **"Subscribe Yearly"**
5. Complete checkout
6. Verify:
   - Webhook received `subscription.created`
   - Subscription created with `mode: "SUBSCRIPTION"`
   - User can access dashboard

### Testing Subscription Events

**Test Renewal:**
- Paddle sandbox allows accelerating time
- Wait for subscription renewal event
- Verify webhook processes it

**Test Cancellation:**
- Go to Paddle Dashboard → Subscriptions
- Cancel a test subscription
- Verify webhook updates database

## Going to Production

### Pre-Production Checklist

- [ ] Business verified in Paddle
- [ ] Products and prices created
- [ ] Webhook endpoint configured and tested
- [ ] Environment variables set to production
- [ ] Test successful payment flow
- [ ] Test failed payment handling
- [ ] Test subscription cancellation
- [ ] Tax settings configured
- [ ] Email templates customized (optional)

### Step 1: Switch to Production Mode

1. **In Paddle Dashboard:**
   - Toggle from **"Sandbox"** to **"Live"** mode
   - Recreate products/prices in Live mode (sandbox and live are separate)

2. **Update Environment Variables:**
   ```bash
   PADDLE_ENVIRONMENT="production"
   PADDLE_API_KEY="paddle_live_xxxxx"        # Use LIVE key
   PADDLE_WEBHOOK_SECRET="pdl_ntfset_xxxxx"  # Live webhook secret
   ```

3. **Update Webhook URL:**
   - Ensure webhook points to production domain
   - Test webhook with **"Send test notification"**

4. **Deploy:**
   - Commit changes
   - Deploy to production
   - Verify app is using production Paddle

### Step 2: Make First Real Payment

1. Use a real credit card (your own for testing)
2. Complete checkout flow
3. Verify payment appears in Paddle Dashboard
4. Check webhook event received
5. Confirm subscription created in database
6. Test dashboard access

### Step 3: Monitor

1. **Paddle Dashboard** → **"Transactions"**: Monitor payments
2. **Paddle Dashboard** → **"Subscriptions"**: Monitor active subscriptions
3. Check webhook delivery: **"Developer Tools"** → **"Notifications"** → **"Events"**
4. Review server logs for any errors

## Managing Subscriptions

### View Subscriptions

**In Paddle Dashboard:**
1. Go to **"Subscriptions"**
2. View all active/canceled/past-due subscriptions
3. Click on a subscription to see details

**In Your Database:**
```typescript
// Get user subscriptions
const subscriptions = await prisma.subscription.findMany({
  where: { userId: user.id }
})
```

### Cancel Subscription

**User Initiated:**
```typescript
import { paddle } from '@/lib/paddle'

// Cancel subscription
await paddle.cancelSubscription(subscriptionId)
```

**In Paddle Dashboard:**
1. Go to **"Subscriptions"**
2. Find subscription
3. Click **"..."** → **"Cancel"**
4. Choose cancellation type:
   - **Immediately**: Cancel right away
   - **At end of billing period**: Let current period finish

### Update Subscription

**Upgrade/Downgrade:**

```typescript
// Change from monthly to yearly
await paddle.updateSubscription(subscriptionId, {
  planId: PADDLE_YEARLY_PRICE_ID
})
```

**Proration Options:**
- `prorated_immediately`: Charge/credit difference now
- `full_immediately`: Charge full new price now
- `do_not_bill`: Apply at next renewal

### Pause Subscription

Paddle supports pausing subscriptions:

1. **In Paddle Dashboard** → Subscription details
2. Click **"Pause"**
3. Set pause duration
4. Subscription automatically resumes after pause period

## Webhook Implementation

### Webhook Handler Example

The boilerplate includes a webhook handler at `src/app/api/paddle/webhook/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('paddle-signature')
    
    // Verify webhook signature
    const isValid = verifyPaddleSignature(body, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    
    const event = JSON.parse(body)
    
    logger.info('Paddle webhook received', {
      context: 'paddle-webhook',
      metadata: { eventType: event.event_type }
    })
    
    // Handle different event types
    switch (event.event_type) {
      case 'transaction.completed':
        await handleTransactionCompleted(event)
        break
        
      case 'subscription.created':
        await handleSubscriptionCreated(event)
        break
        
      case 'subscription.updated':
        await handleSubscriptionUpdated(event)
        break
        
      case 'subscription.canceled':
        await handleSubscriptionCanceled(event)
        break
        
      default:
        logger.warn('Unhandled webhook event', {
          context: 'paddle-webhook',
          metadata: { eventType: event.event_type }
        })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Webhook processing failed', error, { context: 'paddle-webhook' })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleTransactionCompleted(event: any) {
  const { data } = event
  
  // For lifetime purchases
  if (data.billing_period === null) {
    await prisma.subscription.create({
      data: {
        userId: data.custom_data.userId,
        status: 'ACTIVE',
        mode: 'LIFETIME',
        paddleSubscriptionId: data.transaction_id,
        currentPeriodEnd: null, // No expiry
      }
    })
    
    logger.info('Lifetime subscription created', {
      context: 'paddle-webhook',
      metadata: { userId: data.custom_data.userId }
    })
  }
}

async function handleSubscriptionCreated(event: any) {
  const { data } = event
  
  await prisma.subscription.create({
    data: {
      userId: data.custom_data.userId,
      status: 'ACTIVE',
      mode: 'SUBSCRIPTION',
      paddleSubscriptionId: data.subscription_id,
      currentPeriodEnd: new Date(data.next_billed_at),
    }
  })
  
  logger.info('Subscription created', {
    context: 'paddle-webhook',
    metadata: { subscriptionId: data.subscription_id }
  })
}

async function handleSubscriptionCanceled(event: any) {
  const { data } = event
  
  await prisma.subscription.update({
    where: { paddleSubscriptionId: data.subscription_id },
    data: { status: 'CANCELED' }
  })
  
  logger.info('Subscription canceled', {
    context: 'paddle-webhook',
    metadata: { subscriptionId: data.subscription_id }
  })
}
```

## Pricing Strategy Tips

### Lifetime vs Subscription

**Use Lifetime when:**
- Building a product with finite features
- Want to bootstrap quickly with upfront cash
- Lower ongoing support costs
- Simpler business model

**Use Subscription when:**
- Ongoing feature development
- Continuous content/service delivery
- Need predictable MRR (Monthly Recurring Revenue)
- Building a SaaS business

### Pricing Recommendations

**Lifetime:**
- Price 10-20x higher than monthly
- Example: $97-$197 one-time vs $9.99/month

**Monthly:**
- Entry-level pricing: $9-$29/month
- Keep barrier to entry low

**Yearly:**
- Offer 15-30% discount vs monthly
- Example: $99/year (vs $119.88 if paying monthly)
- Improves cash flow and reduces churn

### Early Bird Pricing

Create urgency with limited-time offers:

```typescript
// In your pricing component
const isEarlyBird = Date.now() < new Date('2025-12-31').getTime()
const price = isEarlyBird ? 49 : 97
```

## Troubleshooting

### Payment Not Completing

**Symptoms:** Checkout opens but payment doesn't process

**Solutions:**
1. Check Paddle environment (sandbox vs production)
2. Verify Price IDs are correct
3. Check webhook is receiving events
4. Review Paddle Dashboard for failed transactions
5. Check browser console for JavaScript errors

### Webhook Not Received

**Symptoms:** Payment succeeds but subscription not created

**Solutions:**
1. Verify webhook URL is correct and accessible
2. Check webhook signature validation
3. Review Paddle Dashboard → Developer Tools → Events
4. Check server logs for errors
5. Test webhook manually with "Send test notification"
6. Ensure your server can receive POST requests

### Wrong Price Shown

**Symptoms:** Checkout shows different price

**Solutions:**
1. Verify correct Price ID in environment variables
2. Clear cache and reload
3. Check Paddle Dashboard for price settings
4. Ensure currency is correct

### Subscription Not Renewing

**Symptoms:** Subscription expires instead of renewing

**Solutions:**
1. Check payment method is valid
2. Review failed payment webhooks
3. Check subscription status in Paddle Dashboard
4. Verify webhook handling for renewal events

### Tax Calculation Issues

**Solutions:**
1. Ensure Tax Category is set correctly on products
2. Verify business location in Paddle settings
3. Check customer location detection
4. Review tax settings in Paddle Dashboard

## Advanced Features

### Coupons & Discounts

Create discount codes in Paddle:

1. **Paddle Dashboard** → **"Discounts"**
2. Click **"Create Discount"**
3. Configure:
   - **Code**: `LAUNCH50` (coupon code)
   - **Type**: Percentage or fixed amount
   - **Amount**: 50% off or $20 off
   - **Applies to**: Specific products or all
   - **Usage limits**: Total uses, per customer
   - **Valid dates**: Start and end dates
4. Share code with customers

### Customer Portal

Paddle provides a hosted customer portal:

```typescript
// Generate portal link
const portalUrl = `https://customer-portal.paddle.com/?email=${userEmail}`
```

Customers can:
- Update payment method
- View invoices
- Cancel subscription
- Update billing details

### Analytics & Reporting

**Paddle Dashboard** provides:
- Revenue analytics
- Subscription metrics (MRR, churn rate)
- Customer lifetime value
- Geographic breakdown
- Payment method analytics

**Export Data:**
- Go to **"Reports"** → **"Exports"**
- Download transactions, subscriptions, customers
- Use for custom analytics

## Next Steps

After setting up Paddle:

1. ✅ **Test thoroughly** in sandbox mode
2. ✅ **Customize checkout** experience (optional)
3. ✅ **Set up email notifications** in Paddle
4. ✅ **Create customer success flow** (onboarding emails)
5. ✅ **Monitor metrics** regularly
6. ✅ **Optimize pricing** based on conversion data

## Resources

- [Paddle Documentation](https://developer.paddle.com/)
- [Paddle Billing Guide](https://developer.paddle.com/build/billing)
- [Paddle Checkout Guide](https://developer.paddle.com/build/checkout)
- [Paddle Webhooks](https://developer.paddle.com/webhooks)
- [Paddle Sandbox](https://developer.paddle.com/concepts/sandboxes)

---

**Last Updated:** October 21, 2025

