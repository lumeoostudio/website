const testimonials = [
	{
		quote:
			'"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
		name: "Connor Caffery",
		role: "Founder US platform",
	},
	{
		quote:
			'"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
		name: "Connor Caffery",
		role: "Founder US platform",
	},
	{
		quote:
			'"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
		name: "Connor Caffery",
		role: "Founder US platform",
	},
];

export const Testimonials = () => {
	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-16 py-30">
			<div className="flex flex-col gap-6">
				<p className="font-medium font-secondary text-base text-secondary leading-[1.1] tracking-normal">
					OUR WORKS
				</p>
				<h1 className="font-medium font-primary text-[48px] text-primary leading-[1.1] tracking-[-3%]">
					What our
					<br />
					partners say.
				</h1>
			</div>
			<ul className="grid grid-cols-3 gap-6">
				{testimonials.map((testimonial, index) => (
					<li
						key={`${testimonial.name}-${index}`}
						className="flex max-h-h-71.25 min-h-71.25 flex-col justify-between gap-4 bg-[#F9F9FA] p-6"
					>
						<p className="font-tertiary text-primary leading-[1.4] tracking-[-3%]">
							{testimonial.quote}
						</p>
						<div className="flex items-center gap-3">
							<img
								src="/assets/testimonials/testimonial-1.png"
								alt="Testimonial 1"
							/>
							<div className="flex flex-col gap-1">
								<p className="font-medium font-tertiary text-primary leading-[1.4] tracking-[-3%]">
									{testimonial.name}
								</p>
								<p className="font-tertiary text-secondary text-sm leading-[1.4] tracking-[-3%]">
									{testimonial.role}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
