/**
 * Single source of truth for contact details, social links and navigation.
 * Change values here — they are consumed across the site.
 */
export const siteConfig = {
  brand: {
    name: 'WAFRA',
    nameAr: 'وفرة',
    taglineFr: "Commerce pour l'industrie",
    taglineEn: 'Commerce for industry',
    taglineAr: 'تجارة من أجل الصناعة',
  },
  contact: {
    email: 'contact@wafra.tn',
    phone: '+216 71 000 000',
    phoneHref: 'tel:+21671000000',
    country: { fr: 'Tunisie', en: 'Tunisia', ar: 'تونس' },
    address: {
      fr: 'Tunisie · International',
      en: 'Tunisia · International',
      ar: 'تونس · دولي',
    },
    whatsapp: process.env.NEXT_PUBLIC_WAFRA_WHATSAPP_NUMBER ?? '',
  },
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com' },
    { name: 'Facebook', href: 'https://www.facebook.com' },
    { name: 'YouTube', href: 'https://www.youtube.com' },
  ],
  nav: {
    fr: [
      ['Accueil', '#home'],
      ['À propos', '#about'],
      ['Nos produits', '#products'],
      ['Nos services', '#services'],
      ['Export', '#export'],
      ['Contact', '#contact'],
    ],
    en: [
      ['Home', '#home'],
      ['About', '#about'],
      ['Products', '#products'],
      ['Services', '#services'],
      ['Export', '#export'],
      ['Contact', '#contact'],
    ],
    ar: [
      ['الرئيسية', '#home'],
      ['من نحن', '#about'],
      ['منتجاتنا', '#products'],
      ['خدماتنا', '#services'],
      ['التصدير', '#export'],
      ['اتصل بنا', '#contact'],
    ],
  },
} as const;

/** Industrial / import-export imagery (Unsplash, all verified reachable). */
const u = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const images = {
  heroPort: u('1494412574643-ff11b0a5c1c3', 1400),
  heroShip: u('1605745341112-85968b19335b', 1200),
  containers: u('1494412651409-8963ce7935a7', 1200),
  portCrane: u('1578575437130-527eed3abbec', 1200),
  airplane: u('1436491865332-7a61a109cc05', 1200),
  warehouse: u('1553413077-190dd305871c', 1200),
  logistics: u('1586528116311-ad8dd3c8310d', 1200),
  factory: u('1565793298595-6a879b1d9492', 1200),
  materials: u('1513828583688-c52646db42da', 1200),
  machines: u('1581092160562-40aa08e78837', 1200),
  electrical: u('1518770660439-4636190af475', 1200),
  motors: u('1487058792275-0ad4aaf24ca7', 1200),
  generator: u('1504328345606-18bbc8c9d7d1', 1200),
  it: u('1496181133206-80ce9b88a853', 1200),
  tools: u('1521737711867-e3b97375f902', 1200),
  spareParts: u('1581091226825-a6a2a5aee158', 1200),
  agriculture: u('1531973576160-7125cd663d86', 1200),
  restaurant: u('1616401784845-180882ba9ba8', 1200),
  stock: u('1605902711622-cfb43c4437b5', 1200),
  aboutFactory: u('1571068316344-75bc76f77890', 1200),
  exportShip: u('1587293852726-70cdb56c2866', 1200),
  office: u('1560472354-b33ff0c44a43', 1200),
  furniture: u('1524758631624-e2822e304c36', 1200),
} as const;
