import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Users, 
  Handshake, 
  Gift,
  Star,
  Clock,
  Award,
  Target,
  ArrowRight
} from 'lucide-react';

const GetInvolved = () => {
  const opportunities = [
    {
      icon: Heart,
      title: "Donate",
      subtitle: "Support Our Mission", 
      description: "Help us continue creating powerful theatrical experiences and providing arts education to our community.",
      features: [
        "Support new productions",
        "Fund educational programs", 
        "Provide scholarships",
        "Maintain our facilities"
      ],
      cta: "Make a Donation",
      color: "from-red-500/10 to-pink-500/10",
      buttonVariant: "default"
    },
    {
      icon: Users,
      title: "Volunteer", 
      subtitle: "Join Our Team",
      description: "Become part of our creative community and gain hands-on experience in professional theatre production.",
      features: [
        "Production assistance",
        "Event management",
        "Marketing support", 
        "Administrative help"
      ],
      cta: "Apply to Volunteer",
      color: "from-blue-500/10 to-cyan-500/10",
      buttonVariant: "default"
    },
    {
      icon: Handshake,
      title: "Become a Partner",
      subtitle: "Corporate Collaboration",
      description: "Partner with us to create meaningful connections between your business and the arts community.",
      features: [
        "Brand visibility",
        "Community engagement",
        "Employee benefits",
        "Networking opportunities"
      ],
      cta: "Partnership Inquiry", 
      color: "from-green-500/10 to-emerald-500/10",
      buttonVariant: "default"
    }
  ];

  const volunteerRoles = [
    {
      title: "Production Assistant",
      commitment: "10-15 hours/week",
      description: "Support our production team with backstage operations, set construction, and technical assistance.",
      skills: ["Reliability", "Physical capability", "Team player"]
    },
    {
      title: "Marketing Volunteer",
      commitment: "5-8 hours/week", 
      description: "Help promote our productions through social media, content creation, and community outreach.",
      skills: ["Social media", "Writing", "Photography"]
    },
    {
      title: "Event Coordinator",
      commitment: "8-12 hours/week",
      description: "Assist with organizing special events, workshops, and community engagement activities.",
      skills: ["Organization", "Communication", "Event planning"]
    },
    {
      title: "Education Support",
      commitment: "6-10 hours/week",
      description: "Support Pan Academy workshops and educational programs for students of all ages.",
      skills: ["Patience", "Teaching interest", "Arts background"]
    }
  ];

  const partnershipBenefits = [
    {
      level: "Supporting Partner",
      amount: "£1,000 - £2,500",
      benefits: ["Logo in programs", "Social media mentions", "2 complimentary tickets per show"]
    },
    {
      level: "Principal Partner", 
      amount: "£2,500 - £5,000",
      benefits: ["Prominent logo placement", "Website recognition", "VIP event invitations", "4 complimentary tickets per show"]
    },
    {
      level: "Founding Partner",
      amount: "£5,000+",
      benefits: ["Title sponsor opportunities", "Exclusive networking events", "Custom partnership packages", "Season passes"]
    }
  ];

  const impactStats = [
    {
      number: "500+",
      label: "Students Educated",
      description: "Through our academy programs"
    },
    {
      number: "25+",
      label: "Productions Staged", 
      description: "Since our founding in 2016"
    },
    {
      number: "15,000+",
      label: "Audience Members",
      description: "Reached through our work"
    },
    {
      number: "50+",
      label: "Artists Supported",
      description: "Professional opportunities created"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              Make a Difference
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              Get <span className="text-primary">Involved</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our mission to create transformative theatrical experiences and foster arts education in our community. 
              There are many ways to support Pan Productions and make a lasting impact.
            </p>
            <Button size="lg" className="px-8">
              <Heart className="mr-2 h-5 w-5" />
              Choose Your Way to Help
            </Button>
          </div>
        </div>
      </section>

      {/* Main Opportunities */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Ways to Support Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the way that best fits your interests and availability
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden h-full">
                <div className={`h-2 bg-gradient-to-r ${opportunity.color}`} />
                
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <opportunity.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{opportunity.title}</CardTitle>
                  <Badge variant="outline" className="mx-auto mb-3">
                    {opportunity.subtitle}
                  </Badge>
                  <CardDescription className="text-base leading-relaxed">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-8 flex-1">
                    {opportunity.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant={opportunity.buttonVariant as any}>
                    {opportunity.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Your Impact</h2>
            <p className="text-muted-foreground">
              See how your support helps us make a difference in our community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Volunteer Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect role that matches your skills and interests
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {volunteerRoles.map((role, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {role.commitment}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Required Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Levels */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Partnership Levels</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible partnership options to suit your organization's goals and budget
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnershipBenefits.map((level, index) => (
              <Card key={index} className={`${index === 1 ? 'border-primary shadow-lg' : ''} hover:shadow-lg transition-shadow duration-300`}>
                {index === 1 && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{level.level}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{level.amount}</div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {level.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {benefit}
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
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you want to donate, volunteer, or become a partner, we'd love to hear from you. 
            Let's work together to strengthen our arts community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <Heart className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;