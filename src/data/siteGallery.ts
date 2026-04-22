import type { GalleryImage } from "#/components/ImageGallery";

const HERO_IMAGE_COUNT = 4;

export const HERO_GALLERY_IMAGES: GalleryImage[] = Array.from(
	{ length: HERO_IMAGE_COUNT },
	(_, index) => ({
		src: `/assets/hero/hero-${index + 1}.webp`,
		alt: `Hero Carousel ${index + 1}`,
	}),
);

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
