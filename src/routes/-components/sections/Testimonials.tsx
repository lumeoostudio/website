import { SectionHeading } from "#/routes/-components/section-heading";

const testimonials = [
	{
		quote:
			'"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
		name: "Connor Caffery",
		role: "Founder US platform",
		image: "/assets/testimonials/testimonial-1.png",
	},
	{
		quote:
			'"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
		name: "Connor Caffery",
		role: "Founder US platform",
		image: "/assets/testimonials/testimonial-1.png",
	},
	{
		quote:
			'"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
		name: "Connor Caffery",
		role: "Founder US platform",
		image: "/assets/testimonials/testimonial-1.png",
	},
];

export const Testimonials = () => {
	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-4 py-10 sm:px-10 sm:py-30 lg:px-16">
			<SectionHeading eyebrow="OUR WORKS">
				What our
				<br />
				partners say.
			</SectionHeading>
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{testimonials.map((testimonial, index) => (
					<li
						key={`${testimonial.name}-${index}`}
						className="flex max-h-h-71.25 min-h-71.25 flex-col justify-between gap-4 bg-[#F9F9FA] p-6"
					>
						<p className="font-tertiary text-primary/70 leading-[1.4] tracking-[-3%]">
							{testimonial.quote}
						</p>
						<div className="flex items-center gap-3">
							<img
								src={testimonial.image}
								alt="Testimonial 1"
							/>
							<div className="flex flex-col gap-1">
								<p className="font-medium font-tertiary text-primary/70 leading-[1.4] tracking-[-3%]">
									{testimonial.name}
								</p>
								<p className="font-tertiary text-primary/70 text-sm leading-[1.4] tracking-[-3%]">
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
