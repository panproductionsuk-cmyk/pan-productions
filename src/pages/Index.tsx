import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { testTicketPurchase } from '@/lib/stripe';
import { 
  Theater, 
  GraduationCap, 
  Newspaper,
  Users,
  Award,
  Calendar,
  Star,
  PlayCircle,
  TrendingUp,
  Heart,
  Ticket
} from 'lucide-react';

const Index = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleTestPayment = async () => {
    setIsProcessingPayment(true);
    try {
      await testTicketPurchase();
    } catch (error) {
      console.error('Test payment error:', error);
      alert('Test payment failed. Please check console for details.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const highlights = [
    {
      icon: Theater,
      title: "Current Productions",
      description: "Experience our acclaimed theatrical performances featuring talented casts and captivating stories.",
      link: "/productions",
      image: "https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg"
    },
    {
      icon: GraduationCap,
      title: "Pan Academy",
      description: "Professional workshops and lessons for actors of all levels, taught by industry experts.",
      link: "/academy",
      image: "https://www.panproductions.co.uk/file/2019/10/PAN-WORKSHOPArtboard-0-1.jpg"
    },
    {
      icon: Newspaper,
      title: "News & Press",
      description: "Stay updated with our latest news, reviews, and press coverage from the theatre world.",
      link: "/news",
      image: "https://www.panproductions.co.uk/file/2019/10/cocuk.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Test Stripe Payment Button */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-center sm:text-left">
              <Badge variant="outline" className="mb-2 text-xs">
                Test Mode
              </Badge>
              <p className="text-sm text-muted-foreground">
                Click to test ticket purchase with Stripe (uses test data)
              </p>
            </div>
            <Button 
              onClick={handleTestPayment}
              disabled={isProcessingPayment}
              size="lg"
              className="px-8"
            >
              <Ticket className="mr-2 h-5 w-5" />
              {isProcessingPayment ? 'Processing...' : 'Test Buy Ticket - £25.00'}
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase border border-primary/20">
                What We Offer
              </span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
              Discover Pan Productions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From professional theatre productions to comprehensive drama education, 
              we bring stories to life and nurture the next generation of performers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <Link key={index} to={item.link} className="group">
                <div className="production-card h-full bg-card/40 backdrop-blur-sm border border-border/60 overflow-hidden">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 rounded bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <item.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="font-heading text-3xl font-bold mb-3 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                        <span>Explore More</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Pan Productions Section */}
      <section className="py-24 bg-gradient-to-br from-card/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase border border-primary/20">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Excellence in Every Performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what makes Pan Productions a leading name in London's theatre scene
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Award-Winning Productions",
                description: "Recognized for excellence with multiple theatre awards and critical acclaim"
              },
              {
                icon: Users,
                title: "Expert Cast & Crew",
                description: "Talented professionals with years of industry experience and passion"
              },
              {
                icon: TrendingUp,
                title: "Growing Community",
                description: "Join thousands of theatre enthusiasts and aspiring performers"
              },
              {
                icon: Heart,
                title: "Passion for Theatre",
                description: "Dedicated to bringing powerful stories and performances to life"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border/60 hover:border-primary/40 transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <feature.icon className="w-8 h-8" style={{ color: '#dae45f' }} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Productions Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase border border-primary/20">
                On Stage Now
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Featured Productions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our current theatrical performances
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "The Importance of Being Earnest",
                subtitle: "A Comedy of Manners",
                status: "Now Playing",
                rating: "4.8/5",
                reviews: "156 Reviews",
                image: "/images/hero-slide-1.jpg",
                description: "Oscar Wilde's brilliant masterpiece returns with Pan Productions' acclaimed cast."
              },
              {
                title: "Summer Theatre Workshop",
                subtitle: "Intensive Drama Course",
                status: "Enrolling Now",
                rating: "4.9/5",
                reviews: "89 Reviews",
                image: "/images/hero-slide-2.jpg",
                description: "Join our immersive workshop and learn from industry professionals."
              }
            ].map((production, index) => (
              <Card key={index} className="group overflow-hidden bg-card/50 border-border/60 hover:border-primary/40 transition-all">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={production.image} 
                    alt={production.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {production.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{production.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{production.reviews}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
                    {production.title}
                  </h3>
                  <p className="text-primary text-sm font-semibold mb-4">
                    {production.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {production.description}
                  </p>
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/productions">
              <Button variant="outline" size="lg" className="px-8">
                View All Productions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-card/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase border border-primary/20">
                Testimonials
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our audience and students about their experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Mitchell",
                role: "Theatre Enthusiast",
                content: "Pan Productions consistently delivers outstanding performances. The attention to detail and passion of the cast is remarkable.",
                rating: 5
              },
              {
                name: "James Wilson",
                role: "Workshop Student",
                content: "The workshops transformed my acting skills. The instructors are knowledgeable, supportive, and truly invested in your growth.",
                rating: 5
              },
              {
                name: "Emily Thompson",
                role: "Regular Attendee",
                content: "Every production is a masterpiece. Pan Productions has become my go-to theatre company in London.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card/50 border-border/60">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border/50 pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 rounded-2xl p-12 border border-border/60">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Experience the Magic?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join us for an unforgettable theatrical experience. Book your tickets now or explore our workshops to start your acting journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productions">
                <Button size="lg" className="px-10">
                  <Theater className="mr-2 h-5 w-5" />
                  Book Tickets
                </Button>
              </Link>
              <Link to="/academy/workshops">
                <Button variant="outline" size="lg" className="px-10">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Explore Workshops
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Partners Carousel */}
      <PartnersCarousel />
    </div>
  );
};

export default Index;
