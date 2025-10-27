import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

const currentYear = new Date().getFullYear();

const Footer = () => {
  const quickLinks = [
    { label: 'Productions', to: '/productions' },
    { label: 'PR & Marketing', to: '/marketing' },
    { label: 'Pan Academy Workshops', to: '/academy/workshops' },
    { label: 'Pan Academy Lessons', to: '/academy/lessons' },
    { label: 'News & Press', to: '/news' },
    { label: 'Contact', to: '/contact' },
  ];

  const socialLinks = [
    { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/panproductions' },
    { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/panproductions' },
    { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@panproductions' },
  ];

  return (
    <footer className="bg-card/80 border-t border-border/60 mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/images/pan-logo.svg"
                alt="Pan Productions"
                className="h-12 w-auto drop-shadow-md"
              />
              <div>
                <p className="uppercase text-xs font-semibold tracking-[0.3em] text-primary">Pan Productions</p>
                <p className="text-sm text-muted-foreground">Theatre & Performing Arts Collective</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Pan Productions delivers bold theatrical experiences, professional training, and community engagement
              initiatives that celebrate diverse voices across London and beyond.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground mb-5">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>
                  Pan Productions<br />
                  London, United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+442012345678" className="hover:text-primary transition-colors">
                  +44 (0)20 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@panproductions.co.uk" className="hover:text-primary transition-colors">
                  hello@panproductions.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 bg-background/60">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Pan Productions. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
