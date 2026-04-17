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
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-12 px-16 py-30">
			<div className="flex gap-18">
				<div className="flex flex-1 flex-col gap-16">
					<div className="flex flex-col gap-6">
						<p className="font-medium font-secondary text-base text-secondary leading-[1.1] tracking-normal">
							WHY CHOOSE US
						</p>
						<h1 className="font-medium font-primary text-[48px] text-primary leading-[1.1] tracking-[-3%]">
							Clarity. Insight. Craft
						</h1>
					</div>
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
				<div className="relative flex flex-1 items-end gap-6 bg-[#F9F9FA]">
					<img
						src="/assets/why-choose-us-bg.png"
						alt="Why Choose Us Background"
						className="-full absolute top-0 left-0 h-auto"
					/>
					<div className="relative flex flex-col gap-6 p-6">
						<p className="font-quote text-[40px] text-primary italic leading-[1.3] tracking-[-7%]">
							"Design without research is decoration. We do both, and the
							difference shows in the results."
						</p>
						<p className="font-secondary text-lg text-primary">
							— THE LUMEO STUDIO
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
