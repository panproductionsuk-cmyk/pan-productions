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
      <section className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">
              Discover Pan Productions
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From professional theatre productions to comprehensive drama education, 
              we bring stories to life and nurture the next generation of performers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Card key={index} className="production-card group cursor-pointer bg-card/40 backdrop-blur-sm border-white/10">
                <div className="relative h-72 overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 transition-colors" />
                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/30 backdrop-blur-md flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <Link to={item.link}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
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
