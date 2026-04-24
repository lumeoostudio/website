import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import {
	createContext,
	useCallback,
	useContext,
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

function applyFrameToImg(
	img: HTMLImageElement,
	frame: { left: number; top: number; width: number; height: number },
) {
	img.style.left = `${frame.left}px`;
	img.style.top = `${frame.top}px`;
	img.style.width = `${frame.width}px`;
	img.style.height = `${frame.height}px`;
}

/** Clears fixed-position FLIP styles so the image sizes from CSS (responsive) again. */
function settleImageInFlow(img: HTMLImageElement) {
	img.style.removeProperty("left");
	img.style.removeProperty("top");
	img.style.removeProperty("width");
	img.style.removeProperty("height");
	img.style.removeProperty("position");
	img.style.removeProperty("visibility");
	gsap.set(img, { clearProps: "transform,borderRadius" });
}

type ImageGalleryContextValue = {
	images: GalleryImage[];
	/** True while the lightbox is open (any image). */
	isOpen: boolean;
	openAt: (args: {
		index: number;
		originRect: DOMRect;
		thumbImg: HTMLImageElement;
	}) => void;
};

const ImageGalleryContext = createContext<ImageGalleryContextValue | null>(
	null,
);

export const useImageGallery = () => {
	const ctx = useContext(ImageGalleryContext);
	if (!ctx) {
		throw new Error("useImageGallery must be used within ImageGalleryProvider");
	}
	return ctx;
};

type ImageGalleryProviderProps = {
	images: GalleryImage[];
	children: React.ReactNode;
	dialogLabel?: string;
	overlayClassName?: string;
	modalImageClassName?: string;
};

export const ImageGalleryProvider = ({
	images,
	children,
	dialogLabel = "Image gallery preview",
	overlayClassName,
	modalImageClassName,
}: ImageGalleryProviderProps) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const hasActiveImage = activeIndex !== null;

	/** Grid thumbnail that opened the lightbox — used for open/close FLIP, never the filmstrip. */
	const openSourceThumbRef = useRef<HTMLImageElement | null>(null);
	const filmstripItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const flyingImgRef = useRef<HTMLImageElement | null>(null);
	const stageRef = useRef<HTMLDivElement | null>(null);
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
		(thumbRect: DOMRect) => {
			const img = flyingImgRef.current;
			const backdrop = backdropRef.current;
			const controls = controlsRef.current;
			if (!img || !backdrop) {
				return;
			}

			killOpenAnimation();

			const sourceThumb = openSourceThumbRef.current;
			const thumbRadius = sourceThumb
				? Number.parseFloat(getComputedStyle(sourceThumb).borderRadius) || 0
				: 0;

			const applyFrame = () => {
				if (!img.naturalWidth) {
					return;
				}

				// Measure the laid-out “rest” size from CSS (viewport-sized stage, no window listeners).
				img.style.visibility = "hidden";
				void img.offsetWidth;
				const endRect = img.getBoundingClientRect();
				img.style.visibility = "";

				if (endRect.width < 2 || endRect.height < 2) {
					return;
				}

				img.style.position = "fixed";
				applyFrameToImg(img, {
					left: endRect.left,
					top: endRect.top,
					width: endRect.width,
					height: endRect.height,
				});

				const finalCx = endRect.left + endRect.width / 2;
				const finalCy = endRect.top + endRect.height / 2;
				const thumbCx = thumbRect.left + thumbRect.width / 2;
				const thumbCy = thumbRect.top + thumbRect.height / 2;

				gsap.set(backdrop, { opacity: 0 });
				gsap.set(img, {
					x: thumbCx - finalCx,
					y: thumbCy - finalCy,
					scaleX: thumbRect.width / endRect.width,
					scaleY: thumbRect.height / endRect.height,
					borderRadius: thumbRadius,
					force3D: true,
				});

				if (controls) {
					gsap.set(controls, { opacity: 0, pointerEvents: "none" });
				}

				const timeline = gsap.timeline({
					onComplete: () => {
						settleImageInFlow(img);
					},
				});
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

	const openAt = useCallback(
		({
			index,
			originRect,
			thumbImg,
		}: {
			index: number;
			originRect: DOMRect;
			thumbImg: HTMLImageElement;
		}) => {
			openSourceThumbRef.current = thumbImg;
			openOriginRectRef.current = originRect;
			setActiveIndex(index);
		},
		[],
	);

	const contextValue: ImageGalleryContextValue = {
		images,
		isOpen: hasActiveImage,
		openAt,
	};

	useLayoutEffect(() => {
		if (activeIndex === null || isClosingRef.current) {
			return;
		}

		const origin = openOriginRectRef.current;
		if (origin) {
			openOriginRectRef.current = null;
			runOpenAnimation(origin);
			return;
		}

		const img = flyingImgRef.current;
		if (!img) {
			return;
		}

		const syncExpandedLayout = () => {
			killOpenAnimation();
			settleImageInFlow(img);
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
	}, [
		activeIndex,
		activeSlideSrc,
		images.length,
		killOpenAnimation,
		runOpenAnimation,
	]);

	const closeGallery = useCallback(() => {
		if (activeIndexRef.current === null || isClosingRef.current) {
			return;
		}

		isClosingRef.current = true;
		killOpenAnimation();

		const img = flyingImgRef.current;
		const backdrop = backdropRef.current;
		const controls = controlsRef.current;
		const sourceThumb = openSourceThumbRef.current;

		const finishClose = () => {
			isClosingRef.current = false;
			openSourceThumbRef.current = null;
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

		const destRect = sourceThumb?.getBoundingClientRect();
		if (!destRect || destRect.width === 0 || destRect.height === 0) {
			gsap.to(backdrop, {
				opacity: 0,
				duration: 0.2,
				onComplete: finishClose,
			});
			return;
		}

		const fromRect = img.getBoundingClientRect();

		img.style.position = "fixed";
		applyFrameToImg(img, {
			left: fromRect.left,
			top: fromRect.top,
			width: fromRect.width,
			height: fromRect.height,
		});

		const finalCx = fromRect.left + fromRect.width / 2;
		const finalCy = fromRect.top + fromRect.height / 2;
		const thumbCx = destRect.left + destRect.width / 2;
		const thumbCy = destRect.top + destRect.height / 2;

		const thumbRadius = sourceThumb
			? Number.parseFloat(getComputedStyle(sourceThumb).borderRadius) || 0
			: 0;

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
				scaleX: destRect.width / fromRect.width,
				scaleY: destRect.height / fromRect.height,
				borderRadius: thumbRadius,
				duration: 0.48,
				ease: "power2.in",
			},
			0,
		);
	}, [killOpenAnimation]);

	useEffect(() => {
		if (activeIndex === null || !hasActiveImage) {
			return;
		}
		if (images.length <= 1) {
			return;
		}
		const el = filmstripItemRefs.current[activeIndex];
		el?.scrollIntoView({
			inline: "center",
			block: "nearest",
			behavior: "smooth",
		});
	}, [activeIndex, hasActiveImage, images.length]);

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
		return (
			<ImageGalleryContext.Provider
				value={{ images, isOpen: false, openAt }}
			>
				{children}
			</ImageGalleryContext.Provider>
		);
	}

	const currentImage =
		hasActiveImage && activeIndex !== null ? images[activeIndex] : null;

	const galleryModal =
		hasActiveImage && currentImage && activeIndex !== null ? (
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

				<div
					ref={stageRef}
					className="pointer-events-none fixed z-10 flex min-h-0 items-center justify-center"
					style={{
						top: VIEW_PADDING_Y,
						left: VIEW_PADDING_X,
						right: VIEW_PADDING_X,
						bottom: VIEW_PADDING_Y,
					}}
				>
					<img
						ref={flyingImgRef}
						src={currentImage.src}
						alt={currentImage.alt}
						className={cn(
							"pointer-events-none h-auto max-h-full w-auto min-w-0 max-w-full rounded-3xl object-contain will-change-transform",
							modalImageClassName,
						)}
						onClick={(event) => event.stopPropagation()}
					/>
				</div>
				<div
					ref={controlsRef}
					className="pointer-events-none fixed inset-0 z-20 flex flex-col items-stretch justify-between gap-4 px-5 pt-5 opacity-0"
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
							aria-label="Close gallery"
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
					{images.length > 1 && (
						<div
							role="group"
							className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 w-full border-white/10 border-t bg-black/25 pt-2 pb-2 backdrop-blur-sm"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
								<ul
									aria-label="Gallery thumbnails"
									className="mx-auto flex w-max min-w-full items-center justify-center gap-2 px-1"
								>
									{images.map((image, i) => (
										<li
											key={`${image.src}-${i}`}
											className="shrink-0"
										>
											<button
												type="button"
												ref={(el) => {
													filmstripItemRefs.current[i] = el;
												}}
												onClick={(event) => {
													event.stopPropagation();
													setActiveIndex(i);
												}}
												className={cn(
													"relative block overflow-hidden rounded-md ring-2 transition focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60",
													i === activeIndex
														? "ring-white"
														: "opacity-55 ring-white/0 hover:opacity-100",
												)}
												aria-label={`View image ${i + 1} of ${images.length}`}
												aria-current={i === activeIndex ? "true" : undefined}
											>
												<img
													src={image.src}
													alt=""
													aria-hidden
													className="h-12 w-16 object-cover sm:h-14 sm:w-18"
												/>
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		) : null;

	return (
		<ImageGalleryContext.Provider value={contextValue}>
			{children}
			{galleryModal}
		</ImageGalleryContext.Provider>
	);
};

type ImageGalleryThumbnailsProps = {
	/** Images shown in this grid, in order */
	images: GalleryImage[];
	/** Global index in `ImageGalleryProvider` for `images[0]` */
	startIndex: number;
	listClassName?: string;
	itemClassName?: string;
	thumbnailClassName?: string;
};

export const ImageGalleryThumbnails = ({
	images,
	startIndex,
	listClassName,
	itemClassName,
	thumbnailClassName,
}: ImageGalleryThumbnailsProps) => {
	const { openAt } = useImageGallery();

	if (images.length === 0) {
		return null;
	}

	return (
		<ul
			className={cn(
				"grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12",
				listClassName,
			)}
		>
			{images.map((image, i) => {
				const globalIndex = startIndex + i;
				return (
					<li
						key={`${image.src}-${globalIndex}`}
						className={cn("col-span-6 cursor-pointer", itemClassName)}
					>
						<button
							type="button"
							className="block h-full w-full cursor-pointer"
							onClick={(event) => {
								const thumbImg = event.currentTarget.querySelector("img");
								if (!thumbImg) {
									return;
								}
								openAt({
									index: globalIndex,
									originRect: thumbImg.getBoundingClientRect(),
									thumbImg,
								});
							}}
							aria-label={`Open image ${globalIndex + 1} in gallery`}
						>
							<img
								src={image.src}
								alt={image.alt}
								className={cn("h-full w-full object-cover", thumbnailClassName)}
							/>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

type ImageGalleryProps = {
	images: GalleryImage[];
	listClassName?: string;
	itemClassName?: string;
	thumbnailClassName?: string;
	dialogLabel?: string;
	overlayClassName?: string;
	modalImageClassName?: string;
};

/** Standalone gallery (own provider). Prefer `ImageGalleryProvider` + `ImageGalleryThumbnails` for a shared lightbox. */
export const ImageGallery = ({
	images,
	listClassName,
	itemClassName,
	thumbnailClassName,
	dialogLabel,
	overlayClassName,
	modalImageClassName,
}: ImageGalleryProps) => {
	if (images.length === 0) {
		return null;
	}
	return (
		<ImageGalleryProvider
			images={images}
			dialogLabel={dialogLabel}
			overlayClassName={overlayClassName}
			modalImageClassName={modalImageClassName}
		>
			<ImageGalleryThumbnails
				images={images}
				startIndex={0}
				listClassName={listClassName}
				itemClassName={itemClassName}
				thumbnailClassName={thumbnailClassName}
			/>
		</ImageGalleryProvider>
	);
};
