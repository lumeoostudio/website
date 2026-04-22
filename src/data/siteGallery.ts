import type { GalleryImage } from "#/components/ImageGallery";

export const HERO_GALLERY_IMAGES: GalleryImage[] = [
	{ src: "/assets/hero/hero-1.webp", alt: "Hero Carousel 1" },
	{ src: "/assets/hero/hero-2.webp", alt: "Hero Carousel 2" },
	{ src: "/assets/hero/hero-3.webp", alt: "Hero Carousel 3" },
	{ src: "/assets/hero/hero-4.webp", alt: "Hero Carousel 4" },
];

export const WORKS_GALLERY_IMAGES: GalleryImage[] = Array.from(
	{ length: 20 },
	(_, index) => ({
		src: `/assets/our-works/works-${index + 1}.webp`,
		alt: `Our Work ${index + 1}`,
	}),
);

export const HERO_GALLERY_COUNT = HERO_GALLERY_IMAGES.length;

export const SITE_GALLERY_IMAGES: GalleryImage[] = [
	...HERO_GALLERY_IMAGES,
	...WORKS_GALLERY_IMAGES,
];
