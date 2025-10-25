import React from 'react';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Theater, 
  GraduationCap, 
  Newspaper, 
  Calendar, 
  Users, 
  Award 
} from 'lucide-react';

const Index = () => {
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

  const stats = [
    { icon: Award, value: "50+", label: "Productions" },
    { icon: Users, value: "1000+", label: "Students Taught" },
    { icon: Calendar, value: "8", label: "Years Experience" },
    { icon: Theater, value: "10+", label: "Venue Partners" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 border-4 border-primary flex items-center justify-center bg-card">
                    <stat.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="font-heading text-5xl font-bold text-primary mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-muted-foreground uppercase text-sm tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="section-heading mb-6">
              OUR PORTFOLIO
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              From professional theatre productions to comprehensive drama education, 
              we bring stories to life and nurture the next generation of performers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Card key={index} className="production-card group cursor-pointer bg-card">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-6 left-6">
                    <div className="w-16 h-16 border-4 border-primary bg-background flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <Link to={item.link}>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-wider"
                    >
                      Explore More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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
