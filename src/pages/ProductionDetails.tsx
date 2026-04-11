import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Users, Info } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { allProductions, type Production } from '@/data/productions';
import { useProductionById } from '@/hooks/useSupabaseProductions';

const ProductionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { production: supabaseProduction, loading } = useProductionById(id || '');
  
  // Use Supabase data if available, otherwise fall back to local data
  const production = supabaseProduction || allProductions.find((p) => p.id === id);
  
  if (!production && !loading) {
    return <Navigate to="/productions" replace />;
  }

  if (loading || !production) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const isVideo = production.image.endsWith('.mp4') || production.image.endsWith('.webm');
  const description = typeof production.description === 'string' 
    ? production.description 
    : (language === 'EN' ? production.description.EN : production.description.TR);

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

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": production.title,
    "description": description,
    "startDate": production.sortDate,
    "location": {
      "@type": "Place",
      "name": production.venue,
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
    },
    "image": production.image
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${production.title} | Pan Productions`}
        description={description.substring(0, 160)}
        structuredData={eventSchema}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          {isVideo ? (
            <video
              src={production.image}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <OptimizedImage
              src={production.image}
              alt={production.title}
              className="w-full h-full object-cover"
              loading="eager"
              width={1200}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <Link to="/productions" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'EN' ? 'Back to Productions' : 'Prodüksiyonlara Dön'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <Badge className={`${getStatusColor(production.status)} mb-4`}>
              {production.status}
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {production.title}
            </h1>
            
            {production.titleEn && production.title !== production.titleEn && (
              <p className="text-xl text-muted-foreground mb-4">
                {production.titleEn}
              </p>
            )}
            
            {production.author && production.author.length > 0 && (
              <p className="text-lg text-muted-foreground mb-6">
                {t('productions.by')} {production.author}
              </p>
            )}

            {/* Event Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Date' : 'Tarih'}</p>
                      <p className="font-medium">{production.dates}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Venue' : 'Mekan'}</p>
                      <p className="font-medium">{production.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Duration' : 'Süre'}</p>
                      <p className="font-medium">{production.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Tickets' : 'Bilet'}</p>
                      <p className="font-medium">{production.ticketPrice}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {production.ticketLink && production.status !== 'Past' && (
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => window.open(production.ticketLink, '_blank')}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  {production.status === 'On Sale' ? t('productions.buyTickets') : t('productions.comingSoon')}
                </Button>
              )}
              <Link to="/contact" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  {language === 'EN' ? 'Contact Us' : 'Bize Ulaşın'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Main Image */}
          <div>
            <Card className="overflow-hidden">
              <div className="relative aspect-[3/4]">
                <div className="absolute inset-0 overflow-hidden">
                  {isVideo ? (
                    <video
                      src={production.image}
                      className="w-full h-full object-cover blur-xl scale-110"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-cover bg-center blur-xl scale-110"
                      style={{ backgroundImage: `url(${production.image})` }}
                    />
                  )}
                </div>
                {isVideo ? (
                  <video
                    src={production.image}
                    className="relative w-full h-full object-contain"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <OptimizedImage
                    src={production.image}
                    alt={production.title}
                    className="relative w-full h-full object-contain"
                    loading="eager"
                    width={800}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 pb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                {language === 'EN' ? 'About This Production' : 'Bu Prodüksiyon Hakkında'}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Director & Cast */}
          {(production.director || production.cast) && (
            <Card className="mt-8">
              <CardContent className="p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {language === 'EN' ? 'Cast & Crew' : 'Oyuncular ve Ekip'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {production.director && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{language === 'EN' ? 'Director' : 'Yönetmen'}</p>
                      <p className="font-medium text-foreground">{production.director}</p>
                    </div>
                  )}
                  {production.cast && production.cast.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{language === 'EN' ? 'Cast' : 'Oyuncular'}</p>
                      <p className="font-medium text-foreground">{production.cast.join(', ')}</p>
                    </div>
                  )}
                </div>
                {production.credits && production.credits.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {production.credits.map((credit, index) => (
                        <div key={index}>
                          <p className="text-sm text-muted-foreground mb-1">{credit.role}</p>
                          <p className="font-medium text-foreground">{credit.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Gallery */}
          {production.gallery && production.gallery.length > 1 && (
            <Card className="mt-8">
              <CardContent className="p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {language === 'EN' ? 'Gallery' : 'Galeri'}
                </h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {production.gallery.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="aspect-video overflow-hidden rounded-lg">
                          {image.endsWith('.mp4') || image.endsWith('.webm') ? (
                            <video
                              src={image}
                              className="w-full h-full object-cover"
                              muted
                              loop
                              playsInline
                              autoPlay
                            />
                          ) : (
                            <OptimizedImage
                              src={image}
                              alt={`${production.title} gallery ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              width={600}
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionDetails;
