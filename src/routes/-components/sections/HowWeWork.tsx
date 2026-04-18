import {
	ParticleWaveField,
	type RippleOrigin,
} from "#/components/particle-wave-field";

type WorkStep = {
	step: string;
	title: string;
	description: string;
	particle: {
		className?: string;
		waveStrength: number;
		rippleStrength: number;
		/** Hover / pointer reaction strength (try 2–3.5). */
		pointerRippleStrength: number;
		rippleOrigin: RippleOrigin;
		ripplePointerMix: number;
		timeScale?: number;
		phaseOffset?: number;
	};
};

const steps: WorkStep[] = [
	{
		step: "STEP 1",
		title: "Discover",
		description:
			"We start where others don't, real user insights that shape everything.",
		particle: {
			waveStrength: 1,
			rippleStrength: 1,
			pointerRippleStrength: 0.5,
			rippleOrigin: { x: 0.5, y: 1 },
			ripplePointerMix: 0.55,
			timeScale: 0.5,
			phaseOffset: 0,
		},
	},
	{
		step: "STEP 2",
		title: "Design",
		description:
			"Insight becomes form bold, intentional design informed by discovery.",
		particle: {
			waveStrength: 1.15,
			rippleStrength: 0.85,
			pointerRippleStrength: 1,
			rippleOrigin: { x: 0.08, y: 0.92 },
			ripplePointerMix: 0.72,
			timeScale: 0.5,
			phaseOffset: 2.1,
		},
	},
	{
		step: "STEP 3",
		title: "Deliver",
		description:
			"We build and ship scalable systems, no-code sites, and hand them off to you.",
		particle: {
			waveStrength: 0.92,
			rippleStrength: 1.15,
			pointerRippleStrength: 2.5,
			rippleOrigin: { x: 0.92, y: 0.96 },
			ripplePointerMix: 0.48,
			timeScale: 0.5,
			phaseOffset: 4.25,
		},
	},
];

export const HowWeWork = () => {
	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-4 py-30 sm:px-10 lg:px-16">
			<div className="flex flex-col gap-6">
				<p className="font-medium font-secondary text-secondary text-sm leading-[1.1] tracking-normal sm:text-base">
					HOW WE WORK
				</p>
				<h1 className="font-medium font-primary text-4xl text-primary leading-[1.1] tracking-[-3%] sm:text-[48px]">
					From research to <br className="hidden sm:block" /> pixel perfection!
				</h1>
			</div>
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{steps.map((step) => (
					<li
						key={step.step}
						className="relative h-123.75 overflow-hidden bg-[#F9F9FA]"
					>
						<ParticleWaveField
							className="absolute top-1/4 h-full w-full"
							waveStrength={step.particle.waveStrength}
							rippleStrength={step.particle.rippleStrength}
							pointerRippleStrength={step.particle.pointerRippleStrength}
							rippleOrigin={step.particle.rippleOrigin}
							ripplePointerMix={step.particle.ripplePointerMix}
							timeScale={step.particle.timeScale}
							phaseOffset={step.particle.phaseOffset}
						/>

						<div className="relative z-10 flex flex-col gap-3 p-6">
							<div className="flex flex-col gap-2">
								<p className="font-medium font-secondary text-secondary text-sm leading-[1.1]">
									{step.step}
								</p>
								<p className="font-medium text-4xl text-primary">
									{step.title}
								</p>
							</div>
							<p className="font-tertiary">{step.description}</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
