import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

const Productions = () => {
  const productions = [
    {
      id: 'earnest',
      title: 'The Importance of Being Earnest',
      author: 'Oscar Wilde',
      status: 'Current',
      description: 'A brilliant comedy of manners that sparkles with wit and theatrical invention.',
      image: 'https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg',
      dates: '6-15 January 2024',
      venue: 'Tower Theatre',
      duration: '2h 30min (including interval)',
      ticketPrice: '£12-£25'
    },
    {
      id: 'hamlet',
      title: 'Hamlet',
      author: 'William Shakespeare',
      status: 'Upcoming',
      description: 'Shakespeare\'s masterpiece of revenge, madness, and moral complexity.',
      image: 'https://via.placeholder.com/400x600/1a1a1a/fff?text=HAMLET',
      dates: 'March 2024',
      venue: 'TBA',
      duration: '3h (including intervals)',
      ticketPrice: 'From £15'
    },
    {
      id: 'midsummer',
      title: 'A Midsummer Night\'s Dream',
      author: 'William Shakespeare',
      status: 'Past',
      description: 'A magical comedy of love, mischief, and transformation.',
      image: 'https://via.placeholder.com/400x600/2a4a2a/fff?text=MIDSUMMER',
      dates: 'September 2023',
      venue: 'Garden Theatre',
      duration: '2h 15min',
      ticketPrice: '£10-£20'
    },
  ];

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
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Our Productions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our acclaimed theatrical productions, from timeless classics 
            to contemporary works, all brought to life by our talented cast and crew.
          </p>
        </div>

        {/* Productions Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {productions.map((production) => (
            <Card key={production.id} className="production-card group overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={production.image}
                  alt={production.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(production.status)}>
                    {production.status}
                  </Badge>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">
                    {production.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    by {production.author}
                  </p>
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
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 rounded-lg bg-card/50">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Want to be part of our next production?
          </h2>
          <p className="text-muted-foreground mb-6">
            Send us your acting CV and get notified when we have an audition that fits your casting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="spotlight" size="lg">
              Submit Your CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productions;