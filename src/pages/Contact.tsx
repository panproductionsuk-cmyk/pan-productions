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
  MessageCircle
} from 'lucide-react';

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