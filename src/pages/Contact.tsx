import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Building,
  Users
} from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@panproductions.co.uk",
      description: "General inquiries and information"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 20 7123 4567",
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Theatre Street, London, E1 6AN",
      description: "Our studio and office location"
    },
    {
      icon: Clock,
      title: "Office Hours",
      value: "Mon-Fri: 9AM-6PM",
      description: "Weekend availability by appointment"
    }
  ];

  const departments = [
    {
      title: "General Inquiries",
      email: "info@panproductions.co.uk",
      description: "Questions about Pan Productions"
    },
    {
      title: "Productions & Casting",
      email: "casting@panproductions.co.uk", 
      description: "Auditions and production information"
    },
    {
      title: "Pan Academy",
      email: "academy@panproductions.co.uk",
      description: "Workshops, lessons, and education"
    },
    {
      title: "Press & Media",
      email: "press@panproductions.co.uk",
      description: "Media inquiries and press requests"
    },
    {
      title: "Partnerships",
      email: "partnerships@panproductions.co.uk", 
      description: "Corporate partnerships and sponsorship"
    },
    {
      title: "Bookings & Events",
      email: "bookings@panproductions.co.uk",
      description: "Venue hire and private events"
    }
  ];

  const faqs = [
    {
      question: "How do I audition for Pan Productions shows?",
      answer: "Audition information is posted on our Productions page and social media. We typically hold open auditions 6-8 weeks before each production begins rehearsals."
    },
    {
      question: "Do you offer scholarships for Pan Academy programs?",
      answer: "Yes, we offer need-based scholarships for our workshop and lesson programs. Contact our Academy team for more information about eligibility and applications."
    },
    {
      question: "Can I hire your venue for private events?",
      answer: "Our studio space is available for hire during non-production periods. Please contact our bookings team for availability and rates."
    },
    {
      question: "How can I stay updated on upcoming shows?",
      answer: "Subscribe to our newsletter, follow us on social media, or check our Productions page regularly for the latest show announcements and ticket information."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20">
              Get in Touch
            </Badge>
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              Contact <span className="text-primary">Pan Productions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We'd love to hear from you. Whether you have questions about our productions, 
              want to join our academy, or are interested in partnerships, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-foreground mb-2">{info.value}</div>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Send us a Message</h2>
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" className="mt-1" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is this about?" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..."
                        className="mt-1 min-h-32"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map and Location Info */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Visit Our Studio</h2>
              
              {/* Map Placeholder */}
              <div className="bg-muted rounded-lg h-64 mb-6 flex items-center justify-center border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Theatre Street, London, E1 6AN</p>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    Studio Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Getting Here</h4>
                    <p className="text-sm text-muted-foreground">
                      Located in the heart of London's creative quarter. Nearest tube stations: 
                      Aldgate East (5 min walk), Liverpool Street (8 min walk).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Parking</h4>
                    <p className="text-sm text-muted-foreground">
                      Limited street parking available. We recommend using public transport 
                      or nearby NCP car parks.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Accessibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Our studio is wheelchair accessible. Please contact us in advance 
                      if you have specific accessibility requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Department Contacts</h2>
            <p className="text-muted-foreground">
              Get in touch with the right team for your specific inquiry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {dept.title}
                  </CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <a 
                      href={`mailto:${dept.email}`}
                      className="text-primary hover:underline"
                    >
                      {dept.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-foreground flex items-start">
                    <MessageCircle className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed ml-7">
                    {faq.answer}
                  </p>
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
            Still Have Questions?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't see what you're looking for? We're here to help. 
            Contact us directly and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Mail className="mr-2 h-5 w-5" />
              Send Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;