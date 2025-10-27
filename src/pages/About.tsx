import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Award, Theater, Globe, Sparkles } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Theater,
      title: 'Cultural Excellence',
      description: 'Bringing the richness of Turkish arts and culture to London audiences through world-class productions.'
    },
    {
      icon: Users,
      title: 'Inclusive Collaboration',
      description: 'Fostering collaboration and bringing together people from all backgrounds through the performing arts.'
    },
    {
      icon: Globe,
      title: 'International Bridge',
      description: 'Building cultural bridges between Turkey and the UK through exceptional theatrical performances.'
    },
    {
      icon: Sparkles,
      title: 'Original Works',
      description: 'Creating and premiering original productions that celebrate Turkish-speaking communities.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
              Founded in 2016
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Who Are We?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A vibrant, independent theatre production company dedicated to bringing Turkish culture 
              and arts to UK audiences through exceptional performances and cultural collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* History Section with Images */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
                    History
                  </h2>
                  <div className="w-20 h-1 bg-primary mb-8"></div>
                </div>
                
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Pan Productions (PP) is a vibrant, independent theatre production company based in London. 
                    The company is dedicated to bringing Turkish-speaking productions to UK audiences, featuring 
                    internationally acclaimed Turkish actors, artists, and musicians.
                  </p>
                  <p>
                    Founded in November 2016 by theatre producer <span className="text-primary font-semibold">Zeynep Dalkıran</span>, 
                    PP was born from over a decade of experience in Turkish-speaking theatre. Zeynep has combined her extensive 
                    background in both commercial and non-commercial productions — spanning theatre, art exhibitions, and concerts — 
                    to create a company that celebrates and elevates Turkish culture on the London stage.
                  </p>
                  <p>
                    Pan Productions aims to produce and co-produce exceptional performances both nationally and 
                    internationally, while also providing top-quality executive production services to other theatre 
                    companies. Through collaborations with local promoters and global partners, PP continues to build 
                    cultural bridges and bring the richness of Turkish arts, music, and theatre to diverse audiences.
                  </p>
                </div>
              </div>

              {/* Right: Images Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-xl shadow-xl group">
                    <img
                      src="/images/about-1.jpg"
                      alt="Pan Productions Theatre Performance"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-xl group">
                    <img
                      src="/images/about-2.jpg"
                      alt="Pan Productions Performance"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-xl group">
                    <img
                      src="/images/about-3.jpg"
                      alt="Pan Productions Stage Production"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-xl group">
                    <img
                      src="/images/about-4.jpg"
                      alt="Pan Productions Cultural Event"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-xl group">
                    <img
                      src="/images/about-5.jpg"
                      alt="Pan Productions Artistic Performance"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-xl group">
                    <img
                      src="/images/about-6.jpg"
                      alt="Pan Productions Live Show"
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section with Modern Cards */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mission Card */}
              <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-[#dae45f]/5 to-[#dae45f]/10 hover:shadow-2xl transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#dae45f]/5 rounded-full blur-3xl group-hover:bg-[#dae45f]/10 transition-all duration-500"></div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-foreground">
                      Our Mission
                    </h3>
                  </div>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      Pan Productions' mission is to produce the leading Turkish-speaking cultural events in London, 
                      bringing together top actors, artists, and musicians through concerts, plays, and exhibitions. 
                      We are dedicated to creating world-class productions that showcase the richness of Turkish arts 
                      while connecting with diverse audiences in the UK.
                    </p>
                    <p>
                      In addition to our main productions, Pan Productions offers a range of complementary events — 
                      including intimate sit-down seasons, theatre tours, site-specific performances, and one-night-only 
                      special events. We also provide research, consulting, and logistical planning services, supporting 
                      cultural and artistic projects across all stages of development.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Vision Card */}
              <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-[#dae45f]/5 to-[#dae45f]/10 hover:shadow-2xl transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#dae45f]/5 rounded-full blur-3xl group-hover:bg-[#dae45f]/10 transition-all duration-500"></div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-foreground">
                      Our Vision
                    </h3>
                  </div>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      Our vision is not only to support and finance established Turkish-speaking productions (proven 
                      and celebrated in Turkey), but also to develop original works and premiere them in London for 
                      the Turkish-speaking community.
                    </p>
                    <p>
                      Today, our primary focus lies in the world of theatre — embracing the full spectrum of drama 
                      and performance that can be created on stage. As a London-based production company, Pan Productions 
                      aims to bring together people from all backgrounds, fostering collaboration, inclusion, and cultural 
                      exchange through the performing arts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-8 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group bg-card/50 backdrop-blur">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
                What People Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Reviews and testimonials from our audiences and workshop participants
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <p className="text-muted-foreground italic text-lg leading-relaxed mb-6">
                      …after so many 'traditional' versions of the play, a fresh take is more than welcome.
                    </p>
                    <p className="text-sm font-semibold text-primary">— Theatre Things</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <p className="text-muted-foreground italic text-lg leading-relaxed mb-6">
                      It was awesome! I found everything I was looking for.
                    </p>
                    <p className="text-sm font-semibold text-primary">— Devised Theatre Workshop Participant</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <p className="text-muted-foreground italic text-lg leading-relaxed mb-6">
                      …it reinvigorated it and it felt like it had been written yesterday. So inventive and clever.
                    </p>
                    <p className="text-sm font-semibold text-primary">— The Importance of Being Earnest Audience Review</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;