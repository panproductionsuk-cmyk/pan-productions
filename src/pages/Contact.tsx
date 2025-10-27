import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Send,
  MessageCircle
} from 'lucide-react';

const Contact = () => {
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
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-heading font-bold mb-6 text-foreground">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
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
                    className="mt-1 min-h-40"
                  />
                </div>
                
                <Button className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
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
      </div>
    </div>
  );
};

export default Contact;