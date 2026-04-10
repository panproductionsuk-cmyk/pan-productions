import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Clock, 
  Users, 
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Theater,
  Phone,
  ArrowRight
} from 'lucide-react';
import { formatWorkshopDate } from '@/lib/dateFormat';

const Workshops = () => {
  const { t, language } = useLanguage();
  const pastWorkshops = [
    {
      id: 'boal-workshop',
      title: "Theatre of the Oppressed - Augusto Boal Workshop",
      instructor: "Dr. Pieter Verstraete (Free University Berlin & University Groningen)",
      date: "27 October 2025",
      time: "19:00-21:00",
      location: "Arcola Theatre, Studio 4",
      price: "Free",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATRE",
      description: {
        EN: "A Workshop on Augusto Boal's Theatre of the Oppressed and Listening to Others with Insights from the ExiLives Project. Critical Theatre Strategies, Listening Modes and Exercises. This workshop explores Augusto Boal's revolutionary Theatre of the Oppressed methodology, focusing on critical theatre strategies and listening techniques. Participants will engage with practical exercises that combine Boal's transformative approach with contemporary insights from the ExiLives Project, learning how to use theatre as a tool for social change and understanding diverse perspectives.",
        TR: "Augusto Boal’ın Ezilenlerin Tiyatrosu ve ExiLives Projesi’nden ilhamla başkalarını dinleme üzerine bir atölye. Eleştirel tiyatro stratejileri, dinleme biçimleri ve uygulamalar. Katılımcılar, Boal’ın dönüştürücü yaklaşımını çağdaş bakış açılarıyla birleştirerek tiyatroyu toplumsal değişim ve farklı bakış açılarını anlamak için bir araç olarak kullanmayı deneyimleyecek."
      },
      image: "/images/boal-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      id: 'mehmet-ergen-workshop',
      title: "Mehmet Ergen ile Tiyatro Deneyimi - Theatre Experience with Mehmet Ergen",
      instructor: "Mehmet Ergen",
      date: "2,3,7,10 October 2024",
      time: "19:00-22:00",
      location: "Arcola Theatre, 24 Ashwin St, E8 3DL",
      price: "Contact for pricing",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: {
        EN: "Acting and Creation workshop with renowned theatre director and practitioner Mehmet Ergen. This four-session workshop offers participants a unique opportunity to explore theatre-making techniques, acting methodologies, and creative expression under the guidance of one of the leading figures in contemporary Turkish theatre. Participants will engage in practical exercises, scene work, and collaborative creation processes.",
        TR: "Oyunculuk ve Yaratım: Mehmet Ergen ile dört oturumluk atölye. Katılımcılar, çağdaş Türk tiyatrosunun önde gelen isimlerinden biriyle sahneleme teknikleri, oyunculuk yöntemleri ve yaratıcı ifade üzerine çalışacak; uygulamalı egzersizler, sahne çalışmaları ve kolektif yaratım süreçleri deneyimleyecek."
      },
      image: "/images/mehmet-ergen-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      id: 'philip-arditti-workshop',
      title: "Philip Arditti ile Oyun Yapma Atölyesi - Devised Theatre with Philip Arditti",
      instructor: "Philip Arditti",
      date: "24 June, 1, 8, 15 July 2025",
      time: "19:00-21:30",
      location: "Arcola Theatre, 24 Ashwin St, E8 3DL",
      price: "Contact for pricing",
      level: "All Levels",
      spots: "Limited availability",
      status: "Completed",
      category: "THEATER",
      description: {
        EN: "Devised theatre and storytelling workshop. 'I can take any empty space and call it a bare stage. A man walks across this empty space whilst someone else is watching him, and this is all that is needed for an act of theatre to be engaged.' - Peter Brook. Deriving from this mindset, in this workshop we will: Create scenes without the obligation of writing. Explore the power of storytelling with the minimum amount of elements. Experience theatre-making and devised theatre techniques. Create personal stories on stage using stand-up, solo and storytelling formats. Who can join? Those interested in acting. Those who want to create on stage. Those interested in solo performance and storytelling. Those who want to explore theatre. Limited availability.",
        TR: "Doğaçlama tiyatro ve hikaye anlatıcılığı atölyesi. Peter Brook’un ‘Boş bir sahneye yürüyen bir adam ve onu izleyen biriyle tiyatro başlar’ yaklaşımından yola çıkarak; yazılı metne bağlı kalmadan sahne yaratma, en az ögeyle hikaye anlatma, tiyatro yapma ve doğaçlama teknikleri, sahnede kişisel hikaye oluşturma, stand-up ve solo performans gibi biçimler deneyimlenecek. Katılım: Oyunculuğa ilgi duyanlar, sahnede üretmek isteyenler, solo performans ve hikaye anlatıcılığına ilgi duyanlar, tiyatroyu keşfetmek isteyenler. Kontenjan sınırlı."
      },
      image: "/images/philip-arditti-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      id: 'writing-workshop',
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
      description: {
        EN: "There are countless ways to write about an event, a feeling, or a thought. Strangely enough, sometimes we have to begin from an unexpected place to truly express what's inside us. But where is that unexpected place? The 'Emotions Bank Writing Workshop' is a space free from formulas and templates, designed to take you on a journey through your own personal bank of emotions. It will focus on how to tap into your storytelling instinct, how to generate new ideas from your perceptions and experiences, how to explore different structures, and how to develop your writing skills. The goal of this four-hour workshop is to inspire you, help you overcome your fear of writing, and leave you with a notebook full of creative ideas. We invite you to write, to share your stories, and most importantly, to discover the healing power of writing.",
        TR: "Bir olayı, duyguyu ya da düşünceyi yazmanın sayısız yolu vardır. Bazen içimizdekini gerçekten ifade etmek için beklenmedik bir yerden başlamak gerekir. Peki o yer neresi? Duygular Bankası Yazı Atölyesi, formüllerden ve kalıplardan uzak, kendi duygusal bankanızda bir yolculuğa çıkmanız için tasarlandı. Hikaye anlatma içgüdüsünü ortaya çıkarmak, algı ve deneyimlerden yeni fikirler üretmek, farklı yapı ve teknikleri keşfetmek ve yazma becerilerini geliştirmek üzerine odaklanır. Dört saatlik bu atölyenin amacı, ilham vermek, yazma korkusunu aşmanıza yardımcı olmak ve defterinizi yaratıcı fikirlerle doldurmanızı sağlamak. Yazmaya, hikayelerinizi paylaşmaya ve yazının iyileştirici gücünü keşfetmeye davetlisiniz."
      },
      image: "/images/writing-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    {
      id: 'stanislavski-workshop',
      title: "Oyunculuk Atölyesi - Introduction to Stanislavski's Method of Physical Actions",
      instructor: "Cüneyt Yalaz",
      date: "2 June 2025",
      time: "19:00",
      location: "Tower Theatre, 16 Northwold Road - N16 7HR",
      price: "Contact for pricing",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: {
        EN: "This workshop offers an introduction to the 'Method of Physical Actions' developed by Stanislavski, the founder of the most influential acting theory. The Method of Physical Actions is an essential acting approach that should be learned and practiced by both beginners and experienced actors alike. The workshop will also include a discussion and practical session on how this method can be interpreted from a Brechtian perspective. Topics: What was Stanislavski's innovative contribution to acting? What is the Method of Physical Actions? Core concepts like Emotion Memory, Concentration, Given Circumstances, The Magic If, and Emotion-Thought Exchange. How to approach a role and what elements to draw upon when portraying a character. The relationship between dramaturgy and acting style, and Brecht's contribution. Cüneyt Yalaz is a graduate of Boğaziçi University, founding member of BGST, actor, director, playwright, and recipient of the Sadri Alışık Best Actor Award (2016) and Vasıf Öngören Special Award (2018).",
        TR: "Stanislavski’nin geliştirdiği Fiziksel Eylemler Yöntemi’ne giriş niteliğinde bir atölye. Bu yöntem, hem yeni başlayanlar hem de deneyimli oyuncular için temel bir oyunculuk yaklaşımıdır. Atölyede ayrıca bu yöntemin Brechtyen bir bakış açısıyla nasıl yorumlanabileceği de tartışılacak ve uygulamalı olarak çalışılacaktır. Konular: Stanislavski’nin oyunculuğa getirdiği yenilikler, Fiziksel Eylemler Yöntemi’nin temel kavramları (Duygu Belleği, Konsantrasyon, Verili Durumlar, Sihirli Eğer, Duygu-Düşünce Alışverişi), bir role yaklaşım ve karakter yaratımında başvurulacak unsurlar, dramaturji ve oyunculuk tarzı ilişkisi, Brecht’in katkısı. Cüneyt Yalaz: Boğaziçi Üniversitesi mezunu, BGST kurucu üyesi, oyuncu, yönetmen, oyun yazarı, Sadri Alışık En İyi Erkek Oyuncu Ödülü (2016) ve Vasıf Öngören Özel Ödülü (2018) sahibi."
      },
      image: "/images/stanislavski-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: "07944430349"
    },
    {
      id: 'meisner-workshop',
      title: "Meisner Technique Workshop",
      instructor: "Pan Productions",
      date: "21 July 2024",
      time: "11:00 AM - 2:00 PM (3 hours with breaks)",
      location: "Tower Theatre",
      price: "Free",
      level: "All Levels",
      spots: null,
      status: "Completed",
      category: "THEATER",
      description: {
        EN: "The Meisner technique is an approach to acting developed by American theatre practitioner Sanford Meisner. The goal of the Meisner approach is for the actor to not focus on themselves and instead concentrate on the other actors in the immediate environment. Here and now, without thinking or planning.",
        TR: "Meisner tekniği, Amerikalı tiyatrocu Sanford Meisner tarafından geliştirilen bir oyunculuk yaklaşımıdır. Bu yöntemde amaç, oyuncunun kendisine odaklanmak yerine, anda ve karşısındaki oyuncuya odaklanmasıdır; düşünmeden, planlamadan, burada ve şimdi."
      },
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
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Pan Academy is a subdivision of Pan Productions, where we apply our passion for performing arts to the education of those who are equally passionate. We offer a varied range of acting classes designed to suit a mixture of participants with an emphasis on participants speaking English as a second language or are new to theatre.
            </p>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether you're looking to step into a foreign practice for the first time or you want to enhance your previous knowledge as a seasoned performer, we have a workshop for you. Our evening, weekend and part-time workshops are structured to fit around your busy schedule. Our expert instructors provide valuable feedback for your craft in intimate groups where you will get specialised attention to take you a step further. Pan Academy is here to take you to the next step, wherever you are in your journey.
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
          <Tabs defaultValue="theatre" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="theatre" className="text-lg font-heading">{t('workshops.tabTheater')}</TabsTrigger>
              <TabsTrigger value="music" className="text-lg font-heading">{t('workshops.tabMusic')}</TabsTrigger>
              <TabsTrigger value="art" className="text-lg font-heading">{t('workshops.tabArt')}</TabsTrigger>
              <TabsTrigger value="film" className="text-lg font-heading">{t('workshops.tabFilm')}</TabsTrigger>
            </TabsList>

            {/* Theatre Tab */}
            <TabsContent value="theatre">
              <div className="grid md:grid-cols-2 gap-8">
                {pastWorkshops.map((workshop, index) => (
                  <Link key={index} to={`/academy/workshops/${workshop.id}`}>
                    <Card className="group overflow-hidden cursor-pointer h-full">
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
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {typeof workshop.description === 'string' ? workshop.description : (language === 'EN' ? workshop.description.EN : workshop.description.TR)}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{formatWorkshopDate(workshop.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{workshop.location}</span>
                    </div>
                    {workshop.spots && (
                      <div className="flex items-center text-sm text-foreground">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        <span>{workshop.spots} spots available</span>
                      </div>
                    )}
                    {workshop.phone && (
                      <div className="flex items-center text-sm text-foreground">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        <span>{workshop.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="spotlight" 
                      className="flex-1"
                    >
                      {t('workshops.viewDetails') || 'View Details'}
                    </Button>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
    </div>
  );
};

export default Workshops;
