import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Ticket, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { allProductions, type Production } from '@/data/productions';

// Helper to safely get description
const getDescription = (production: Production, language: string): string => {
  try {
    if (!production.description) return '';
    if (typeof production.description === 'string') {
      return production.description;
    }
    return language === 'EN' ? (production.description.EN || '') : (production.description.TR || production.description.EN || '');
  } catch {
    return '';
  }
};

// Helper to safely get sortDate
const getSortDate = (production: Production): string => {
  return production.sortDate || '1900-01-01';
};

// ProductionCard Component
const ProductionCard = ({ production, getStatusColor, t }: { production: Production; getStatusColor: (status: string) => string; t: (key: string) => string }) => {
  const { language } = useLanguage();
  const isVideo = production.image?.endsWith('.mp4') || production.image?.endsWith('.webm');
  
  const fullDescription = getDescription(production, language);
  const truncatedDescription = fullDescription.length > 150 
    ? fullDescription.substring(0, 150) + '...' 
    : fullDescription;
  
  return (
    <Link to={`/productions/${production.id}`} className="block group">
      <Card className="overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden">
          {isVideo ? (
            <>
              <div className="absolute inset-0">
                <video
                  src={production.image}
                  className="w-full h-full object-cover blur-xl scale-110"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              </div>
              <video
                src={production.image}
                className="relative w-full h-full object-contain"
                muted
                loop
                playsInline
                autoPlay
              />
            </>
          ) : (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                style={{ backgroundImage: `url(${production.image})` }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <img
                src={production.image}
                alt={production.title}
                className="relative w-full h-full object-contain"
              />
            </>
          )}
          <div className="absolute top-4 right-4 z-10">
            <Badge className={`${getStatusColor(production.status)} shadow-lg`}>
              {production.status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {production.title}
          </h3>
          {production.author && production.author.length > 0 && (
            <p className="text-muted-foreground text-sm mb-3">
              {t('productions.by')} {production.author}
            </p>
          )}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {truncatedDescription}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{production.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{production.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{production.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary" />
              <span>{production.ticketPrice}</span>
            </div>
          </div>
          <Button 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            variant={production.status === 'Past' ? 'outline' : 'default'}
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
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

const Productions = () => {
  const { t } = useLanguage();

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

  // Sort productions: upcoming first (sorted by date asc), then past (sorted by date desc)
  const sortedProductions = [...allProductions].sort((a, b) => {
    const dateA = getSortDate(a);
    const dateB = getSortDate(b);
    const now = new Date().toISOString().split('T')[0];
    const aUpcoming = dateA >= now;
    const bUpcoming = dateB >= now;
    if (aUpcoming && !bUpcoming) return -1;
    if (!aUpcoming && bUpcoming) return 1;
    if (aUpcoming && bUpcoming) return dateA.localeCompare(dateB);
    return dateB.localeCompare(dateA);
  });

  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": sortedProductions.map((prod, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": prod.title,
      "description": getDescription(prod, 'EN'),
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
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('seo.productions.title')}
        description={t('seo.productions.description')}
        structuredData={eventsSchema}
      />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/images/hero-slide-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t('productions.title')}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProductions.map((production) => (
            <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} t={t} />
          ))}
        </div>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('productions.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('productions.ctaDescription')}
          </p>
          <Link to="/contact">
            <Button size="lg" className="px-8">
              {t('productions.contactUs')}
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Productions;
