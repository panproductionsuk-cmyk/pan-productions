import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'TR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    // Navigation
    'nav.productions': 'Productions',
    'nav.marketing': 'PR & Marketing',
    'nav.academy': 'Pan Academy',
    'nav.workshops': 'Workshops',
    'nav.lessons': 'Lessons',
    'nav.about': 'About Us',
    'nav.news': 'News & Press',
    'nav.contact': 'Contact Us',
    'nav.getInvolved': 'Get Involved',
    
    // Hero Section
    'hero.slide1.title': 'Bringing Stories to Life on Stage',
    'hero.slide1.subtitle': 'Productions & Experience',
    'hero.slide1.description': 'Experience unforgettable theater productions with Pan Productions.',
    'hero.slide1.cta': 'See Upcoming Shows',
    
    'hero.slide2.title': 'Promoting Stories Beyond the Stage',
    'hero.slide2.subtitle': 'PR & Marketing',
    'hero.slide2.description': 'Our PR and marketing team ensures every production reaches the audience it deserves.',
    'hero.slide2.cta': 'Learn About Our PR Services',
    
    'hero.slide3.title': 'Empowering Creativity Through Pan Academy',
    'hero.slide3.subtitle': 'Pan Academy Workshops',
    'hero.slide3.description': 'Our workshops inspire and nurture the next generation of performers.',
    'hero.slide3.cta': 'Join a Workshop',
    
    // Index Page
    'index.whatWeOffer': 'What We Offer',
    'index.discover': 'Discover Pan Productions',
    'index.discoverDescription': 'From professional theatre productions to comprehensive drama education, we bring stories to life and nurture the next generation of performers.',
    
    'index.highlights.productions.title': 'Current Productions',
    'index.highlights.productions.description': 'Experience our acclaimed theatrical performances featuring talented casts and captivating stories.',
    'index.highlights.academy.title': 'Pan Academy',
    'index.highlights.academy.description': 'Professional workshops and lessons for actors of all levels, taught by industry experts.',
    'index.highlights.news.title': 'News & Press',
    'index.highlights.news.description': 'Stay updated with our latest news, reviews, and press coverage from the theatre world.',
    'index.highlights.exploreMore': 'Explore More',
    
    'index.whyChoose': 'Why Choose Us',
    'index.excellence': 'Excellence in Every Performance',
    'index.excellenceDescription': 'Discover what makes Pan Productions a leading name in London\'s theatre scene',
    
    'index.feature.award.title': 'Award-Winning Productions',
    'index.feature.award.description': 'Recognized for excellence with multiple theatre awards and critical acclaim',
    'index.feature.cast.title': 'Expert Cast & Crew',
    'index.feature.cast.description': 'Talented professionals with years of industry experience and passion',
    'index.feature.community.title': 'Growing Community',
    'index.feature.community.description': 'Join thousands of theatre enthusiasts and aspiring performers',
    'index.feature.passion.title': 'Passion for Theatre',
    'index.feature.passion.description': 'Dedicated to bringing powerful stories and performances to life',
    
    'index.featured': 'On Stage Now',
    'index.featuredTitle': 'Featured Productions',
    'index.featuredDescription': 'Experience our current theatrical performances',
    'index.featured.earnest.title': 'The Importance of Being Earnest',
    'index.featured.earnest.subtitle': 'A Comedy of Manners',
    'index.featured.earnest.status': 'Now Playing',
    'index.featured.earnest.description': 'Oscar Wilde\'s brilliant masterpiece returns with Pan Productions\' acclaimed cast.',
    'index.featured.workshop.title': 'Summer Theatre Workshop',
    'index.featured.workshop.subtitle': 'Intensive Drama Course',
    'index.featured.workshop.status': 'Enrolling Now',
    'index.featured.workshop.description': 'Join our immersive workshop and learn from industry professionals.',
    'index.reviews': 'Reviews',
    'index.learnMore': 'Learn More',
    'index.bookNow': 'Book Now',
    'index.viewAll': 'View All Productions',
    
    'index.testimonials': 'Testimonials',
    'index.testimonialsTitle': 'What People Say',
    'index.testimonialsDescription': 'Hear from our audience and students about their experiences',
    'index.testimonial1.name': 'Sarah Mitchell',
    'index.testimonial1.role': 'Theatre Enthusiast',
    'index.testimonial1.content': 'Pan Productions consistently delivers outstanding performances. The attention to detail and passion of the cast is remarkable.',
    'index.testimonial2.name': 'James Wilson',
    'index.testimonial2.role': 'Workshop Student',
    'index.testimonial2.content': 'The workshops transformed my acting skills. The instructors are knowledgeable, supportive, and truly invested in your growth.',
    'index.testimonial3.name': 'Emily Thompson',
    'index.testimonial3.role': 'Regular Attendee',
    'index.testimonial3.content': 'Every production is a masterpiece. Pan Productions has become my go-to theatre company in London.',
    
    'index.cta.title': 'Ready to Experience the Magic?',
    'index.cta.description': 'Join us for an unforgettable theatrical experience. Book your tickets now or explore our workshops to start your acting journey.',
    'index.cta.bookTickets': 'Book Tickets',
    'index.cta.exploreWorkshops': 'Explore Workshops',
    
    // Newsletter
    'newsletter.title': 'Stay in the Spotlight',
    'newsletter.description': 'Get exclusive updates on upcoming productions, workshop announcements, and behind-the-scenes content delivered straight to your inbox.',
    'newsletter.placeholder': 'Enter your email address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.noSpam': 'No spam. Unsubscribe anytime.',
    'newsletter.success': 'Welcome to Pan Productions!',
    'newsletter.successMessage': 'You\'ve successfully subscribed to our newsletter.',
    
    // Footer
    'footer.tagline': 'Bringing stories to life through exceptional theatre',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',
  },
  TR: {
    // Navigation
    'nav.productions': 'Prodüksiyonlar',
    'nav.marketing': 'PR & Pazarlama',
    'nav.academy': 'Pan Akademi',
    'nav.workshops': 'Atölyeler',
    'nav.lessons': 'Dersler',
    'nav.about': 'Hakkımızda',
    'nav.news': 'Haberler & Basın',
    'nav.contact': 'İletişim',
    'nav.getInvolved': 'Bize Katılın',
    
    // Hero Section
    'hero.slide1.title': 'Sahneye Hayat Veriyoruz',
    'hero.slide1.subtitle': 'Prodüksiyonlar & Deneyim',
    'hero.slide1.description': 'Pan Productions ile unutulmaz tiyatro prodüksiyonlarını yaşayın.',
    'hero.slide1.cta': 'Yaklaşan Gösterileri İnceleyin',
    
    'hero.slide2.title': 'Hikayelerimizi Sahnenin Ötesine Taşıyoruz',
    'hero.slide2.subtitle': 'PR & Pazarlama',
    'hero.slide2.description': 'PR ve pazarlama ekibimiz, her prodüksiyonun doğru izleyiciye ulaşmasını sağlar.',
    'hero.slide2.cta': 'PR Hizmetlerimizi Keşfedin',
    
    'hero.slide3.title': 'Pan Akademi ile Yaratıcılığa Güç Veriyoruz',
    'hero.slide3.subtitle': 'Pan Akademi Atölyeleri',
    'hero.slide3.description': 'Atölyelerimiz gelecek nesil sanatçılara ilham verir ve onları geliştirir.',
    'hero.slide3.cta': 'Atölyelere Katılın',
    
    // Index Page
    'index.whatWeOffer': 'Neler Sunuyoruz',
    'index.discover': 'Pan Productions\'ı Keşfedin',
    'index.discoverDescription': 'Profesyonel tiyatro prodüksiyonlarından kapsamlı drama eğitimine kadar, hikayelere hayat veriyoruz ve gelecek nesil sanatçıları yetiştiriyoruz.',
    
    'index.highlights.productions.title': 'Güncel Prodüksiyonlar',
    'index.highlights.productions.description': 'Yetenekli oyuncu kadrosu ve büyüleyici hikayeleriyle dikkat çeken tiyatro gösterilerimizi deneyimleyin.',
    'index.highlights.academy.title': 'Pan Akademi',
    'index.highlights.academy.description': 'Her seviyeden oyuncu için, sektör uzmanları tarafından verilen profesyonel atölyeler ve dersler.',
    'index.highlights.news.title': 'Haberler & Basın',
    'index.highlights.news.description': 'En son haberlerimiz, eleştirilerimiz ve tiyatro dünyasından basın haberlerimizle güncel kalın.',
    'index.highlights.exploreMore': 'Daha Fazla Keşfet',
    
    'index.whyChoose': 'Neden Bizi Seçmelisiniz',
    'index.excellence': 'Her Gösteride Mükemmellik',
    'index.excellenceDescription': 'Pan Productions\'ı Londra tiyatro sahnesinde öncü bir isim yapan özellikleri keşfedin',
    
    'index.feature.award.title': 'Ödüllü Prodüksiyonlar',
    'index.feature.award.description': 'Birçok tiyatro ödülü ve eleştirmen beğenisiyle tanınan mükemmel yapımlar',
    'index.feature.cast.title': 'Uzman Kadro & Ekip',
    'index.feature.cast.description': 'Yılların deneyimi ve tutkusuyla donanmış yetenekli profesyoneller',
    'index.feature.community.title': 'Büyüyen Topluluk',
    'index.feature.community.description': 'Binlerce tiyatro severi ve gelecek vaat eden sanatçıya katılın',
    'index.feature.passion.title': 'Tiyatro Tutkusu',
    'index.feature.passion.description': 'Güçlü hikayeleri ve performansları sahneye taşımaya adanmışlık',
    
    'index.featured': 'Şu Anda Sahnede',
    'index.featuredTitle': 'Öne Çıkan Prodüksiyonlar',
    'index.featuredDescription': 'Güncel tiyatro gösterilerimizi deneyimleyin',
    'index.featured.earnest.title': 'Ciddi Olmanın Önemi',
    'index.featured.earnest.subtitle': 'Bir Görgü Komedisi',
    'index.featured.earnest.status': 'Şimdi Sahnede',
    'index.featured.earnest.description': 'Oscar Wilde\'ın efsanevi eseri Pan Productions\'ın beğenilen kadrosuyla sahneye dönüyor.',
    'index.featured.workshop.title': 'Yaz Tiyatro Atölyesi',
    'index.featured.workshop.subtitle': 'Yoğun Drama Kursu',
    'index.featured.workshop.status': 'Kayıtlar Başladı',
    'index.featured.workshop.description': 'Kapsamlı atölyemize katılın ve sektör profesyonellerinden öğrenin.',
    'index.reviews': 'Değerlendirme',
    'index.learnMore': 'Detaylı Bilgi',
    'index.bookNow': 'Hemen Rezervasyon',
    'index.viewAll': 'Tüm Prodüksiyonları Görüntüle',
    
    'index.testimonials': 'Görüşler',
    'index.testimonialsTitle': 'Katılımcılarımız Ne Diyor',
    'index.testimonialsDescription': 'İzleyicilerimizden ve öğrencilerimizden deneyimlerini dinleyin',
    'index.testimonial1.name': 'Sarah Mitchell',
    'index.testimonial1.role': 'Tiyatro Sever',
    'index.testimonial1.content': 'Pan Productions sürekli olarak olağanüstü performanslar sunuyor. Detaylara gösterilen özen ve oyuncuların tutkusu gerçekten etkileyici.',
    'index.testimonial2.name': 'James Wilson',
    'index.testimonial2.role': 'Atölye Katılımcısı',
    'index.testimonial2.content': 'Atölyeler oyunculuk becerilerimi tamamen değiştirdi. Eğitmenler bilgili, destekleyici ve gelişiminize gerçekten önem veriyorlar.',
    'index.testimonial3.name': 'Emily Thompson',
    'index.testimonial3.role': 'Düzenli Katılımcı',
    'index.testimonial3.content': 'Her prodüksiyon bir başyapıt. Pan Productions Londra\'da en çok tercih ettiğim tiyatro topluluğu oldu.',
    
    'index.cta.title': 'Büyüyü Yaşamaya Hazır Mısınız?',
    'index.cta.description': 'Unutulmaz bir tiyatro deneyimi için bize katılın. Hemen biletinizi alın veya oyunculuk yolculuğunuza başlamak için atölyelerimizi keşfedin.',
    'index.cta.bookTickets': 'Bilet Satın Al',
    'index.cta.exploreWorkshops': 'Atölyeleri Keşfet',
    
    // Newsletter
    'newsletter.title': 'Güncel Kalın',
    'newsletter.description': 'Yaklaşan prodüksiyonlar, atölye duyuruları ve sahne arkası içerikleri hakkında özel güncellemeleri doğrudan e-postanıza alın.',
    'newsletter.placeholder': 'E-posta adresinizi girin',
    'newsletter.subscribe': 'Abone Ol',
    'newsletter.subscribing': 'Abone olunuyor...',
    'newsletter.noSpam': 'Spam yok. İstediğiniz zaman abonelikten çıkabilirsiniz.',
    'newsletter.success': 'Pan Productions\'a Hoş Geldiniz!',
    'newsletter.successMessage': 'Bültenimize başarıyla abone oldunuz.',
    
    // Footer
    'footer.tagline': 'Olağanüstü tiyatro ile hikayelere hayat veriyoruz',
    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.contact': 'İletişim',
    'footer.followUs': 'Bizi Takip Edin',
    'footer.rights': 'Tüm hakları saklıdır.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'TR' ? 'TR' : 'EN') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
