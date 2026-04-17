import { createFileRoute } from "@tanstack/react-router";
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

function App() {
	return (
		<>
			<Hero />
			<HowWeWork />
			<WhatWeOffer />
			<OurWorks works={works1} />
			<WhyChooseUs />
			<Pricing />
			<Testimonials />
			<TheStudio />
			<StartAProject />
			<OurWorks works={works2} />
		</>
	);
}

const works1 = Array.from({ length: 10 }, (_, index) => ({
	src: `/assets/our-works/works-${index + 1}.webp`,
	alt: `Our Work ${index + 1}`,
}));

const works2 = Array.from({ length: 10 }, (_, index) => ({
	src: `/assets/our-works/works-${index + 10 + 1}.webp`,
	alt: `Our Work ${index + 1}`,
}));
