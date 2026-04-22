import { createFileRoute } from "@tanstack/react-router";
import { ImageGalleryProvider } from "#/components/ImageGallery";
import {
	HERO_GALLERY_COUNT,
	SITE_GALLERY_IMAGES,
} from "#/data/siteGallery";
import { Hero } from "./-components/sections/Hero";
import { HowWeWork } from "./-components/sections/HowWeWork";
import { OurWorks } from "./-components/sections/OurWorks";
import { Pricing } from "./-components/sections/Pricing";
import { StartAProject } from "./-components/sections/StartAProject";
import { Testimonials } from "./-components/sections/Testimonials";
import { TheStudio } from "./-components/sections/TheStudio";
import { WhatWeOffer } from "./-components/sections/WhatWeOffer";
import { WhyChooseUs } from "./-components/sections/WhyChooseUs";

export const Route = createFileRoute("/")({ component: App });

const FIRST_WORKS_SLICE_END = HERO_GALLERY_COUNT + 10;

function App() {
	return (
		<ImageGalleryProvider
			images={SITE_GALLERY_IMAGES}
			dialogLabel="Project gallery preview"
		>
			<Hero />
			<HowWeWork />
			<WhatWeOffer />
			<OurWorks
				works={SITE_GALLERY_IMAGES.slice(
					HERO_GALLERY_COUNT,
					FIRST_WORKS_SLICE_END,
				)}
				startIndex={HERO_GALLERY_COUNT}
				sectionId="work"
			/>
			<WhyChooseUs />
			<Pricing />
			<Testimonials />
			<TheStudio />
			<StartAProject />
			<OurWorks
				works={SITE_GALLERY_IMAGES.slice(FIRST_WORKS_SLICE_END)}
				startIndex={FIRST_WORKS_SLICE_END}
			/>
		</ImageGalleryProvider>
	);
}
