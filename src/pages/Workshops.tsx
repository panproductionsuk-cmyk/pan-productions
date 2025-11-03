import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewsletterSection from '@/components/NewsletterSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Clock, 
  Users, 
  Star, 
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Theater,
  Phone
} from 'lucide-react';

const Workshops = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pastWorkshops = [
    {
      title: "Theatre of the Oppressed - Augusto Boal Workshop",
      instructor: "Dr. Pieter Verstraete (Free University Berlin & University Groningen)",
      date: "27th October 2025, Thursday",
      time: "19:00-21:00",
      location: "Arcola Theatre, Studio 4",
      price: "Free",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: "A Workshop on Augusto Boal's Theatre of the Oppressed and Listening to Others with Insights from the ExiLives Project. Critical Theatre Strategies, Listening Modes and Exercises. This workshop explores Augusto Boal's revolutionary Theatre of the Oppressed methodology, focusing on critical theatre strategies and listening techniques. Participants will engage with practical exercises that combine Boal's transformative approach with contemporary insights from the ExiLives Project, learning how to use theatre as a tool for social change and understanding diverse perspectives.",
      image: "/images/boal-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      title: "Mehmet Ergen ile Tiyatro Deneyimi - Theatre Experience with Mehmet Ergen",
      instructor: "Mehmet Ergen",
      date: "2 Oct, 3 Oct, 7 Oct, 10 Oct 2025",
      time: "19:00-22:00",
      location: "Arcola Theatre, 24 Ashwin St, E8 3DL",
      price: "Contact for pricing",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: "Oyunculuk ve Yaratım - Acting and Creation workshop with renowned theatre director and practitioner Mehmet Ergen. This four-session workshop offers participants a unique opportunity to explore theatre-making techniques, acting methodologies, and creative expression under the guidance of one of the leading figures in contemporary Turkish theatre. Participants will engage in practical exercises, scene work, and collaborative creation processes.",
      image: "/images/mehmet-ergen-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      title: "Philip Arditti ile Oyun Yapma Atölyesi - Devised Theatre with Philip Arditti",
      instructor: "Philip Arditti",
      date: "24 June, 1 July, 8 July, 15 July 2025",
      time: "19:00-21:30",
      location: "Arcola Theatre, 24 Ashwin St, E8 3DL",
      price: "Contact for pricing",
      level: "All Levels",
      spots: "Limited availability",
      status: "Completed",
      category: "THEATER",
      description: "Devised theatre and storytelling workshop. 'I can take any empty space and call it a bare stage. A man walks across this empty space whilst someone else is watching him, and this is all that is needed for an act of theatre to be engaged.' - Peter Brook. Deriving from this mindset, in this workshop we will: Create scenes without the obligation of writing. Explore the power of storytelling with the minimum amount of elements. Experience theatre-making and devised theatre techniques. Create personal stories on stage using stand-up, solo and storytelling formats. Who can join? Those interested in acting. Those who want to create on stage. Those interested in solo performance and storytelling. Those who want to explore theatre. Limited availability.",
      image: "/images/philip-arditti-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      title: "Duygular Bankası Yazı Atölyesi - Emotions Bank Writing Workshop",
      instructor: "Seçil Honeywill (WriteNow Berlin - Writer & Dramaturg)",
      date: "TBA",
      time: "4 hours",
      location: "Pan Productions",
      price: "Contact for pricing",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: "There are countless ways to write about an event, a feeling, or a thought. Strangely enough, sometimes we have to begin from an unexpected place to truly express what's inside us. But where is that unexpected place? The 'Emotions Bank Writing Workshop' is a space free from formulas and templates, designed to take you on a journey through your own personal bank of emotions. It will focus on how to tap into your storytelling instinct, how to generate new ideas from your perceptions and experiences, how to explore different structures, and how to develop your writing skills. The goal of this four-hour workshop is to inspire you, help you overcome your fear of writing, and leave you with a notebook full of creative ideas. We invite you to write, to share your stories, and most importantly, to discover the healing power of writing.",
      image: "/images/writing-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      title: "Oyunculuk Atölyesi - Introduction to Stanislavski's Method of Physical Actions",
      instructor: "Cüneyt Yalaz",
      date: "2nd June 2025, Monday",
      time: "19:00",
      location: "Tower Theatre, 16 Northwold Road - N16 7HR",
      price: "Contact for pricing",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: "This workshop offers an introduction to the 'Method of Physical Actions' developed by Stanislavski, the founder of the most influential acting theory. The Method of Physical Actions is an essential acting approach that should be learned and practiced by both beginners and experienced actors alike. The workshop will also include a discussion and practical session on how this method can be interpreted from a Brechtian perspective. Topics: What was Stanislavski's innovative contribution to acting? What is the Method of Physical Actions? Core concepts like Emotion Memory, Concentration, Given Circumstances, The Magic If, and Emotion-Thought Exchange. How to approach a role and what elements to draw upon when portraying a character. The relationship between dramaturgy and acting style, and Brecht's contribution. Cüneyt Yalaz is a graduate of Boğaziçi University, founding member of BGST, actor, director, playwright, and recipient of the Sadri Alışık Best Actor Award (2016) and Vasıf Öngören Special Award (2018).",
      image: "/images/stanislavski-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: "07944430349"
    },
    {
      title: "Meisner Technique Workshop",
      instructor: "Pan Productions",
      date: "21st July 2024, Sunday",
      time: "11:00 AM - 2:00 PM (3 hours with breaks)",
      location: "Tower Theatre",
      price: "Free",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: "The Meisner technique is an approach to acting developed by American theatre practitioner Sanford Meisner. The goal of the Meisner approach is for the actor to not focus on themselves and instead concentrate on the other actors in the immediate environment. Here and now, without thinking or planning.",
      image: "/images/meisner-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    }
  ];

  const features = [
    {
      icon: Award,
      title: t('workshops.feature1Title'),
      description: t('workshops.feature1Description')
    },
    {
      icon: Users,
      title: t('workshops.feature2Title'),
      description: t('workshops.feature2Description')
    },
    {
      icon: Theater,
      title: t('workshops.feature3Title'),
      description: t('workshops.feature3Description')
    },
    {
      icon: BookOpen,
      title: t('workshops.feature4Title'),
      description: t('workshops.feature4Description')
    }
  ];

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Beginner': return 'default';
      case 'Intermediate': return 'secondary'; 
      case 'Advanced': return 'destructive';
      case 'Children': return 'outline';
      default: return 'outline';
    }
  };

  const workshopsSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Pan Academy",
    "description": "Professional drama school in North London offering acting classes, workshops, and courses for all levels",
    "url": "https://www.panproductions.co.uk/academy/workshops",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Pan Productions"
    },
    "offers": {
      "@type": "Offer",
      "category": "Acting Classes and Workshops"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Acting Workshops & Classes | Pan Academy London"
        description="Pan Academy offers professional acting workshops in North London. From beginners to advanced, learn from industry experts. Theatre, Meisner, Stanislavski methods and more."
        keywords="acting workshops London, drama classes, theatre workshops, Pan Academy, acting school London, drama training, Meisner technique, Stanislavski method"
        url="/academy/workshops"
        structuredData={workshopsSchema}
      />
      
      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-slide-3.jpg" 
            alt="Pan Academy Workshops"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              {t('workshops.badgeTitle')}
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              {t('workshops.heroTitle1')} <span className="text-primary">{t('workshops.heroTitle2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('workshops.heroParagraph1')}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('workshops.heroParagraph2')}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('workshops.heroParagraph3')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  {t('workshops.contactUs')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" style={{ color: '#dae45f' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Workshops */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">{t('workshops.pastWorkshopsTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('workshops.pastWorkshopsSubtitle')}
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="theater" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="theater" className="text-lg font-heading">{t('workshops.tabTheater')}</TabsTrigger>
              <TabsTrigger value="music" className="text-lg font-heading">{t('workshops.tabMusic')}</TabsTrigger>
              <TabsTrigger value="art" className="text-lg font-heading">{t('workshops.tabArt')}</TabsTrigger>
              <TabsTrigger value="film" className="text-lg font-heading">{t('workshops.tabFilm')}</TabsTrigger>
            </TabsList>

            {/* Theater Tab */}
            <TabsContent value="theater">
              <div className="grid md:grid-cols-2 gap-8">
                {pastWorkshops.filter(w => w.category === 'THEATER').map((workshop, index) => (
                  <Card key={index} className="group overflow-hidden cursor-pointer" onClick={() => setSelectedImage(workshop.image)}>
                    <div className="relative h-[500px] overflow-hidden">
                      {/* Blurred background layer */}
                      <div className="absolute inset-0">
                        <img 
                          src={workshop.image} 
                          alt=""
                          className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                        />
                      </div>
                      
                      {/* Main image layer */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <img 
                          src={workshop.image} 
                          alt={workshop.title}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      
                      {/* Status Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                        <Badge className={
                          workshop.status === "Upcoming" 
                            ? "bg-pink-500/80 hover:bg-pink-600/80 text-white" 
                            : workshop.status === "Completed"
                            ? "bg-lime-400/80 hover:bg-lime-500/80 text-black"
                            : "bg-lime-300/40 text-gray-600"
                        }>
                          {workshop.status}
                        </Badge>
                        {workshop.price === "Free" && (
                          <Badge className="bg-pink-500/70 hover:bg-pink-600/70 text-white">
                            Free Workshop
                          </Badge>
                        )}
                        <Badge variant={getLevelBadgeVariant(workshop.level)} className="opacity-80">
                          {workshop.level}
                        </Badge>
                      </div>
                </div>
                
                <CardContent className="p-6">
                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {workshop.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t('workshops.instructor')}: {workshop.instructor}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {workshop.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{workshop.location}</span>
                    </div>
                    {workshop.spots && (
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        <span>{workshop.spots} spots available</span>
                      </div>
                    )}
                    {workshop.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        <span>{workshop.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="spotlight" 
                      className="flex-1"
                      disabled
                    >
                      {t('workshops.completed')}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
              </div>
            </TabsContent>

            {/* Music Tab */}
            <TabsContent value="music">
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('workshops.noMusic')}</p>
              </div>
            </TabsContent>

            {/* Art Tab */}
            <TabsContent value="art">
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('workshops.noArt')}</p>
              </div>
            </TabsContent>

            {/* Film Tab */}
            <TabsContent value="film">
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t('workshops.noFilm')}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0">
          <div className="relative">
            <img 
              src={selectedImage || ''} 
              alt="Workshop Poster"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-foreground">
            {t('workshops.ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('workshops.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8">
                {t('workshops.contactUs')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-8">
                {t('workshops.requestLesson')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Workshops;