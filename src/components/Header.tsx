import { Link } from "@tanstack/react-router";

export const Header = () => {
	return (
		<nav className="mx-auto flex max-h-25 min-h-25 w-full max-w-225 items-center justify-between px-6 py-7">
			<img
				src="/assets/brand/logo-large.svg"
				alt="Logo"
				className="h-8 max-w-33.25 flex-1"
			/>
			<ul className="flex items-center gap-8">
				<li>
					<Link
						to="/"
						className="font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary"
					>
						Process
					</Link>
				</li>
				<li>
					<Link
						to="/"
						className="font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary"
					>
						Work
					</Link>
				</li>
				<li>
					<Link
						to="/"
						className="font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary"
					>
						Pricing
					</Link>
				</li>
				<li>
					<Link
						to="/"
						className="font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary"
					>
						Testimonial
					</Link>
				</li>
			</ul>

			<a
				href="mailto:hello@lumeoo.studio"
				className="rounded-full border border-[#353535] bg-primary px-5 py-2.5 font-tertiary text-base text-white leading-6 tracking-tight shadow-[-13px_20px_18px_rgba(0,0,0,0.02),-7px_15px_15px_rgba(0,0,0,0.05),-3px_11px_11px_rgba(0,0,0,0.08),-1px_3px_6px_rgba(0,0,0,0.1)] backdrop-blur-[12.5px]"
			>
				Email Us
			</a>
		</nav>
	);
};
