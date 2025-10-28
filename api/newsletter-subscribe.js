const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide a valid email address' 
      });
    }

    // Send notification email to your team
    await resend.emails.send({
      from: 'Pan Productions <onboarding@resend.dev>',
      to: 'panproductionsuk@gmail.com',
      replyTo: email,
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #e8126c; margin-bottom: 20px;">New Newsletter Subscription</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 16px;">
              <strong>Email:</strong> ${email}
            </p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This is an automated notification from your Pan Productions website newsletter form.
          </p>
        </div>
      `,
    });

    // Optionally send a welcome email to the subscriber
    await resend.emails.send({
      from: 'Pan Productions <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Pan Productions Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #e8126c; margin-bottom: 20px;">Welcome to Pan Productions!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for subscribing to our newsletter! We're excited to keep you updated with our latest productions, workshops, and theatre news.
          </p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #e8126c; margin-top: 0;">What to expect:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Updates on upcoming theatre productions</li>
              <li>New workshop and training announcements</li>
              <li>Exclusive behind-the-scenes content</li>
              <li>Special offers for subscribers</li>
            </ul>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Stay connected with us on social media for daily updates and theatre news!
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            Best regards,<br>
            <strong>The Pan Productions Team</strong>
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
};
