import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { subscribeToNewsletter } from '@/lib/newsletter';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call the real newsletter API
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setIsSubscribed(true);
        toast({
          title: t('newsletter.success') || "Successfully Subscribed!",
          description: result.message,
          duration: 5000,
        });
        setEmail('');
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        toast({
          title: "Subscription Failed",
          description: result.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-card to-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: '#dae45f' }} />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('newsletter.title') || "Stay Connected"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('newsletter.description') || "Subscribe to our newsletter for the latest updates on productions, workshops, and events."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder') || "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || isSubscribed}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={isLoading || isSubscribed || !email}
              variant="spotlight"
              className="px-6 min-w-[120px]"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  {t('newsletter.subscribing') || "Subscribing..."}
                </span>
              ) : isSubscribed ? (
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Subscribed!
                </span>
              ) : (
                t('newsletter.subscribe') || "Subscribe"
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
            <span>{t('newsletter.noSpam') || "No spam, unsubscribe anytime"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;