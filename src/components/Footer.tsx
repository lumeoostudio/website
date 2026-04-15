import { Link } from "@tanstack/react-router";

export const Footer = () => {
	return (
		<footer className="mx-auto flex w-full max-w-305 flex-col items-center gap-6 py-6">
			<div className="flex w-full items-center justify-between gap-4">
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
			</div>
			<p className="text-center font-medium text-base text-primary leading-[1.4] tracking-[-0.2px]">
				{" "}
				© LUMEOSTUDIO 2026. ALL RIGHTS RESERVED.
			</p>
		</footer>
	);
};
