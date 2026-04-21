import { ChartUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "#/components/ui/button";
import { useInfiniteMarquee } from "#/hooks/useInfiniteMarquee";

const HERO_IMAGES = [
	{ src: "/assets/hero/hero-1.webp", alt: "Hero Carousel 1" },
	{ src: "/assets/hero/hero-2.webp", alt: "Hero Carousel 2" },
	{ src: "/assets/hero/hero-3.webp", alt: "Hero Carousel 3" },
	{ src: "/assets/hero/hero-4.webp", alt: "Hero Carousel 4" },
] as const;

const HERO_MARQUEE_LOOP = [...HERO_IMAGES, ...HERO_IMAGES] as const;

export const Hero = () => {
	const { trackRef, onPointerEnter, onPointerLeave } =
		useInfiniteMarquee<HTMLUListElement>();

	return (
		<section className="mx-auto flex w-full flex-col items-center gap-25 py-20">
			<div className="flex w-full max-w-155 flex-1 flex-col items-center gap-12">
				<div className="flex w-full flex-col items-center gap-4.5">
					<p className="w-full text-center font-medium text-[48px] leading-[1.4] tracking-[-2%]">
						<span className="text-muted"> Design</span>{" "}
						<span className="text-primary">partner </span>{" "}
						<span className="text-muted"> for</span>{" "}
						<span className="relative pl-13 text-primary">
							<span className="absolute top-1/2 -left-1 grid size-13 -translate-y-1/2 rotate-7 place-content-center rounded-[1rem] bg-primary">
								<HugeiconsIcon
									icon={ChartUpIcon}
									className="size-5 text-white"
								/>
							</span>
							growth
						</span>
						<span className="text-muted"> minded</span>{" "}
						<span className="relative pl-13 text-primary">
							<span className="absolute top-1/2 -left-1 grid size-13 -translate-y-1/2 -rotate-10 place-content-center rounded-[1rem] bg-primary">
								<HugeiconsIcon
									icon={ChartUpIcon}
									className="size-5 text-white"
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
				<div className="flex items-center gap-6">
					<Button className="!max-h-14 box-content rounded-full px-6.25 py-3 text-xl leading-7.5">
						Book a Call
					</Button>
					<Button
						className="!max-h-14 box-content rounded-full px-6.25 py-3 text-xl leading-7.5"
						variant="tertiary"
					>
						See Our Projects
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
					{HERO_MARQUEE_LOOP.map((image, index) => (
						<li
							key={`${image.src}-${index}`}
							className="h-full shrink-0"
						>
							<img
								src={image.src}
								alt={image.alt}
								className="h-full w-auto object-cover"
								draggable={false}
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
