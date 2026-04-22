import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import NewsletterSection from '@/components/NewsletterSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Send,
  MessageCircle,
  MapPin
} from 'lucide-react';

// Custom WhatsApp icon since lucide-react doesn't have one
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: t('contact.messageSent'),
        description: t('contact.messageSuccess').replace('{name}', formData.firstName),
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: "destructive",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: t('contact.faq1Question'),
      answer: t('contact.faq1Answer')
    },
    {
      question: t('contact.faq2Question'),
      answer: t('contact.faq2Answer')
    },
    {
      question: t('contact.faq3Question'),
      answer: t('contact.faq3Answer')
    },
    {
      question: t('contact.faq4Question'),
      answer: t('contact.faq4Answer')
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <SEO
        title="Contact Us | Pan Productions & Pan Academy London"
        description="Get in touch with Pan Productions. Contact us about productions, workshops, auditions, or general inquiries. We'd love to hear from you."
        keywords="contact Pan Productions, theatre contact London, Pan Academy contact, auditions, workshop inquiries"
        url="/contact"
      />
      
      <div className="container mx-auto px-4">
        {/* Contact Form Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t('contact.firstName')}</Label>
                    <Input 
                      id="firstName" 
                      placeholder={t('contact.firstNamePlaceholder')}
                      className="mt-1"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('contact.lastName')}</Label>
                    <Input 
                      id="lastName" 
                      placeholder={t('contact.lastNamePlaceholder')}
                      className="mt-1"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={t('contact.emailPlaceholder')}
                    className="mt-1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">{t('contact.phone')}</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder={t('contact.phonePlaceholder')}
                    className="mt-1"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">{t('contact.subject')}</Label>
                  <Input 
                    id="subject" 
                    placeholder={t('contact.subjectPlaceholder')}
                    className="mt-1"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">{t('contact.message')}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={t('contact.messagePlaceholder')}
                    className="mt-1 min-h-40"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
                </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Live Chat Card */}
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Live Chat</h3>
                      <p className="text-xs text-muted-foreground">Get instant answers</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need a quick response? Use our live chat for instant support. Look for the chat icon in the bottom right corner of your screen.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 hover:bg-primary/10"
                    onClick={() => {
                      // Trigger the AlwaysBooked chat widget if available
                      const chatButton = document.querySelector('[data-alwaysbooked-chat]') as HTMLElement;
                      if (chatButton) {
                        chatButton.click();
                      } else {
                        // Fallback - scroll to make widget visible
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info Card */}
              <Card className="bg-card/40 border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t('contact.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('contact.subtitle')}
                  </p>

                  <ul className="text-sm text-muted-foreground space-y-3">
                    <li className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 text-primary" />
                      <span>
                        Pan Productions<br />
                        177 Whitecross Street<br />
                        EC1Y 8QP
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <WhatsAppIcon className="h-4 w-4 text-primary" />
                      <a 
                        href="https://wa.me/447961213849" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        +44 7961 213849
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">
              {t('contact.faqTitle')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('contact.faqSubtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-foreground flex items-start">
                    <MessageCircle className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed ml-7">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Contact;
