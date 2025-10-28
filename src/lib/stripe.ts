/**
 * Stripe Redirect Checkout Integration
 * 
 * Simple redirect-based payment flow - users are redirected to Stripe's hosted checkout page.
 * No Stripe.js needed on frontend - just a simple fetch to your backend.
 */

interface TicketCheckoutOptions {
  ticketName: string;
  price: number; // in pounds (e.g., 25.00 = £25.00)
  quantity?: number;
}

interface CheckoutResponse {
  url: string;
}

/**
 * Main function to handle ticket purchase
 * Calls backend to create Stripe session and redirects to Stripe
 * 
 * @param options - Ticket purchase options
 */
export async function buyTicket(options: TicketCheckoutOptions): Promise<void> {
  try {
    // Call your backend to create a checkout session
    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketName: options.ticketName,
        price: options.price,
        quantity: options.quantity || 1,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data: CheckoutResponse = await response.json();
    
    // Redirect to Stripe's hosted checkout page
    window.location.href = data.url;
  } catch (error) {
    console.error('Payment error:', error);
    alert('Failed to start payment process. Please try again.');
  }
}

/**
 * Test ticket purchase with sample data
 */
export async function testTicketPurchase(): Promise<void> {
  await buyTicket({
    ticketName: 'Theatre Ticket – Hamlet Show',
    price: 25.00, // £25.00
    quantity: 1,
  });
}
