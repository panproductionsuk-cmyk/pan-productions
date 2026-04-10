import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PartnersCarousel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const partners = [
    {
      name: 'O2 Academy Islington',
      logo: '/images/partners/o2-academy-islington.png',
    },
    {
      name: 'Islington Assembly Hall',
      logo: '/images/partners/islington-assembly-hall.png',
    },
    {
      name: 'Arcola Theatre',
      logo: '/images/partners/arcola-theatre.png',
    },
    {
      name: 'Acoustic Brasserie',
      logo: '/images/partners/acoustic-brasserie.png',
    },
    {
      name: 'C.N.A Catering Logistics Limited',
      logo: '/images/partners/cna-catering.png',
    },
    {
      name: 'Morgan Has Solicitors',
      logo: '/images/partners/morgan-has-solicitors.png',
    },
    {
      name: 'FoodArt UK Limited',
      logo: '/images/partners/foodart-uk.png',
    },
    {
      name: 'Gama',
      logo: '/images/partners/gama.png',
    },
    {
      name: 'Hackney Showroom',
      logo: '/images/partners/hackney-showroom.png',
    },
    {
      name: 'Union Chapel',
      logo: '/images/partners/union-chapel.png',
    },
    {
      name: 'Millfield Theatre',
      logo: '/images/partners/millfield-theatre.png',
    },
    {
      name: 'Sütdiyari',
      logo: '/images/partners/sutdiyari.png',
    },
    {
      name: 'WAVA Design',
      logo: '/images/partners/wava-design.png',
    },
    {
      name: 'Yum Yum Thai Cuisine',
      logo: '/images/partners/yumyum-thai.png',
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 rounded-2xl p-12 border border-border/60">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between mb-8 group"
            aria-expanded={isOpen}
            aria-controls="partners-carousel-content"
          >
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Our Partners &amp; Supporters
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>

          <div
            id="partners-carousel-content"
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {/*
              We keep the animated marquee (animate-scroll) but also allow users
              to manually scroll the row. On touch devices this enables swipe/drag.
            */}
            <div
              className="w-full overflow-x-auto scroll-smooth touch-pan-x -mx-4 px-4 py-6"
              role="list"
              aria-label="Partners and supporters"
              tabIndex={0}
            >
              {/*
                Use an inline-flex row so the content width is measured correctly
                on small screens (prevents collapse). The marquee animation
                remains enabled on md+ screens but is disabled on small screens
                so users can manually swipe.
              */}
              <div className="inline-flex items-center gap-6 md:gap-12 md:animate-scroll hover:pause">
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 flex items-center justify-center relative w-24 h-24 bg-background/50 rounded-3xl border border-border/30 hover:border-primary/30 transition-colors overflow-hidden backdrop-blur-sm"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
                  />
                  <img
                    src={partner.logo}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-150"
                    aria-hidden="true"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 flex items-center justify-center relative w-24 h-24 bg-background/50 rounded-3xl border border-border/30 hover:border-primary/30 transition-colors overflow-hidden backdrop-blur-sm"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
                  />
                  <img
                    src={partner.logo}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-150"
                    aria-hidden="true"
                  />
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
