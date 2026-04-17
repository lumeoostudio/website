import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "./-components/sections/Hero";
import { HowWeWork } from "./-components/sections/HowWeWork";
import { OurWorks } from "./-components/sections/OurWorks";
import { Pricing } from "./-components/sections/Pricing";
import { Testimonials } from "./-components/sections/Testimonials";
import { WhatWeOffer } from "./-components/sections/WhatWeOffer";
import { WhyChooseUs } from "./-components/sections/WhyChooseUs";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<>
			<Hero />
			<HowWeWork />
			<WhatWeOffer />
			<OurWorks />
			<WhyChooseUs />
			<Pricing />
			<Testimonials />
		</>
	);
}
