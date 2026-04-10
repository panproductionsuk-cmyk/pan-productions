import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Ticket, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

interface Production {
  id: string;
  title: string;
  author: string;
  status: string;
  description: string | { EN: string; TR: string };
  image: string;
  dates: string;
  venue: string;
  duration: string;
  ticketPrice: string;
  ticketLink?: string;
  titleEn?: string;
  sortDate?: string;
}

// ProductionCard Component
const ProductionCard = ({ production, getStatusColor, t }: { production: Production; getStatusColor: (status: string) => string; t: (key: string) => string }) => {
  const { language } = useLanguage();
  const isVideo = production.image.endsWith('.mp4') || production.image.endsWith('.webm');
  
  // Truncate description for card preview
  const fullDescription = typeof production.description === 'string' 
    ? production.description 
    : (language === 'EN' ? production.description.EN : production.description.TR);
  const truncatedDescription = fullDescription.length > 150 
    ? fullDescription.substring(0, 150) + '...' 
    : fullDescription;
  
  return (
    <Link to={`/productions/${production.id}`} className="block group">
      <Card className="overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden">
          {isVideo ? (
            <>
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  src={production.image}
                  className="w-full h-full object-cover blur-xl scale-110"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              </div>
              {/* Main Video */}
              <video
                src={production.image}
                className="relative w-full h-full object-contain"
                muted
                loop
                playsInline
                autoPlay
              />
            </>
          ) : (
            <>
              {/* Blurred Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                style={{ backgroundImage: `url(${production.image})` }}
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Main Image */}
              <img
                src={production.image}
                alt={production.title}
                className="relative w-full h-full object-contain"
              />
            </>
          )}
          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge className={`${getStatusColor(production.status)} shadow-lg`}>
              {production.status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {production.title}
          </h3>
          {production.author && (
            <p className="text-muted-foreground text-sm mb-3">
              {t('productions.by')} {production.author}
            </p>
          )}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {truncatedDescription}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{production.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{production.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{production.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary" />
              <span>{production.ticketPrice}</span>
            </div>
          </div>
          <Button 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            variant={production.status === 'Past' ? 'outline' : 'default'}
            onClick={(e) => {
              if (production.ticketLink && production.status !== 'Past') {
                e.preventDefault();
                e.stopPropagation();
                window.open(production.ticketLink, '_blank');
              }
            }}
          >
            {(production.status === 'Current' || production.status === 'On Sale') ? t('productions.buyTickets') : 
              production.status === 'Upcoming' ? t('productions.comingSoon') : t('productions.archive')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

const Productions = () => {
  const { t, language } = useLanguage();
  const categories = {
    theatre: [
      {
        id: 'love-of-rumi',
        title: 'Love of Rumi: Flow and Spirit',
        titleEn: 'Love of Rumi: Flow and Spirit',
        author: 'Aya Art, Berrin Bugay Lawler',
        status: 'Past',
        description: {
          EN: 'Experience the essence of Rumi\'s poetry through a captivating fusion of fashion and performance, celebrating love, flow, and spirit. A mystical journey featuring whirling dervish dance, choir, poetry reading, solo performances, and a costume parade with stylised 13th century costumes. This is not just a stage performance; it is an artistic experience that bridges the heart, mind, and soul.',
          TR: 'Rumi\'nin şiirlerinin özünü, aşk, akış ve ruhu kutlayan büyüleyici bir moda ve performans füzyonu ile deneyimleyin. Semazen dansı, koro, şiir okuma, solo performanslar ve 13. yüzyıl kostümleriyle kostüm gösterisi içeren mistik bir yolculuk. Bu sadece bir sahne performansı değil; kalbi, zihni ve ruhu birleştiren sanatsal bir deneyimdir.'
        },
        image: '/images/love-of-rumi.jpg',
        dates: 'Friday, March 21, 2026, 7:00 PM',
        venue: 'Mumford Theater, Cambridge',
        duration: 'Performative Fashion Show',
        ticketPrice: 'See Archive',
        sortDate: '2026-03-21'
      },
      {
        id: 'sus',
        title: 'Sus.',
        titleEn: 'Sus.',
        author: 'Ali Has',
        status: 'On Sale',
        description: {
          EN: 'SUS.\n\nThe loudest form of injustice.\n\nSix-year-old Nazlı left home one morning.\nShe had her notebook in hand.\nAnd she never came back.\n\nSus. brings to the stage not just a disappearance, but the story of a system woven with silence, fear, and vested interests.\n\nIn a village in the shadow of stone houses, everyone knows something…\nBut no one speaks.\n\nAs the truth slowly comes to light amid feudal ties, unseen powers, and a silence passed down through generations, the audience is left with one question:\n\nWho does silence protect?\nAnd who is the real culprit — those who don\'t speak, or the system that won\'t let them?\n\nSus. is a shocking stage experience that pushes the boundaries of justice and calls on the audience to confront their own conscience.\n\nDates:\n1–2–3–4 April 2026',
          TR: 'SUS.\n\nAdaletsizliğin en gürültülü hali.\n\nAltı yaşındaki Nazlı bir sabah evden çıktı.\nElinde defteri vardı.\nVe bir daha hiç dönmedi.\n\nSus., yalnızca bir kayboluşun değil; sessizliğin, korkunun ve çıkar ilişkileriyle örülmüş bir düzenin hikayesini sahneye taşıyor.\n\nTaş evlerin gölgesindeki bir köyde herkes bir şey biliyor…\nAma kimse konuşmuyor.\n\nFeodal bağların, görünmeyen güçlerin ve kuşaktan kuşağa aktarılan suskunluğun ortasında gerçek yavaş yavaş gün yüzüne çıkarken seyirci şu soruyla baş başa kalıyor:\n\nSessizlik kimi korur?\nVe asıl suçlu kimdir — konuşmayanlar mı, yoksa konuşturmayan düzen mi?\n\nSus., adaletin sınırlarını zorlayan ve izleyiciyi vicdanıyla yüzleşmeye çağıran sarsıcı bir sahne deneyimi.\n\nTarih:\n1–2–3–4 Nisan 2026'
        },
        image: '/images/sus.jpg',
        dates: '1-2-3-4 April 2026, 19:30',
        venue: 'Tower Theatre, 16 Northwold Road, London N16 7HR',
        duration: 'Theatre Play',
        ticketPrice: '£27',
        ticketLink: 'https://buy.stripe.com/bJe7sDbtY64NcU60TweZ209',
        sortDate: '2026-04-01'
      },
      {
        id: 'earnest',
        title: 'The Importance of Being Earnest',
        author: 'Oscar Wilde',
        status: 'Past',
        description: {
          EN: 'A brilliant comedy of manners that sparkles with wit and theatrical invention.',
          TR: 'Zekâ ve tiyatral buluşlarla parlayan, görgü kuralları üzerine muhteşem bir komedi.'
        },
        image: '/images/importance-of-being-earnest.jpg',
        dates: '6-18 January 2020',
        venue: 'Tower Theatre, 16 Northwold Road, Stoke Newington, London N16 7HR',
        duration: '2h 30min (including interval)',
        ticketPrice: 'See Archive',
        sortDate: '2020-01-06'
      },
      {
        id: 'tut-elimden-rovni',
        title: 'Tut Elimden Rovni',
        author: 'Aziz Nesin',
        status: 'Past',
        description: {
          EN: 'A captivating theatrical performance - "hayatı bir cambazlık gösterisi" (life is a juggling show). Starring Ada Burke and Göktay Tosun, directed by Göktay Tosun.',
          TR: 'Hayatı bir cambazlık gösterisi olarak anlatan etkileyici bir tiyatro oyunu. Oyuncular: Ada Burke, Göktay Tosun. Yönetmen: Göktay Tosun.'
        },
        image: '/images/tut-elimden-rovni.jpg',
        dates: '27-28-29 March 2024, 20:00',
        venue: 'Rosemary Branch Theatre, 2 Shepperton Rd, London N1 3DT',
        duration: '2h (including interval)',
        ticketPrice: 'See Archive',
        sortDate: '2024-03-27'
      },
      {
        id: 'ben-kolay-olmem',
        title: 'Ben Kolay Ölmem',
        titleEn: 'I Shan\'t Perish Easily',
        author: 'Ali Has',
        status: 'Past',
        description: {
          EN: 'A story of Cemal Süreya and Ahmed Arif - two poets, two lives, one story.',
          TR: 'Bir Cemal Süreya & Ahmed Arif hikayesi... İki şair, iki yaşam, bir hikaye.'
        },
        image: '/images/ben-kolay-olmem.jpg',
        dates: '11-12-13 March 2019, 19:00',
        venue: 'Arcola Theatre, 24 Ashwin St, London E8 3DL',
        duration: '2h',
        ticketPrice: 'See Archive',
        sortDate: '2019-03-11'
      },
      {
        id: 'olum-ve-kiz',
        title: 'Ölüm ve Kız',
        titleEn: 'Death and the Maiden',
        author: 'Ariel Dorfman',
        status: 'Past',
        description: {
          EN: 'A gripping psychological thriller. Directed by Katharina Reinthaller and Barış Celiloğlu. Cast: Barış Celiloğlu, Göktay Tosun, Yener Çelik. English surtitles included.',
          TR: 'Sürükleyici bir psikolojik gerilim. Yönetmenler: Katharina Reinthaller, Barış Celiloğlu. Oyuncular: Barış Celiloğlu, Göktay Tosun, Yener Çelik. İngilizce üst yazılı.'
        },
        image: '/images/olum-ve-kiz.jpg',
        dates: '4 June 2017, 20:00',
        venue: 'Arcola Theatre, 24 Ashwin Street, London E8 3DL',
        duration: '2h',
        ticketPrice: 'See Archive',
        sortDate: '2017-06-04'
      },
      {
        id: 'ufacik-tefecik-karadut',
        title: 'Ufacık Tefecik Karadut',
        titleEn: 'Tiny Little Black Mulberry',
        author: 'Umut Uğur',
        status: 'Past',
        description: {
          EN: "A children's play in Turkish for ages 5 to 75. Written and directed by Umut Uğur, designed by Katerina Theofanopoulou, original music by Muharrem Karaer and Erhan Şakar.",
          TR: "5'den 75'e herkes için Türkçe çocuk oyunu. Yazan ve yöneten: Umut Uğur, tasarım: Katerina Theofanopoulou, müzik: Muharrem Karaer ve Erhan Şakar."
        },
        image: '/images/ufacik-tefecik-karadut.jpg',
        dates: '15 April 2018',
        venue: 'Pan Productions, London',
        duration: 'Children\'s Play',
        ticketPrice: 'See Archive',
        sortDate: '2018-04-15'
      },
      {
        id: 'ferhangi-seyler',
        title: 'Ferhangi Şeyler',
        titleEn: 'Ferhangi Things',
        author: 'Ferhan Şensoy',
        status: 'Past',
        description: {
          EN: 'A legendary one-man show by the iconic Turkish comedian and theatre artist Ferhan Şensoy. An unforgettable evening of humor, satire, and theatrical brilliance.',
          TR: 'Ferhan Şensoy&apos;un efsanevi tek kişilik gösterisi. Mizah, hiciv ve tiyatro dolu unutulmaz bir gece.'
        },
        image: '/images/ferhangi-seyler.jpg',
        dates: '10 June 2017',
        venue: 'Pan Productions, London',
        duration: 'One-Man Show',
        ticketPrice: 'See Archive',
        sortDate: '2017-06-10'
      },
    ],
    art: [
      // Art productions will be added here
    ],
    music: [
      {
        id: 'sakali-akustik',
        title: 'ŞAKALI AKUSTİK',
        author: 'Harun Tekin & Koray Candemir',
        status: 'Past',
        description: {
          EN: 'Two powerful voices of the rock scene — Mor ve Ötesi vocalist Harun Tekin and Kargo vocalist Koray Candemir take the "ŞAKALI AKUSTİK" stage, performing their own songs, each other\'s works, and their favourite tracks in stripped-back acoustic arrangements.\n\nWith plenty of conversation, laughter, and a heartfelt atmosphere, this special performance offers a warm concert experience that feels like music being made at home.',
          TR: 'Rock sahnesinin iki güçlü sesi, "Mor ve Ötesi"\'nin solisti Harun Tekin ve "Kargo"\'nun solisti Koray Candemir, "ŞAKALI AKUSTİK" sahnesinde; kendi şarkılarını, birbirlerinin eserlerini ve en sevdikleri parçaları sade akustik düzenlemelerle yorumluyor.\n\nBol sohbetli, bol kahkahalı ve içten atmosferiyle bu özel performans, seyirciye adeta evde müzik yapılıyormuş hissi veren sıcacık bir konser deneyimi sunuyor.'
        },
        image: '/images/sakali-akustik.jpg',
        dates: '26 March 2026',
        venue: 'Islington Assembly Hall, London',
        duration: 'Acoustic Concert',
        ticketPrice: 'See Archive',
        sortDate: '2026-03-26'
      },
      {
        id: 'gripin-jazz-cafe',
        title: 'GRİPİN returns to London',
        author: '',
        status: 'Past',
        description: {
          EN: 'GRiPİN is back at one of London\'s most iconic venues, Jazz Cafe, for a special live performance. Join us for an unforgettable night of powerful music, featuring special guest IKIYEONKALA.',
          TR: 'GRiPİN, Londra\'nın en ikonik mekanlarından Jazz Cafe\'de özel bir canlı performans için geri döndü. Özel konuk IKIYEONKALA ile güçlü müzik dolu unutulmaz bir geceye katılın.'
        },
        image: '/videos/showcase.mp4',
        dates: 'Sunday, January 11, 2026, 7:00 PM',
        venue: 'Jazz Cafe, Camden Town',
        duration: 'Concert',
        ticketPrice: 'See Archive',
        sortDate: '2026-01-11'
      },
      {
        id: 'jem-candlelit-concert',
        title: 'Jem: Intimate Candlelit Concert',
        author: '',
        status: 'Past',
        description: {
          EN: 'Experience an intimate candlelit concert with Jem at St. Pancras Old Church on December 8. Let her ethereal voice and poetic melodies create a soulful, unforgettable evening. Tickets are limited, reserve yours now!',
          TR: 'St. Pancras Old Church\'ta Jem ile samimi mum ışığında bir konser deneyimi. Eterik sesi ve şiirsel melodileriyle ruhani, unutulmaz bir akşam. Biletler sınırlı sayıda!'
        },
        image: '/images/jem-concert.jpg',
        dates: 'December 8, 2025',
        venue: 'St. Pancras Old Church, London',
        duration: 'Concert',
        ticketPrice: 'See Archive',
        sortDate: '2025-12-08'
      },
      {
        id: 'erkan-ogur-bulent',
        title: 'Erkan Oğur & Bülent Ortaçgil',
        author: '',
        status: 'Past',
        description: {
          EN: 'An intimate concert featuring legendary Turkish musicians Erkan Oğur and Bülent Ortaçgil.',
          TR: 'Efsanevi Türk müzisyenler Erkan Oğur ve Bülent Ortaçgil'in samimi konseri.'
        },
        image: '/images/erkan-ogur-bulent.jpg',
        dates: '27 November 2016, 19:00',
        venue: 'Islington Assembly Hall, Upper St, London N1 2UD',
        duration: 'Concert',
        ticketPrice: 'See Archive',
        sortDate: '2016-11-27'
      },
      {
        id: 'erkan-ogur-ismail',
        title: 'Erkan Oğur & İsmail Hakkı Demircioğlu Konseri',
        author: '',
        status: 'Past',
        description: {
          EN: 'A captivating musical collaboration between legendary Turkish musicians Erkan Oğur and İsmail Hakkı Demircioğlu. "Bütün türküler güzeldir, hayatın ta kendisidir. Salt müzik değildir ve bu ülkenin eline tutulan hazinesidir."',
          TR: 'Efsanevi Türk müzisyenler Erkan Oğur ve İsmail Hakkı Demircioğlu'nun büyüleyici müzikal buluşması. "Bütün türküler güzeldir, hayatın ta kendisidir."'
        },
        image: '/images/erkan-ogur-ismail.jpg',
        dates: '20 March 2011, 18:45',
        venue: 'Union Chapel, Compton Terrace, London N1 2UN',
        duration: 'Concert',
        ticketPrice: 'See Archive',
        sortDate: '2011-03-20'
      },
      {
        id: 'olcay-bayir-fundraiser',
        title: 'Olcay Bayır Fundraiser Concert',
        author: '',
        status: 'Past',
        description: {
          EN: 'A special fundraiser concert featuring the talented Kurdish-Turkish singer Olcay Bayır. Supporting Djanan Turan, Erdogan Bayir, Ece & Debora. Live music and DJ Ece till 1AM.',
          TR: 'Başarılı Kürt-Türk şarkıcı Olcay Bayır'ın yer aldığı özel bir destek konseri. Djanan Turan, Erdoğan Bayır, Ece & Debora destekliyor. Canlı müzik ve DJ Ece sabaha kadar.'
        },
        image: '/images/olcay-bayir-fundraiser.jpg',
        dates: 'Friday 21 April, 7:30PM-1:00AM',
        venue: 'Epic Dalston, 13 Stoke Newington Rd N16 8BH',
        duration: 'Concert & DJ Event',
        ticketPrice: 'See Archive',
        sortDate: '2017-04-21'
      },
    ],
    film: [
      // Film productions will be added here
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
      case 'On Sale':
        return 'bg-accent text-accent-foreground';
      case 'Upcoming':
        return 'bg-primary text-primary-foreground';
      case 'Past':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Combine all productions for structured data
  const allProductions = [...categories.theatre, ...categories.music, ...categories.art, ...categories.film];

  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allProductions.map((prod, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": prod.title,
      "description": prod.description,
      "startDate": prod.dates,
      "location": {
        "@type": "Place",
        "name": prod.venue,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      },
      "performer": {
        "@type": "PerformingGroup",
        "name": "Pan Productions"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Pan Productions",
        "url": "https://www.panproductions.co.uk"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('seo.productions.title')}
        description={t('seo.productions.description')}
        structuredData={eventsSchema}
      />
      
      {/* Hero Section with Background Image */}
      <section className="relative py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/images/hero-slide-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t('productions.title')}
          </h1>
          {/* Subtitle removed as requested */}
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* All Productions in a single list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...categories.theatre, ...categories.art, ...categories.music, ...categories.film]
            .sort((a, b) => {
              const dateA = a.sortDate || '1900-01-01';
              const dateB = b.sortDate || '1900-01-01';
              const now = new Date().toISOString().split('T')[0];
              const aUpcoming = dateA >= now;
              const bUpcoming = dateB >= now;
              if (aUpcoming && !bUpcoming) return -1;
              if (!aUpcoming && bUpcoming) return 1;
              if (aUpcoming && bUpcoming) return dateA.localeCompare(dateB);
              return dateB.localeCompare(dateA);
            })
            .map((production) => (
              <ProductionCard key={production.id} production={production} getStatusColor={getStatusColor} t={t} />
            ))}
        </div>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('productions.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('productions.ctaDescription')}
          </p>
          <Link to="/contact">
            <Button size="lg" className="px-8">
              {t('productions.contactUs')}
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Productions;
