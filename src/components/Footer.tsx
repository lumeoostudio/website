import { Link } from "@tanstack/react-router";

export const Footer = () => {
	return (
		<footer className="bg-[#F9F9FA]">
			<div className="mx-auto flex w-full max-w-340 flex-col items-center gap-12 px-4 py-6 sm:px-10 lg:px-16">
				<div className="flex w-full flex-wrap items-center justify-between gap-4">
					<img
						src="/assets/brand/logo-large.svg"
						alt="Logo"
						className="h-8 max-w-33.25 flex-1"
					/>
					<ul className="flex items-center gap-y-8-0">
						<Link
							to="/"
							className="px-3 pl-0 font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary sm:px-4"
						>
							Process
						</Link>

						<Link
							to="/"
							className="px-3 py-4 font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary sm:px-4"
						>
							Work
						</Link>

						<Link
							to="/"
							className="px-3 py-4 font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary sm:px-4"
						>
							Pricing
						</Link>

						<Link
							to="/"
							className="px-3 py-4 font-medium text-base text-secondary leading-[1.4] duration-200 ease-in-out hover:text-primary sm:px-4"
						>
							Testimonial
						</Link>
					</ul>
				</div>
				<p className="text-center font-medium text-base text-primary leading-[1.4] tracking-[-0.2px]">
					{" "}
					© LUMEOSTUDIO 2026. ALL RIGHTS RESERVED.
				</p>
			</div>
		</footer>
	);
};
