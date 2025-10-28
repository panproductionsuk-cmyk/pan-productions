# Stripe Payment Integration Setup Guide

## Overview

The website now has Stripe payment integration for ticket purchases. A test button has been added to the homepage to test the payment flow.

## Features

- ✅ Stripe Checkout integration
- ✅ Test button on homepage
- ✅ Payment success page
- ✅ Payment cancelled page
- ✅ TypeScript support
- ✅ Error handling
- ✅ Loading states

## Setup Instructions

### Step 1: Get Stripe Keys

1. Go to https://dashboard.stripe.com/register
2. Create a Stripe account (free)
3. Go to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### Step 2: Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your Stripe **Publishable Key** to `.env`:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
   ```

3. Set your frontend URL:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

### Step 3: Setup Backend API

You need a backend to create Stripe Checkout sessions. Choose one option:

#### Option A: Vercel Serverless (Recommended)

1. Create `api/stripe/create-checkout.js`:
   ```javascript
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ message: 'Method not allowed' });
     }

     const { productName, price, quantity = 1, currency = 'gbp', metadata = {} } = req.body;

     try {
       const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items: [{
           price_data: {
             currency: currency,
             product_data: {
               name: productName,
               description: 'Theatre ticket - Pan Productions',
             },
             unit_amount: price,
           },
           quantity: quantity,
         }],
         mode: 'payment',
         success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
         metadata: metadata,
       });

       return res.status(200).json({
         success: true,
         sessionId: session.id
       });
     } catch (error) {
       console.error('Stripe checkout error:', error);
       return res.status(500).json({
         success: false,
         message: 'Failed to create checkout session'
       });
     }
   }
   ```

2. Install Stripe package:
   ```bash
   npm install stripe
   ```

3. Add to `vercel.json`:
   ```json
   {
     "env": {
       "STRIPE_SECRET_KEY": "@stripe-secret-key",
       "FRONTEND_URL": "https://your-domain.com"
     }
   }
   ```

4. Set environment variables in Vercel dashboard

#### Option B: Netlify Functions

See `stripe-api-examples.js` for Netlify Functions code.

#### Option C: Express.js Backend

See `stripe-api-examples.js` for Express.js code.

### Step 4: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit homepage (http://localhost:5173)

3. Click the **"Test Buy Ticket - £25.00"** button

4. You'll be redirected to Stripe Checkout

5. Use test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - Any future expiry date (e.g., 12/25)
   - Any 3-digit CVC (e.g., 123)
   - Any postal code (e.g., 12345)

6. Complete the test payment

7. You'll be redirected to the success page

## Usage in Production

### Add Buy Ticket Button to Productions

Example code to add to any production card:

```typescript
import { buyTicket } from '@/lib/stripe';

// In your component:
const handleBuyTicket = async (productionName: string, price: number) => {
  await buyTicket({
    productName: productionName,
    price: price * 100, // Convert to cents (£25.00 = 2500)
    quantity: 1,
    currency: 'gbp',
    metadata: {
      production: productionName,
      date: '2024-01-20',
      type: 'general-admission'
    }
  });
};

// Button:
<Button onClick={() => handleBuyTicket('Show Name', 25.00)}>
  Buy Ticket - £25.00
</Button>
```

## Security Best Practices

⚠️ **CRITICAL:**

1. **Never commit `.env` to git**
2. **Secret Key on backend only** - Never expose `sk_` keys in frontend
3. **Use HTTPS in production**
4. **Validate payments on backend** using webhooks
5. **Enable Stripe webhook signatures**

## Stripe Webhooks (Optional but Recommended)

To verify payments and send confirmation emails:

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`
4. Copy webhook signing secret
5. Verify webhook signature in your backend

## Testing Cards

| Card Number | Scenario |
|------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Decline |
| 4000 0000 0000 9995 | Insufficient funds |
| 4000 0025 0000 3155 | Requires authentication |

More test cards: https://stripe.com/docs/testing

## Troubleshooting

### "Stripe public key not configured"
- Check `.env` file has `VITE_STRIPE_PUBLIC_KEY`
- Restart dev server after adding env variables

### Payment creates but doesn't redirect
- Check backend API is running
- Verify `FRONTEND_URL` is correct
- Check browser console for errors

### CORS errors
- Ensure backend allows requests from your domain
- Add CORS headers to API responses

### Webhook not working
- Verify webhook URL is accessible
- Check webhook signing secret
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Dashboard: https://dashboard.stripe.com
- Test Mode: Always test in test mode first (keys starting with `pk_test_` and `sk_test_`)

## Going Live

1. Get live API keys from Stripe Dashboard
2. Update environment variables with live keys (pk_live_ and sk_live_)
3. Activate your Stripe account
4. Update success/cancel URLs to production domain
5. Test with real card (small amount)
6. Set up proper error monitoring
7. Configure webhook endpoints for production
