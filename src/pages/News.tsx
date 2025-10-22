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
    title: "The Importance of Being Earnest – Played by Immigrants at Tower Theatre",
    excerpt: "A quintessentially English play is being given a fascinating and refreshingly cosmopolitan spin at the Tower Theatre with Pan Productions' new take on the Oscar Wilde classic.",
    date: "January 2024",
    readTime: "5 min read",
    source: "RevNew",
    image: "https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg",
    category: "Reviews"
  };

  const newsArticles = [
    {
      title: "The Importance Of Being Earnest – Played By Immigrants",
      excerpt: "...after so many 'traditional' versions of the play, a fresh take is more than welcome.",
      date: "January 2024",
      readTime: "4 min read",
      source: "Aylin Bozok - Theatre Things",
      image: "https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg",
      category: "Reviews"
    },
    {
      title: "In London's (OE) West End 2020: The Importance of Being Earnest",
      excerpt: "Preview of The Importance of Being Earnest (played by immigrants) at Tower Theatre",
      date: "January 2020",
      readTime: "3 min read",
      source: "In London's West End",
      image: "https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg",
      category: "Reviews"
    },
    {
      title: "About 'The Importance Of Being Earnest'",
      excerpt: "...it reinvigorated it and it felt like it had been written yesterday. So inventive and clever.",
      date: "January 2024",
      readTime: "4 min read",
      source: "Audience Review",
      image: "https://www.panproductions.co.uk/file/2019/11/earnest-tower.jpg",
      category: "Reviews"
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