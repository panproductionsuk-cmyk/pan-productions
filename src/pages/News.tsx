import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ExternalLink, 
  Clock,
  Newspaper,
  Award,
  Users
} from 'lucide-react';

const News = () => {
  const featuredNews = {
    title: "Pan Productions Wins Best Independent Theatre Award",
    excerpt: "We are thrilled to announce that Pan Productions has been recognized with the Best Independent Theatre Award at the London Theatre Awards 2024.",
    date: "February 28, 2024",
    readTime: "3 min read",
    source: "London Theatre Awards",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=400&fit=crop",
    category: "Awards"
  };

  const newsArticles = [
    {
      title: "Pan Academy Launches New Musical Theatre Program",
      excerpt: "Our expanded curriculum now includes comprehensive musical theatre training with industry professionals.",
      date: "February 15, 2024",
      readTime: "2 min read",
      source: "Theatre Weekly",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      category: "Education"
    },
    {
      title: "Sold-Out Success: 'Voices of Istanbul' Production Review",
      excerpt: "Critics praise our latest production for its powerful storytelling and exceptional performances.",
      date: "February 10, 2024", 
      readTime: "4 min read",
      source: "The Stage Review",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop",
      category: "Reviews"
    },
    {
      title: "Community Outreach: Free Theatre Workshops for Local Schools",
      excerpt: "Pan Productions partners with three local schools to bring theatre education to underserved communities.",
      date: "January 28, 2024",
      readTime: "3 min read", 
      source: "Community Arts Daily",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=250&fit=crop",
      category: "Community"
    },
    {
      title: "Behind the Scenes: Creating Authentic Period Costumes",
      excerpt: "Meet our costume design team and learn about the meticulous process of creating historically accurate theatrical costumes.",
      date: "January 20, 2024",
      readTime: "5 min read",
      source: "Costume Design Magazine", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      category: "Behind the Scenes"
    },
    {
      title: "Pan Productions Announces 2024 Season Lineup",
      excerpt: "Five new productions including two world premieres and three contemporary adaptations of classic works.",
      date: "January 15, 2024",
      readTime: "3 min read",
      source: "Theatre News London",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=250&fit=crop", 
      category: "Announcements"
    },
    {
      title: "Director Spotlight: Interview with Artistic Director Mehmet Ergen",
      excerpt: "An in-depth conversation about the vision, challenges, and future of Pan Productions.",
      date: "December 18, 2023",
      readTime: "6 min read",
      source: "Arts & Culture Weekly",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop",
      category: "Interviews"
    }
  ];

  const pressReleases = [
    {
      title: "Pan Productions Receives Arts Council England Grant",
      date: "March 1, 2024",
      description: "Funding will support new community engagement programs and production development."
    },
    {
      title: "Partnership Announcement: Pan Academy & RADA Collaboration", 
      date: "February 20, 2024",
      description: "New partnership brings world-class training opportunities to Pan Academy students."
    },
    {
      title: "Casting Call: Open Auditions for Summer Productions",
      date: "February 5, 2024", 
      description: "Pan Productions seeks talented performers for upcoming summer season productions."
    }
  ];

  const getCategoryBadgeVariant = (category: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants: { [key: string]: "default" | "destructive" | "outline" | "secondary" } = {
      'Awards': 'default',
      'Education': 'secondary', 
      'Reviews': 'outline',
      'Community': 'secondary',
      'Behind the Scenes': 'outline',
      'Announcements': 'default',
      'Interviews': 'secondary'
    };
    return variants[category] || 'outline';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              Latest Updates
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              News & <span className="text-primary">Press</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay updated with the latest news, reviews, and behind-the-scenes stories from Pan Productions. 
              Follow our journey in the world of theatre and arts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={getCategoryBadgeVariant(featuredNews.category)}>
                      {featuredNews.category}
                    </Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold mb-4 text-foreground">
                    {featuredNews.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {featuredNews.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Source: {featuredNews.source}
                    </span>
                    <Button>
                      Read Full Article
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Recent News</h2>
            <p className="text-muted-foreground">
              Catch up on our latest productions, awards, and community initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={getCategoryBadgeVariant(article.category)}>
                      {article.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {article.source}
                    </span>
                    <Button variant="ghost" size="sm" className="p-2">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Press Releases</h2>
            <p className="text-muted-foreground">
              Official announcements and updates from Pan Productions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground hover:text-primary transition-colors cursor-pointer">
                        {release.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {release.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {release.date}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <Newspaper className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-foreground">
            Stay in the Loop
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss an update about our latest productions, awards, and community initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;