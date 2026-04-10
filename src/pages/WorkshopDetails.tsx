import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  Phone,
  Mail,
  Star
} from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  location: string;
  price: string;
  level: string;
  spots: string | null;
  status: string;
  category: string;
  description: {
    EN: string;
    TR: string;
  };
  image: string;
  contact: string;
  phone: string | null;
}

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Workshop data - in a real app, this would come from an API or database
  const workshops: Record<string, Workshop> = {
    'boal-workshop': {
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
        EN: "A Workshop on Augusto Boal's Theatre of the Oppressed and Listening to Others with Insights from the ExiLives Project. Critical Theatre Strategies, Listening Modes and Exercises.\n\nThis workshop explores Augusto Boal's revolutionary Theatre of the Oppressed methodology, focusing on critical theatre strategies and listening techniques. Participants will engage with practical exercises that combine Boal's transformative approach with contemporary insights from the ExiLives Project, learning how to use theatre as a tool for social change and understanding diverse perspectives.\n\nThe workshop is designed to be accessible to all levels of experience, from complete beginners to seasoned practitioners. Through a series of interactive exercises and group discussions, participants will discover how theatre can become a powerful instrument for dialogue, empathy, and social transformation.",
        TR: "Augusto Boal'ın Ezilenlerin Tiyatrosu ve ExiLives Projesi'nden ilhamla başkalarını dinleme üzerine bir atölye. Eleştirel tiyatro stratejileri, dinleme biçimleri ve uygulamalar.\n\nKatılımcılar, Boal'ın dönüştürücü yaklaşımını çağdaş bakış açılarıyla birleştirerek tiyatroyu toplumsal değişim ve farklı bakış açılarını anlamak için bir araç olarak kullanmayı deneyimleyecek.\n\nAtölye, tam yeni başlayanlardan deneyimli uygulayıcılara kadar tüm seviyelere açıktır. Etkileşimli egzersizler ve grup tartışmaları aracılığıyla katılımcılar, tiyatronun diyalog, empati ve toplumsal dönüşüm için güçlü bir araç nasıl olabileceğini keşfedecek."
      },
      image: "/images/boal-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    'mehmet-ergen-workshop': {
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
        EN: "Acting and Creation workshop with renowned theatre director and practitioner Mehmet Ergen.\n\nThis four-session workshop offers participants a unique opportunity to explore theatre-making techniques, acting methodologies, and creative expression under the guidance of one of the leading figures in contemporary Turkish theatre. Participants will engage in practical exercises, scene work, and collaborative creation processes.\n\nMehmet Ergen brings decades of experience in international theatre, having worked across Europe and Turkey. His approach combines traditional acting techniques with innovative contemporary methods, creating a rich learning environment for participants of all backgrounds.",
        TR: "Oyunculuk ve Yaratım: Mehmet Ergen ile dört oturumluk atölye.\n\nKatılımcılar, çağdaş Türk tiyatrosunun önde gelen isimlerinden biriyle sahneleme teknikleri, oyunculuk yöntemleri ve yaratıcı ifade üzerine çalışacak; uygulamalı egzersizler, sahne çalışmaları ve kolektif yaratım süreçleri deneyimleyecek.\n\nMehmet Ergen, Avrupa ve Türkiye'de çalışmış, onlarca yıllık uluslararası tiyatro deneyimine sahiptir. Yaklaşımı, geleneksel oyunculuk tekniklerini yenilikçi çağdaş yöntemlerle birleştirerek her geçmişten katılımcı için zengin bir öğrenme ortamı yaratır."
      },
      image: "/images/mehmet-ergen-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    'philip-arditti-workshop': {
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
        EN: "Devised theatre and storytelling workshop.\n\n'I can take any empty space and call it a bare stage. A man walks across this empty space whilst someone else is watching him, and this is all that is needed for an act of theatre to be engaged.' - Peter Brook\n\nDeriving from this mindset, in this workshop we will:\n• Create scenes without the obligation of writing\n• Explore the power of storytelling with the minimum amount of elements\n• Experience theatre-making and devised theatre techniques\n• Create personal stories on stage using stand-up, solo and storytelling formats\n\nWho can join?\n• Those interested in acting\n• Those who want to create on stage\n• Those interested in solo performance and storytelling\n• Those who want to explore theatre\n\nLimited availability.",
        TR: "Doğaçlama tiyatro ve hikaye anlatıcılığı atölyesi.\n\nPeter Brook'un 'Boş bir sahneye yürüyen bir adam ve onu izleyen biriyle tiyatro başlar' yaklaşımından yola çıkarak:\n\n• Yazılı metne bağlı kalmadan sahne yaratma\n• En az ögeyle hikaye anlatma\n• Tiyatro yapma ve doğaçlama teknikleri\n• Sahnede kişisel hikaye oluşturma, stand-up ve solo performans gibi biçimler deneyimlenecek\n\nKatılım:\n• Oyunculuğa ilgi duyanlar\n• Sahnede üretmek isteyenler\n• Solo performans ve hikaye anlatıcılığına ilgi duyanlar\n• Tiyatroyu keşfetmek isteyenler\n\nKontenjan sınırlı."
      },
      image: "/images/philip-arditti-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    'writing-workshop': {
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
        EN: "There are countless ways to write about an event, a feeling, or a thought. Strangely enough, sometimes we have to begin from an unexpected place to truly express what's inside us. But where is that unexpected place?\n\nThe 'Emotions Bank Writing Workshop' is a space free from formulas and templates, designed to take you on a journey through your own personal bank of emotions. It will focus on how to tap into your storytelling instinct, how to generate new ideas from your perceptions and experiences, how to explore different structures, and how to develop your writing skills.\n\nThe goal of this four-hour workshop is to inspire you, help you overcome your fear of writing, and leave you with a notebook full of creative ideas. We invite you to write, to share your stories, and most importantly, to discover the healing power of writing.",
        TR: "Bir olayı, duyguyu ya da düşünceyi yazmanın sayısız yolu vardır. Bazen içimizdekini gerçekten ifade etmek için beklenmedik bir yerden başlamak gerekir. Peki o yer neresi?\n\nDuygular Bankası Yazı Atölyesi, formüllerden ve kalıplardan uzak, kendi duygusal bankanızda bir yolculuğa çıkmanız için tasarlandı. Hikaye anlatma içgüdüsünü ortaya çıkarmak, algı ve deneyimlerden yeni fikirler üretmek, farklı yapı ve teknikleri keşfetmek ve yazma becerilerini geliştirmek üzerine odaklanır.\n\nDört saatlik bu atölyenin amacı, ilham vermek, yazma korkusunu aşmanıza yardımcı olmak ve defterinizi yaratıcı fikirlerle doldurmanızı sağlamak. Yazmaya, hikayelerinizi paylaşmaya ve yazının iyileştirici gücünü keşfetmeye davetlisiniz."
      },
      image: "/images/writing-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    },
    'stanislavski-workshop': {
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
        EN: "This workshop offers an introduction to the 'Method of Physical Actions' developed by Stanislavski, the founder of the most influential acting theory.\n\nThe Method of Physical Actions is an essential acting approach that should be learned and practiced by both beginners and experienced actors alike. The workshop will also include a discussion and practical session on how this method can be interpreted from a Brechtian perspective.\n\nTopics:\n• What was Stanislavski's innovative contribution to acting?\n• What is the Method of Physical Actions?\n• Core concepts like Emotion Memory, Concentration, Given Circumstances, The Magic If, and Emotion-Thought Exchange\n• How to approach a role and what elements to draw upon when portraying a character\n• The relationship between dramaturgy and acting style, and Brecht's contribution\n\nCüneyt Yalaz is a graduate of Boğaziçi University, founding member of BGST, actor, director, playwright, and recipient of the Sadri Alışık Best Actor Award (2016) and Vasıf Öngören Special Award (2018).",
        TR: "Stanislavski'nin geliştirdiği Fiziksel Eylemler Yöntemi'ne giriş niteliğinde bir atölye.\n\nBu yöntem, hem yeni başlayanlar hem de deneyimli oyuncular için temel bir oyunculuk yaklaşımıdır. Atölyede ayrıca bu yöntemin Brechtyen bir bakış açısıyla nasıl yorumlanabileceği de tartışılacak ve uygulamalı olarak çalışılacaktır.\n\nKonular:\n• Stanislavski'nin oyunculuğa getirdiği yenilikler\n• Fiziksel Eylemler Yöntemi'nin temel kavramları (Duygu Belleği, Konsantrasyon, Verili Durumlar, Sihirli Eğer, Duygu-Düşünce Alışverişi)\n• Bir role yaklaşım ve karakter yaratımında başvurulacak unsurlar\n• Dramaturji ve oyunculuk tarzı ilişkisi, Brecht'in katkısı\n\nCüneyt Yalaz: Boğaziçi Üniversitesi mezunu, BGST kurucu üyesi, oyuncu, yönetmen, oyun yazarı, Sadri Alışık En İyi Erkek Oyuncu Ödülü (2016) ve Vasıf Öngören Özel Ödülü (2018) sahibi."
      },
      image: "/images/stanislavski-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: "07944430349"
    },
    'meisner-workshop': {
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
        EN: "The Meisner technique is an approach to acting developed by American theatre practitioner Sanford Meisner.\n\nThe goal of the Meisner approach is for the actor to not focus on themselves and instead concentrate on the other actors in the immediate environment. Here and now, without thinking or planning.\n\nThis workshop provides a practical introduction to the Meisner technique through a series of exercises designed to help actors develop authentic, spontaneous responses. Participants will learn to listen actively, respond truthfully, and create genuine connections with scene partners.\n\nKey Elements:\n• Repetition exercises to develop truthful listening\n• Emotional preparation techniques\n• Working off your partner\n• Being present in the moment\n• Developing authentic emotional responses\n\nPerfect for actors at any level who want to deepen their craft and develop more authentic, lived-in performances.",
        TR: "Meisner tekniği, Amerikalı tiyatrocu Sanford Meisner tarafından geliştirilen bir oyunculuk yaklaşımıdır.\n\nBu yöntemde amaç, oyuncunun kendisine odaklanmak yerine, anda ve karşısındaki oyuncuya odaklanmasıdır; düşünmeden, planlamadan, burada ve şimdi.\n\nBu atölye, oyuncuların özgün, kendiliğinden tepkiler geliştirmelerine yardımcı olmak için tasarlanmış bir dizi egzersiz aracılığıyla Meisner tekniğine pratik bir giriş sağlar. Katılımcılar aktif dinlemeyi, gerçekçi yanıt vermeyi ve sahne partnerleriyle gerçek bağlantılar kurmayı öğrenecek.\n\nTemel Unsurlar:\n• Gerçekçi dinleme geliştirmek için tekrar egzersizleri\n• Duygusal hazırlık teknikleri\n• Partnerinizle çalışma\n• Anda olma\n• Özgün duygusal tepkiler geliştirme\n\nSanatını derinleştirmek ve daha özgün, yaşanmış performanslar geliştirmek isteyen her seviyeden oyuncu için mükemmel."
      },
      image: "/images/meisner-workshop.jpg",
      contact: "info@panproductions.co.uk",
      phone: null
    }
  };

  const workshop = id ? workshops[id] : null;

  if (!workshop) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">Workshop Not Found</h1>
          <p className="text-muted-foreground mb-8">The workshop you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/academy/workshops')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workshops
          </Button>
        </div>
      </div>
    );
  }

  const description = language === 'EN' ? workshop.description.EN : workshop.description.TR;
  const paragraphs = description.split('\n\n');

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-500/80 hover:bg-blue-600/80';
      case 'Intermediate': return 'bg-yellow-500/80 hover:bg-yellow-600/80';
      case 'Advanced': return 'bg-red-500/80 hover:bg-red-600/80';
      case 'All Levels': return 'bg-green-500/80 hover:bg-green-600/80';
      default: return 'bg-gray-500/80 hover:bg-gray-600/80';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-pink-500/80 hover:bg-pink-600/80 text-white';
      case 'Completed': return 'bg-lime-400/80 hover:bg-lime-500/80 text-black';
      default: return 'bg-gray-500/80 hover:bg-gray-600/80 text-white';
    }
  };

  const workshopSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalEvent",
    "name": workshop.title,
    "description": description,
    "startDate": workshop.date,
    "location": {
      "@type": "Place",
      "name": workshop.location
    },
    "organizer": {
      "@type": "Organization",
      "name": "Pan Productions"
    },
    "performer": {
      "@type": "Person",
      "name": workshop.instructor
    },
    "eventStatus": workshop.status === "Completed" 
      ? "https://schema.org/EventScheduled" 
      : "https://schema.org/EventScheduled"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${workshop.title} | Pan Academy`}
        description={description.substring(0, 160)}
        keywords={`${workshop.category.toLowerCase()} workshop, ${workshop.instructor}, acting workshop, Pan Academy, theatre training`}
        url={`/academy/workshops/${id}`}
        structuredData={workshopSchema}
      />

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/academy/workshops')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('productions.backToProductions') || 'Back to Workshops'}
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Workshop Image */}
            <div className="relative h-[600px] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {/* Blurred Background */}
              <div className="absolute inset-0">
                <img
                  src={workshop.image}
                  alt=""
                  className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                />
              </div>
              {/* Main Image */}
              <img
                src={workshop.image}
                alt={workshop.title}
                className="relative z-10 w-full h-full object-contain"
              />
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <Badge className={getStatusBadgeColor(workshop.status)}>
                  {workshop.status}
                </Badge>
                {workshop.price === "Free" && (
                  <Badge className="bg-pink-500/80 hover:bg-pink-600/80 text-white">
                    Free Workshop
                  </Badge>
                )}
                <Badge className={getLevelBadgeColor(workshop.level) + " text-white"}>
                  {workshop.level}
                </Badge>
              </div>
            </div>

            {/* Workshop Info */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-foreground">
                {workshop.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('workshops.instructor') || 'Instructor'}: <span className="text-foreground font-semibold">{workshop.instructor}</span>
              </p>

              {/* Event Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('productions.date') || 'Date'}</p>
                      <p className="font-semibold text-foreground">{workshop.date}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('productions.duration') || 'Duration'}</p>
                      <p className="font-semibold text-foreground">{workshop.time}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('productions.venue') || 'Venue'}</p>
                      <p className="font-semibold text-foreground">{workshop.location}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('workshops.price') || 'Price'}</p>
                      <p className="font-semibold text-foreground">{workshop.price}</p>
                    </div>
                  </CardContent>
                </Card>

                {workshop.spots && (
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t('workshops.spots') || 'Availability'}</p>
                        <p className="font-semibold text-foreground">{workshop.spots}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('workshops.level') || 'Level'}</p>
                      <p className="font-semibold text-foreground">{workshop.level}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="flex-1">
                  <Button variant="spotlight" size="lg" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    {t('workshops.contactUs') || 'Contact Us'}
                  </Button>
                </Link>
                {workshop.phone && (
                  <Button variant="outline" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    {workshop.phone}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
              {t('productions.about') || 'About This Workshop'}
            </h2>
            <div className="prose prose-lg max-w-none">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">
            {t('workshops.interestedTitle') || 'Interested in This Workshop?'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('workshops.interestedDescription') || 'Contact us to learn more about upcoming workshops or to request a private session.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="spotlight" className="px-8">
                <Mail className="w-4 h-4 mr-2" />
                {t('workshops.contactUs') || 'Get in Touch'}
              </Button>
            </Link>
            <Link to="/academy/workshops">
              <Button size="lg" variant="outline" className="px-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('workshops.viewAllWorkshops') || 'View All Workshops'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetails;
