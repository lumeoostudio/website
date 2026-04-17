export const OurWorks = () => {
	const works = Array.from({ length: 10 }, (_, index) => ({
		src: `/assets/our-works/works-${index + 1}.webp`,
		alt: `Our Work ${index + 1}`,
	}));

	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-16 py-30">
			<div className="flex flex-col gap-6">
				<p className="font-medium font-secondary text-base text-secondary leading-[1.1] tracking-normal">
					OUR WORKS
				</p>
				<h1 className="font-medium font-primary text-[48px] text-primary leading-[1.1] tracking-[-3%]">
					See how well
					<br />
					we do across niches
				</h1>
			</div>
			<ul className="grid grid-cols-12 gap-x-8 gap-y-6">
				{works.map((work) => (
					<img
						key={work.src}
						src={work.src}
						alt={work.alt}
						className="col-span-6"
					/>
				))}
			</ul>
		</section>
	);
};
