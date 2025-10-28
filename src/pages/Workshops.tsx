import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import NewsletterSection from '@/components/NewsletterSection';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pastWorkshops = [
    {
      title: "AN'da KALMAK Workshop",
      instructor: "Berrin Şeker Civil",
      date: "3rd November 2019, Sunday",
      time: "10:00 AM - 1:00 PM",
      location: "Claremont Project, 24-27 White Lion St, N1 9PD",
      price: "Contact for pricing",
      level: "All Levels",
      spots: null,
      status: "Completed",
      description: "Oyunculukta Kişisel Envantere Yolculuk (Journey to Personal Inventory in Acting) - A workshop focused on 'staying in the moment' for actors. Based on Role Playing, this workshop helps actors maintain presence in the reality of the moment. Open to actors and actor candidates, limited to 6 participants. Berrin Şeker Civil shares over 20 years of experience in camera and theatre acting.",
      image: "https://www.panproductions.co.uk/file/2019/10/PAN-WORKSHOPArtboard-0-724x1024.jpg",
      contact: "workshop@panproductions.co.uk",
      phone: "07487 586944"
    },
    {
      title: "Yaratıcı Drama - Çocuk Workshop",
      instructor: "Eser Rüzgar",
      date: "Sundays (Pazar Günleri)",
      time: "Times vary by registration period",
      location: "Candid Art Center, London",
      price: "Contact for pricing",
      level: "Children",
      spots: null,
      status: "Completed",
      description: "PAN Creative Drama Workshop for Children. Creative drama education based on improvisation directly impacts children's personal development and creativity. Through learning by doing and experiencing, children develop imagination, communication skills, self-confidence, empathy, critical thinking, and responsibility in a free and supportive environment.",
      image: "/images/drama-cocuk-workshop.jpg",
      contact: "drama@panproductions.co.uk",
      phone: "07487 586944"
    },
    {
      title: "Movement in Acting",
      instructor: "Dr. Selçuk Göldere",
      date: "16th September 2019, Monday",
      time: "19:00 - 21:00",
      location: "Candid Arts, Angel, 3 Torrens St, The Angel, London EC1V 1NQ",
      price: "Free",
      level: "All Levels",
      spots: null,
      status: "Completed",
      description: "Acting is an art form that requires complete awareness of the body. Training in movement techniques allows us to acquire a range of physical skills. Join us if you are a performer, director, writer or artist interested in movement skills and choreography. Dr. Selçuk Göldere, a performance-maker, educator and researcher, will share his experience in theatre and contemporary dance stretching over 25 years.",
      image: "/images/movement-acting-workshop.jpg",
      contact: "freeworkshop@panproductions.co.uk",
      phone: null
    }
  ];

  const features = [
    {
      icon: Award,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: Users,
      title: "Small Groups",
      description: "Intimate class sizes ensure personalized attention"
    },
    {
      icon: Theater,
      title: "Professional Setting",
      description: "Train in our fully equipped studio spaces"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Materials",
      description: "All workshop materials and resources included"
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

  return (
    <div className="min-h-screen bg-background">
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
              Pan Academy Workshops
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              Elevate Your <span className="text-primary">Performance Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Pan Academy is a leading acting school in North London. We offer a varied range of acting classes 
              and courses designed to suit all experience levels. Whether you're looking to challenge yourself, 
              develop new skills, or take the next step in your acting journey, we have a course for you. 
              Our evening, weekend, and part-time programs are structured to fit around your busy schedule.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If you're new to acting, our Beginners Courses provide a fun and supportive environment to help you 
              get started before progressing to Improvers and Advanced levels. For those aspiring to a professional 
              career, our Industry Courses offer expert training to prepare you for the demands of the acting industry. 
              If you're seeking an intensive experience covering a range of techniques, our Foundation in Acting course 
              is the perfect choice.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We offer a variety of acting courses for adults, including Acting Classes, Voice and Movement Training, 
              along with specialized workshops such as playwriting and alongside specialised methods of acting such as 
              Meisner, Stanislavski and Method Acting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  Contact Us
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
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Past Workshops</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our previously held workshops that helped develop performance skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pastWorkshops.map((workshop, index) => (
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent transition-colors" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end z-10">
                    <Badge className="bg-gray-500/90 hover:bg-gray-600 text-white">
                      {workshop.status}
                    </Badge>
                    {workshop.price === "Free" && (
                      <Badge className="bg-green-500/90 hover:bg-green-600 text-white">
                        Free Workshop
                      </Badge>
                    )}
                    <Badge variant={getLevelBadgeVariant(workshop.level)}>
                      {workshop.level}
                    </Badge>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                      {workshop.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      by {workshop.instructor}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6">
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
                      Workshop Completed
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We offer customized workshops and private coaching sessions. Contact us to discuss your specific training needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8">
                Custom Workshop Request
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-8">
                Request Private Lesson
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