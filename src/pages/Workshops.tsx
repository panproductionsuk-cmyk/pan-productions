import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Star, 
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Theater
} from 'lucide-react';

const Workshops = () => {
  const upcomingWorkshops = [
    {
      title: "Acting for Camera",
      instructor: "Sarah Mitchell",
      date: "March 15-17, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Pan Productions Studio",
      price: "£180",
      level: "Intermediate",
      spots: 8,
      description: "Learn the fundamentals of screen acting, including camera techniques, close-up work, and on-set etiquette.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    },
    {
      title: "Musical Theatre Masterclass",
      instructor: "David Rodriguez",
      date: "March 22-24, 2024", 
      time: "11:00 AM - 5:00 PM",
      location: "Pan Productions Studio",
      price: "£220",
      level: "Advanced",
      spots: 6,
      description: "Intensive workshop covering singing, dancing, and acting integration for musical theatre performers.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    },
    {
      title: "Shakespeare Workshop",
      instructor: "Emily Thompson",
      date: "April 5-7, 2024",
      time: "9:30 AM - 3:30 PM", 
      location: "Pan Productions Studio",
      price: "£165",
      level: "All Levels",
      spots: 12,
      description: "Explore Shakespeare's language, character development, and period movement in this comprehensive workshop.",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop"
    },
    {
      title: "Voice & Movement",
      instructor: "James Wilson",
      date: "April 12-14, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Pan Productions Studio", 
      price: "£195",
      level: "Beginner",
      spots: 10,
      description: "Develop your vocal range and physical expression through targeted exercises and performance techniques.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=250&fit=crop"
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
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
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
              <Button size="lg" className="px-8">
                <Calendar className="mr-2 h-5 w-5" />
                Browse Workshops
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Contact Us
              </Button>
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
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Upcoming Workshops</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our next workshops and take your performance skills to the next level
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingWorkshops.map((workshop, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={getLevelBadgeVariant(workshop.level)}>
                      {workshop.level}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-foreground">{workshop.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{workshop.price}</div>
                  </div>
                  <CardDescription className="text-base">{workshop.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Instructor: {workshop.instructor}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {workshop.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {workshop.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {workshop.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {workshop.spots} spots available
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
            <Button size="lg" className="px-8">
              Custom Workshop Request
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Private Lessons
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshops;