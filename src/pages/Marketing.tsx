import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const services = [
    {
      icon: Target,
      title: "Strategic Marketing",
      description: "Comprehensive marketing strategies tailored to your production's unique needs and target audience.",
      features: ["Market Research", "Audience Analysis", "Brand Positioning", "Campaign Planning"]
    },
    {
      icon: Megaphone,
      title: "Public Relations",
      description: "Professional PR services to maximize your production's visibility and media coverage.",
      features: ["Press Releases", "Media Relations", "Interview Coordination", "Crisis Management"]
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "High-quality promotional content including photography, videography, and graphic design.",
      features: ["Professional Photography", "Video Production", "Graphic Design", "Social Media Content"]
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      description: "Complete digital marketing solutions to reach audiences across all online platforms.",
      features: ["Social Media Marketing", "Website Development", "SEO Optimization", "Email Campaigns"]
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
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              PR & Marketing Excellence
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              Amplify Your <span className="text-primary">Creative Vision</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professional marketing and PR services designed specifically for theatre, arts, and cultural productions. 
              We help you connect with your audience and maximize your impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Megaphone className="mr-2 h-5 w-5" />
                Start Your Campaign
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Our Marketing Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive marketing solutions tailored for the arts and entertainment industry
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

      {/* Achievements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Our Track Record</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that speak to our marketing excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers results for your production
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We analyze your production, target audience, and goals to create a tailored marketing strategy."
                },
                {
                  step: "02", 
                  title: "Content Development",
                  description: "Our creative team develops compelling content including visuals, copy, and promotional materials."
                },
                {
                  step: "03",
                  title: "Campaign Execution", 
                  description: "We launch and manage your marketing campaign across all relevant channels and platforms."
                },
                {
                  step: "04",
                  title: "Monitoring & Optimization",
                  description: "Continuous tracking and optimization to maximize reach, engagement, and ticket sales."
                }
              ].map((process, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">
                      {process.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {process.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-foreground">
            Ready to Promote Your Production?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to create a marketing campaign that gets your production the attention it deserves.
          </p>
          <Button size="lg" className="px-8">
            <Target className="mr-2 h-5 w-5" />
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Marketing;