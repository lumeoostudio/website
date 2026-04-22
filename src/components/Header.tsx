import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "#/lib/utils";

const NAV_LINKS = [
	{ href: "#process", label: "Process" },
	{ href: "#work", label: "Work" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#testimonials", label: "Testimonial" },
] as const;

const linkClassName =
	"font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary";

const emailButtonClassName =
	"rounded-full border border-[#353535] bg-primary px-5 py-2.5 font-tertiary text-base text-white leading-6 tracking-tight shadow-[-13px_20px_18px_rgba(0,0,0,0.02),-7px_15px_15px_rgba(0,0,0,0.05),-3px_11px_11px_rgba(0,0,0,0.08),-1px_3px_6px_rgba(0,0,0,0.1)] backdrop-blur-[12.5px]";

const useHeaderMenuAnimation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
	const emailRef = useRef<HTMLAnchorElement>(null);
	const closingRef = useRef(false);

	const closeMenu = useCallback(() => {
		if (closingRef.current || !isOpen) return;
		const overlay = overlayRef.current;
		const items = itemRefs.current.filter(Boolean);
		if (!overlay) return;

		closingRef.current = true;
		gsap.killTweensOf([overlay, ...items, emailRef.current].filter(Boolean));

		const tl = gsap.timeline({
			onComplete: () => {
				closingRef.current = false;
				setIsOpen(false);
				gsap.set(overlay, { autoAlpha: 0 });
				gsap.set(items, { y: 10, opacity: 0 });
				if (emailRef.current) gsap.set(emailRef.current, { y: 10, opacity: 0 });
			},
		});

		tl.to(items, {
			y: 10,
			opacity: 0,
			stagger: { each: 0.06, from: "end" },
			duration: 0.28,
			ease: "power2.in",
		})
			.to(
				emailRef.current,
				{ y: 10, opacity: 0, duration: 0.22, ease: "power2.in" },
				"-=0.12",
			)
			.to(
				overlay,
				{ autoAlpha: 0, duration: 0.32, ease: "power2.inOut" },
				"-=0.08",
			);
	}, [isOpen]);

	const openMenu = useCallback(() => {
		if (closingRef.current) return;
		setIsOpen(true);
	}, []);

	const toggleMenu = useCallback(() => {
		if (isOpen) closeMenu();
		else openMenu();
	}, [isOpen, closeMenu, openMenu]);

	useGSAP(
		() => {
			const overlay = overlayRef.current;
			const items = itemRefs.current.filter(Boolean);
			if (!overlay) return;
			gsap.set(overlay, { autoAlpha: 0 });
			gsap.set(items, { y: 10, opacity: 0 });
			if (emailRef.current) gsap.set(emailRef.current, { y: 10, opacity: 0 });
		},
		{ dependencies: [] },
	);

	useGSAP(
		() => {
			if (!isOpen || closingRef.current) return;
			const overlay = overlayRef.current;
			const items = itemRefs.current.filter(Boolean);
			if (!overlay || items.length === 0) return;

			gsap.killTweensOf([overlay, ...items, emailRef.current].filter(Boolean));

			const tl = gsap.timeline();
			tl.to(overlay, {
				autoAlpha: 1,
				duration: 0.45,
				ease: "power2.out",
			}).to(
				items,
				{
					y: 0,
					opacity: 1,
					duration: 0.42,
					stagger: 0.09,
					ease: "power2.out",
				},
				"-=0.28",
			);

			if (emailRef.current) {
				tl.to(
					emailRef.current,
					{
						y: 0,
						opacity: 1,
						duration: 0.42,
						ease: "power2.out",
					},
					"-=0.22",
				);
			}
		},
		{ dependencies: [isOpen] },
	);

	useLayoutEffect(() => {
		const mq = window.matchMedia("(min-width: 48rem)");
		const onChange = () => {
			if (mq.matches) {
				setIsOpen(false);
				const overlay = overlayRef.current;
				const items = itemRefs.current.filter(Boolean);
				if (overlay) {
					gsap.killTweensOf(
						[overlay, ...items, emailRef.current].filter(Boolean),
					);
					gsap.set(overlay, { autoAlpha: 0 });
					gsap.set(items, { y: 10, opacity: 0 });
					if (emailRef.current)
						gsap.set(emailRef.current, { y: 10, opacity: 0 });
				}
			}
		};
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeMenu();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isOpen, closeMenu]);

	useEffect(() => {
		if (isOpen) {
			const prev = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = prev;
			};
		}
	}, [isOpen]);

	return {
		isOpen,
		overlayRef,
		itemRefs,
		emailRef,
		closeMenu,
		toggleMenu,
	};
};

export const Header = () => {
	const { isOpen, overlayRef, itemRefs, emailRef, closeMenu, toggleMenu } =
		useHeaderMenuAnimation();
	const [isStickyActive, setIsStickyActive] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setIsStickyActive(window.scrollY > 0);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<>
			<nav className="sticky top-0 z-10 backdrop-blur-[5px]">
				<div className="mx-auto flex w-full max-w-225 items-center justify-between px-6 py-4 sm:max-h-25 sm:min-h-25 sm:py-7">
					<img
						src="/assets/brand/logo-large.svg"
						alt="Logo"
						className="h-6.5 max-w-33.25 flex-1 sm:h-8"
					/>
					<ul className="hidden items-center gap-8 md:flex">
						{NAV_LINKS.map(({ href, label }) => (
							<li key={label}>
								<a
									href={href}
									className={cn(
										linkClassName,
										isStickyActive && "text-primary",
									)}
								>
									{label}
								</a>
							</li>
						))}
					</ul>

					<a
						href="mailto:hello@lumeoo.studio"
						className={cn(emailButtonClassName, "hidden md:inline-flex")}
					>
						Book a Call
					</a>

					<button
						type="button"
						className="inline-flex items-center justify-center rounded-full p-2 text-primary md:hidden"
						onClick={toggleMenu}
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
						aria-label={isOpen ? "Close menu" : "Open menu"}
					>
						{isOpen ? (
							<X
								className="size-6"
								strokeWidth={1.75}
							/>
						) : (
							<Menu
								className="size-6"
								strokeWidth={1.75}
							/>
						)}
					</button>
				</div>
			</nav>

			<div
				id="mobile-menu"
				ref={overlayRef}
				className={cn(
					"fixed inset-0 z-50 flex flex-col bg-background px-6 pt-28 pb-10 md:hidden",
					!isOpen && "pointer-events-none",
				)}
				aria-hidden={!isOpen}
			>
				<ul className="flex flex-1 flex-col items-center justify-center gap-8">
					{NAV_LINKS.map(({ href, label }, i) => (
						<li
							key={label}
							ref={(el) => {
								itemRefs.current[i] = el;
							}}
						>
							<a
								href={href}
								className={cn(linkClassName, "text-lg")}
								onClick={() => closeMenu()}
							>
								{label}
							</a>
						</li>
					))}
					<a
						ref={emailRef}
						href="mailto:hello@lumeoo.studio"
						className={cn(
							emailButtonClassName,
							"mx-auto w-full max-w-xs text-center",
						)}
						onClick={() => closeMenu()}
					>
						Book a Call
					</a>
				</ul>
			</div>
		</>
	);
};
