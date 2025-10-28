// Newsletter API Integration
// This file handles newsletter subscription logic

interface SubscribeResponse {
  success: boolean;
  message: string;
}

/**
 * Subscribe a user to the newsletter
 * This function sends the email to your backend API endpoint
 */
export async function subscribeToNewsletter(email: string): Promise<SubscribeResponse> {
  try {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }

    return {
      success: true,
      message: data.message || 'Successfully subscribed to newsletter!',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred. Please try again.',
    };
  }
}

/**
 * Alternative: Direct integration with popular services
 * Uncomment and use the service you prefer
 */

// MAILCHIMP Integration
export async function subscribeToMailchimp(email: string): Promise<SubscribeResponse> {
  const MAILCHIMP_API_KEY = import.meta.env.VITE_MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_SERVER_PREFIX = import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX; // e.g., "us1"

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error('Mailchimp credentials not configured');
    return {
      success: false,
      message: 'Newsletter service not configured. Please contact support.',
    };
  }

  try {
    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.title === 'Member Exists') {
        return {
          success: false,
          message: 'You are already subscribed to our newsletter.',
        };
      }
      throw new Error(data.detail || 'Failed to subscribe');
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
    };
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    };
  }
}

// CONVERTKIT Integration
export async function subscribeToConvertKit(email: string): Promise<SubscribeResponse> {
  const CONVERTKIT_API_KEY = import.meta.env.VITE_CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = import.meta.env.VITE_CONVERTKIT_FORM_ID;

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.error('ConvertKit credentials not configured');
    return {
      success: false,
      message: 'Newsletter service not configured. Please contact support.',
    };
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
    };
  } catch (error) {
    console.error('ConvertKit subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    };
  }
}

// SENDGRID Integration
export async function subscribeToSendGrid(email: string): Promise<SubscribeResponse> {
  const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
  const SENDGRID_LIST_ID = import.meta.env.VITE_SENDGRID_LIST_ID;

  if (!SENDGRID_API_KEY || !SENDGRID_LIST_ID) {
    console.error('SendGrid credentials not configured');
    return {
      success: false,
      message: 'Newsletter service not configured. Please contact support.',
    };
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        list_ids: [SENDGRID_LIST_ID],
        contacts: [{ email }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Failed to subscribe');
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
    };
  } catch (error) {
    console.error('SendGrid subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    };
  }
}
