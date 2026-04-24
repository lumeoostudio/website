import { PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteMarquee } from "#/hooks/useInfiniteMarquee";
import { SectionHeading } from "#/routes/-components/section-heading";

function TestimonialVideo({
	src,
	videoId,
	activeVideoId,
	onRequestPlay,
}: {
	src: string;
	videoId: string;
	activeVideoId: string | null;
	onRequestPlay: (videoId: string) => void;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		if (activeVideoId !== videoId && !el.paused) {
			el.pause();
		}
	}, [activeVideoId, videoId]);

	const togglePlayback = useCallback(() => {
		const el = videoRef.current;
		if (!el) return;
		if (el.paused) {
			onRequestPlay(videoId);
			void el.play();
		} else {
			el.pause();
		}
	}, [onRequestPlay, videoId]);

	return (
		<div className="group relative max-h-82.5 min-h-82.5 w-full">
			<video
				ref={videoRef}
				src={src}
				loop
				autoPlay
				muted
				playsInline
				controls={false}
				onPlay={() => {
					setIsPlaying(true);
					onRequestPlay(videoId);
				}}
				onPause={() => setIsPlaying(false)}
				className="size-full object-cover"
			>
				<track
					kind="captions"
					srcLang="en"
					label="English captions"
					src="data:text/vtt;charset=utf-8,WEBVTT"
				/>
			</video>
			<button
				type="button"
				onClick={togglePlayback}
				aria-label={isPlaying ? "Pause video" : "Play video"}
				className="pointer-events-none absolute top-1/2 left-1/2 grid size-13 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-content-center bg-primary/50 opacity-0 transition-opacity focus-visible:pointer-events-auto focus-visible:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
			>
				<HugeiconsIcon
					icon={isPlaying ? PauseIcon : PlayIcon}
					className="size-5 fill-white text-white"
				/>
			</button>
		</div>
	);
}

const testimonials = [
	{
		name: "Connor Caffery",
		role: "Founder US platform",
		video:
			"https://res.cloudinary.com/dky0e8lq6/video/upload/testimonial-1_tj4ksc.mp4",
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

/** Two identical sequences for a seamless GSAP loop (translate by exactly half of track width). */
const MARQUEE_LOOP = [...testimonials, ...testimonials] as const;

export const Testimonials = () => {
	const { trackRef, onPointerEnter, onPointerLeave } =
		useInfiniteMarquee<HTMLUListElement>();
	const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

	return (
		<section
			id="testimonials"
			className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-4 py-10 sm:px-10 sm:py-30 lg:px-16"
		>
			<SectionHeading eyebrow="OUR WORKS">
				What our
				<br />
				partners say.
			</SectionHeading>
			<div
				className="overflow-hidden"
				onPointerEnter={onPointerEnter}
				onPointerLeave={onPointerLeave}
			>
				<ul
					ref={trackRef}
					className="m-0 flex w-max list-none gap-6 p-0"
					aria-label="Partner testimonials"
				>
					{MARQUEE_LOOP.map((testimonial, index) => (
						<li
							key={`${testimonial.name}-${index}`}
							className="flex min-h-71.25 max-w-100 shrink-0 flex-col justify-between gap-4 bg-[#F9F9FA] p-6 sm:min-w-95"
						>
							{testimonial.video ? (
								<TestimonialVideo
									src={testimonial.video}
									videoId={`${testimonial.name}-${index}`}
									activeVideoId={activeVideoId}
									onRequestPlay={setActiveVideoId}
								/>
							) : (
								<p className="font-tertiary text-primary/70 leading-[1.4] tracking-[-3%]">
									{testimonial.quote}
								</p>
							)}

							<div className="flex items-center gap-3">
								<img
									src={testimonial.image}
									alt=""
									width={48}
									height={48}
									className="size-12 shrink-0 rounded-none object-cover"
								/>
								<div className="flex min-w-0 flex-col gap-1">
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
			</div>
		</section>
	);
};
