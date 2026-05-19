import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRICING_PLANS = {
  product: [
    {
      title: "ONE TIMER",
      description: "For teams who need a clear outcome, without extended commitment.",
      startingFromLabel: "STARTING FROM:",
      price: "$2,000",
      developmentPrice: "$3,000+",
      features: [
        "End-to-end product design across mobile, web, or desktop",
        "In-depth user research and UX strategy",
        "Fast iteration cycles with structured feedback loops",
        "Organized design handoff (Dev-ready + export assets)",
        {
          title: "For development contact us",
          link: "mailto:hello@lumeoo.studio",
        },
      ],
      ctaLabel: "Book a call",
    },
    {
      title: "RETAINER",
      description: "For teams who need ongoing design support, not just a one-off deliverable.",
      startingFromLabel: "STARTING FROM:",
      price: "$3,000",
      features: [
        "One active request at a time, fully prioritized",
        "Flexible scope that adapts to your needs",
        "Weekday progress updates (Mon-Fri)",
        "Dedicated project manager for seamless delivery",
      ],
      ctaLabel: "Book a call",
    },
  ],
  landing: [
    {
      title: "ONE TIMER",
      description: "For teams who need a clear outcome, without extended commitment.",
      startingFromLabel: "STARTING FROM:",
      price: "$2,000",
      developmentPrice: "$1,000",
      features: ["High-converting single-page design", "Two distinct creative directions to choose from", "Conversion-focused copywriting included", "Delivered within 2-4 weeks"],
      ctaLabel: "Book a call",
    },
    {
      title: "RETAINER",
      description: "For teams who need ongoing design support, not just a one-off deliverable.",
      startingFromLabel: "STARTING FROM:",
      price: "$2,000",
      features: [
        "One active request at a time, fully prioritized",
        "Flexible scope that adapts to your needs",
        "Weekday progress updates (Mon-Fri)",
        "Dedicated project manager for seamless delivery",
      ],
      ctaLabel: "Book a call",
    },
  ],
  branding: [
    {
      title: "ONE TIMER",
      description: "For teams who need a clear outcome, without extended commitment.",
      startingFromLabel: "STARTING FROM:",
      price: "$1,000",
      features: [
        "Complete brand identity (logo, typography, color system)",
        "Essential brand assets for digital and print use",
        "Clear, scalable brand guidelines",
        "Three distinct brand directions to explore",
        "Delivered within 2 weeks",
        "Ready-to-use brand kit for immediate rollout",
      ],
      ctaLabel: "Book a call",
    },
    {
      title: "RETAINER",
      description: "For teams who need ongoing design support, not just a one-off deliverable.",
      startingFromLabel: "STARTING FROM:",
      price: "$3,500",
      features: [
        "One active task at a time, fully focused",
        "Flexible scope that adapts as priorities shift",
        "Consistent progress updates every weekday",
        "Dedicated project lead for coordination and delivery",
      ],
      ctaLabel: "Book a call",
    },
  ],
} as const;

export type PricingPlan = {
  title: string;
  description: string;
  startingFromLabel: string;
  price: string;
  developmentPrice?: string;
  features: readonly (string | { title: string; link: string })[];
  ctaLabel: string;
};

import type { GalleryImage } from "#/components/ImageGallery";

/** Each `src` should have a matching `*-large.webp` for the lightbox (see `galleryModalImageSrc`). */
const HERO_IMAGE_COUNT = 10;

export const HERO_GALLERY_IMAGES: GalleryImage[] = Array.from({ length: HERO_IMAGE_COUNT }, (_, index) => ({
  src: `/assets/hero/hero-${index + 1}.webp`,
  alt: `Hero Carousel ${index + 1}`,
}));

export const WORKS_GALLERY_IMAGES: GalleryImage[] = [
  ...HERO_GALLERY_IMAGES,
  ...Array.from({ length: 18 }, (_, index) => ({
    src: `/assets/our-works/works-${index + 1}.webp`,
    alt: `Our Work ${index + 1}`,
  })),
];

export const HERO_GALLERY_COUNT = HERO_GALLERY_IMAGES.length;

export const SITE_GALLERY_IMAGES: GalleryImage[] = WORKS_GALLERY_IMAGES;
