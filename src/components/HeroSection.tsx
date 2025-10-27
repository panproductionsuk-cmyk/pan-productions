import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const slides: Slide[] = [
    {
      id: 'earnest',
      title: 'The Importance of Being Earnest',
      subtitle: 'Current Production',
      description: 'Oscar Wilde\'s brilliant comedy of manners returns to the stage with Pan Productions\' acclaimed cast.',
      image: 'https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg',
      ctaText: 'Buy Tickets',
      ctaLink: '/productions/earnest',
      type: 'current'
    },
    {
      id: 'workshop',
      title: 'Pan Academy Workshops',
      subtitle: 'Learn with the Professionals',
      description: 'Join our intensive drama workshops and lessons with experienced industry professionals.',
      image: 'https://www.panproductions.co.uk/file/2019/10/PAN-WORKSHOPArtboard-0-1.jpg',
      ctaText: 'Explore Workshops',
      ctaLink: '/academy/workshops',
      type: 'upcoming'
    },
    {
      id: 'company',
      title: 'Pan Productions Story',
      subtitle: 'Founded in 2016',
      description: 'Discover our journey from a small theatre group to London\'s premier independent production company.',
      image: 'https://www.panproductions.co.uk/file/2019/10/cocuk.jpg',
      ctaText: 'Learn More',
      ctaLink: '/about',
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
    <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-background to-card">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      ))}

      {/* Left Content Section */}
      <div className="relative z-10 w-full lg:w-1/2 px-8 lg:px-16">
        <div className="mb-6">
          <span className="inline-block px-5 py-2 rounded text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30 mb-4">
            {slides[currentSlide].subtitle}
          </span>
        </div>
        
        <h1 className="hero-text mb-6">
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
      <div className="hidden lg:flex relative z-10 w-1/2 h-full items-center justify-center px-8">
        <div className="relative w-full max-w-2xl">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-3xl" />
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="relative w-full h-auto object-contain rounded-lg shadow-2xl"
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