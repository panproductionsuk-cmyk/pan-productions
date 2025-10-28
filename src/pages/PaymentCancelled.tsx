import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-border/50">
            <CardContent className="p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/10 rounded-full mb-4">
                  <XCircle className="w-12 h-12 text-orange-500" />
                </div>
                <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
                  Payment Cancelled
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Your payment was cancelled. No charges have been made to your card.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left">
                <h2 className="font-semibold text-lg mb-4 text-foreground flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                  What Happened?
                </h2>
                <p className="text-muted-foreground mb-4">
                  You've cancelled the payment process. This could be because:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>You clicked the back button</li>
                  <li>You closed the payment window</li>
                  <li>You decided not to complete the purchase</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/productions">
                  <Button size="lg" className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Need Assistance?</strong>
                  <br />
                  If you're experiencing issues with payment, please contact our support team at{' '}
                  <a href="mailto:support@panproductions.co.uk" className="text-primary hover:underline">
                    support@panproductions.co.uk
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
