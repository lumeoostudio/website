import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import type { MouseEvent } from "react";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

import { cn } from "#/lib/utils";
import { Button } from "./ui/button";

export type GalleryImage = {
	src: string;
	alt: string;
};

const VIEW_PADDING_X = 16;
const VIEW_PADDING_Y = 32;

function getContainFrame(
	naturalWidth: number,
	naturalHeight: number,
	paddingX: number,
	paddingY: number,
) {
	const viewWidth = window.innerWidth - paddingX * 2;
	const viewHeight = window.innerHeight - paddingY * 2;

	if (!naturalWidth || !naturalHeight) {
		return {
			left: paddingX,
			top: paddingY,
			width: viewWidth,
			height: viewHeight,
		};
	}

	const scale = Math.min(viewWidth / naturalWidth, viewHeight / naturalHeight);
	const width = naturalWidth * scale;
	const height = naturalHeight * scale;
	const left = (window.innerWidth - width) / 2;
	const top = (window.innerHeight - height) / 2;

	return { left, top, width, height };
}

function applyFrameToImg(
	img: HTMLImageElement,
	frame: { left: number; top: number; width: number; height: number },
) {
	img.style.left = `${frame.left}px`;
	img.style.top = `${frame.top}px`;
	img.style.width = `${frame.width}px`;
	img.style.height = `${frame.height}px`;
}

type ImageGalleryProps = {
	images: GalleryImage[];
	listClassName?: string;
	itemClassName?: string;
	thumbnailClassName?: string;
	dialogLabel?: string;
	overlayClassName?: string;
	modalImageClassName?: string;
};

export const ImageGallery = ({
	images,
	listClassName,
	itemClassName,
	thumbnailClassName,
	dialogLabel = "Image gallery preview",
	overlayClassName,
	modalImageClassName,
}: ImageGalleryProps) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const hasActiveImage = activeIndex !== null;

	const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);
	const flyingImgRef = useRef<HTMLImageElement | null>(null);
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const controlsRef = useRef<HTMLDivElement | null>(null);

	const openOriginRectRef = useRef<DOMRect | null>(null);
	const activeIndexRef = useRef<number | null>(null);
	const isClosingRef = useRef(false);
	const openTimelineRef = useRef<gsap.core.Timeline | null>(null);

	activeIndexRef.current = activeIndex;

	const killOpenAnimation = useCallback(() => {
		openTimelineRef.current?.kill();
		openTimelineRef.current = null;
	}, []);

	const runOpenAnimation = useCallback(
		(thumbRect: DOMRect, thumbIndex: number) => {
			const img = flyingImgRef.current;
			const backdrop = backdropRef.current;
			const controls = controlsRef.current;
			if (!img || !backdrop) {
				return;
			}

			killOpenAnimation();

			const thumbEl = thumbnailRefs.current[thumbIndex];
			const thumbRadius = thumbEl
				? Number.parseFloat(getComputedStyle(thumbEl).borderRadius) || 0
				: 0;

			const applyFrame = () => {
				const { naturalWidth, naturalHeight } = img;
				const frame = getContainFrame(
					naturalWidth,
					naturalHeight,
					VIEW_PADDING_X,
					VIEW_PADDING_Y,
				);

				applyFrameToImg(img, frame);

				const finalCx = frame.left + frame.width / 2;
				const finalCy = frame.top + frame.height / 2;
				const thumbCx = thumbRect.left + thumbRect.width / 2;
				const thumbCy = thumbRect.top + thumbRect.height / 2;

				gsap.set(backdrop, { opacity: 0 });
				gsap.set(img, {
					x: thumbCx - finalCx,
					y: thumbCy - finalCy,
					scaleX: thumbRect.width / frame.width,
					scaleY: thumbRect.height / frame.height,
					borderRadius: thumbRadius,
					force3D: true,
				});

				if (controls) {
					gsap.set(controls, { opacity: 0, pointerEvents: "none" });
				}

				const timeline = gsap.timeline();
				openTimelineRef.current = timeline;

				timeline.to(
					backdrop,
					{ opacity: 1, duration: 0.35, ease: "power1.out" },
					0,
				);

				timeline.to(
					img,
					{
						x: 0,
						y: 0,
						scaleX: 1,
						scaleY: 1,
						borderRadius: 24,
						duration: 0.52,
						ease: "power2.out",
					},
					0,
				);

				if (controls) {
					timeline.to(
						controls,
						{
							opacity: 1,
							duration: 0.22,
							ease: "power1.out",
							pointerEvents: "auto",
						},
						0.28,
					);
				}
			};

			if (img.complete && img.naturalWidth > 0) {
				requestAnimationFrame(applyFrame);
				return;
			}

			const onLoad = () => {
				img.removeEventListener("load", onLoad);
				requestAnimationFrame(applyFrame);
			};

			img.addEventListener("load", onLoad);
		},
		[killOpenAnimation],
	);

	const showPrevious = useCallback(() => {
		setActiveIndex((currentIndex) => {
			if (currentIndex === null) {
				return currentIndex;
			}

			return (currentIndex - 1 + images.length) % images.length;
		});
	}, [images.length]);

	const showNext = useCallback(() => {
		setActiveIndex((currentIndex) => {
			if (currentIndex === null) {
				return currentIndex;
			}

			return (currentIndex + 1) % images.length;
		});
	}, [images.length]);

	const activeSlideSrc =
		activeIndex !== null && images.length > 0
			? (images[activeIndex]?.src ?? null)
			: null;

	useLayoutEffect(() => {
		if (activeIndex === null || isClosingRef.current) {
			return;
		}

		const origin = openOriginRectRef.current;
		if (origin) {
			openOriginRectRef.current = null;
			runOpenAnimation(origin, activeIndex);
			return;
		}

		const img = flyingImgRef.current;
		if (!img) {
			return;
		}

		const syncExpandedLayout = () => {
			killOpenAnimation();
			const frame = getContainFrame(
				img.naturalWidth,
				img.naturalHeight,
				VIEW_PADDING_X,
				VIEW_PADDING_Y,
			);
			applyFrameToImg(img, frame);
			gsap.set(img, {
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1,
				borderRadius: 24,
				force3D: true,
			});
		};

		if (img.complete && img.naturalWidth > 0) {
			syncExpandedLayout();
			return;
		}

		const onLoad = () => {
			img.removeEventListener("load", onLoad);
			syncExpandedLayout();
		};

		img.addEventListener("load", onLoad);
		return () => {
			img.removeEventListener("load", onLoad);
		};
	}, [activeIndex, activeSlideSrc, killOpenAnimation, runOpenAnimation]);

	const handleThumbnailClick = useCallback(
		(index: number, event: MouseEvent<HTMLButtonElement>) => {
			const thumbImg = event.currentTarget.querySelector("img");
			if (!thumbImg) {
				return;
			}

			openOriginRectRef.current = thumbImg.getBoundingClientRect();
			setActiveIndex(index);
		},
		[],
	);

	const closeGallery = useCallback(() => {
		if (activeIndexRef.current === null || isClosingRef.current) {
			return;
		}

		isClosingRef.current = true;
		killOpenAnimation();

		const index = activeIndexRef.current;
		const img = flyingImgRef.current;
		const backdrop = backdropRef.current;
		const controls = controlsRef.current;
		const thumbEl = thumbnailRefs.current[index];

		const finishClose = () => {
			isClosingRef.current = false;
			setActiveIndex(null);
		};

		if (!img || !backdrop) {
			finishClose();
			return;
		}

		gsap.killTweensOf(img);
		if (backdrop) {
			gsap.killTweensOf(backdrop);
		}
		if (controls) {
			gsap.killTweensOf(controls);
		}

		const rect = thumbEl?.getBoundingClientRect();
		if (!rect || rect.width === 0 || rect.height === 0) {
			gsap.to(backdrop, {
				opacity: 0,
				duration: 0.2,
				onComplete: finishClose,
			});
			return;
		}

		const { naturalWidth, naturalHeight } = img;
		const frame = getContainFrame(
			naturalWidth,
			naturalHeight,
			VIEW_PADDING_X,
			VIEW_PADDING_Y,
		);

		const finalCx = frame.left + frame.width / 2;
		const finalCy = frame.top + frame.height / 2;
		const thumbCx = rect.left + rect.width / 2;
		const thumbCy = rect.top + rect.height / 2;

		const thumbRadius = thumbEl
			? Number.parseFloat(getComputedStyle(thumbEl).borderRadius) || 0
			: 0;

		applyFrameToImg(img, frame);

		gsap.set(img, {
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			borderRadius: 24,
			force3D: true,
		});

		const timeline = gsap.timeline({ onComplete: finishClose });

		if (controls) {
			timeline.to(
				controls,
				{
					opacity: 0,
					duration: 0.12,
					ease: "power1.in",
					pointerEvents: "none",
				},
				0,
			);
		}

		timeline.to(backdrop, { opacity: 0, duration: 0.28, ease: "power1.in" }, 0);

		timeline.to(
			img,
			{
				x: thumbCx - finalCx,
				y: thumbCy - finalCy,
				scaleX: rect.width / frame.width,
				scaleY: rect.height / frame.height,
				borderRadius: thumbRadius,
				duration: 0.48,
				ease: "power2.in",
			},
			0,
		);
	}, [killOpenAnimation]);

	useEffect(() => {
		if (!hasActiveImage) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeGallery();
			}

			if (event.key === "ArrowLeft") {
				showPrevious();
			}

			if (event.key === "ArrowRight") {
				showNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [closeGallery, hasActiveImage, showNext, showPrevious]);

	useEffect(() => {
		if (!hasActiveImage) {
			document.body.style.removeProperty("overflow");
			return;
		}

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.removeProperty("overflow");
		};
	}, [hasActiveImage]);

	useEffect(() => {
		return () => {
			killOpenAnimation();
		};
	}, [killOpenAnimation]);

	if (images.length === 0) {
		return null;
	}

	const currentImage = hasActiveImage ? images[activeIndex] : null;

	const galleryModal =
		hasActiveImage && currentImage ? (
			<div
				role="dialog"
				aria-modal="true"
				aria-label={dialogLabel}
				className={cn("fixed inset-0 z-100", overlayClassName)}
			>
				<div
					ref={backdropRef}
					className="absolute inset-0 z-0 bg-black/80 opacity-0"
					aria-hidden="true"
					onClick={closeGallery}
				/>

				<img
					ref={flyingImgRef}
					src={currentImage.src}
					alt={currentImage.alt}
					className={cn(
						"pointer-events-none fixed z-10 max-h-none max-w-none object-contain will-change-transform",
						modalImageClassName,
					)}
					onClick={(event) => event.stopPropagation()}
				/>
				<div
					ref={controlsRef}
					className="pointer-events-none fixed z-20 flex h-screen w-screen flex-col items-stretch justify-between gap-4 px-5 pt-5 opacity-0"
					onClick={closeGallery}
					aria-hidden="true"
				>
					<div className="flex items-center justify-between">
						<p className="pointer-events-auto font-semibold text-white">
							{activeIndex + 1}/{images.length}
						</p>
						<Button
							type="button"
							className="size-10 rounded-full bg-primary text-2xl text-white transition hover:bg-primary/90"
							aria-label="Show previous image"
							onClick={(event) => {
								event.stopPropagation();
								closeGallery();
							}}
						>
							<HugeiconsIcon
								icon={Cancel01Icon}
								strokeWidth={2}
								className="size-5"
							/>
						</Button>
					</div>
					<ul className="pointer-events-auto flex flex-1 items-center justify-between gap-3">
						<Button
							type="button"
							className="size-10 rounded-full bg-primary text-2xl text-white transition hover:bg-primary/90"
							aria-label="Show previous image"
							onClick={(event) => {
								event.stopPropagation();
								showPrevious();
							}}
						>
							<HugeiconsIcon
								icon={ArrowLeft01Icon}
								strokeWidth={2}
								className="size-5"
							/>
						</Button>
						<Button
							type="button"
							className="size-10 rounded-full bg-primary text-2xl text-white transition hover:bg-primary/90"
							aria-label="Show next image"
							onClick={(event) => {
								event.stopPropagation();
								showNext();
							}}
						>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								strokeWidth={2}
								className="size-5"
							/>
						</Button>
					</ul>
				</div>
			</div>
		) : null;

	return (
		<>
			<ul
				className={cn(
					"grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12",
					listClassName,
				)}
			>
				{images.map((image, index) => (
					<li
						key={`${image.src}-${index}`}
						className={cn("col-span-6 cursor-pointer", itemClassName)}
					>
						<button
							type="button"
							className="block h-full w-full cursor-pointer"
							onClick={(event) => handleThumbnailClick(index, event)}
							aria-label={`Open image ${index + 1} in gallery`}
						>
							<img
								ref={(element) => {
									thumbnailRefs.current[index] = element;
								}}
								src={image.src}
								alt={image.alt}
								className={cn("h-full w-full object-cover", thumbnailClassName)}
							/>
						</button>
					</li>
				))}
			</ul>

			{galleryModal}
		</>
	);
};
