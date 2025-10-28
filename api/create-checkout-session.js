// Vercel Serverless Function for Stripe Checkout
const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured. Please add STRIPE_SECRET_KEY to Vercel environment variables.');
    }

    // Initialize Stripe with secret key from environment variable
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { ticketName, price, quantity } = req.body;
    
    // Convert price from pounds to pence (Stripe uses smallest currency unit)
    const unitAmount = Math.round(price * 100);

    // Auto-detect frontend URL from request origin
    const frontendUrl = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'https://pan-stage-revival.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: ticketName || 'Theatre Ticket – Hamlet Show',
            },
            unit_amount: unitAmount,
          },
          quantity: quantity || 1,
        },
      ],
      success_url: `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment-cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
};
