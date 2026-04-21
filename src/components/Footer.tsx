import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Custom WhatsApp icon since lucide-react doesn't have one
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
                <WhatsAppIcon className="h-4 w-4 text-primary" />
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
