import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, Calendar } from 'lucide-react';

const PaymentSuccess = () => {
  useEffect(() => {
    // Get session ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      console.log('Payment successful! Session ID:', sessionId);
      // You can make an API call here to verify the payment and send confirmation email
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
                  Payment Successful!
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Thank you for your purchase. Your ticket has been confirmed.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left">
                <h2 className="font-semibold text-lg mb-4 text-foreground">What's Next?</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    <span>A confirmation email has been sent to your inbox with your ticket details</span>
                  </li>
                  <li className="flex items-start">
                    <Download className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    <span>Download your e-ticket from the confirmation email</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    <span>Save the date and arrive 15 minutes before the show starts</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/productions">
                  <Button size="lg" className="w-full sm:w-auto">
                    View All Productions
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Need help? Contact us at{' '}
                <a href="mailto:tickets@panproductions.co.uk" className="text-primary hover:underline">
                  tickets@panproductions.co.uk
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
