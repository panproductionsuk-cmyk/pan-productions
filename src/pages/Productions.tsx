import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import NewsletterSection from '@/components/NewsletterSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

interface Production {
  id: string;
  title: string;
  author: string;
  status: string;
  description: string;
  image: string;
  dates: string;
  venue: string;
  duration: string;
  ticketPrice: string;
  titleEn?: string;
}

// ProductionCard Component
const ProductionCard = ({ production, getStatusColor, t }: { production: Production; getStatusColor: (status: string) => string; t: (key: string) => string }) => (
  <Card className="production-card group overflow-hidden">
    <div className="relative h-[500px] overflow-hidden bg-muted flex items-center justify-center">
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
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <Badge className={getStatusColor(production.status)}>
          {production.status}
        </Badge>
      </div>
    </div>

    <CardContent className="p-6">
      <h3 className="font-heading text-2xl font-bold mb-1">
        {production.title}
      </h3>
      {production.author && (
        <p className="text-muted-foreground text-sm mb-4">
          {t('productions.by')} {production.author}
        </p>
      )}

      <p className="text-muted-foreground mb-6">
        {production.description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          <span>{production.dates}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span>{production.venue}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          <span>{production.duration}</span>
        </div>
        <div className="flex items-center text-sm">
          <Ticket className="w-4 h-4 mr-2 text-primary" />
          <span>{production.ticketPrice}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="spotlight" 
          className="flex-1"
          disabled={production.status === 'Past'}
        >
          {production.status === 'Current' ? t('productions.buyTickets') : 
           production.status === 'Upcoming' ? t('productions.comingSoon') : t('productions.archive')}
        </Button>
        <Button variant="outline" size="icon">
          <Calendar className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Productions = () => {
  const { t } = useLanguage();
  const categories = {
    theatre: [
      {
        id: 'earnest',
        title: 'The Importance of Being Earnest',
        author: 'Oscar Wilde',
        status: 'Past',
        description: 'A brilliant comedy of manners that sparkles with wit and theatrical invention.',
        image: 'https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg',
        dates: '6-15 January 2024',
        venue: 'Tower Theatre',
        duration: '2h 30min (including interval)',
        ticketPrice: '£12-£25'
      },
      {
        id: 'tut-elimden-rovni',
        title: 'Tut Elimden Rovni',
        author: 'Aziz Nesin',
        status: 'Past',
        description: 'A captivating theatrical performance - "hayatı bir cambazlık gösterisi" (life is a juggling show). Starring Ada Burke and Göktay Tosun, directed by Göktay Tosun.',
        image: '/images/tut-elimden-rovni.jpg',
        dates: '27 March - 29 March 2024',
        venue: 'Rosemary Branch Theatre, London',
        duration: '2h (including interval)',
        ticketPrice: 'See Archive'
      },
      {
        id: 'ben-kolay-olmem',
        title: 'Ben Kolay Ölmem',
        titleEn: 'I Shan\'t Perish Easily',
        author: 'Ali Has',
        status: 'Past',
        description: 'Bir cemal süreyya & ahmed arif hikayesi... iki şair, iki yaşam, bir hikaye. A story of Cemal Süreya and Ahmed Arif - two poets, two lives, one story.',
        image: '/images/ben-kolay-olmem.jpg',
        dates: '11-12-13 March 2019',
        venue: 'Arcola Theatre, London',
        duration: '2h',
        ticketPrice: 'See Archive'
      },
      {
        id: 'olum-ve-kiz',
        title: 'Ölüm ve Kız',
        titleEn: 'Death and the Maiden',
        author: 'Ariel Dorfman',
        status: 'Past',
        description: 'A gripping psychological thriller. Directed by Katharina Reinthaller and Barış Celiloğlu. Cast: Barış Celiloğlu, Göktay Tosun, Yener Çelik. English surtitles included.',
        image: '/images/olum-ve-kiz.jpg',
        dates: '04/06/2017, 20:00',
        venue: 'Arcola Theatre, 24 Ashwin Street, London E8 3DL',
        duration: '2h',
        ticketPrice: 'See Archive'
      },
      {
        id: 'ufacik-tefecik-karadut',
        title: 'Ufacık Tefecik Karadut',
        titleEn: 'Tiny Little Black Mulberry',
        author: 'Umut Uğur',
        status: 'Past',
        description: "5'den 75'e herkes için Türkçe Çocuk Oyunu. Written and directed by Umut Uğur, designed by Katerina Theofanopoulou, original music by Muharrem Karaer and Erhan Şakar. A children's play in Turkish for ages 5 to 75.",
        image: '/images/ufacik-tefecik-karadut.jpg',
        dates: 'Past',
        venue: 'Pan Productions',
        duration: 'Children\'s Play',
        ticketPrice: 'See Archive'
      },
      {
        id: 'ferhangi-seyler',
        title: 'Ferhangi Şeyler',
        titleEn: 'Ferhangi Things',
        author: 'Ferhan Şensoy',
        status: 'Past',
        description: 'A legendary one-man show by the iconic Turkish comedian and theatre artist Ferhan Şensoy. An unforgettable evening of humor, satire, and theatrical brilliance.',
        image: '/images/ferhangi-seyler.jpg',
        dates: 'Past',
        venue: 'Pan Productions',
        duration: 'One-Man Show',
        ticketPrice: 'See Archive'
      },
    ],
    art: [
      // Art productions will be added here
    ],
    music: [
      {
        id: 'erkan-ogur-bulent',
        title: 'Erkan Oğur & Bülent Ortaçgil',
        author: '',
        status: 'Past',
        description: 'An intimate concert featuring legendary Turkish musicians Erkan Oğur and Bülent Ortaçgil.',
        image: 'https://www.panproductions.co.uk/wp-content/uploads/2014/10/Pan_Productions_Erkan_Ogur1.jpg',
        dates: 'Past Concert',
        venue: 'Pan Productions',
        duration: 'Concert',
        ticketPrice: 'See Archive'
      },
      {
        id: 'erkan-ogur-ismail',
        title: 'Erkan Oğur & İsmail Hakkı Demircioğlu Konseri',
        author: '',
        status: 'Past',
        description: 'A captivating musical collaboration between legendary Turkish musicians Erkan Oğur and İsmail Hakkı Demircioğlu. "Bütün türküler güzeldir, hayatın ta kendisidir. Salt müzik değildir ve bu ülkenin eline tutulan hazinesidir."',
        image: '/images/erkan-ogur-ismail.jpg',
        dates: '20 March 2011, 18:45',
        venue: 'Union Chapel, Compton Terrace, London N1 2UN',
        duration: 'Concert',
        ticketPrice: '£20-£30 (VIP: £25 at door)'
      },
      {
        id: 'olcay-bayir-fundraiser',
        title: 'Olcay Bayır Fundraiser Concert',
        author: '',
        status: 'Past',
        description: 'A special fundraiser concert featuring the talented Kurdish-Turkish singer Olcay Bayır. Supporting Djanan Turan, Erdogan Bayir, Ece & Debora. Live music and DJ Ece till 1AM.',
        image: '/images/olcay-bayir-fundraiser.jpg',
        dates: 'Friday 21 April, 7:30PM-1:00AM',
        venue: 'Epic Dalston, 13 Stoke Newington Rd N16 8BH',
        duration: 'Concert & DJ Event',
        ticketPrice: '£10 Advance'
      },
    ],
    film: [
      // Film productions will be added here
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return 'bg-accent text-accent-foreground';
      case 'Upcoming':
        return 'bg-primary text-primary-foreground';
      case 'Past':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Combine all productions for structured data
  const allProductions = [...categories.theatre, ...categories.music, ...categories.art, ...categories.film];

  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allProductions.map((prod, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": prod.title,
      "description": prod.description,
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('productions.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Status Tabs - combining all categories */}
        <Tabs defaultValue="past" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="current" className="text-lg font-bold uppercase font-heading">{t('productions.tabCurrent')}</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-lg font-bold uppercase font-heading">{t('productions.tabUpcoming')}</TabsTrigger>
            <TabsTrigger value="past" className="text-lg font-bold uppercase font-heading">{t('productions.tabPast')}</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
              .filter(p => p.status === 'Current').length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
                  .filter(p => p.status === 'Current')
                  .map((production) => (
                    <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} t={t} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('productions.noCurrent')}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
              .filter(p => p.status === 'Upcoming').length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
                  .filter(p => p.status === 'Upcoming')
                  .map((production) => (
                    <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} t={t} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('productions.noUpcoming')}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
              .filter(p => p.status === 'Past').length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
                  .filter(p => p.status === 'Past')
                  .map((production) => (
                    <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} t={t} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('productions.noPast')}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

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

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Productions;