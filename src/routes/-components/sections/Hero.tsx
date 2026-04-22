import { useImageGallery } from "#/components/ImageGallery";
import { AnimatedChartUpIcon } from "#/components/svg/AnimatedChartUpIcon";
import { Button } from "#/components/ui/button";
import { HERO_GALLERY_IMAGES } from "#/data/siteGallery";
import { useInfiniteMarquee } from "#/hooks/useInfiniteMarquee";

const HERO_MARQUEE_LOOP = [
	...HERO_GALLERY_IMAGES,
	...HERO_GALLERY_IMAGES,
] as const;
const HERO_IMAGE_COUNT = HERO_GALLERY_IMAGES.length;

export const Hero = () => {
	const { openAt } = useImageGallery();
	const { trackRef, onPointerEnter, onPointerLeave } =
		useInfiniteMarquee<HTMLUListElement>();

	return (
		<section
			className="mx-auto flex w-full flex-col items-center gap-25 py-20"
			id="hero"
		>
			<div className="flex w-full max-w-155 flex-1 flex-col items-center gap-12 px-4 sm:px-0">
				<div className="flex w-full flex-col items-center gap-4.5">
					<p className="w-full text-center font-medium text-[48px] leading-[1.4] tracking-[-2%]">
						<span className="text-muted"> Design</span>{" "}
						<span className="text-primary">partner </span>{" "}
						<span className="text-muted"> for</span>{" "}
						<span className="relative pl-13 text-primary">
							<span className="absolute top-1/2 -left-1 grid size-13 -translate-y-1/2 rotate-7 place-content-center rounded-[1rem] bg-primary duration-200 hover:rotate-0">
								<AnimatedChartUpIcon
									className="size-5 text-white"
									delay={0.5}
								/>
							</span>
							growth
						</span>
						<span className="text-muted"> minded</span>{" "}
						<span className="relative pl-13 text-primary">
							<span className="absolute top-1/2 -left-1 grid size-13 -translate-y-1/2 -rotate-10 place-content-center rounded-[1rem] bg-primary duration-200 hover:rotate-0">
								<AnimatedChartUpIcon
									className="size-5 text-white"
									delay={1}
								/>
							</span>
							startups
						</span>
					</p>

					<p className="max-w-135 text-center font-medium font-tertiary text-primary/70 text-xl leading-[1.4] tracking-[-3%]">
						We pair rigorous UX research with bold, crafted design so your
						products look great and perform
					</p>
				</div>
				<div className="flex w-full flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-center">
					<Button className="box-content max-h-14! rounded-full px-6.25 py-3 text-xl leading-7.5">
						Book a Call
					</Button>
					<Button
						className="box-content max-h-14! rounded-full px-6.25 py-3 text-xl leading-7.5"
						variant="tertiary"
						asChild
					>
						<a href="#work">See Our Projects</a>
					</Button>
				</div>
			</div>
			<div
				className="relative h-112 w-full overflow-hidden"
				onPointerEnter={onPointerEnter}
				onPointerLeave={onPointerLeave}
			>
				<ul
					ref={trackRef}
					className="absolute flex h-full w-max list-none items-center gap-8"
					aria-label="Hero showcase carousel"
				>
					{HERO_MARQUEE_LOOP.map((image, index) => {
						const globalIndex = index % HERO_IMAGE_COUNT;
						return (
							<li
								key={`${image.src}-${index}`}
								className="h-full shrink-0"
							>
								<button
									type="button"
									className="block h-full cursor-pointer p-0"
									aria-label={`Open hero image ${globalIndex + 1} in gallery`}
									onClick={(event) => {
										const img = event.currentTarget.querySelector("img");
										if (!img) {
											return;
										}
										openAt({
											index: globalIndex,
											originRect: img.getBoundingClientRect(),
											thumbImg: img,
										});
									}}
								>
									<img
										src={image.src}
										alt={image.alt}
										className="h-full w-auto object-cover"
										draggable={false}
									/>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};
