import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "./-components/sections/Hero";
import { HowWeWork } from "./-components/sections/HowWeWork";
import { OurWorks } from "./-components/sections/OurWorks";
import { WhatWeOffer } from "./-components/sections/WhatWeOffer";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<>
			<Hero />
			<HowWeWork />
			<WhatWeOffer />
			<OurWorks />
		</>
	);
}
