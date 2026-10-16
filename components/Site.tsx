'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Cog,
  Factory,
  Facebook,
  Globe,
  Globe2,
  Hammer,
  Handshake,
  Layers,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  MoveHorizontal,
  Phone,
  Plane,
  Recycle,
  ShieldCheck,
  Tractor,
  TrendingUp,
  Utensils,
  Wrench,
  X,
  Youtube,
} from 'lucide-react';
import ContactForm, { type Lang } from '@/components/ContactForm';
import GlobalNetwork from '@/components/GlobalNetwork';
import {
  AnimatedCounter,
  AnimatedLine,
  EASE,
  FadeUp,
  ParallaxImage,
  RevealImage,
  Stagger,
  StaggerItem,
} from '@/components/motion';
import { images, siteConfig } from '@/lib/site-config';

const isRtl = (el: HTMLElement) => getComputedStyle(el).direction === 'rtl';

const WHATSAPP = siteConfig.contact.whatsapp;

const nav = siteConfig.nav;

type Triple = readonly [string, string, string];

const copy = {
  fr: {
    quote: 'Demander un devis',
    eyebrow: "COMMERCE POUR L'INDUSTRIE",
    h1a: 'WAFRA —',
    h1b: "Commerce pour l'industrie",
    heroSub: "Des solutions fiables pour l'approvisionnement, le commerce et l'exportation.",
    b1: 'Découvrir nos activités',
    b2: 'Nous contacter',
    chip1: 'Tunisie · International',
    chip2: 'Import · Export',
    servicesEyebrow: 'NOS SERVICES',
    servicesTitle: 'Des solutions pensées pour votre industrie',
    servicesSub: "Un partenaire unique pour l'approvisionnement, le commerce industriel et les échanges internationaux.",
    learnMore: 'En savoir plus',
    productsEyebrow: 'NOTRE SÉLECTION',
    productsTitle: 'Nos produits',
    productsSub: "Des solutions adaptées aux besoins de votre industrie.",
    dragHint: 'Glissez pour découvrir',
    aboutEyebrow: 'À PROPOS DE WAFRA',
    aboutTitle: 'Un partenaire fiable pour votre industrie',
    aboutP1:
      "WAFRA accompagne les entreprises et les professionnels dans leurs besoins d'approvisionnement, de commerce industriel et d'échanges internationaux.",
    aboutP2:
      "Grâce à un réseau de partenaires fiables, nous proposons des solutions adaptées aux exigences de chaque activité, avec un objectif constant : qualité, disponibilité et efficacité.",
    aboutTags: 'Nous intervenons pour',
    aboutAudience: ['Entreprises', 'Usines', 'Commerces', 'Ateliers', 'Hôtels', 'Restaurants'],
    domainsEyebrow: "NOS DOMAINES D'ACTIVITÉ",
    domainsTitle: 'Des produits et équipements pour tous les secteurs',
    domainsSub: 'Vous ne trouvez pas votre produit ? Envoyez-nous votre demande : nous étudions chaque proposition.',
    exportEyebrow: 'IMPORT & EXPORT',
    exportTitle: 'Import & Export',
    exportBody:
      "WAFRA facilite vos opérations d'importation et d'exportation grâce à un accompagnement adapté à vos besoins, de l'approvisionnement à la coordination logistique.",
    exportBullets: ['Sourcing international', 'Fret maritime & aérien', 'Suivi de bout en bout'],
    exportCta: 'Parler à notre équipe',
    intlEyebrow: 'AU SERVICE DE VOS AMBITIONS',
    intlTitle: 'Une présence internationale',
    intlSub: "Une vision globale, des partenaires fiables et des solutions adaptées à chaque marché.",
    contactEyebrow: 'CONTACT',
    contactTitle: 'Parlons de votre projet',
    contactAlt: "Besoin d'un produit, d'un équipement ou d'une solution d'approvisionnement ?",
    email: 'Email',
    phone: 'Téléphone',
    location: 'Localisation',
    whatsappTip: 'Contactez-nous sur WhatsApp',
    whatsappMsg: 'Bonjour WAFRA, je souhaite obtenir un devis.',
    footerQuick: 'Liens rapides',
    footerContact: 'Contact',
    footerFollow: 'Suivez-nous',
    footerRights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
  },
  en: {
    quote: 'Request a quote',
    eyebrow: 'COMMERCE FOR INDUSTRY',
    h1a: 'WAFRA —',
    h1b: 'Commerce for industry',
    heroSub: 'Reliable solutions for sourcing, trade and export.',
    b1: 'Discover our activities',
    b2: 'Contact us',
    chip1: 'Tunisia · International',
    chip2: 'Import · Export',
    servicesEyebrow: 'OUR SERVICES',
    servicesTitle: 'Solutions designed for your industry',
    servicesSub: 'A single partner for sourcing, industrial trade and international exchange.',
    learnMore: 'Learn more',
    productsEyebrow: 'OUR SELECTION',
    productsTitle: 'Our products',
    productsSub: 'Solutions tailored to the needs of your industry.',
    dragHint: 'Drag to discover',
    aboutEyebrow: 'ABOUT WAFRA',
    aboutTitle: 'A trusted partner for your industry',
    aboutP1:
      'WAFRA supports companies and professionals in their sourcing, industrial trade and international exchange needs.',
    aboutP2:
      'Thanks to a network of reliable partners, we offer solutions tailored to the demands of each business, with one constant goal: quality, availability and efficiency.',
    aboutTags: 'We work with',
    aboutAudience: ['Companies', 'Factories', 'Retail', 'Workshops', 'Hotels', 'Restaurants'],
    domainsEyebrow: 'OUR AREAS OF ACTIVITY',
    domainsTitle: 'Products and equipment for every sector',
    domainsSub: "Can't find your product? Send us your request — we review every proposal.",
    exportEyebrow: 'IMPORT & EXPORT',
    exportTitle: 'Import & Export',
    exportBody:
      'WAFRA streamlines your import and export operations with support tailored to your needs, from sourcing to logistics coordination.',
    exportBullets: ['International sourcing', 'Sea & air freight', 'End-to-end follow-up'],
    exportCta: 'Talk to our team',
    intlEyebrow: 'AT THE SERVICE OF YOUR AMBITIONS',
    intlTitle: 'An international presence',
    intlSub: 'A global vision, reliable partners and solutions adapted to every market.',
    contactEyebrow: 'CONTACT',
    contactTitle: "Let's talk about your project",
    contactAlt: 'Need a product, an equipment or a sourcing solution?',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    whatsappTip: 'Contact us on WhatsApp',
    whatsappMsg: 'Hello WAFRA, I would like a quote.',
    footerQuick: 'Quick links',
    footerContact: 'Contact',
    footerFollow: 'Follow us',
    footerRights: 'All rights reserved.',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
  },
  ar: {
    quote: 'اطلب عرض سعر',
    eyebrow: 'تجارة من أجل الصناعة',
    h1a: 'وفرة —',
    h1b: 'تجارة من أجل الصناعة',
    heroSub: 'حلول موثوقة للتوريد والتجارة والتصدير.',
    b1: 'اكتشف أنشطتنا',
    b2: 'اتصل بنا',
    chip1: 'تونس · دولي',
    chip2: 'استيراد · تصدير',
    servicesEyebrow: 'خدماتنا',
    servicesTitle: 'حلول مصمَّمة من أجل صناعتك',
    servicesSub: 'شريك واحد للتوريد والتجارة الصناعية والتبادلات الدولية.',
    learnMore: 'اعرف المزيد',
    productsEyebrow: 'اختياراتنا',
    productsTitle: 'منتجاتنا',
    productsSub: 'حلول مخصّصة لاحتياجات صناعتك.',
    dragHint: 'اسحب للاستكشاف',
    aboutEyebrow: 'عن وفرة',
    aboutTitle: 'شريك موثوق من أجل صناعتك',
    aboutP1: 'تواكب وفرة الشركات والمهنيين في احتياجاتهم المتعلقة بالتوريد والتجارة الصناعية والتبادلات الدولية.',
    aboutP2:
      'بفضل شبكة من الشركاء الموثوقين، نقدّم حلولًا مخصّصة لمتطلبات كل نشاط، بهدف ثابت: الجودة والتوفّر والفعالية.',
    aboutTags: 'نعمل مع',
    aboutAudience: ['شركات', 'مصانع', 'متاجر', 'ورشات', 'فنادق', 'مطاعم'],
    domainsEyebrow: 'مجالات نشاطنا',
    domainsTitle: 'منتجات ومعدات لجميع القطاعات',
    domainsSub: 'لم تجد منتجك؟ أرسل طلبك — ندرس كل عرض.',
    exportEyebrow: 'الاستيراد والتصدير',
    exportTitle: 'الاستيراد والتصدير',
    exportBody:
      'تسهّل وفرة عمليات الاستيراد والتصدير لديك عبر مواكبة مخصّصة لاحتياجاتك، من التوريد إلى تنسيق العمليات اللوجستية.',
    exportBullets: ['توريد دولي', 'شحن بحري وجوي', 'متابعة من البداية للنهاية'],
    exportCta: 'تحدّث مع فريقنا',
    intlEyebrow: 'في خدمة طموحاتكم',
    intlTitle: 'حضور دولي',
    intlSub: 'رؤية عالمية وشركاء موثوقون وحلول مخصّصة لكل سوق.',
    contactEyebrow: 'اتصل بنا',
    contactTitle: 'لنتحدّث عن مشروعك',
    contactAlt: 'هل تحتاج منتجًا أو معدات أو حلًّا للتوريد؟',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    location: 'الموقع',
    whatsappTip: 'تواصل معنا عبر واتساب',
    whatsappMsg: 'مرحبًا وفرة، أرغب في الحصول على عرض سعر.',
    footerQuick: 'روابط سريعة',
    footerContact: 'اتصل بنا',
    footerFollow: 'تابعنا',
    footerRights: 'جميع الحقوق محفوظة.',
    legal: 'المعلومات القانونية',
    privacy: 'سياسة الخصوصية',
  },
} as const;

type Lang2 = keyof typeof copy;

const services = [
  {
    key: 'trade',
    icon: Factory,
    img: images.warehouse,
    title: ['Commerce industriel', 'Industrial trade', 'التجارة الصناعية'] as Triple,
    text: [
      'Des produits et solutions adaptés aux besoins de votre industrie, avec un partenaire de confiance.',
      "Products and solutions tailored to your industry's needs, with a trusted partner.",
      'منتجات وحلول مخصّصة لاحتياجات صناعتك، مع شريك موثوق.',
    ] as Triple,
  },
  {
    key: 'sourcing',
    icon: Boxes,
    img: images.logistics,
    title: ['Approvisionnement', 'Sourcing', 'التوريد'] as Triple,
    text: [
      'Un réseau solide de fournisseurs et une gestion efficace pour garantir la qualité et la disponibilité.',
      'A strong supplier network and efficient management to guarantee quality and availability.',
      'شبكة قوية من المورّدين وإدارة فعّالة لضمان الجودة والتوفّر.',
    ] as Triple,
  },
  {
    key: 'ie',
    icon: Globe2,
    img: images.heroShip,
    title: ['Import & Export', 'Import & Export', 'الاستيراد والتصدير'] as Triple,
    text: [
      "Facilitation des échanges internationaux et accompagnement personnalisé à chaque étape.",
      'Facilitating international trade with personalised support at every step.',
      'تسهيل التبادلات الدولية ومواكبة مخصّصة في كل خطوة.',
    ] as Triple,
  },
];

const products: { img: string; cat: Triple; name: Triple; caption: Triple }[] = [
  { img: images.machines, cat: ['Industrie', 'Industry', 'الصناعة'], name: ['Machines industrielles', 'Industrial machinery', 'الآلات الصناعية'], caption: ['Lignes et équipements de production.', 'Production lines and equipment.', 'خطوط ومعدات إنتاج.'] },
  { img: images.materials, cat: ['Matériaux', 'Materials', 'المواد'], name: ['Matériaux industriels', 'Industrial materials', 'المواد الصناعية'], caption: ['Matières premières et matériaux.', 'Raw and industrial materials.', 'مواد أولية وصناعية.'] },
  { img: images.electrical, cat: ['Électrique', 'Electrical', 'كهرباء'], name: ['Équipements électriques', 'Electrical equipment', 'المعدات الكهربائية'], caption: ['Composants et appareils électriques.', 'Electrical components and devices.', 'مكوّنات وأجهزة كهربائية.'] },
  { img: images.motors, cat: ['Énergie', 'Energy', 'الطاقة'], name: ['Moteurs', 'Motors', 'المحركات'], caption: ['Moteurs, pompes et transmissions.', 'Motors, pumps and drives.', 'محركات ومضخات ونواقل.'] },
  { img: images.generator, cat: ['Énergie', 'Energy', 'الطاقة'], name: ['Groupes électrogènes', 'Generators', 'المولّدات'], caption: ["Solutions d'énergie et de secours.", 'Power and backup solutions.', 'حلول للطاقة والاحتياط.'] },
  { img: images.it, cat: ['Informatique', 'IT', 'معلوماتية'], name: ['Matériel informatique', 'IT equipment', 'المعدات الحاسوبية'], caption: ['Serveurs, postes et réseau.', 'Servers, workstations and network.', 'خوادم ومحطات وشبكات.'] },
  { img: images.tools, cat: ['Outillage', 'Tools', 'العدد'], name: ['Outillage professionnel', 'Professional tools', 'العدد المهنية'], caption: ['Outillage manuel et électroportatif.', 'Hand and power tools.', 'عدد يدوية وكهربائية.'] },
  { img: images.spareParts, cat: ['Composants', 'Components', 'مكوّنات'], name: ['Pièces détachées', 'Spare parts', 'قطع الغيار'], caption: ['Pièces et composants détachés.', 'Spare parts and components.', 'قطع ومكوّنات غيار.'] },
  { img: images.agriculture, cat: ['Agricole', 'Agriculture', 'فلاحة'], name: ['Équipements agricoles', 'Agricultural equipment', 'المعدات الفلاحية'], caption: ['Tracteurs et matériel agricole.', 'Tractors and farm machinery.', 'جرارات وآلات فلاحية.'] },
  { img: images.restaurant, cat: ['Restauration', 'Food service', 'مطاعم'], name: ['Matériel de restauration', 'Food-service equipment', 'معدات المطاعم'], caption: ['Cuisines et équipements CHR.', 'Kitchens and food-service gear.', 'مطابخ ومعدات مطاعم.'] },
  { img: images.stock, cat: ['Stocks', 'Inventory', 'مخزون'], name: ['Stocks professionnels', 'Professional inventory', 'المخزون المهني'], caption: ['Lots, invendus et stocks dormants.', 'Bulk lots and idle inventory.', 'بضائع وفائض ومخزون راكد.'] },
];

const domains = [
  { fr: 'Machines industrielles', en: 'Industrial machinery', ar: 'الآلات الصناعية', icon: Factory, span: 4, img: images.machines, desc: ['Machines et lignes de production.', 'Machines and production lines.', 'آلات وخطوط إنتاج.'] },
  { fr: 'Équipements professionnels', en: 'Professional equipment', ar: 'المعدات المهنية', icon: Wrench, span: 2, desc: ['Matériel métier et équipements pro.', 'Trade and professional equipment.', 'معدات مهنية متخصصة.'] },
  { fr: 'Matériel informatique', en: 'IT equipment', ar: 'المعدات الحاسوبية', icon: Monitor, span: 2, desc: ['Serveurs, postes et réseau.', 'Servers, workstations, network.', 'خوادم ومحطات وشبكات.'] },
  { fr: 'Électronique', en: 'Electronics', ar: 'الإلكترونيات', icon: CircuitBoard, span: 2, desc: ['Composants et appareils électroniques.', 'Electronic devices and components.', 'أجهزة ومكوّنات إلكترونية.'] },
  { fr: 'Mobilier', en: 'Furniture', ar: 'الأثاث', icon: Armchair, span: 2, desc: ['Mobilier de bureau et d’entreprise.', 'Office and business furniture.', 'أثاث مكتبي ومهني.'] },
  { fr: 'Outillage', en: 'Tools', ar: 'العدد', icon: Hammer, span: 2, desc: ['Outillage manuel et électroportatif.', 'Hand and power tools.', 'عدد يدوية وكهربائية.'] },
  { fr: 'Équipements agricoles', en: 'Agricultural equipment', ar: 'المعدات الفلاحية', icon: Tractor, span: 4, img: images.agriculture, desc: ['Tracteurs et matériel agricole.', 'Tractors and farm machinery.', 'جرارات وآلات فلاحية.'] },
  { fr: 'Matériel de restauration', en: 'Food-service equipment', ar: 'معدات المطاعم', icon: Utensils, span: 2, desc: ['Cuisines et équipements CHR.', 'Kitchens and food-service gear.', 'مطابخ ومعدات مطاعم.'] },
  { fr: 'Stocks', en: 'Inventory', ar: 'المخزون', icon: Boxes, span: 2, desc: ['Stocks, lots et fins de série.', 'Stock, bulk lots, end of line.', 'مخزون وبضائع وفائض.'] },
  { fr: 'Pièces détachées', en: 'Spare parts', ar: 'قطع الغيار', icon: Cog, span: 2, desc: ['Pièces et composants détachés.', 'Spare parts and components.', 'قطع ومكوّنات غيار.'] },
  { fr: 'Matériaux', en: 'Materials', ar: 'المواد', icon: Layers, span: 2, desc: ['Matériaux et matières premières.', 'Materials and raw materials.', 'مواد ومواد أولية.'] },
  { fr: 'Surplus d’entreprise', en: 'Business surplus', ar: 'فائض الشركات', icon: Recycle, span: 4, img: images.stock, desc: ['Surplus et actifs inutilisés.', 'Surplus and unused assets.', 'فائض وأصول غير مستخدمة.'] },
];

const benefits = [
  { num: '01', icon: Globe2, title: ['Une vision globale', 'A global vision', 'رؤية عالمية'] as Triple, text: ['Une lecture internationale des marchés.', 'An international read on markets.', 'قراءة دولية للأسواق.'] as Triple },
  { num: '02', icon: ShieldCheck, title: ['Des partenaires fiables', 'Reliable partners', 'شركاء موثوقون'] as Triple, text: ['Un réseau solide et vérifié.', 'A strong, verified network.', 'شبكة قوية وموثوقة.'] as Triple },
  { num: '03', icon: Handshake, title: ['Des solutions sur mesure', 'Tailored solutions', 'حلول مخصّصة'] as Triple, text: ['Adaptées à chaque besoin.', 'Adapted to every need.', 'مصمّمة لكل احتياج.'] as Triple },
  { num: '04', icon: TrendingUp, title: ['Une croissance durable', 'Sustainable growth', 'نمو مستدام'] as Triple, text: ['Des relations commerciales dans la durée.', 'Long-term business relationships.', 'علاقات تجارية طويلة الأمد.'] as Triple },
];

function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link className={`brand${onDark ? ' brand-on-dark' : ''}`} href="#home" aria-label="WAFRA">
      <img className="brand-logo" src="/wafra-logo-cropped.png" alt="Logo officiel WAFRA" />
      <span className="brand-text">
        <strong>
          WAFRA<span className="arabic-brand">وفرة</span>
        </strong>
        <small>{siteConfig.brand.taglineFr.toUpperCase()}</small>
      </span>
    </Link>
  );
}

function HeroMedia({ t }: { t: (typeof copy)[keyof typeof copy] }) {
  const reduce = useReducedMotion();
  return (
    <div className="hero-media">
      <motion.div
        className="hero-media-bg"
        initial={reduce ? false : { scale: 1.02, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1.06, opacity: 1 }}
        transition={{ scale: { duration: 14, ease: 'linear' }, opacity: { duration: 1.1, ease: EASE } }}
      >
        <Image
          src={images.heroPort}
          alt="Port à conteneurs international — commerce et logistique"
          fill
          priority
          sizes="(max-width: 960px) 92vw, 46vw"
          style={{ objectFit: 'cover' }}
        />
      </motion.div>

      <div className="hero-media-tint" aria-hidden />
      <GlobalNetwork className="hero-network" aria-hidden />

      <motion.span
        className="hero-plane"
        aria-hidden
        initial={reduce ? false : { x: '42vw', opacity: 0 }}
        animate={reduce ? undefined : { x: '-30vw', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', times: [0, 0.15, 0.8, 1] }}
      >
        <Plane size={22} />
      </motion.span>

      <div className="hero-chips">
        <span className="hero-chip">
          <MapPin size={14} /> {t.chip1}
        </span>
        <span className="hero-chip">
          <Plane size={14} /> {t.chip2}
        </span>
      </div>
    </div>
  );
}

export default function Site() {
  const [lang, setLang] = useState<Lang2>('fr');
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const t = copy[lang];
  const li = lang === 'fr' ? 0 : lang === 'en' ? 1 : 2;
  const tr = (fr: string, en: string, ar: string) => (lang === 'fr' ? fr : lang === 'en' ? en : ar);
  const pick = (v: Triple) => v[li];

  useEffect(() => {
    const saved = localStorage.getItem('wafra-language');
    if (saved === 'fr' || saved === 'en' || saved === 'ar') setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('wafra-language', lang);
  }, [lang]);

  useEffect(() => {
    setMenu(false);
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'about', 'products', 'services', 'export', 'contact'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = isRtl(el) ? -el.scrollLeft : el.scrollLeft;
    setAtStart(pos <= 4);
    setAtEnd(max - pos <= 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const rtl = isRtl(el);
      const step = rtl ? -event.deltaY : event.deltaY;
      const pos = rtl ? -el.scrollLeft : el.scrollLeft;
      if (event.deltaY > 0 && pos < max - 1) {
        event.preventDefault();
        el.scrollLeft += step;
      } else if (event.deltaY < 0 && pos > 1) {
        event.preventDefault();
        el.scrollLeft += step;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [updateEdges]);

  useEffect(() => {
    updateEdges();
  }, [lang, updateEdges]);

  const scrollByCards = (direction: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: (isRtl(el) ? -direction : direction) * step, behavior: 'smooth' });
  };

  const onPointerDown = (event: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: event.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(event.pointerId);
    el.classList.add('dragging');
  };
  const onPointerMove = (event: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };
  const onPointerUp = () => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.active = false;
    el.classList.remove('dragging');
  };

  const whatsappHref = (() => {
    const digits = WHATSAPP.replace(/[^\d]/g, '');
    if (!digits) return '#contact';
    return `https://wa.me/${digits}?text=${encodeURIComponent(t.whatsappMsg)}`;
  })();

  const quoteMailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(t.quote)}`;

  return (
    <MotionConfig reducedMotion="user">
      <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <Brand />
          <nav className={`nav-links${menu ? ' open' : ''}`}>
            {nav[lang].map(([label, href]) => (
              <a
                className={`nav-link${active === href ? ' active' : ''}`}
                key={href}
                href={href}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a className="btn btn-green nav-cta-mobile" href="#contact" onClick={() => setMenu(false)}>
              {t.quote}
            </a>
          </nav>
          <div className="nav-actions">
            <div className="lang">
              <Globe size={15} />
              <select aria-label="Langue" value={lang} onChange={(event) => setLang(event.target.value as Lang2)}>
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
            </div>
            <a className="btn btn-green nav-cta" href="#contact">
              {t.quote}
              <ArrowRight size={16} />
            </a>
            <button className="menu-btn" aria-label="Menu" onClick={() => setMenu((value) => !value)}>
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="container hero-inner">
            <div className="hero-copy">
              <FadeUp>
                <span className="eyebrow">
                  <span className="eyebrow-dot" /> {t.eyebrow}
                </span>
              </FadeUp>
              <h1 className="hero-title">
                <FadeUp delay={0.06}>
                  <span className="hero-line">{t.h1a}</span>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <span className="hero-highlight">{t.h1b}</span>
                </FadeUp>
              </h1>
              <FadeUp delay={0.24}>
                <p className="hero-sub">{t.heroSub}</p>
              </FadeUp>
              <FadeUp delay={0.32}>
                <div className="hero-cta">
                  <a className="btn btn-green btn-lg" href="#services">
                    {t.b1}
                    <ArrowRight size={18} />
                  </a>
                  <a className="btn btn-outline btn-lg" href="#contact">
                    {t.b2}
                    <ArrowRight size={18} />
                  </a>
                </div>
              </FadeUp>
            </div>
            <HeroMedia t={t} />
          </div>
        </section>

        {/* SERVICES */}
        <section className="section services" id="services">
          <div className="container">
            <FadeUp className="section-head">
              <span className="eyebrow">{t.servicesEyebrow}</span>
              <h2 className="section-title">{t.servicesTitle}</h2>
              <p className="section-sub">{t.servicesSub}</p>
            </FadeUp>
            <Stagger className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <StaggerItem key={service.key}>
                    <article className="service-card">
                      <div className="service-media">
                        <Image src={service.img} alt={pick(service.title)} fill sizes="(max-width: 960px) 92vw, 420px" style={{ objectFit: 'cover' }} />
                        <span className="service-media-line" aria-hidden />
                      </div>
                      <div className="service-body">
                        <span className="service-icon">
                          <Icon size={22} />
                        </span>
                        <h3 className="service-title">{pick(service.title)}</h3>
                        <p className="service-text">{pick(service.text)}</p>
                        <span className="service-arrow">
                          {t.learnMore} <ArrowRight size={16} />
                        </span>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="showcase" id="products">
          <div className="container showcase-head">
            <FadeUp>
              <span className="eyebrow">{t.productsEyebrow}</span>
              <h2 className="section-title">{t.productsTitle}</h2>
              <p className="section-sub">{t.productsSub}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="scroller-nav">
                <button className="round-btn" aria-label={tr('Précédent', 'Previous', 'السابق')} onClick={() => scrollByCards(-1)} disabled={atStart}>
                  {lang === 'ar' ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
                </button>
                <button className="round-btn" aria-label={tr('Suivant', 'Next', 'التالي')} onClick={() => scrollByCards(1)} disabled={atEnd}>
                  {lang === 'ar' ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
                </button>
              </div>
            </FadeUp>
          </div>
          <div
            className="scroller"
            ref={scrollerRef}
            onScroll={updateEdges}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="scroller-track">
              {products.map((product) => (
                <article className="product-card" key={product.name[0]}>
                  <div className="product-media">
                    <Image src={product.img} alt={pick(product.name as Triple)} fill sizes="(max-width: 640px) 82vw, 380px" style={{ objectFit: 'cover' }} />
                    <div className="product-overlay" aria-hidden />
                  </div>
                  <span className="product-badge">{pick(product.cat as Triple)}</span>
                  <span className="product-line" aria-hidden />
                  <div className="product-info">
                    <h3 className="product-title">{pick(product.name as Triple)}</h3>
                    <p className="product-caption">{pick(product.caption as Triple)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="container scroll-hint">
            <span className="hint-line" />
            <MoveHorizontal size={16} />
            <span>{t.dragHint}</span>
            <ArrowRight size={15} />
            <span className="hint-line" />
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="container about-grid">
            <RevealImage className="about-media" direction="left">
              <div className="about-media-inner">
                <Image src={images.aboutFactory} alt="Site industriel WAFRA" fill sizes="(max-width: 960px) 92vw, 46vw" style={{ objectFit: 'cover' }} />
              </div>
            </RevealImage>
            <div className="about-copy">
              <FadeUp>
                <span className="eyebrow">{t.aboutEyebrow}</span>
                <h2 className="about-title">{t.aboutTitle}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="about-p">{t.aboutP1}</p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="about-p">{t.aboutP2}</p>
              </FadeUp>
              <FadeUp delay={0.26}>
                <div className="about-metrics">
                  <div className="about-metric">
                    <span className="about-metric-num">
                      <AnimatedCounter to={20} suffix="+" />
                    </span>
                    <span className="about-metric-label">{tr("Catégories d'actifs", 'Asset categories', 'فئة من الأصول')}</span>
                  </div>
                  <span className="about-metric-sep" />
                  <div className="about-metric">
                    <span className="about-metric-num">
                      <AnimatedCounter to={24} suffix="h" />
                    </span>
                    <span className="about-metric-label">{tr('Objectif de réponse', 'Response target', 'هدف الرد')}</span>
                  </div>
                  <span className="about-metric-sep" />
                  <div className="about-metric">
                    <span className="about-metric-num">
                      <AnimatedCounter to={100} suffix="%" />
                    </span>
                    <span className="about-metric-label">{tr('Accompagnement', 'Support', 'مواكبة')}</span>
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={0.32}>
                <div className="about-tags">
                  <span className="about-tags-title">{t.aboutTags}</span>
                  {t.aboutAudience.map((item) => (
                    <span className="tag" key={item}>
                      <Leaf size={13} /> {item}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* DOMAINS */}
        <section className="section domains" id="domains">
          <div className="container">
            <FadeUp className="section-head">
              <span className="eyebrow">{t.domainsEyebrow}</span>
              <h2 className="section-title">{t.domainsTitle}</h2>
              <p className="section-sub">{t.domainsSub}</p>
            </FadeUp>
            <Stagger className="domains-grid">
              {domains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <StaggerItem key={domain.fr} className={`domain-cell span-${domain.span}`}>
                    <div className={`domain-card${domain.img ? ' has-image' : ''}`}>
                      {domain.img && (
                        <Image src={domain.img} alt="" fill sizes="(max-width: 900px) 90vw, 500px" style={{ objectFit: 'cover' }} />
                      )}
                      <div className="domain-card-body">
                        <span className="domain-icon">
                          <Icon size={22} />
                        </span>
                        <h3 className="domain-title">{tr(domain.fr, domain.en, domain.ar)}</h3>
                        <p className="domain-desc">{tr(domain.desc[0], domain.desc[1], domain.desc[2])}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* EXPORT */}
        <section className="section export" id="export">
          <div className="container export-grid">
            <div className="export-copy">
              <FadeUp>
                <span className="eyebrow">{t.exportEyebrow}</span>
                <h2 className="section-title">{t.exportTitle}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="section-sub">{t.exportBody}</p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <ul className="export-list">
                  {t.exportBullets.map((item) => (
                    <li key={item}>
                      <span className="export-check">
                        <Check size={14} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp delay={0.26}>
                <a className="btn btn-green btn-lg" href="#contact">
                  {t.exportCta}
                  <ArrowUpRight size={18} />
                </a>
              </FadeUp>
            </div>
            <ParallaxImage className="export-media" src={images.exportShip} alt="Fret maritime et aérien international" sizes="(max-width: 960px) 92vw, 46vw" speed={50} overlay />
          </div>
        </section>

        {/* INTERNATIONAL PRESENCE */}
        <section className="intl">
          <GlobalNetwork className="intl-network" aria-hidden />
          <div className="intl-glow" aria-hidden />
          <div className="container intl-inner">
            <FadeUp className="intl-head">
              <span className="eyebrow light">{t.intlEyebrow}</span>
              <h2 className="section-title">{t.intlTitle}</h2>
              <p className="section-sub light">{t.intlSub}</p>
            </FadeUp>
            <div className="intl-grid">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <FadeUp className="intl-item" key={benefit.num} delay={index * 0.08}>
                    <span className="intl-num">{benefit.num}</span>
                    <span className="intl-icon">
                      <Icon size={24} />
                    </span>
                    <h3 className="intl-title">{pick(benefit.title)}</h3>
                    <p className="intl-text">{pick(benefit.text)}</p>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="container contact-grid">
            <FadeUp className="contact-copy">
              <span className="eyebrow">{t.contactEyebrow}</span>
              <h2 className="section-title">{t.contactTitle}</h2>
              <p className="section-sub">{t.contactAlt}</p>
              <div className="contact-list">
                <a className="contact-item" href={`mailto:${siteConfig.contact.email}`}>
                  <span className="contact-icon">
                    <Mail size={19} />
                  </span>
                  <span>
                    <small>{t.email}</small>
                    <strong>{siteConfig.contact.email}</strong>
                  </span>
                </a>
                <a className="contact-item" href={siteConfig.contact.phoneHref}>
                  <span className="contact-icon">
                    <Phone size={19} />
                  </span>
                  <span>
                    <small>{t.phone}</small>
                    <strong>{siteConfig.contact.phone}</strong>
                  </span>
                </a>
                <div className="contact-item">
                  <span className="contact-icon">
                    <MapPin size={19} />
                  </span>
                  <span>
                    <small>{t.location}</small>
                    <strong>{siteConfig.contact.country[lang === 'ar' ? 'ar' : lang === 'en' ? 'en' : 'fr']}</strong>
                  </span>
                </div>
              </div>
              <a className="btn btn-outline btn-lg contact-cta" href={quoteMailto}>
                {t.quote}
                <ArrowUpRight size={18} />
              </a>
            </FadeUp>
            <FadeUp delay={0.12}>
              <ContactForm lang={lang as Lang} />
            </FadeUp>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-gold" aria-hidden />
        <Leaf className="footer-leaf footer-leaf-a" aria-hidden />
        <Leaf className="footer-leaf footer-leaf-b" aria-hidden />
        <div className="container footer-top">
          <div className="footer-brand">
            <Brand onDark />
            <p>{tr(siteConfig.brand.taglineFr, siteConfig.brand.taglineEn, siteConfig.brand.taglineAr)}</p>
            <span className="footer-copy">© 2025 WAFRA. {t.footerRights}</span>
          </div>
          <div className="footer-col">
            <h4>{t.footerQuick}</h4>
            {nav[lang].map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h4>{t.footerContact}</h4>
            <span className="footer-static">
              <MapPin size={14} /> {siteConfig.contact.country[lang === 'ar' ? 'ar' : lang === 'en' ? 'en' : 'fr']}
            </span>
            <a href={`mailto:${siteConfig.contact.email}`}>
              <Mail size={14} /> {siteConfig.contact.email}
            </a>
            <a href={siteConfig.contact.phoneHref}>
              <Phone size={14} /> {siteConfig.contact.phone}
            </a>
          </div>
          <div className="footer-col">
            <h4>{t.footerFollow}</h4>
            <div className="footer-social">
              {siteConfig.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name} className="social-btn">
                  {item.name === 'LinkedIn' ? <Linkedin size={17} /> : item.name === 'Facebook' ? <Facebook size={17} /> : <Youtube size={17} />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container footer-accent">
          <span className="footer-accent-name">WAFRA</span>
          <span className="footer-accent-tag">{tr(siteConfig.brand.taglineFr, siteConfig.brand.taglineEn, siteConfig.brand.taglineAr)}</span>
          <AnimatedLine className="footer-accent-line" />
        </div>
        <div className="container footer-bottom">
          <span>
            © 2025 WAFRA. {t.footerRights}
          </span>
          <span className="footer-legal">
            <Link href="/legal">{t.legal}</Link>
            <Link href="/privacy">{t.privacy}</Link>
          </span>
        </div>
      </footer>

      <a
        className="wa-float"
        href={whatsappHref}
        target={whatsappHref.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-label={t.whatsappTip}
      >
        <MessageCircle size={24} />
        <span className="wa-tip">{t.whatsappTip}</span>
      </a>
    </MotionConfig>
  );
}
