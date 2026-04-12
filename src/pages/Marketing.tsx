import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { marketingProductions } from '@/data/productions';
import { useMarketingProductions } from '@/hooks/useSupabaseProductions';
import OptimizedImage from '@/components/OptimizedImage';

const Marketing = () => {
  const { t } = useLanguage();
  const { productions: supabaseProductions, loading: supabaseLoading, error: supabaseError } = useMarketingProductions();
  
  // Use Supabase data if available and has results, otherwise fall back to local data
  const displayProductions = supabaseProductions && supabaseProductions.length > 0 
    ? supabaseProductions 
    : marketingProductions;

  return (
    <div className="min-h-screen relative z-10" style={{ backgroundColor: 'hsl(220, 18%, 18%)' }}>
      <SEO
        title="PR & Marketing Services | Pan Productions London"
        description="Professional PR and marketing services for theatre, music, and exhibitions. Strategic marketing, content creation, and digital campaigns by Pan Productions."
        keywords="theatre marketing, PR services London, event marketing, cultural marketing, Pan Productions marketing"
        url="/marketing"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-slide-2.jpg" 
            alt="PR & Marketing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              {t('marketing.heroTitle')}
            </h1>
            <h2 className="text-3xl font-heading font-semibold mb-6 text-primary">
              {t('marketing.heroSubtitle')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="px-8">
                  {t('marketing.getInTouch')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Got a play collecting dust on the shelf? Or a song waiting to be sung? Or perhaps an art piece looking to be exhibited?
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whatever it is that you have on your mind, through our bespoke services for each project, Pan Productions will support you through each step along the way from campaign planning to media relations.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are always on the lookout for emerging and established artists alike, so if you are a creative in need of production support, get in touch with us!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PR & Marketing Archive */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">
              PR & Marketing Archive
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Productions we've supported through PR & Marketing
            </p>
          </div>

          {/* Error State */}
          {supabaseError && (
            <div className="text-center py-12 mb-8">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400 font-medium mb-2">Unable to load productions.</p>
                <p className="text-muted-foreground text-sm">Please try again later.</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {supabaseLoading && !supabaseError && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading archive...</p>
            </div>
          )}

          {/* Empty State */}
          {!supabaseLoading && !supabaseError && (!displayProductions || displayProductions.length === 0) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No productions in archive yet.</p>
            </div>
          )}

          {/* Productions Grid */}
          {!supabaseLoading && !supabaseError && displayProductions && displayProductions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProductions.map((production) => {
                // Handle both Supabase flat columns (description_en) and local data nested object (description.EN)
                const description = (production as any).description_en 
                  || (typeof production.description === 'string' ? production.description : production.description?.EN)
                  || '';
                const isVideo = production.image?.endsWith('.mp4') || production.image?.endsWith('.webm');
                return (
                <Link key={production.id} to={`/productions/${production.id}`}>
                  <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="h-64 bg-muted overflow-hidden">
                      {isVideo ? (
                        <video src={production.image} className="w-full h-full object-cover" muted loop playsInline autoPlay />
                      ) : (
                        <OptimizedImage
                          src={production.image}
                          alt={production.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = '/images/hero-slide-2.jpg'; }}
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-xl font-bold mb-2 text-foreground">
                        {production.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-foreground">
            {t('marketing.ctaTitle')}
          </h2>
          <Link to="/contact">
            <Button size="lg" className="px-8">
              {t('marketing.getInTouch')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Marketing;
