import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { t } = useLanguage();
  
  const quickLinks = [
    { label: t('nav.productions'), to: '/productions' },
    { label: t('nav.marketing'), to: '/marketing' },
    { label: `${t('nav.academy')} - ${t('nav.workshops')}`, to: '/academy/workshops' },
    { label: t('nav.news'), to: '/news' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  const socialLinks = [
    { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/panproductionsUK#' },
    { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/panproductionsuk/' },
  ];

  return (
    <footer className="bg-card/80 border-t border-border/60 mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/images/pan-logo.png"
                alt="Pan Productions"
                className="h-12 w-auto drop-shadow-md rounded-lg py-2"
              />
              <div>
                <p className="uppercase text-xs font-semibold tracking-[0.3em] text-primary">Pan Productions</p>
                <p className="text-sm text-muted-foreground">Theatre & Performing Arts</p>
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground mb-5">{t('footer.quickLinks')}</h3>
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground mb-5">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>
                  Pan Productions<br />
                  177 Whitecross Street<br />
                  EC1Y 8QP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a 
                  href="https://wa.me/447961213849" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +44 7961 213849
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
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} Pan Productions. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
