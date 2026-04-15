export const OurWorks = () => {
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
				<img
					src="/assets/our-works/works-1.webp"
					alt="Our Work 1"
					className="col-span-6"
				/>
				<img
					src="/assets/our-works/works-2.webp"
					alt="Our Work 2"
					className="col-span-6"
				/>
				<img
					src="/assets/our-works/works-3.webp"
					alt="Our Work 3"
					className="col-span-4"
				/>
				<img
					src="/assets/our-works/works-4.webp"
					alt="Our Work 4"
					className="col-span-4"
				/>
				<img
					src="/assets/our-works/works-5.webp"
					alt="Our Work 5"
					className="col-span-4"
				/>
				<img
					src="/assets/our-works/works-6.webp"
					alt="Our Work 6"
					className="col-span-6"
				/>
				<img
					src="/assets/our-works/works-7.webp"
					alt="Our Work 7"
					className="col-span-3"
				/>
				<img
					src="/assets/our-works/works-8.webp"
					alt="Our Work 8"
					className="col-span-3"
				/>
			</ul>
		</section>
	);
};
