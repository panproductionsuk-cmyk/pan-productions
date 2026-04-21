import React from 'react';
import NewsletterSection from '@/components/NewsletterSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Theater, 
  GraduationCap, 
  Megaphone
} from 'lucide-react';

const Index = () => {
  const { t, language } = useLanguage();

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    "name": "Pan Productions",
    "alternateName": "Pan Academy",
    "url": "https://www.panproductions.co.uk",
    "logo": "https://www.panproductions.co.uk/file/2017/02/PAN_LOGO-01.png",
    "description": "Professional theatre company and performing arts academy in London, bringing Turkish culture to UK audiences through exceptional performances.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://www.facebook.com/PanProductionsUK",
      "https://twitter.com/PanProductionsUK",
      "https://www.instagram.com/panproductionsuk"
    ],
    "email": "panproductionsuk@gmail.com",
    "priceRange": "$$"
  };

  const highlights = [
    {
      icon: Theater,
      title: t('index.highlights.productions.title'),
      description: t('index.highlights.productions.description'),
      link: "/productions",
      image: "/images/hero-slide-1.jpg"
    },
    {
      icon: Megaphone,
      title: t('nav.marketing'),
      description: t('marketing.description'),
      link: "/marketing",
      image: "/images/hero-slide-2.jpg"
    },
    {
      icon: GraduationCap,
      title: t('index.highlights.academy.title'),
      description: t('index.highlights.academy.description'),
      link: "/academy/workshops",
      image: "/images/hero-slide-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Pan Productions | Award-Winning Theatre Company & Drama Academy London"
        description="Pan Productions - London's premier Turkish theatre company and performing arts academy. Award-winning productions, professional workshops, and drama education for all levels. Book tickets and explore our academy."
        keywords="Pan Productions, theatre London, Turkish theatre UK, drama academy, acting classes London, theatre workshops, performing arts, Pan Academy, theatre company London, drama school, acting lessons"
        url="/"
        structuredData={organizationSchema}
      />
      
      {/* Highlights Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          

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
                        <span>{t('index.highlights.exploreMore')}</span>
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

{/* Partners Carousel */}
      <PartnersCarousel />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Index;
