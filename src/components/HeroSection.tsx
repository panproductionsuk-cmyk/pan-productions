import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  type: 'current' | 'upcoming' | 'past';
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useLanguage();

  const slides: Slide[] = [
    {
      id: 'productions',
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      description: t('hero.slide1.description'),
      image: '/images/hero-slide-1.jpg',
      ctaText: t('hero.slide1.cta'),
      ctaLink: '/productions',
      type: 'current'
    },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

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
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image for All Slides */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          alt=""
          className="w-full h-full object-cover opacity-50 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
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

      {/* Left Content Section */}
      <div className="relative z-10 w-full lg:w-3/5 px-8 lg:px-16">
        <div className="mb-6">
          <span className="inline-block px-5 py-2 rounded text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30 mb-4">
            {slides[currentSlide].subtitle}
          </span>
        </div>
        
        <h1 className={`hero-text mb-6 ${language === 'TR' ? 'text-3xl md:text-4xl lg:text-5xl' : ''}`}>
          {slides[currentSlide].title}
        </h1>
        
        <p className="hero-subtitle mb-10 max-w-xl text-lg leading-relaxed">
          {slides[currentSlide].description}
        </p>

        <div className="flex gap-4">
          <Link to={slides[currentSlide].ctaLink}>
            <Button size="lg" className="btn-spotlight px-10 py-6 text-base font-semibold">
              {slides[currentSlide].ctaText}
            </Button>
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="flex space-x-3 mt-16">
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

      {/* Right Image Section */}
      <div className="hidden lg:flex relative z-10 w-2/5 h-full items-center justify-center px-8">
        <div className={`relative w-full ${currentSlide === 0 ? 'max-w-3xl' : 'max-w-2xl'}`}>
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="relative w-full h-auto object-contain rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded bg-muted/40 hover:bg-muted/60 border border-border flex items-center justify-center text-foreground transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded bg-muted/40 hover:bg-muted/60 border border-border flex items-center justify-center text-foreground transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;