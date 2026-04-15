import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "./-components/HeroSection";
import { HowWeWorkSection } from "./-components/HowWeWorkSection";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<>
			<HeroSection />
			<HowWeWorkSection />
		</>
	);
}
