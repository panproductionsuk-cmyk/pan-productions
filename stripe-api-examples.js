/**
 * Backend API Route for Stripe Checkout
 * 
 * This is a sample backend route handler for creating Stripe Checkout sessions.
 * Deploy this to your backend server.
 */

// ==============================================
// EXPRESS.JS + STRIPE EXAMPLE
// ==============================================
/*
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/api/stripe/create-checkout', async (req, res) => {
  const { productName, price, quantity = 1, currency = 'gbp', metadata = {} } = req.body;

  if (!productName || !price) {
    return res.status(400).json({
      success: false,
      message: 'Product name and price are required'
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
              description: 'Theatre ticket - Pan Productions',
            },
            unit_amount: price, // Amount in cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      metadata: metadata,
    });

    res.json({
      success: true,
      sessionId: session.id
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session'
    });
  }
});

module.exports = router;
*/

// ==============================================
// VERCEL SERVERLESS FUNCTION EXAMPLE
// ==============================================
// File: api/stripe/create-checkout.js
/*
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { productName, price, quantity = 1, currency = 'gbp', metadata = {} } = req.body;

  if (!productName || !price) {
    return res.status(400).json({
      success: false,
      message: 'Product name and price are required'
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
              description: 'Theatre ticket - Pan Productions',
            },
            unit_amount: price,
          },
          quantity: quantity,
        },
      ],
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
*/

// ==============================================
// NETLIFY FUNCTION EXAMPLE
// ==============================================
// File: netlify/functions/stripe-checkout.js
/*
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  const { productName, price, quantity = 1, currency = 'gbp', metadata = {} } = JSON.parse(event.body);

  if (!productName || !price) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: 'Product name and price are required'
      })
    };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
              description: 'Theatre ticket - Pan Productions',
            },
            unit_amount: price,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      metadata: metadata,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        sessionId: session.id
      })
    };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to create checkout session'
      })
    };
  }
};
*/

// ==============================================
// INSTALL STRIPE PACKAGE
// ==============================================
// npm install stripe
// or
// yarn add stripe

export {};
