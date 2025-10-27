import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

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
const ProductionCard = ({ production, getStatusColor }: { production: Production; getStatusColor: (status: string) => string }) => (
  <Card className="production-card group overflow-hidden">
    <div className="relative h-80 overflow-hidden">
      <img
        src={production.image}
        alt={production.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent transition-colors" />
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <Badge className={getStatusColor(production.status)}>
          {production.status}
        </Badge>
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
          {production.title}
        </h3>
        {production.author && (
          <p className="text-muted-foreground text-sm">
            by {production.author}
          </p>
        )}
      </div>
    </div>

    <CardContent className="p-6">
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
          {production.status === 'Current' ? 'Buy Tickets' : 
           production.status === 'Upcoming' ? 'Coming Soon' : 'Archive'}
        </Button>
        <Button variant="outline" size="icon">
          <Calendar className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Productions = () => {
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
        id: 'alper-yine-hamileyim',
        title: 'Alper Yine Hamileyim!',
        author: '',
        status: 'Past',
        description: 'An acclaimed Turkish theatrical production.',
        image: 'https://www.panproductions.co.uk/file/2023/10/Hamileyim.jpg',
        dates: '2023',
        venue: 'Pan Productions',
        duration: 'TBA',
        ticketPrice: 'See Archive'
      },
      {
        id: 'seviyorum-ulenn',
        title: 'Seviyorum Ulenn!',
        author: '',
        status: 'Past',
        description: 'A captivating Turkish theatrical performance.',
        image: 'https://www.panproductions.co.uk/file/2023/05/SEVIYOM-ULEN.jpg',
        dates: '2023',
        venue: 'Pan Productions',
        duration: 'TBA',
        ticketPrice: 'See Archive'
      },
      {
        id: 'tut-elimden-rovni',
        title: 'Tut Elimden Rovni',
        author: '',
        status: 'Past',
        description: 'An engaging Turkish theatrical production.',
        image: 'https://www.panproductions.co.uk/file/2022/11/TUU-ELIMDEN-ROVNI2.jpg',
        dates: '2022',
        venue: 'Pan Productions',
        duration: 'TBA',
        ticketPrice: 'See Archive'
      },
      {
        id: 'ben-kolay-olmem',
        title: 'Ben Kolay Ölmem',
        titleEn: 'I Shan\'t Perish Easily',
        author: '',
        status: 'Past',
        description: 'A powerful Turkish theatrical experience.',
        image: 'https://www.panproductions.co.uk/file/2022/05/Ben-Kolay-Olmem.jpg',
        dates: '2022',
        venue: 'Pan Productions',
        duration: 'TBA',
        ticketPrice: 'See Archive'
      },
      {
        id: 'olum-ve-kiz',
        title: 'Ölüm ve Kız',
        titleEn: 'Death and the Maiden',
        author: '',
        status: 'Past',
        description: 'A gripping Turkish theatrical performance.',
        image: 'https://www.panproductions.co.uk/file/2021/10/DEATH-AND-THE-MAIDEN.jpg',
        dates: '2021',
        venue: 'Arcola Theatre',
        duration: 'TBA',
        ticketPrice: 'See Archive'
      },
      {
        id: 'tears-of-azrail',
        title: 'Azrail\'in Gözyaşları',
        titleEn: 'Tears of Azrail',
        author: '',
        status: 'Past',
        description: 'An unforgettable Turkish theatrical production.',
        image: 'https://www.panproductions.co.uk/file/2020/11/AZRAILIN-GOZYASLARI.jpg',
        dates: '2020',
        venue: 'Pan Productions',
        duration: 'TBA',
        ticketPrice: 'See Archive'
      },
    ],
    art: [
      // Art productions will be added here
    ],
    music: [
      {
        id: 'mehmet-erdem',
        title: 'Mehmet Erdem',
        author: '',
        status: 'Past',
        description: 'A memorable concert experience with renowned Turkish artist Mehmet Erdem.',
        image: 'https://www.panproductions.co.uk/wp-content/uploads/2014/10/Pan_Productions_Mehmet_Erdem_London.jpg',
        dates: 'Past Concert',
        venue: 'Pan Productions',
        duration: 'Concert',
        ticketPrice: 'See Archive'
      },
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
        title: 'Erkan Oğur & İsmail Hakkı Demircioğlu',
        author: '',
        status: 'Past',
        description: 'A captivating musical collaboration between Erkan Oğur and İsmail Hakkı Demircioğlu.',
        image: 'https://www.panproductions.co.uk/wp-content/uploads/2014/10/Pan_Productions_Erkan_Ogur2.jpg',
        dates: 'Past Concert',
        venue: 'Pan Productions',
        duration: 'Concert',
        ticketPrice: 'See Archive'
      },
      {
        id: 'olcay-bayir',
        title: 'Olcay Bayır Fundraiser Concert',
        author: '',
        status: 'Past',
        description: 'A special fundraiser concert featuring the talented Olcay Bayır.',
        image: 'https://www.panproductions.co.uk/wp-content/uploads/2014/10/Ekran-Resmi-2017-04-06-13.22.18.png',
        dates: 'Past Concert',
        venue: 'Pan Productions',
        duration: 'Concert',
        ticketPrice: 'See Archive'
      },
      {
        id: 'duman',
        title: 'Duman',
        author: '',
        status: 'Past',
        description: 'An electrifying concert by the iconic Turkish rock band Duman.',
        image: 'https://www.panproductions.co.uk/wp-content/uploads/2014/10/Pan_Productions_Duman_London.jpg',
        dates: 'Past Concert',
        venue: 'Pan Productions',
        duration: 'Concert',
        ticketPrice: 'See Archive'
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

  return (
    <div className="min-h-screen">
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
              Our Productions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our acclaimed theatrical productions, from timeless classics 
              to contemporary works, all brought to life by our talented cast and crew.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

        {/* Theatre Category */}
        {categories.theatre.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-4xl font-bold mb-8 flex items-center">
              <span className="text-primary">THEATER</span>
            </h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {categories.theatre.map((production) => (
                <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} />
              ))}
            </div>
          </div>
        )}

        {/* Art Category */}
        {categories.art.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-4xl font-bold mb-8 flex items-center">
              <span className="text-primary">ART</span>
            </h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {categories.art.map((production) => (
                <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} />
              ))}
            </div>
          </div>
        )}

        {/* Music Category */}
        {categories.music.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-4xl font-bold mb-8 flex items-center">
              <span className="text-primary">MUSIC</span>
            </h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {categories.music.map((production) => (
                <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} />
              ))}
            </div>
          </div>
        )}

        {/* Film Category */}
        {categories.film.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-4xl font-bold mb-8 flex items-center">
              <span className="text-primary">FILM</span>
            </h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {categories.film.map((production) => (
                <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 rounded-lg bg-card/50">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Want to be part of our next production?
          </h2>
          <p className="text-muted-foreground mb-6">
            Send us your acting CV and get notified when we have an audition that fits your casting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="spotlight" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productions;