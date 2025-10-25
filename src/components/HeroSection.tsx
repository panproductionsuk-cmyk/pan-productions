import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
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
    <section className="relative min-h-screen flex flex-col overflow-hidden border-b-4 border-foreground">
      {/* Top Brand Section */}
      <div className="relative z-20 bg-background border-b-4 border-foreground py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Large Brand Name */}
          <h1 className="hero-brand">
            PAN PRODUCTIONS
          </h1>
          
          {/* Tagline with Stripes */}
          <div className="hero-tagline-box">
            <div className="hero-tagline">
              Bringing Stories to Life,<br />One Frame at a Time
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Image Section with Rounded Corner */}
      <div className="relative flex-1 min-h-[600px] bg-background px-8 py-8">
        <div className="relative h-full border-4 border-foreground overflow-hidden" style={{ borderBottomRightRadius: '120px' }}>
          {/* Background Images - Carousel */}
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
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}

          {/* Slide Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center max-w-4xl mx-auto px-8">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider">
                  {slides[currentSlide].subtitle}
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 uppercase tracking-tight leading-none">
                {slides[currentSlide].title}
              </h2>
              
              <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to={slides[currentSlide].ctaLink}>
                  <Button 
                    size="lg" 
                    className="px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-foreground font-bold uppercase tracking-wider text-lg"
                  >
                    {slides[currentSlide].ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="ml-4 bg-primary/90 hover:bg-primary text-primary-foreground border-2 border-foreground"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="mr-4 bg-primary/90 hover:bg-primary text-primary-foreground border-2 border-foreground"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 border-2 border-primary transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-transparent hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Statement Section */}
      <div className="relative z-20 bg-background border-t-4 border-foreground py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left Section - Label and Barcode */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-2xl uppercase tracking-wider text-primary">
              ABOUT US
            </h3>
            <div className="barcode">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>

          {/* Statement Text */}
          <div className="statement-text text-left md:text-right max-w-3xl">
            <span className="muted">We are passionate </span>
            <span className="highlight">storytellers </span>
            <span className="muted">and </span>
            <span className="highlight">visual artists </span>
            <span className="muted">dedicated to crafting </span>
            <span className="highlight">cinematic experiences </span>
            <span className="muted">that captivate, inspire, and resonate with audiences</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;