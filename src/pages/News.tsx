import React from 'react';
import { ExternalLink } from 'lucide-react';
import NewsletterSection from '@/components/NewsletterSection';
import { useLanguage } from '@/contexts/LanguageContext';

const News = () => {
  const { t } = useLanguage();
  const newsItems = [
    {
      title: "Pan Productions at CPT Theatre",
      image: "/images/cpt-theatre.jpg",
      link: "https://cptheatre.co.uk/artists/Pan-Productions"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              {t('news.title1')} <span className="text-primary">{t('news.title2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newsItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="text-primary h-8 w-8" />
                  </div>
                </div>

                {/* Title */}
                <div className="p-4 bg-background">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default News;