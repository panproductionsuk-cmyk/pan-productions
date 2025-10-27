import React from 'react';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import { Link } from 'react-router-dom';
import { 
  Theater, 
  GraduationCap, 
  Newspaper 
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

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

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Partners Carousel */}
      <PartnersCarousel />
    </div>
  );
};

export default Index;
