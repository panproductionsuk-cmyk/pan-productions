import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import NewsletterSection from '@/components/NewsletterSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// testTicketPurchase redirect replaced with a direct Stripe hosted-payment link
import { useLanguage } from '@/contexts/LanguageContext';
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
  Ticket,
  Clock,
  MapPin,
  Megaphone
} from 'lucide-react';

const Index = () => {
  const { t, language } = useLanguage();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

  const handleTestPayment = async () => {
    setIsProcessingPayment(true);
    try {
      // Direct redirect to the provided Stripe Checkout link for testing
      window.location.href = 'https://buy.stripe.com/5kQ3cn1To0KtbQ2byaeZ200';
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
            {/* ...existing code... */}
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
              {t('index.highlights.discoverTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('index.highlights.discoverDescription')}
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

      {/* Featured Productions Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              {t('index.featuredTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('index.featuredDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: t('index.featured.earnest.title'),
                subtitle: t('index.featured.earnest.subtitle'),
                status: t('index.featured.earnest.status'),
                venue: language === 'EN' ? 'Tower Theatre' : 'Tower Theatre',
                dates: language === 'EN' ? 'Various dates' : 'Çeşitli tarihler',
                image: '/images/earnest-tower.jpg',
                description: t('index.featured.earnest.description')
              },
              {
                title: t('index.featured.workshop.title'),
                subtitle: t('index.featured.workshop.subtitle'),
                status: t('index.featured.workshop.status'),
                venue: language === 'EN' ? 'Pan Academy' : 'Pan Akademi',
                dates: language === 'EN' ? 'See workshop page' : 'Atölye sayfasına bakınız',
                image: '/images/hero-slide-3.jpg',
                description: t('index.featured.workshop.description')
              },
              {
                title: language === 'EN' ? 'Ben Kolay Ölmem' : 'Ben Kolay Ölmem',
                subtitle: language === 'EN' ? 'Ali Has' : 'Ali Has',
                status: language === 'EN' ? 'Past Production' : 'Geçmiş Prodüksiyon',
                venue: language === 'EN' ? 'Arcola Theatre' : 'Arcola Tiyatrosu',
                dates: language === 'EN' ? '11-13 March 2019' : '11-13 Mart 2019',
                image: '/images/ben-kolay-olmem.jpg',
                description: language === 'EN'
                  ? 'A story of Cemal Süreya and Ahmed Arif - two poets, two lives, one story.'
                  : 'Bir Cemal Süreya ve Ahmed Arif hikayesi - iki şair, iki yaşam, bir hikaye.'
              }
            ].map((production, index) => (
              <Card key={index} className="group overflow-hidden bg-card/50 border-border/60 hover:border-primary/40 transition-all">
                <div className="relative h-80 overflow-hidden bg-muted flex items-center justify-center">
                  {/* Blurred Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={production.image}
                      alt=""
                      className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                    />
                  </div>
                  
                  {/* Main Image */}
                  <img 
                    src={production.image} 
                    alt={production.title}
                    className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-muted text-muted-foreground">
                      {production.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">{production.dates}</span>
                    </div>
                    <span>•</span>
                    <span>{production.venue}</span>
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
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/productions">
              <Button size="lg" className="px-8 bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                <Theater className="w-4 h-4 mr-2" />
                View All Productions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Workshops Section */}
      <section className="py-24 bg-gradient-to-br from-card/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            {/* ...existing code... */}
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              {language === 'EN' ? 'Featured Workshops' : 'Öne Çıkan Atölyeler'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'EN' ? 'Develop your skills with our expert-led workshops and training programs' : 'Uzman eğitmenler tarafından verilen atölye ve eğitim programlarımızla becerilerinizi geliştirin'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: language === 'EN' ? 'Theatre of the Oppressed' : 'Ezilenlerin Tiyatrosu',
                instructor: 'Augusto Boal',
                status: language === 'EN' ? 'Completed' : 'Tamamlandı',
                venue: language === 'EN' ? 'Pan Academy, London' : 'Pan Akademi, Londra',
                dates: language === 'EN' ? 'Full Day Workshop' : 'Tam Gün Atölye',
                image: '/images/boal-workshop.jpg',
                description: language === 'EN'
                  ? "An intensive workshop exploring Augusto Boal's revolutionary Theatre of the Oppressed techniques."
                  : 'Augusto Boal’ın Ezilenlerin Tiyatrosu tekniklerini irdeleyen yoğun bir atölye.'
              },
              {
                title: language === 'EN' ? 'Mehmet Ergen Theatre Experience' : 'Mehmet Ergen ile Tiyatro Deneyimi',
                instructor: 'Mehmet Ergen',
                status: language === 'EN' ? 'Completed' : 'Tamamlandı',
                venue: language === 'EN' ? 'Pan Academy, London' : 'Pan Akademi, Londra',
                dates: language === 'EN' ? 'Weekend Intensive' : 'Hafta Sonu Yoğun Programı',
                image: '/images/mehmet-ergen-workshop.jpg',
                description: language === 'EN'
                  ? 'A comprehensive theatre workshop with renowned director Mehmet Ergen.'
                  : 'Ünlü yönetmen Mehmet Ergen ile kapsamlı bir tiyatro atölyesi.'
              },
              {
                title: language === 'EN' ? 'Devised Theatre with Philip Arditti' : 'Philip Arditti ile Oyun Yapma Atölyesi',
                instructor: 'Philip Arditti',
                status: language === 'EN' ? 'Completed' : 'Tamamlandı',
                venue: language === 'EN' ? 'Pan Academy, London' : 'Pan Akademi, Londra',
                dates: language === 'EN' ? '3-Day Workshop' : '3 Günlük Atölye',
                image: '/images/philip-arditti-workshop.jpg',
                description: language === 'EN'
                  ? 'Learn the art of devised theatre from acclaimed actor Philip Arditti.'
                  : 'Ödüllü oyuncu Philip Arditti’den doğaçlama tiyatro ve oyun yapma teknikleri öğrenin.'
              }
            ].map((workshop, index) => (
              <Card key={index} className="group overflow-hidden bg-card/50 border-border/60 hover:border-primary/40 transition-all">
                <div className="relative h-80 overflow-hidden bg-muted flex items-center justify-center">
                  {/* Blurred Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={workshop.image}
                      alt=""
                      className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                    />
                  </div>
                  
                  {/* Main Image */}
                  <img 
                    src={workshop.image} 
                    alt={workshop.title}
                    className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-muted text-muted-foreground">
                      {workshop.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">{workshop.dates}</span>
                    </div>
                    <span>•</span>
                    <span>{workshop.venue}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
                    {workshop.title}
                  </h3>
                  <p className="text-primary text-sm font-semibold mb-4">
                    by {workshop.instructor}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {workshop.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/academy/workshops">
              <Button size="lg" className="px-8 bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                <GraduationCap className="w-4 h-4 mr-2" />
                View All Workshops
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Pan Productions Section removed as requested */}

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              {language === 'EN' ? 'Testimonials' : 'Görüşler'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'EN' ? 'Hear from our audience and students about their experiences' : 'İzleyicilerimizden ve öğrencilerimizden deneyimlerini dinleyin'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: t('index.testimonial1.name'),
                role: t('index.testimonial1.role'),
                content: t('index.testimonial1.content'),
                rating: 5
              },
              {
                name: t('index.testimonial2.name'),
                role: t('index.testimonial2.role'),
                content: t('index.testimonial2.content'),
                rating: 5
              },
              {
                name: t('index.testimonial3.name'),
                role: t('index.testimonial3.role'),
                content: t('index.testimonial3.content'),
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

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Partners Carousel */}
      <PartnersCarousel />
    </div>
  );
};

export default Index;
