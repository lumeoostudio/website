import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "./_components/HeroSection";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<>
			<HeroSection />
		</>
	);
}
