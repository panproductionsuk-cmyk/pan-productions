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
 * Get the backend API URL based on environment
 */
const getBackendUrl = (): string => {
  // If in production (deployed), use your deployed backend URL
  if (window.location.hostname !== 'localhost') {
    // TODO: Replace with your actual deployed backend URL
    // For now, using Vercel serverless function path
    return '/api/create-checkout-session';
  }
  // Local development
  return 'http://localhost:4242/create-checkout-session';
};

/**
 * Main function to handle ticket purchase
 * Calls backend to create Stripe session and redirects to Stripe
 * 
 * @param options - Ticket purchase options
 */
export async function buyTicket(options: TicketCheckoutOptions): Promise<void> {
  try {
    const backendUrl = getBackendUrl();
    
    console.log('🎫 Calling backend:', backendUrl);
    console.log('📦 Request data:', options);
    
    // Call your backend to create a checkout session
    const response = await fetch(backendUrl, {
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

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`Failed to create checkout session: ${response.status} - ${errorText}`);
    }

    const data: CheckoutResponse = await response.json();
    console.log('✅ Checkout URL:', data.url);
    
    // Redirect to Stripe's hosted checkout page
    window.location.href = data.url;
  } catch (error) {
    console.error('💥 Payment error:', error);
    alert(`Failed to start payment process: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
