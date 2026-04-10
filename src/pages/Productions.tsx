import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Ticket, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSanityProductions, sortProductions } from '@/hooks/useSanityProductions';
import { ProductionsGridSkeleton } from '@/components/ProductionSkeleton';
import type { Production } from '@/lib/sanity';

// ProductionCard Component
const ProductionCard = ({ production, getStatusColor, t }: { production: Production; getStatusColor: (status: string) => string; t: (key: string) => string }) => {
  const { language } = useLanguage();
  const isVideo = production.image.endsWith('.mp4') || production.image.endsWith('.webm');
  
  // Truncate description for card preview
  const fullDescription = typeof production.description === 'string' 
    ? production.description 
    : (language === 'EN' ? production.description.EN : production.description.TR);
  const truncatedDescription = fullDescription.length > 150 
    ? fullDescription.substring(0, 150) + '...' 
    : fullDescription;
  
  return (
    <Link to={`/productions/${production.id}`}>
      <Card className="production-card group overflow-hidden cursor-pointer h-full">
        <div className="relative h-[500px] overflow-hidden bg-muted flex items-center justify-center">
          {isVideo ? (
            <>
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  src={production.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                />
              </div>
              {/* Main Video */}
              <video
                src={production.image}
                autoPlay
                loop
                muted
                playsInline
                className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </>
          ) : (
            <>
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
                className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </>
          )}
          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-20">
            <Badge className={getStatusColor(production.status)}>
              {production.status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading text-2xl font-bold mb-1 text-foreground">
            {production.title}
          </h3>
          {production.author && (
            <p className="text-muted-foreground text-sm mb-4">
              {t('productions.by')} {production.author}
            </p>
          )}
          <p className="text-muted-foreground mb-6 line-clamp-3">
            {truncatedDescription}
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-foreground">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{production.dates}</span>
            </div>
            <div className="flex items-center text-sm text-foreground">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>{production.venue}</span>
            </div>
            <div className="flex items-center text-sm text-foreground">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>{production.duration}</span>
            </div>
            <div className="flex items-center text-sm text-foreground">
              <Ticket className="w-4 h-4 mr-2 text-primary" />
              <span>{production.ticketPrice}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="spotlight" 
              className="flex-1"
              onClick={(e) => {
                if (production.ticketLink && production.status !== 'Past') {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(production.ticketLink, '_blank');
                }
              }}
            >
              {(production.status === 'Current' || production.status === 'On Sale') ? t('productions.buyTickets') : 
               production.status === 'Upcoming' ? t('productions.comingSoon') : t('productions.archive')}
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Productions = () => {
  const { t } = useLanguage();
  const { productions, isLoading, isError } = useSanityProductions();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
      case 'On Sale':
        return 'bg-accent text-accent-foreground';
      case 'Upcoming':
        return 'bg-primary text-primary-foreground';
      case 'Past':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Sort productions: upcoming first, then past
  const sortedProductions = sortProductions(productions);

  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": sortedProductions.map((prod, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": prod.title,
      "description": typeof prod.description === 'string' ? prod.description : prod.description.EN,
      "startDate": prod.dates,
      "location": {
        "@type": "Place",
        "name": prod.venue,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      },
      "performer": {
        "@type": "PerformingGroup",
        "name": "Pan Productions"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Pan Productions",
        "url": "https://www.panproductions.co.uk"
      }
    }))
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Theatre Productions | Pan Productions London"
        description="Discover Pan Productions' award-winning theatre shows in London. From Turkish classics to contemporary performances. View our current shows and book tickets."
        keywords="theatre productions London, Turkish theatre, Pan Productions shows, London theatre, theatre tickets, performing arts, theatre events"
        url="/productions"
        structuredData={eventsSchema}
      />
      
      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-slide-1.jpg" 
            alt="Our Productions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              {t('productions.title')}
            </h1>
            {/* Subtitle removed as requested */}
          </div>
        </div>
      </section>


      <div className="container mx-auto px-4 py-16">
        {/* Loading State */}
        {isLoading && <ProductionsGridSkeleton />}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Unable to load productions. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* All Productions in a single list */}
        {!isLoading && !isError && (
          <div className="grid md:grid-cols-2 gap-8">
            {sortedProductions.map((production) => (
              <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} t={t} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 rounded-lg bg-card/50">
          <h2 className="font-heading text-2xl font-bold mb-4">
            {t('productions.ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('productions.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="spotlight" size="lg">
                {t('productions.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productions;
