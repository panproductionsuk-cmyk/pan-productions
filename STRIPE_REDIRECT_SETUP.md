# 🎟️ Stripe Redirect Checkout Setup Guide

This guide will help you set up Stripe payments with **redirect-based checkout**. Users will be redirected to Stripe's hosted payment page - no embedded forms needed!

---

## ⚙️ Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Activate your account by verifying business details
4. Go to **Developers → API keys** to find your:
   - **Secret key** (starts with `sk_test_...` for test mode)

> **Note:** With redirect checkout, you don't need the publishable key on the frontend!



---

## 🔧 Step 2: Setup Backend Server

### Install Dependencies

```bash
npm init -y
npm install express stripe cors dotenv
```

### Create Environment File

Create a `.env` file in your project root:

```bash
STRIPE_SECRET_KEY=sk_test_YourSecretKeyHere
FRONTEND_URL=http://localhost:5173
PORT=4242
```

### Server is Ready!

The `server.js` file is already created in your project root. It includes:

- ✅ Stripe checkout session creation
- ✅ CORS enabled for frontend requests
- ✅ Success/cancel URL configuration
- ✅ Automatic price conversion (pounds to pence)

---

## 🚀 Step 3: Run the Server

### Terminal 1: Start Backend Server

```bash
node server.js
```

You should see:
```
✅ Server running on http://localhost:4242
```

### Terminal 2: Start Frontend

```bash
npm run dev
```

Your React app should be running on `http://localhost:5173`

---

## 🧪 Step 4: Test the Payment

### Switch to Test Mode

In your Stripe Dashboard:
1. Make sure you're in **Test mode** (toggle in top right)
2. Use your test secret key (starts with `sk_test_...`)

### Test Cards

Use these test card numbers:

| Card Number | Description |
|------------|-------------|
| `4242 4242 4242 4242` | ✅ Successful payment |
| `4000 0000 0000 0002` | ❌ Card declined |
| `4000 0025 0000 3155` | 🔐 Requires authentication (3D Secure) |

**For all test cards:**
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- Postal code: Any valid format (e.g., `SW1A 1AA`)

---

## 🎬 How It Works

### The Flow

1. **User clicks** "Buy Ticket" button on your website
2. **Frontend calls** your backend: `POST http://localhost:4242/create-checkout-session`
3. **Backend creates** Stripe checkout session
4. **Backend returns** checkout URL to frontend
5. **Frontend redirects** user to Stripe's hosted payment page
6. **User completes** payment on Stripe's secure page
7. **Stripe redirects** user back to:
   - Success: `/payment-success?session_id=xxx`
   - Cancel: `/payment-cancelled`

### Benefits of Redirect Checkout

✅ **No Stripe.js on frontend** - simpler code  
✅ **Fully PCI compliant** - Stripe handles all card data  
✅ **Mobile optimized** - Stripe's page works perfectly on all devices  
✅ **Secure** - Payment data never touches your server  
✅ **Easy to maintain** - Stripe updates the checkout page automatically  

---

## 🛠️ Customization

### Change Ticket Price

Edit `server.js`:

```javascript
unit_amount: 5000, // £50.00 (5000 pence)
```

### Change Success/Cancel URLs

Edit `server.js`:

```javascript
success_url: `${process.env.FRONTEND_URL}/custom-success-page`,
cancel_url: `${process.env.FRONTEND_URL}/custom-cancel-page`,
```

### Add Metadata

Track additional information with each payment:

```javascript
const session = await stripe.checkout.sessions.create({
  // ... other options
  metadata: {
    show_name: "Hamlet",
    performance_date: "2025-12-25",
    seat_number: "A12"
  }
});
```

---

## 🌐 Deploy to Production

### 1. Deploy Backend

**Option A: Vercel**
```bash
npm install -g vercel
vercel
```

**Option B: Heroku**
```bash
git push heroku main
```

**Option C: Railway**
- Connect your GitHub repo
- Set environment variables
- Deploy automatically

### 2. Update Environment Variables

In production, set:
```bash
STRIPE_SECRET_KEY=sk_live_YourLiveSecretKey
FRONTEND_URL=https://your-domain.com
```

### 3. Update Frontend API URL

Edit `src/lib/stripe.ts`:

```typescript
const response = await fetch('https://your-backend.com/create-checkout-session', {
  // ... rest of code
});
```

### 4. Switch Stripe to Live Mode

1. Go to Stripe Dashboard
2. Toggle from Test mode to Live mode
3. Use your live secret key (`sk_live_...`)
4. Complete account activation if not done

---

## 🔒 Security Best Practices

✅ **Never expose** your secret key in frontend code  
✅ **Always use HTTPS** in production  
✅ **Validate amounts** on the backend (don't trust frontend)  
✅ **Use webhooks** to handle payment confirmation  
✅ **Keep dependencies** updated  

---

## 🐛 Troubleshooting

### "Failed to create checkout session"

**Check:**
- Backend server is running (`node server.js`)
- `.env` file exists with correct `STRIPE_SECRET_KEY`
- Secret key starts with `sk_test_` (for test mode)

### CORS Error

**Fix:**
Make sure `cors` is enabled in `server.js` (already done!)

### "Cannot connect to localhost:4242"

**Check:**
- Backend is running in Terminal 1
- Port 4242 is not in use by another app
- Frontend is calling the correct URL

### Payment Succeeds but Nothing Happens

**Check:**
- Success URL is correct in `server.js`
- Routes are configured in `src/App.tsx`
- `PaymentSuccess.tsx` component exists

---

## 📚 Next Steps

1. **Set up webhooks** to receive payment confirmations
2. **Customize checkout page** in Stripe Dashboard (add logo, colors)
3. **Add email receipts** via Stripe settings
4. **Implement refunds** if needed
5. **Add subscription billing** for season tickets

---

## 🆘 Need Help?

- **Stripe Docs:** [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support:** Available in dashboard
- **Test Cards:** [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

**Happy selling! 🎭**
