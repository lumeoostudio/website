export const HowWeWork = () => {
	const steps = [
		{
			step: "STEP 1",
			title: "Discover",
			description:
				"We start where others don't, real user insights that shape everything.",
		},
		{
			step: "STEP 2",
			title: "Design",
			description:
				"Insight becomes form bold, intentional design informed by discovery.",
		},
		{
			step: "STEP 3",
			title: "Deliver",
			description:
				"We build and ship scalable systems, no-code sites, and hand them off to you.",
		},
	];

	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-16 py-30">
			<div className="flex flex-col gap-6">
				<p className="font-medium font-secondary text-base text-secondary leading-[1.1] tracking-normal">
					HOW WE WORK
				</p>
				<h1 className="font-medium font-primary text-[48px] text-primary leading-[1.1] tracking-[-3%]">
					From research to <br /> pixel perfection!
				</h1>
			</div>
			<ul className="grid grid-cols-3 gap-6">
				{steps.map((step) => (
					<li
						key={step.step}
						className="relative h-123.75 bg-[#F9F9FA]"
					>
						<img
							src="/assets/discover-bg.png"
							alt="Discover Background"
							className="absolute bottom-0 h-auto w-full"
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
