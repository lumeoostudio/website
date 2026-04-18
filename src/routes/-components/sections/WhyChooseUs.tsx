import { ParticleWaveField } from "#/components/particle-wave-field";
import { SectionHeading } from "#/routes/-components/section-heading";

export const WhyChooseUs = () => {
	const reasons = [
		{
			title: "Research is our compass, not a checkbox",
			description:
				"Most agencies do a brief call and start designing. We run discovery that surfaces real user behaviours, then design around what we find, not what we assume.",
		},
		{
			title: "You get partners, not just deliverables",
			description:
				"We're invested in your outcomes. We communicate clearly, move fast, and stay curious about your business, not just the brief in front of us.",
		},
		{
			title: "End-to-end, from insight to shipped",
			description:
				"We do research, design, and no-code development under one roof. No handoff anxiety, no translation loss. What we design, we build.",
		},
	];

	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-18 px-4 py-10 sm:px-10 sm:py-30 lg:flex-row lg:px-16">
			<div className="flex flex-1 flex-col gap-16">
				<SectionHeading eyebrow="WHY CHOOSE US">
					Clarity. Insight. Craft
				</SectionHeading>
				<ul className="flex flex-col gap-12">
					{reasons.map((reason) => (
						<li
							key={reason.title}
							className="relative flex"
						>
							<div className="absolute top-0.5 left-0 size-4.5 bg-primary" />
							<div className="flex flex-col gap-2 pl-7.5">
								<p className="font-medium text-primary text-xl leading-[1.1]">
									{reason.title}
								</p>
								<p className="font-tertiary text-primary/70 leading-[1.4] tracking-[-3%]">
									{reason.description}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className="relative flex min-h-120 flex-1 items-end overflow-hidden bg-[#F9F9FA] sm:min-h-96 lg:min-h-80">
				<ParticleWaveField
					className="absolute -top-1/3 h-full w-full"
					depthInvert
					waveStrength={1}
					rippleStrength={1}
					pointerRippleStrength={0.5}
					rippleOrigin={{ x: 0.5, y: 1 }}
					ripplePointerMix={0.6}
					timeScale={0.5}
					phaseOffset={0.5}
				/>
				<div className="relative z-10 flex flex-col gap-6 p-6">
					<p className="font-quote text-4xl text-primary italic leading-[1.3] tracking-[-7%] lg:text-[40px]">
						"Design without research is decoration. We do both, and the
						difference shows in the results."
					</p>
					<p className="font-secondary text-base text-primary lg:text-lg">
						— THE LUMEO STUDIO
					</p>
				</div>
			</div>
		</section>
	);
};
