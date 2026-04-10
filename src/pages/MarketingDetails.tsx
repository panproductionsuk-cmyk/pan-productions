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
import { Calendar, MapPin, Clock, ArrowLeft, Megaphone } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketingProject {
  id: string;
  title: string;
  titleEn?: string;
  status: string;
  description: { EN: string; TR: string };
  image: string;
  dates: string;
  venue: string;
  category: string;
  gallery?: string[];
  services?: string[];
}

// Marketing projects data
const allMarketingProjects: MarketingProject[] = [
  {
    id: 'jem-candlelit-concert',
    title: 'JEM: Intimate Candlelit Concert',
    status: 'Completed',
    description: {
      EN: 'Pan Productions provided comprehensive PR and marketing support for JEM\'s intimate candlelit concert at St. Pancras Old Church. Our campaign included social media management, press outreach, and promotional content creation that helped create buzz around this ethereal evening of music. The event sold out, with audiences captivated by JEM\'s poetic melodies in the historic church setting.',
      TR: 'Pan Productions, JEM\'in St. Pancras Old Church\'taki samimi mum ışığında konser için kapsamlı PR ve pazarlama desteği sağladı. Kampanyamız sosyal medya yönetimi, basın iletişimi ve bu eterik müzik akşamı için heyecan yaratan tanıtım içeriği oluşturmayı içeriyordu. Etkinlik tükendi, seyirciler tarihi kilise ortamında JEM\'in şiirsel melodileriyle büyülendi.'
    },
    image: '/images/jem-concert.jpg',
    dates: 'December 8, 2025',
    venue: 'St. Pancras Old Church, London',
    category: 'Concert',
    gallery: ['/images/jem-concert.jpg'],
    services: ['Social Media Management', 'Press Outreach', 'Content Creation', 'Event Promotion']
  },
  {
    id: 'english-kings-killing-foreigners',
    title: 'English Kings Killing Foreigners',
    status: 'Completed',
    description: {
      EN: 'A powerful theatrical production that Pan Productions supported through strategic PR and marketing. Our campaign focused on highlighting the provocative themes and exceptional performances, securing coverage in major arts publications and building anticipation through targeted social media campaigns. The production received critical acclaim and strong audience turnout.',
      TR: 'Pan Productions\'ın stratejik PR ve pazarlama ile desteklediği güçlü bir tiyatro prodüksiyonu. Kampanyamız, kışkırtıcı temaları ve olağanüstü performansları öne çıkarmaya, büyük sanat yayınlarında yer almaya ve hedefli sosyal medya kampanyaları aracılığıyla beklenti oluşturmaya odaklandı. Prodüksiyon eleştirmenlerden övgü aldı ve güçlü seyirci katılımı sağladı.'
    },
    image: '/images/english-kings-killing-foreigners.jpg',
    dates: '2024',
    venue: 'London Theatre',
    category: 'Theatre',
    gallery: ['/images/english-kings-killing-foreigners.jpg'],
    services: ['PR Campaign', 'Media Relations', 'Social Media Strategy', 'Press Coverage']
  },
  {
    id: 'women-who-blow-on-knots',
    title: 'Women Who Blow on Knots',
    status: 'Completed',
    description: {
      EN: 'Pan Productions delivered a comprehensive marketing campaign for this evocative performance piece. Our approach combined traditional PR with digital marketing strategies, creating compelling visual content and securing interviews with the creative team. The campaign successfully reached diverse audiences interested in experimental and culturally significant theatre.',
      TR: 'Pan Productions, bu etkileyici performans eseri için kapsamlı bir pazarlama kampanyası sundu. Yaklaşımımız geleneksel PR\'ı dijital pazarlama stratejileriyle birleştirdi, etkileyici görsel içerik oluşturdu ve yaratıcı ekiple röportajlar sağladı. Kampanya, deneysel ve kültürel açıdan önemli tiyatroyla ilgilenen çeşitli kitlelere başarıyla ulaştı.'
    },
    image: '/images/women-who-blow-on-knots.jpg',
    dates: '2023',
    venue: 'London',
    category: 'Theatre',
    gallery: ['/images/women-who-blow-on-knots.jpg'],
    services: ['Marketing Campaign', 'Visual Content', 'Digital Marketing', 'Audience Development']
  }
];

const MarketingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  
  const project = allMarketingProjects.find((p) => p.id === id);
  
  if (!project) {
    return <Navigate to="/marketing" replace />;
  }

  const description = language === 'EN' ? project.description.EN : project.description.TR;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": description,
    "creator": {
      "@type": "Organization",
      "name": "Pan Productions",
      "url": "https://www.panproductions.co.uk"
    },
    "image": project.image
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${project.title} | PR & Marketing | Pan Productions`}
        description={description.substring(0, 160)}
        structuredData={projectSchema}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/hero-slide-2.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <Link to="/marketing" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'EN' ? 'Back to PR & Marketing' : 'PR & Pazarlamaya Dön'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <Badge className="bg-primary text-primary-foreground mb-4">
              {project.status}
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            
            {project.titleEn && project.title !== project.titleEn && (
              <p className="text-xl text-muted-foreground mb-4">
                {project.titleEn}
              </p>
            )}

            {/* Project Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Date' : 'Tarih'}</p>
                      <p className="font-medium">{project.dates}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Venue' : 'Mekan'}</p>
                      <p className="font-medium">{project.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Megaphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Category' : 'Kategori'}</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Provided */}
            {project.services && project.services.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-4">
                    {language === 'EN' ? 'Services Provided' : 'Sağlanan Hizmetler'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  {language === 'EN' ? 'Work With Us' : 'Bizimle Çalışın'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Description & Gallery */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  {language === 'EN' ? 'About This Project' : 'Bu Proje Hakkında'}
                </h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 1 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-4">
                    {language === 'EN' ? 'Gallery' : 'Galeri'}
                  </h3>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.gallery.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-video overflow-hidden rounded-lg">
                            <img
                              src={image}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/images/hero-slide-2.jpg';
                              }}
                            />
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

      {/* CTA Section */}
      <section className="py-20 mt-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
            {language === 'EN' ? 'Ready to Promote Your Project?' : 'Projenizi Tanıtmaya Hazır mısınız?'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'EN' 
              ? 'Let us help you reach your audience with our bespoke PR and marketing services.'
              : 'Özel PR ve pazarlama hizmetlerimizle kitlenize ulaşmanıza yardımcı olalım.'}
          </p>
          <Link to="/contact">
            <Button size="lg" className="px-8">
              {language === 'EN' ? 'Get In Touch' : 'İletişime Geçin'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MarketingDetails;
