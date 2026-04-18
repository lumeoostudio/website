import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ParticleWaveField } from "#/components/particle-wave-field";
import { SectionHeading } from "#/routes/-components/section-heading";

export const StartAProject = () => {
	const contactLinks = ["Email", "X (Twitter)", "Telegram"];

	return (
		<section className="bg-[#F9F9FA]">
			<div className="mx-auto flex w-full max-w-340 flex-col items-stretch justify-between gap-18 px-4 py-10 sm:px-10 sm:py-30 lg:flex-row lg:px-16">
				<div className="flex flex-col justify-between gap-6 self-stretch">
					<SectionHeading eyebrow="START A PROJECT">
						Let's build something
						<br />
						that actually works
					</SectionHeading>
					<ul className="flex flex-col gap-2">
						{contactLinks.map((contactLink) => (
							<a
								key={contactLink}
								href="https://calendly.com/lumeo-studio/30min"
								className="flex items-center justify-between bg-white px-6 py-3"
							>
								<p className="font-medium font-tertiary text-base text-primary leading-[1.4] tracking-[-3%]">
									{contactLink}
								</p>
								<HugeiconsIcon
									icon={ArrowUpRight}
									className="size-6 text-primary/70"
								/>
							</a>
						))}
					</ul>
				</div>

				<figure className="relative grid min-h-120 flex-1 place-content-center overflow-hidden bg-black lg:max-w-1/2">
					<ParticleWaveField
						className="pointer-events-none absolute -top-1/3 z-1 h-full w-full"
						backgroundColor="transparent"
						depthInvert
						phaseOffset={0.35}
						pointerRippleStrength={0.45}
						rippleOrigin={{ x: 0.5, y: 1 }}
						ripplePointerMix={0.55}
						rippleStrength={1}
						timeScale={0.65}
						tone="onDark"
						waveStrength={1}
					/>
					<p className="relative z-10 font-quote text-[40px] text-white italic leading-[1.9] tracking-[-1%]">
						CALENDLY
					</p>
				</figure>
			</div>
		</section>
	);
};
