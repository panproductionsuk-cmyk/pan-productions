# Newsletter Integration Guide

The newsletter subscription feature is now integrated with real API support. You can choose from multiple options:

## Setup Options

### Option 1: Use Direct API Integration (Easiest)

The frontend can directly connect to services like Mailchimp, ConvertKit, or SendGrid.

**Steps:**
1. Copy `.env.example` to `.env`
2. Choose your service and uncomment the relevant variables
3. Add your API credentials
4. Update `src/lib/newsletter.ts`:
   ```typescript
   // Change this line in NewsletterSection.tsx:
   import { subscribeToMailchimp } from '@/lib/newsletter';
   // or
   import { subscribeToConvertKit } from '@/lib/newsletter';
   // or
   import { subscribeToSendGrid } from '@/lib/newsletter';
   
   // Then use it in handleSubmit:
   const result = await subscribeToMailchimp(email);
   ```

### Option 2: Create Your Own Backend API (Most Secure)

For better security (hiding API keys), create a backend endpoint.

**Steps:**
1. Create a backend API route (examples in `api-examples.js`)
2. The frontend will POST to `/api/newsletter/subscribe`
3. Backend handles the newsletter service integration
4. No environment variables needed in frontend

### Option 3: Use Serverless Functions

Deploy serverless functions on Vercel, Netlify, or AWS Lambda.

**Vercel:**
- Create `api/newsletter/subscribe.js`
- Deploy to Vercel
- Automatic endpoint: `https://your-app.vercel.app/api/newsletter/subscribe`

**Netlify:**
- Create `netlify/functions/newsletter-subscribe.js`
- Deploy to Netlify
- Update `src/lib/newsletter.ts` endpoint to: `/.netlify/functions/newsletter-subscribe`

## Supported Services

### Mailchimp
- **Website:** https://mailchimp.com
- **Docs:** https://mailchimp.com/developer/
- **Required:** API Key, Audience ID, Server Prefix

### ConvertKit
- **Website:** https://convertkit.com
- **Docs:** https://developers.convertkit.com
- **Required:** API Key, Form ID

### SendGrid
- **Website:** https://sendgrid.com
- **Docs:** https://docs.sendgrid.com/api-reference
- **Required:** API Key, List ID

## Current Implementation

Currently using: **Custom Backend API** (default)
- Endpoint: `/api/newsletter/subscribe`
- Method: POST
- Body: `{ "email": "user@example.com" }`
- Response: `{ "success": true, "message": "..." }`

## Testing

1. Enter an email in the newsletter form
2. Click Subscribe
3. Check browser console for API calls
4. Check browser DevTools Network tab for response

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to git
- Use backend API for production (don't expose API keys in frontend)
- Validate emails on both frontend and backend
- Implement rate limiting to prevent spam
- Add CAPTCHA for public forms if needed

## Troubleshooting

**CORS Issues:**
- If using external API, ensure CORS is enabled
- Consider using a backend proxy

**API Key Not Working:**
- Verify credentials in service dashboard
- Check API key permissions
- Ensure environment variables are loaded (restart dev server)

**No Response:**
- Check browser console for errors
- Verify API endpoint is correct
- Test with curl/Postman first
