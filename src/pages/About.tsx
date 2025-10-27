import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Award, Calendar } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      year: '2016',
      title: 'Foundation',
      description: 'Pan Productions was founded with a vision to create exceptional theatre experiences.'
    },
    {
      year: '2017',
      title: 'First Major Production',
      description: 'Launched our first acclaimed production to sold-out audiences.'
    },
    {
      year: '2018',
      title: 'Pan Academy Launch',
      description: 'Established our educational arm, offering professional workshops and lessons.'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Adapted to digital platforms while maintaining our commitment to live theatre.'
    },
    {
      year: '2024',
      title: 'Continued Growth',
      description: 'Expanding our reach with new partnerships and innovative productions.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Theatre',
      description: 'We believe theatre has the power to transform lives and bring communities together.'
    },
    {
      icon: Users,
      title: 'Inclusive Community',
      description: 'Our doors are open to everyone, regardless of background or experience level.'
    },
    {
      icon: Award,
      title: 'Excellence in Performance',
      description: 'We strive for the highest standards in every aspect of our productions.'
    },
    {
      icon: Calendar,
      title: 'Continuous Learning',
      description: 'Through Pan Academy, we nurture the next generation of theatre professionals.'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Founded in 2016
          </Badge>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            About Pan Productions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a London-based theatre company dedicated to creating exceptional 
            performances and nurturing theatrical talent through our productions and academy.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pan Productions is an independent arts production company based in London, founded by theatre 
                  producer Zeynep Dalkiran. With her experience in the theatre industry since 1998, she launched 
                  Pan Productions to connect Turkish-speaking artists and stories with international audiences.
                </p>
                <p>
                  Theatre being its core, Pan Productions produces both Turkish and English plays, staging original 
                  works and adaptations for local and international audiences. Its first production in English, 
                  The Importance of Being Earnest (played by immigrants), received praise from critics, marking a 
                  bold step in its multilingual vision.
                </p>
                <p>
                  Knowing that art goes far beyond the stage, Pan Productions also produces multidisciplinary art 
                  such as music, exhibitions, cultural events and workshops. It also provides publicity, media and 
                  communication services to external projects, and offers executive producing support to theatre 
                  companies and manages promotion campaigns with care and creativity.
                </p>
                <p>
                  Alongside this, Pan Productions regularly develops and hosts acting and theatre workshops within 
                  Pan Academy.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/pan-logo.svg"
                alt="Pan Productions"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-primary/5 border-primary/20">
              <CardContent className="p-0">
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">
                  Our Vision
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• To be the leading producer of Turkish-speaking cultural events in London.</li>
                  <li>• To engage with theatre as a space for transformation by embracing a collaborative and inclusive approach in conjoining artists, creatives and audiences from diverse cultural backgrounds within the creative process.</li>
                  <li>• To create space for new artistic forms through a spirit of curiosity, innovation and collaboration as a supporter of bold, high-quality, contemporary work.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 bg-accent/5 border-accent/20">
              <CardContent className="p-0">
                <h3 className="font-heading text-2xl font-bold mb-4 text-accent">
                  Our Mission
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• To bring Turkish-speaking artists, their stories and cultural richness to London's multilingual and multicultural arts scene.</li>
                  <li>• To prioritise originality, quality and collaboration across every stage of the creative process whilst producing first and foremost theatre, but also concerts, exhibitions, sight specific projects and workshops that connect with the audience.</li>
                  <li>• To support various arts organisations with consulting, creative production and communications, building a more inclusive and sustainable artistic environment.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Endorsements */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What People Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reviews and testimonials from our audiences and workshop participants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <p className="text-muted-foreground italic mb-4">
                "…after so many 'traditional' versions of the play, a fresh take is more than welcome."
              </p>
              <p className="text-sm font-semibold text-primary">— Theatre Things</p>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <p className="text-muted-foreground italic mb-4">
                "It was awesome! I found everything I was looking for."
              </p>
              <p className="text-sm font-semibold text-primary">— Devised Theatre Workshop Participant</p>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <p className="text-muted-foreground italic mb-4">
                "…it reinvigorated it and it felt like it had been written yesterday. So inventive and clever."
              </p>
              <p className="text-sm font-semibold text-primary">— The Importance of Being Earnest Audience Review</p>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;