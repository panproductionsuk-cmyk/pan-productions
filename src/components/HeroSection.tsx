import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { buyTicket } from '@/lib/stripe';

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
}

const STRIPE_TICKET_LINK = 'https://buy.stripe.com/3cI5kv69E78R3jweKmeZ207';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isProcessingTicket, setIsProcessingTicket] = useState(false);
  const { t, language } = useLanguage();

  const slides: Slide[] = [
    {
      id: 'love-of-rumi',
      title: t('hero.slide4.title'),
      subtitle: t('hero.slide4.subtitle'),
      description: t('hero.slide4.description'),
      image: '/images/love-of-rumi.jpg',
      video: '/videos/love-of-rumi.mov',
      type: 'current',
      showBuyTicket: true,
      ticketPrice: 25.00,
      ticketName: t('hero.slide4.ticketName'),
      ticketLink: 'https://buy.stripe.com/3cI5kv69E78R3jweKmeZ207'
    },
    // {
    //   id: 'productions',
    //   title: t('hero.slide1.title'),
    //   subtitle: t('hero.slide1.subtitle'),
    //   description: t('hero.slide1.description'),
    //   image: '/images/hero-slide-1.jpg',
    //   ctaText: t('hero.slide1.cta'),
    //   ctaLink: '/productions',
    //   type: 'current'
    // },
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

  const handleBuyTicket = async () => {
    const slide = slides[currentSlide];
    if (!slide.showBuyTicket) return;
    
    setIsProcessingTicket(true);
    try {
      if (slide.ticketLink) {
        window.location.href = slide.ticketLink;
        return;
      }

      if (!slide.ticketPrice || !slide.ticketName) {
        throw new Error('Ticket details are missing');
      }

      await buyTicket({
        ticketName: slide.ticketName,
        price: slide.ticketPrice,
        quantity: 1,
      });
    } catch (error) {
      console.error('Ticket purchase error:', error);
    } finally {
      setIsProcessingTicket(false);
    }
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
      <div className="flex relative z-10 w-full lg:w-1/2 h-auto lg:h-full items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 lg:mt-0 order-1 lg:order-1">
        <div className={`relative w-full ${currentSlide === 0 ? 'max-w-2xl sm:max-w-3xl lg:max-w-4xl' : 'max-w-sm sm:max-w-md lg:max-w-2xl'}`}>
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
              className="relative w-full h-auto object-contain rounded-xl lg:rounded-2xl shadow-2xl"
            />
          )}
        </div>
      </div>

      {/* Right Content Section */}
      <div className="relative z-10 w-full lg:w-1/2 px-4 sm:px-6 lg:px-16 py-8 lg:py-0 order-2 lg:order-2">
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
              {isProcessingTicket ? t('hero.slide4.processing') : t('hero.slide4.buyTicket')}
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
    </section>
  );
};

export default HeroSection;