import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
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
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSanityProductionById } from '@/hooks/useSanityProductions';

// Loading skeleton for production details
function ProductionDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-40 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-6 w-20 mb-4" />
              <Skeleton className="h-16 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <Skeleton className="aspect-[3/4] w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

const ProductionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { production, isLoading, isError } = useSanityProductionById(id);

  // Loading state
  if (isLoading) {
    return <ProductionDetailsSkeleton />;
  }

  // Error state or not found
  if (isError || !production) {
    return <Navigate to="/productions" replace />;
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
    <div className="min-h-screen">
      <SEO
        title={`${production.title} | Pan Productions`}
        description={description.substring(0, 160)}
        keywords={`${production.title}, Pan Productions, theatre London, ${production.author}`}
        url={`/productions/${production.id}`}
        structuredData={eventSchema}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          {isVideo ? (
            <video
              src={production.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={production.image}
              alt={production.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link 
            to="/productions" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'EN' ? 'Back to Productions' : 'Prodüksiyonlara Dön'}</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Info */}
            <div>
              <Badge className={`${getStatusColor(production.status)} mb-4`}>
                {production.status}
              </Badge>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                {production.title}
              </h1>
              
              {production.titleEn && production.title !== production.titleEn && (
                <p className="text-xl text-muted-foreground mb-4 italic">
                  {production.titleEn}
                </p>
              )}
              
              {production.author && (
                <p className="text-xl text-primary font-semibold mb-6">
                  {t('productions.by')} {production.author}
                </p>
              )}

              {/* Event Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Date' : 'Tarih'}</p>
                      <p className="font-semibold text-foreground">{production.dates}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Venue' : 'Mekan'}</p>
                      <p className="font-semibold text-foreground">{production.venue}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Duration' : 'Süre'}</p>
                      <p className="font-semibold text-foreground">{production.duration}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Tickets' : 'Bilet'}</p>
                      <p className="font-semibold text-foreground">{production.ticketPrice}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {production.ticketLink && production.status !== 'Past' && (
                  <Button
                    variant="spotlight"
                    size="lg"
                    className="px-8"
                    onClick={() => window.open(production.ticketLink, '_blank')}
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    {production.status === 'On Sale' ? t('productions.buyTickets') : t('productions.comingSoon')}
                  </Button>
                )}
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="px-8">
                    <Info className="w-4 h-4 mr-2" />
                    {language === 'EN' ? 'Contact Us' : 'Bize Ulaşın'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Main Image */}
            <div className="relative">
              <div className="production-card overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center">
                  {/* Blurred Background */}
                  <div className="absolute inset-0">
                    {isVideo ? (
                      <video
                        src={production.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                      />
                    ) : (
                      <img
                        src={production.image}
                        alt=""
                        className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                      />
                    )}
                  </div>
                  {/* Main Media */}
                  {isVideo ? (
                    <video
                      src={production.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="relative z-10 w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={production.image}
                      alt={production.title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
              {language === 'EN' ? 'About This Production' : 'Bu Prodüksiyon Hakkında'}
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              {description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cast & Credits Section */}
      {(production.cast || production.director || production.credits) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
                {language === 'EN' ? 'Cast & Credits' : 'Oyuncular ve Ekip'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {production.director && (
                  <Card className="bg-card/50 border-border/60">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {language === 'EN' ? 'Director' : 'Yönetmen'}
                        </h3>
                      </div>
                      <p className="text-foreground">{production.director}</p>
                    </CardContent>
                  </Card>
                )}
                
                {production.cast && production.cast.length > 0 && (
                  <Card className="bg-card/50 border-border/60">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {language === 'EN' ? 'Cast' : 'Oyuncular'}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {production.cast.map((member, index) => (
                          <li key={index} className="text-foreground">{member}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {production.credits && production.credits.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-xl font-bold mb-4 text-foreground">
                    {language === 'EN' ? 'Additional Credits' : 'Ek Katkılar'}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {production.credits.map((credit, index) => (
                      <Card key={index} className="bg-card/50 border-border/60">
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground mb-1">{credit.role}</p>
                          <p className="font-semibold text-foreground">{credit.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {production.gallery && production.gallery.length > 1 && (
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center text-foreground">
              {language === 'EN' ? 'Gallery' : 'Galeri'}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {production.gallery.map((media, index) => {
                    const isGalleryVideo = media.endsWith('.mp4') || media.endsWith('.webm');
                    return (
                      <CarouselItem key={index}>
                        <div className="production-card overflow-hidden">
                          <div className="relative aspect-video bg-muted flex items-center justify-center">
                            <div className="absolute inset-0">
                              {isGalleryVideo ? (
                                <video
                                  src={media}
                                  className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                                />
                              ) : (
                                <img
                                  src={media}
                                  alt=""
                                  className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                                />
                              )}
                            </div>
                            {isGalleryVideo ? (
                              <video
                                src={media}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                                className="relative z-10 w-full h-full object-contain"
                              />
                            ) : (
                              <img
                                src={media}
                                alt={`${production.title} - Image ${index + 1}`}
                                className="relative z-10 w-full h-full object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto p-8 rounded-lg bg-card/50 border border-border/60">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
              {language === 'EN' ? 'Interested in Our Productions?' : 'Prodüksiyonlarımızla İlgileniyor musunuz?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'EN' 
                ? 'Get in touch with us for more information about upcoming shows and events.'
                : 'Yaklaşan gösteriler ve etkinlikler hakkında daha fazla bilgi için bizimle iletişime geçin.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productions">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'EN' ? 'View All Productions' : 'Tüm Prodüksiyonlar'}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="spotlight" size="lg">
                  {language === 'EN' ? 'Contact Us' : 'Bize Ulaşın'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionDetails;
