import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Ticket, X, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { buyTicket } from '@/lib/stripe';
import { useProductions } from '@/hooks/useSupabaseProductions';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  ctaText?: string;
  ctaLink?: string;
  type: 'current' | 'upcoming' | 'past';
  showBuyTicket?: boolean;
  ticketPrice?: number;
  ticketName?: string;
  ticketLink?: string;
  buyTicketText?: string;
  posterStyle?: boolean;
}

const STRIPE_TICKET_LINK = 'https://buy.stripe.com/3cI5kv69E78R3jweKmeZ207';

const SUS_TICKET_DATES = [
  { date: '1 Nisan 2026', dateEn: '1 April 2026', day: 'Çarşamba / Wednesday', time: '19:30', link: '', soldOut: true },
  { date: '2 Nisan 2026', dateEn: '2 April 2026', day: 'Perşembe / Thursday', time: '19:30', link: 'https://buy.stripe.com/28E7sD55A3WF7zM59MeZ20b', soldOut: false },
  { date: '3 Nisan 2026', dateEn: '3 April 2026', day: 'Cuma / Friday', time: '19:30', link: 'https://buy.stripe.com/6oU28jbtY9gZcU61XAeZ20c', soldOut: false },
  { date: '4 Nisan 2026', dateEn: '4 April 2026', day: 'Cumartesi / Saturday', time: '19:30', link: 'https://buy.stripe.com/aFa7sDapUdxfcU6au6eZ20d', soldOut: false },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isProcessingTicket, setIsProcessingTicket] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const { t, language } = useLanguage();
  const { productions } = useProductions();

  // Get "On Sale" productions from Supabase
  const onSaleProductions = useMemo(() => {
    return productions.filter(p => p.status === 'On Sale');
  }, [productions]);

  // Build slides: On Sale productions first, then static slides
  const slides: Slide[] = useMemo(() => {
    // Convert On Sale productions to slides
    const onSaleSlides: Slide[] = onSaleProductions.map(prod => ({
      id: prod.id,
      title: prod.title,
      subtitle: language === 'TR' ? 'Biletler Satışta' : 'On Sale Now',
      description: language === 'TR' ? (prod.description_tr || prod.description_en || '') : (prod.description_en || ''),
      image: prod.image || '/images/hero-slide-1.jpg',
      ctaText: language === 'TR' ? 'Bilet Al' : 'Get Tickets',
      ctaLink: `/productions/${prod.id}`,
      type: 'current' as const,
      showBuyTicket: !!prod.ticket_link,
      ticketLink: prod.ticket_link || undefined,
      ticketPrice: prod.ticket_price ? parseFloat(prod.ticket_price.replace(/[^0-9.]/g, '')) : undefined,
      posterStyle: true,
    }));

    // Static slides
    const staticSlides: Slide[] = [
      {
        id: 'pr-marketing',
        title: t('hero.slide2.title'),
        subtitle: t('hero.slide2.subtitle'),
        description: t('hero.slide2.description'),
        image: '/images/hero-slide-2.jpg',
        ctaText: t('hero.slide2.cta'),
        ctaLink: '/marketing',
        type: 'upcoming'
      },
      {
        id: 'academy',
        title: t('hero.slide3.title'),
        subtitle: t('hero.slide3.subtitle'),
        description: t('hero.slide3.description'),
        image: '/images/hero-slide-3.jpg',
        ctaText: t('hero.slide3.cta'),
        ctaLink: '/academy/workshops',
        type: 'past'
      }
    ];

    return [...onSaleSlides, ...staticSlides];
  }, [onSaleProductions, language, t]);

  const handleBuyTicket = () => {
    const slide = slides[currentSlide];
    if (!slide.showBuyTicket) return;
    
    // For dynamic slides with a direct ticket link, open it directly
    if (slide.ticketLink) {
      window.open(slide.ticketLink, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // For hardcoded events (like Sus.), show the date selection modal
    setShowTicketModal(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'current':
        return 'bg-accent text-accent-foreground';
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      case 'past':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden py-20 lg:py-0">
      {/* Background Image/Video for All Slides */}
      <div className="absolute inset-0 z-0">
        {slides[currentSlide].video ? (
          <>
            <video
              key={slides[currentSlide].video}
              src={slides[currentSlide].video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50 transition-opacity duration-500"
              onError={(e) => console.error('Background video failed to load:', e)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          </>
        ) : (
          <>
            <img
              src={slides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover opacity-50 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          </>
        )}
      </div>

      {/* Organic Blob Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {/* Large blob - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-[800px] h-[600px] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] bg-card/40 blur-3xl" 
             style={{ transform: 'rotate(-15deg)' }} />
        
        {/* Medium blob - top right */}
        <div className="absolute -top-20 -right-20 w-[700px] h-[500px] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] bg-muted/30 blur-3xl"
             style={{ transform: 'rotate(25deg)' }} />
        
        {/* Small blob - center */}
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[400px] rounded-[70%_30%_50%_50%/60%_40%_60%_40%] bg-secondary/20 blur-3xl"
             style={{ transform: 'translate(-50%, -50%) rotate(-30deg)' }} />
      </div>

      {/* Left Image/Video Section */}
      <div className="flex relative z-10 w-full lg:w-2/5 h-auto lg:h-full items-center justify-start pl-8 sm:pl-12 lg:pl-16 xl:pl-20 pr-4 sm:pr-6 lg:pr-8 mt-8 lg:mt-0 order-1 lg:order-1 py-6 sm:py-8 lg:py-12">
        <div className={`relative w-full ${slides[currentSlide].posterStyle ? 'max-w-xs sm:max-w-sm lg:max-w-md' : 'max-w-sm sm:max-w-md lg:max-w-2xl'}`}>
          {slides[currentSlide].video ? (
            <div className="relative w-full rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden bg-black">
              <video
                key={slides[currentSlide].video}
                src={slides[currentSlide].video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain"
                onError={(e) => console.error('Video failed to load:', e)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className={`relative w-full rounded-xl lg:rounded-2xl shadow-2xl ${slides[currentSlide].posterStyle ? 'h-[400px] sm:h-[500px] lg:h-[600px] object-contain' : 'h-auto object-contain'}`}
            />
          )}
        </div>
      </div>

      {/* Right Content Section */}
      <div className="relative z-10 w-full lg:w-3/5 px-4 sm:px-6 lg:px-16 py-8 lg:py-0 order-2 lg:order-2">
        <div className="mb-4 lg:mb-6">
          <span className="inline-block px-4 py-1.5 lg:px-5 lg:py-2 rounded text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30 mb-3 lg:mb-4">
            {slides[currentSlide].subtitle}
          </span>
        </div>
        
        <h1 className={`hero-text mb-4 lg:mb-6 ${language === 'TR' 
          ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' 
          : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
        }`}>
          {slides[currentSlide].title}
        </h1>
        
        <p className="hero-subtitle mb-6 lg:mb-10 max-w-xl text-base sm:text-lg leading-relaxed">
          {slides[currentSlide].description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {slides[currentSlide].ctaText && slides[currentSlide].ctaLink && (
            <Link to={slides[currentSlide].ctaLink} className="w-full sm:w-auto">
              <Button size="lg" className="btn-spotlight w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold">
                {slides[currentSlide].ctaText}
              </Button>
            </Link>
          )}
          {slides[currentSlide].showBuyTicket && (
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleBuyTicket}
              disabled={isProcessingTicket}
            >
              <Ticket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {isProcessingTicket ? t('hero.slide4.processing') : (slides[currentSlide].buyTicketText || t('hero.slide4.buyTicket'))}
            </Button>
          )}
        </div>

        {/* Slide Indicators */}
        <div className="flex space-x-3 mt-8 lg:mt-16 justify-center lg:justify-start">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 bg-primary' 
                  : 'w-8 bg-muted hover:bg-muted/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded bg-muted/60 hover:bg-muted/80 border border-border flex items-center justify-center text-foreground transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded bg-muted/60 hover:bg-muted/80 border border-border flex items-center justify-center text-foreground transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      {/* Ticket Date Selection Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowTicketModal(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div 
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-primary/10 border-b border-border px-6 py-5">
              <button 
                onClick={() => setShowTicketModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Sus.</h3>
                  <p className="text-sm text-muted-foreground">Tower Theatre, London</p>
                </div>
              </div>
            </div>

            {/* Date Options */}
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'TR' ? 'Tarih seçiniz:' : 'Select a date:'}
              </p>
              <div className="space-y-3">
                {SUS_TICKET_DATES.map((item, idx) => 
                  item.soldOut ? (
                    <div
                      key={idx}
                      className="flex items-center justify-between w-full p-4 rounded-xl border border-border bg-muted/30 opacity-60 cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-muted-foreground line-through">
                            {language === 'TR' ? item.date : item.dateEn}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.day} • {item.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-red-500/80 uppercase tracking-wide">Sold Out</span>
                    </div>
                  ) : (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {language === 'TR' ? item.date : item.dateEn}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.day} • {item.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">£27</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-5">
              <p className="text-xs text-center text-muted-foreground">
                {language === 'TR' ? 'Güvenli ödeme • Stripe ile işlenir' : 'Secure payment • Powered by Stripe'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
