import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsletterSection from '@/components/NewsletterSection';
import { 
  Clock, 
  Users, 
  Star, 
  User,
  MapPin,
  Award,
  BookOpen,
  Music,
  Mic,
  Drama
} from 'lucide-react';

const Lessons = () => {
  const lessonTypes = [
    {
      icon: Drama,
      title: "Acting Lessons",
      price: "£45/hour",
      description: "One-on-one coaching in method acting, character development, and scene work.",
      features: ["Scene Study", "Character Analysis", "Improvisation", "Audition Prep"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    },
    {
      icon: Mic,
      title: "Voice & Speech",
      price: "£40/hour", 
      description: "Develop vocal strength, clarity, and expression for stage and screen.",
      features: ["Vocal Technique", "Breath Control", "Accent Training", "Text Analysis"],
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=250&fit=crop"
    },
    {
      icon: Music,
      title: "Singing Lessons",
      price: "£50/hour",
      description: "Professional vocal coaching for musical theatre, pop, and classical styles.",
      features: ["Vocal Range", "Performance Style", "Song Interpretation", "Harmony"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    },
    {
      icon: Users,
      title: "Group Classes",
      price: "£25/person",
      description: "Small group lessons for collaborative learning and ensemble work.",
      features: ["Ensemble Acting", "Group Dynamics", "Scene Work", "Performance Skills"],
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop"
    }
  ];

  const instructors = [
    {
      name: "Sarah Mitchell",
      specialty: "Acting & Screen Performance",
      experience: "15+ years",
      credentials: "RADA Graduate, Film & TV Credits",
      bio: "Professional actress with extensive stage and screen experience, specializing in method acting and camera technique.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "David Rodriguez", 
      specialty: "Musical Theatre & Vocals",
      experience: "12+ years",
      credentials: "West End Performer, Voice Coach",
      bio: "Former West End leading man with expertise in musical theatre performance and vocal training for all levels.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Emily Thompson",
      specialty: "Classical & Contemporary",
      experience: "20+ years", 
      credentials: "RSC Company Member, Text Coach",
      bio: "Classically trained actress with Royal Shakespeare Company experience, expert in text work and character development.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "James Wilson",
      specialty: "Voice & Movement",
      experience: "10+ years",
      credentials: "Laban Graduate, Movement Director", 
      bio: "Movement and voice specialist with training in Laban technique and Alexander Method for performers.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const packages = [
    {
      name: "Starter Package",
      sessions: 4,
      price: "£160",
      savings: "Save £20",
      features: ["4 x 1-hour lessons", "Flexible scheduling", "Progress assessment", "Take-home exercises"]
    },
    {
      name: "Development Package", 
      sessions: 8,
      price: "£300",
      savings: "Save £60",
      popular: true,
      features: ["8 x 1-hour lessons", "Monthly progress review", "Recording sessions", "Audition preparation"]
    },
    {
      name: "Professional Package",
      sessions: 12,
      price: "£420", 
      savings: "Save £120",
      features: ["12 x 1-hour lessons", "Bi-weekly assessments", "Industry networking", "Showcase opportunity"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              Pan Academy Private Lessons
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              Personalized <span className="text-primary">Performance Training</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              One-on-one lessons tailored to your specific goals and skill level. 
              Work directly with industry professionals to accelerate your growth as a performer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <User className="mr-2 h-5 w-5" />
                Book Your Lesson
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Meet Our Instructors
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Private Lesson Options</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of specialized one-on-one training programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {lessonTypes.map((lesson, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={lesson.image} 
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-bold text-primary">{lesson.price}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 mr-3">
                      <lesson.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{lesson.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{lesson.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {lesson.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full">
                    Book Lesson
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Meet Your Instructors</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from industry professionals with proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{instructor.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {instructor.specialty}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center justify-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      {instructor.experience}
                    </div>
                    <div className="font-medium text-foreground">
                      {instructor.credentials}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {instructor.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Lesson Packages</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Save money with our multi-lesson packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-1">{pkg.price}</div>
                  <div className="text-sm text-green-600 font-medium">{pkg.savings}</div>
                  <CardDescription>{pkg.sessions} lessons included</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${pkg.popular ? '' : 'variant-outline'}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    Choose Package
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards improving your performance skills with personalized, professional training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <User className="mr-2 h-5 w-5" />
              Book Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Lessons;