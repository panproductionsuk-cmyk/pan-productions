import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsletterSection from '@/components/NewsletterSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Target, 
  Megaphone, 
  Users, 
  TrendingUp, 
  Award, 
  Camera,
  Newspaper,
  Globe
} from 'lucide-react';

const Marketing = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Target,
      title: t('marketing.service1Title'),
      description: t('marketing.service1Description'),
      features: [t('marketing.service1Feature1'), t('marketing.service1Feature2'), t('marketing.service1Feature3'), t('marketing.service1Feature4')]
    },
    {
      icon: Megaphone,
      title: t('marketing.service2Title'),
      description: t('marketing.service2Description'),
      features: [t('marketing.service2Feature1'), t('marketing.service2Feature2'), t('marketing.service2Feature3'), t('marketing.service2Feature4')]
    },
    {
      icon: Camera,
      title: t('marketing.service3Title'),
      description: t('marketing.service3Description'),
      features: [t('marketing.service3Feature1'), t('marketing.service3Feature2'), t('marketing.service3Feature3'), t('marketing.service3Feature4')]
    },
    {
      icon: Globe,
      title: t('marketing.service4Title'),
      description: t('marketing.service4Description'),
      features: [t('marketing.service4Feature1'), t('marketing.service4Feature2'), t('marketing.service4Feature3'), t('marketing.service4Feature4')]
    }
  ];

  const achievements = [
    {
      number: "50+",
      label: "Successful Campaigns",
      description: "Theatre and arts productions promoted"
    },
    {
      number: "1M+",
      label: "Audience Reach",
      description: "Combined social media impressions"
    },
    {
      number: "95%",
      label: "Client Satisfaction",
      description: "Of clients return for future projects"
    },
    {
      number: "15+",
      label: "Media Partners",
      description: "Established relationships with press"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-slide-2.jpg" 
            alt="PR & Marketing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              {t('marketing.heroTitle')}
            </h1>
            <h2 className="text-3xl font-heading font-semibold mb-6 text-primary">
              {t('marketing.heroSubtitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('marketing.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="px-8">
                  {t('marketing.getInTouch')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('marketing.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-foreground">
            {t('marketing.ctaTitle')}
          </h2>
          <Link to="/contact">
            <Button size="lg" className="px-8">
              {t('marketing.getInTouch')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Marketing;