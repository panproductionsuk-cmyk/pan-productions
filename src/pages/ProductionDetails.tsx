import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Users, Info } from 'lucide-react';
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
  gallery?: string[];
  cast?: string[];
  director?: string;
  credits?: { role: string; name: string }[];
}

// Production data - same as in Productions.tsx
const allProductions: Production[] = [
  {
    id: 'love-of-rumi',
    title: 'Love of Rumi: Flow and Spirit',
    titleEn: 'Love of Rumi: Flow and Spirit',
    author: 'Aya Art, Berrin Bugay Lawler',
    status: 'Past',
    description: {
      EN: 'Experience the essence of Rumi\'s poetry through a captivating fusion of fashion and performance, celebrating love, flow, and spirit. A mystical journey featuring whirling dervish dance, choir, poetry reading, solo performances, and a costume parade with stylised 13th century costumes. This is not just a stage performance; it is an artistic experience that bridges the heart, mind, and soul.',
      TR: "Rumi'nin şiirlerinin özünü, aşk, akış ve ruhu kutlayan büyüleyici bir moda ve performans füzyonu ile deneyimleyin. Semazen dansı, koro, şiir okuma, solo performanslar ve 13. yüzyıl kostümleriyle kostüm gösterisi içeren mistik bir yolculuk. Bu sadece bir sahne performansı değil; kalbi, zihni ve ruhu birleştiren sanatsal bir deneyimdir."
    },
    image: '/images/love-of-rumi.jpg',
    dates: 'Friday, March 21, 2026, 7:00 PM',
    venue: 'Mumford Theater, Cambridge',
    duration: 'Performative Fashion Show',
    ticketPrice: 'See Archive',
    sortDate: '2026-03-21',
    gallery: ['/images/love-of-rumi.jpg'],
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
    sortDate: '2026-04-01',
    gallery: ['/images/sus.jpg'],
    director: 'Ali Has',
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
    sortDate: '2020-01-06',
    gallery: ['/images/importance-of-being-earnest.jpg'],
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
    sortDate: '2024-03-27',
    gallery: ['/images/tut-elimden-rovni.jpg'],
    director: 'Göktay Tosun',
    cast: ['Ada Burke', 'Göktay Tosun'],
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
    sortDate: '2019-03-11',
    gallery: ['/images/ben-kolay-olmem.jpg'],
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
    sortDate: '2017-06-04',
    gallery: ['/images/olum-ve-kiz.jpg'],
    director: 'Katharina Reinthaller, Barış Celiloğlu',
    cast: ['Barış Celiloğlu', 'Göktay Tosun', 'Yener Çelik'],
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
    sortDate: '2018-04-15',
    gallery: ['/images/ufacik-tefecik-karadut.jpg'],
    director: 'Umut Uğur',
    credits: [
      { role: 'Writer & Director', name: 'Umut Uğur' },
      { role: 'Design', name: 'Katerina Theofanopoulou' },
      { role: 'Music', name: 'Muharrem Karaer, Erhan Şakar' },
    ],
  },
  {
    id: 'ferhangi-seyler',
    title: 'Ferhangi Şeyler',
    titleEn: 'Ferhangi Things',
    author: 'Ferhan Şensoy',
    status: 'Past',
    description: {
      EN: 'A legendary one-man show by the iconic Turkish comedian and theatre artist Ferhan Şensoy. An unforgettable evening of humor, satire, and theatrical brilliance.',
      TR: "Ferhan Şensoy'un efsanevi tek kişilik gösterisi. Mizah, hiciv ve tiyatro dolu unutulmaz bir gece."
    },
    image: '/images/ferhangi-seyler.jpg',
    dates: '10 June 2017',
    venue: 'Pan Productions, London',
    duration: 'One-Man Show',
    ticketPrice: 'See Archive',
    sortDate: '2017-06-10',
    gallery: ['/images/ferhangi-seyler.jpg'],
  },
  {
    id: 'sakali-akustik',
    title: 'ŞAKALI AKUSTİK',
    author: 'Harun Tekin & Koray Candemir',
    status: 'Past',
    description: {
      EN: 'Two powerful voices of the rock scene — Mor ve Ötesi vocalist Harun Tekin and Kargo vocalist Koray Candemir take the "ŞAKALI AKUSTİK" stage, performing their own songs, each other\'s works, and their favourite tracks in stripped-back acoustic arrangements.\n\nWith plenty of conversation, laughter, and a heartfelt atmosphere, this special performance offers a warm concert experience that feels like music being made at home.',
      TR: "Rock sahnesinin iki güçlü sesi, 'Mor ve Ötesi'nin solisti Harun Tekin ve 'Kargo'nun solisti Koray Candemir, 'ŞAKALI AKUSTİK' sahnesinde; kendi şarkılarını, birbirlerinin eserlerini ve en sevdikleri parçaları sade akustik düzenlemelerle yorumluyor.\n\nBol sohbetli, bol kahkahalı ve içten atmosferiyle bu özel performans, seyirciye adeta evde müzik yapılıyormuş hissi veren sıcacık bir konser deneyimi sunuyor."
    },
    image: '/images/sakali-akustik.jpg',
    dates: '26 March 2026',
    venue: 'Islington Assembly Hall, London',
    duration: 'Acoustic Concert',
    ticketPrice: 'See Archive',
    sortDate: '2026-03-26',
    gallery: ['/images/sakali-akustik.jpg'],
  },
  {
    id: 'gripin-jazz-cafe',
    title: 'GRİPİN returns to London',
    author: '',
    status: 'Past',
    description: {
      EN: 'GRiPİN is back at one of London\'s most iconic venues, Jazz Cafe, for a special live performance. Join us for an unforgettable night of powerful music, featuring special guest IKIYEONKALA.',
      TR: "GRiPİN, Londra'nın en ikonik mekanlarından Jazz Cafe'de özel bir canlı performans için geri döndü. Özel konuk IKIYEONKALA ile güçlü müzik dolu unutulmaz bir geceye katılın."
    },
    image: '/videos/showcase.mp4',
    dates: 'Sunday, January 11, 2026, 7:00 PM',
    venue: 'Jazz Cafe, Camden Town',
    duration: 'Concert',
    ticketPrice: 'See Archive',
    sortDate: '2026-01-11',
    gallery: ['/videos/showcase.mp4'],
  },
  {
    id: 'jem-candlelit-concert',
    title: 'Jem: Intimate Candlelit Concert',
    author: '',
    status: 'Past',
    description: {
      EN: 'Experience an intimate candlelit concert with Jem at St. Pancras Old Church on December 8. Let her ethereal voice and poetic melodies create a soulful, unforgettable evening. Tickets are limited, reserve yours now!',
      TR: "St. Pancras Old Church'ta Jem ile samimi mum ışığında bir konser deneyimi. Eterik sesi ve şiirsel melodileriyle ruhani, unutulmaz bir akşam. Biletler sınırlı sayıda!"
    },
    image: '/images/jem-concert.jpg',
    dates: 'December 8, 2025',
    venue: 'St. Pancras Old Church, London',
    duration: 'Concert',
    ticketPrice: 'See Archive',
    sortDate: '2025-12-08',
    gallery: ['/images/jem-concert.jpg'],
  },
  {
    id: 'erkan-ogur-bulent',
    title: 'Erkan Oğur & Bülent Ortaçgil',
    author: '',
    status: 'Past',
    description: {
      EN: 'An intimate concert featuring legendary Turkish musicians Erkan Oğur and Bülent Ortaçgil.',
      TR: "Efsanevi Türk müzisyenler Erkan Oğur ve Bülent Ortaçgil'in samimi konseri."
    },
    image: '/images/erkan-ogur-bulent.jpg',
    dates: '27 November 2016, 19:00',
    venue: 'Islington Assembly Hall, Upper St, London N1 2UD',
    duration: 'Concert',
    ticketPrice: 'See Archive',
    sortDate: '2016-11-27',
    gallery: ['/images/erkan-ogur-bulent.jpg'],
  },
  {
    id: 'erkan-ogur-ismail',
    title: 'Erkan Oğur & İsmail Hakkı Demircioğlu Konseri',
    author: '',
    status: 'Past',
    description: {
      EN: 'A captivating musical collaboration between legendary Turkish musicians Erkan Oğur and İsmail Hakkı Demircioğlu. "Bütün türküler güzeldir, hayatın ta kendisidir. Salt müzik değildir ve bu ülkenin eline tutulan hazinesidir."',
      TR: "Efsanevi Türk müzisyenler Erkan Oğur ve İsmail Hakkı Demircioğlu'nun büyüleyici müzikal buluşması. 'Bütün türküler güzeldir, hayatın ta kendisidir.'"
    },
    image: '/images/erkan-ogur-ismail.jpg',
    dates: '20 March 2011, 18:45',
    venue: 'Union Chapel, Compton Terrace, London N1 2UN',
    duration: 'Concert',
    ticketPrice: 'See Archive',
    sortDate: '2011-03-20',
    gallery: ['/images/erkan-ogur-ismail.jpg'],
  },
  {
    id: 'olcay-bayir-fundraiser',
    title: 'Olcay Bayır Fundraiser Concert',
    author: '',
    status: 'Past',
    description: {
      EN: 'A special fundraiser concert featuring the talented Kurdish-Turkish singer Olcay Bayır. Supporting Djanan Turan, Erdogan Bayir, Ece & Debora. Live music and DJ Ece till 1AM.',
      TR: "Başarılı Kürt-Türk şarkıcı Olcay Bayır'ın yer aldığı özel bir destek konseri. Djanan Turan, Erdoğan Bayır, Ece & Debora destekliyor. Canlı müzik ve DJ Ece sabaha kadar."
    },
    image: '/images/olcay-bayir-fundraiser.jpg',
    dates: 'Friday 21 April, 7:30PM-1:00AM',
    venue: 'Epic Dalston, 13 Stoke Newington Rd N16 8BH',
    duration: 'Concert & DJ Event',
    ticketPrice: 'See Archive',
    sortDate: '2017-04-21',
    gallery: ['/images/olcay-bayir-fundraiser.jpg'],
  },
];

const ProductionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  
  const production = allProductions.find((p) => p.id === id);
  
  if (!production) {
    return <Navigate to="/productions" replace />;
  }

  const isVideo = production.image.endsWith('.mp4') || production.image.endsWith('.webm');
  const description = typeof production.description === 'string' 
    ? production.description 
    : (language === 'EN' ? production.description.EN : production.description.TR);

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

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": production.title,
    "description": description,
    "startDate": production.sortDate,
    "location": {
      "@type": "Place",
      "name": production.venue,
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
    },
    "image": production.image
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${production.title} | Pan Productions`}
        description={description.substring(0, 160)}
        keywords={`${production.title}, Pan Productions, theatre London, ${production.author}`}
        url={`/productions/${production.id}`}
        structuredData={eventSchema}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          {isVideo ? (
            <video
              src={production.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={production.image}
              alt={production.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link 
            to="/productions" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'EN' ? 'Back to Productions' : 'Prodüksiyonlara Dön'}</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Info */}
            <div>
              <Badge className={`${getStatusColor(production.status)} mb-4`}>
                {production.status}
              </Badge>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                {production.title}
              </h1>
              
              {production.titleEn && production.title !== production.titleEn && (
                <p className="text-xl text-muted-foreground mb-4 italic">
                  {production.titleEn}
                </p>
              )}
              
              {production.author && (
                <p className="text-xl text-primary font-semibold mb-6">
                  {t('productions.by')} {production.author}
                </p>
              )}

              {/* Event Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Date' : 'Tarih'}</p>
                      <p className="font-semibold text-foreground">{production.dates}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Venue' : 'Mekan'}</p>
                      <p className="font-semibold text-foreground">{production.venue}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Duration' : 'Süre'}</p>
                      <p className="font-semibold text-foreground">{production.duration}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-border/60">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === 'EN' ? 'Tickets' : 'Bilet'}</p>
                      <p className="font-semibold text-foreground">{production.ticketPrice}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {production.ticketLink && production.status !== 'Past' && (
                  <Button
                    variant="spotlight"
                    size="lg"
                    className="px-8"
                    onClick={() => window.open(production.ticketLink, '_blank')}
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    {production.status === 'On Sale' ? t('productions.buyTickets') : t('productions.comingSoon')}
                  </Button>
                )}
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="px-8">
                    <Info className="w-4 h-4 mr-2" />
                    {language === 'EN' ? 'Contact Us' : 'Bize Ulaşın'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Main Image */}
            <div className="relative">
              <div className="production-card overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center">
                  {/* Blurred Background */}
                  <div className="absolute inset-0">
                    {isVideo ? (
                      <video
                        src={production.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                      />
                    ) : (
                      <img
                        src={production.image}
                        alt=""
                        className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                      />
                    )}
                  </div>
                  {/* Main Media */}
                  {isVideo ? (
                    <video
                      src={production.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="relative z-10 w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={production.image}
                      alt={production.title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
              {language === 'EN' ? 'About This Production' : 'Bu Prodüksiyon Hakkında'}
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              {description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cast & Credits Section */}
      {(production.cast || production.director || production.credits) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
                {language === 'EN' ? 'Cast & Credits' : 'Oyuncular ve Ekip'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {production.director && (
                  <Card className="bg-card/50 border-border/60">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {language === 'EN' ? 'Director' : 'Yönetmen'}
                        </h3>
                      </div>
                      <p className="text-foreground">{production.director}</p>
                    </CardContent>
                  </Card>
                )}
                
                {production.cast && production.cast.length > 0 && (
                  <Card className="bg-card/50 border-border/60">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {language === 'EN' ? 'Cast' : 'Oyuncular'}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {production.cast.map((member, index) => (
                          <li key={index} className="text-foreground">{member}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {production.credits && production.credits.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-xl font-bold mb-4 text-foreground">
                    {language === 'EN' ? 'Additional Credits' : 'Ek Katkılar'}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {production.credits.map((credit, index) => (
                      <Card key={index} className="bg-card/50 border-border/60">
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground mb-1">{credit.role}</p>
                          <p className="font-semibold text-foreground">{credit.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {production.gallery && production.gallery.length > 1 && (
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center text-foreground">
              {language === 'EN' ? 'Gallery' : 'Galeri'}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {production.gallery.map((media, index) => {
                    const isGalleryVideo = media.endsWith('.mp4') || media.endsWith('.webm');
                    return (
                      <CarouselItem key={index}>
                        <div className="production-card overflow-hidden">
                          <div className="relative aspect-video bg-muted flex items-center justify-center">
                            <div className="absolute inset-0">
                              {isGalleryVideo ? (
                                <video
                                  src={media}
                                  className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                                />
                              ) : (
                                <img
                                  src={media}
                                  alt=""
                                  className="w-full h-full object-cover blur-xl scale-110 opacity-60"
                                />
                              )}
                            </div>
                            {isGalleryVideo ? (
                              <video
                                src={media}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                                className="relative z-10 w-full h-full object-contain"
                              />
                            ) : (
                              <img
                                src={media}
                                alt={`${production.title} - Image ${index + 1}`}
                                className="relative z-10 w-full h-full object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto p-8 rounded-lg bg-card/50 border border-border/60">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
              {language === 'EN' ? 'Interested in Our Productions?' : 'Prodüksiyonlarımızla İlgileniyor musunuz?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'EN' 
                ? 'Get in touch with us for more information about upcoming shows and events.'
                : 'Yaklaşan gösteriler ve etkinlikler hakkında daha fazla bilgi için bizimle iletişime geçin.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productions">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'EN' ? 'View All Productions' : 'Tüm Prodüksiyonlar'}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="spotlight" size="lg">
                  {language === 'EN' ? 'Contact Us' : 'Bize Ulaşın'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionDetails;
