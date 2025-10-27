import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate newsletter signup
    setTimeout(() => {
      toast({
        title: t('newsletter.success'),
        description: t('newsletter.successMessage'),
        duration: 5000,
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-card to-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: '#dae45f' }} />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('newsletter.description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-background/50 border-border/50 focus:border-primary"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="spotlight"
              className="px-6"
            >
              {isLoading ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
            <span>{t('newsletter.noSpam')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;