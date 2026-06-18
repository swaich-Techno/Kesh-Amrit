import {
  BadgeCheck,
  BarChart3,
  HeartHandshake,
  Leaf,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck
} from "lucide-react";

export const siteUrl = "https://kesh-amrit.vercel.app";
export const erpUrl = "https://erp.kesh-amrit.vercel.app";

export const brand = {
  name: "Keshamrit",
  legalName: "Kesh Amrit",
  category: "Herbal Hair Oil",
  instagram: "kesh_amrit.official",
  founder: "@kaur_asis1984",
  whatsappDisplay: "+91 99148 09080",
  tagline: "Herbal Hair Care, Made Simple.",
  subheadline:
    "A calm herbal oiling routine made for nourishment, consistency, and everyday confidence.",
  safeDisclaimer:
    "This is a cosmetic/herbal care product. Individual results may vary."
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/order", label: "WhatsApp Ordering" },
  { href: "/contact", label: "Contact" }
];

export const footerLinks = navItems;

export const trustBadges = [
  { label: "Herbal routine", icon: Leaf },
  { label: "COD available", icon: Truck },
  { label: "WhatsApp ordering", icon: MessageCircle },
  { label: "Safe product guidance", icon: ShieldCheck }
];

export const product = {
  name: "Keshamrit Herbal Hair Oil",
  sku: "KSH-OIL-100",
  price: 499,
  size: "100 ml",
  badge: "COD available across India",
  benefits: [
    "Supports scalp nourishment",
    "Helps maintain a consistent hair care routine",
    "Herbal-inspired formulation",
    "Suitable for regular oiling rituals"
  ],
  ingredients: [
    {
      name: "Amla",
      note: "Traditional hair-care ingredient associated with nourishment."
    },
    {
      name: "Bhringraj",
      note: "Ayurvedic-inspired botanical often used in oiling routines."
    },
    {
      name: "Hibiscus",
      note: "Botanical cue for softness and ritual-led care."
    },
    {
      name: "Coconut oil base",
      note: "Familiar carrier oil feel for regular massage and conditioning."
    }
  ]
};

export const howToUse = [
  {
    step: "01",
    title: "Apply to scalp",
    body: "Part hair gently and apply a small amount along the scalp."
  },
  {
    step: "02",
    title: "Massage gently",
    body: "Use fingertips and keep the pressure comfortable."
  },
  {
    step: "03",
    title: "Keep for a few hours",
    body: "Leave for a few hours or overnight as preferred."
  },
  {
    step: "04",
    title: "Wash softly",
    body: "Rinse with mild shampoo and repeat the routine consistently."
  }
];

export const homeHighlights = [
  {
    title: "Minimal product clarity",
    body: "One hero product, simple benefits, safe wording, and clear order intent.",
    icon: BadgeCheck
  },
  {
    title: "WhatsApp-first commerce",
    body: "Every conversion path opens a clean pre-filled WhatsApp order message.",
    icon: MessageCircle
  },
  {
    title: "Supabase order backend",
    body: "Order inquiries can be saved to Supabase for sales and revenue tracking.",
    icon: BarChart3
  }
];

export const reviews = [
  {
    name: "Simran K.",
    city: "Ludhiana",
    quote: "Packaging was good and ordering was simple.",
    tag: "WhatsApp order"
  },
  {
    name: "Gurleen P.",
    city: "Jalandhar",
    quote: "I liked the herbal feel and simple instructions.",
    tag: "Customer story"
  },
  {
    name: "Manpreet A.",
    city: "Patiala",
    quote: "WhatsApp support made ordering easy.",
    tag: "COD inquiry"
  }
];

export const erpMetricCards = [
  { label: "Monthly revenue", icon: BarChart3 },
  { label: "Total sales", icon: ShoppingBag },
  { label: "COD orders", icon: PackageCheck },
  { label: "WhatsApp leads", icon: HeartHandshake }
];
