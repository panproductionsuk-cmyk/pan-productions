import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Award, Theater, Globe, Sparkles } from 'lucide-react';
import NewsletterSection from '@/components/NewsletterSection';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Theater,
      title: t('about.value1Title'),
      description: t('about.value1Description')
    },
    {
      icon: Users,
      title: t('about.value2Title'),
      description: t('about.value2Description')
    },
    {
      icon: Globe,
      title: t('about.value3Title'),
      description: t('about.value3Description')
    },
    {
      icon: Sparkles,
      title: t('about.value4Title'),
      description: t('about.value4Description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us | Pan Productions - Turkish Theatre Company London"
        description="Founded in 2016, Pan Productions is London's vibrant Turkish theatre company dedicated to bringing exceptional performances and cultural collaborations to UK audiences."
        keywords="about Pan Productions, Turkish theatre London, theatre company history, cultural theatre, Zeynep Dalkıran, London theatre company"
        url="/about"
      />
      
      {/* Hero Section with Gradient */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
              {t('about.founded')}
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.heroSubtitle')}
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
                    {t('about.historyTitle')}
                  </h2>
                  <div className="w-20 h-1 bg-primary mb-8"></div>
                </div>
                
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    {t('about.historyP1')}
                  </p>
                  <p>
                    {t('about.historyP2')}
                  </p>
                  <p>
                    {t('about.historyP3')}
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
                      {t('about.missionTitle')}
                    </h3>
                  </div>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      {t('about.missionP1')}
                    </p>
                    <p>
                      {t('about.missionP2')}
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
                      {t('about.visionTitle')}
                    </h3>
                  </div>
                  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      {t('about.visionP1')}
                    </p>
                    <p>
                      {t('about.visionP2')}
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
                {t('about.valuesTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.valuesSubtitle')}
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
                            <h2 className="text-4xl font-bold mb-4">
                {t('about.testimonialsTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.testimonialsSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <p className="text-muted-foreground italic text-lg leading-relaxed mb-6">
                      {t('about.testimonial1')}
                    </p>
                    <p className="text-sm font-semibold text-primary">{t('about.testimonial1Source')}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <p className="text-muted-foreground italic text-lg leading-relaxed mb-6">
                      {t('about.testimonial2')}
                    </p>
                    <p className="text-sm font-semibold text-primary">{t('about.testimonial2Source')}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <p className="text-muted-foreground italic text-lg leading-relaxed mb-6">
                      {t('about.testimonial3')}
                    </p>
                    <p className="text-sm font-semibold text-primary">{t('about.testimonial3Source')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default About;