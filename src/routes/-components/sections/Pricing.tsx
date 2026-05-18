import {
	ArrowRight01Icon,
	ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { PRICING_PLANS, type PricingPlan } from "#/lib/utils";
import { SectionHeading } from "#/routes/-components/section-heading";

export const Pricing = () => {
	return (
		<section
			id="pricing"
			className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-12 px-4 py-10 sm:px-10 sm:py-30 lg:px-16"
		>
			<div className="flex flex-col gap-16">
				<SectionHeading eyebrow="PRICING">
					Prices that help you
					<br /> grow and thrive
				</SectionHeading>

				<Tabs
					defaultValue="product"
					className="flex flex-col gap-8"
				>
					<TabsList className="h-13.5! gap-2.5 rounded-none bg-[#F5F5F6] p-2">
						<TabsTrigger
							value="product"
							className="cursor-pointer rounded-none px-4.5 py-2.5 shadow-none data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:text-white"
						>
							Product
						</TabsTrigger>
						<TabsTrigger
							value="landing"
							className="cursor-pointer rounded-none px-4.5 py-2.5 shadow-none data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:text-white"
						>
							Landing
						</TabsTrigger>
						<TabsTrigger
							value="branding"
							className="cursor-pointer rounded-none px-4.5 py-2.5 shadow-none data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:text-white"
						>
							Branding
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="product"
						className="flex flex-col gap-6 lg:flex-row"
					>
						{PRICING_PLANS.product.map((plan, index) => (
							<PlanCard
								key={index}
								plan={plan}
							/>
						))}
					</TabsContent>
					<TabsContent
						value="landing"
						className="flex flex-col gap-6 lg:flex-row"
					>
						{PRICING_PLANS.landing.map((plan, index) => (
							<PlanCard
								key={index}
								plan={plan}
							/>
						))}
					</TabsContent>
					<TabsContent
						value="branding"
						className="flex flex-col gap-6 lg:flex-row"
					>
						{PRICING_PLANS.branding.map((plan, index) => (
							<PlanCard
								key={index}
								plan={plan}
							/>
						))}
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

const PlanCard: React.FC<{
	plan: PricingPlan;
}> = ({ plan }) => {
	const [isDevelopmentActive, setIsDevelopmentActive] = useState(false);
	const handleToggle = () => {
		setIsDevelopmentActive((prev) => !prev);
	};
	const displayedPrice =
		isDevelopmentActive && plan.developmentPrice
			? plan.developmentPrice
			: plan.price;

	return (
		<Card
			key={plan.title}
			className="flex-1 justify-between rounded-none bg-[#F9F9FA] p-6 ring-0 lg:p-8"
		>
			<CardHeader className="gap-1 p-0">
				<CardTitle className="flex flex-col font-medium text-primary text-xl leading-normal tracking-[-0.5px]">
					{plan.title}
				</CardTitle>
				<p className="font-medium font-tertiary text-base text-primary/70 leading-normal tracking-[-0.5px]">
					{plan.description}
				</p>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col gap-8 p-0 pb-8!">
				<div className="flex flex-1 flex-col gap-8">
					<div className="flex justify-between gap-10">
						<div className="flex flex-col gap-1">
							<p className="font-medium font-tertiary text-base leading-normal tracking-[-0.5px]">
								{plan.startingFromLabel}
							</p>
							<p className="font-medium text-[40px] text-base leading-normal tracking-[-0.5px]">
								{displayedPrice}
							</p>
						</div>
						{plan?.developmentPrice && (
							<div className="flex items-center gap-2 self-start">
								<div className="h-6 w-12.5 border border-primary/15 p-0.5">
									<ul
										className="relative flex h-full w-full cursor-pointer flex-row items-center justify-between"
										onClick={handleToggle}
									>
										<input
											type="checkbox"
											id="toggle"
											className="peer hidden"
											checked={isDevelopmentActive}
											onChange={handleToggle}
										/>
										<div className="absolute top-0 left-0 h-full w-1/2 transition-transform duration-300 peer-checked:translate-x-full">
											<div className="h-full w-full bg-primary" />
										</div>
									</ul>
								</div>
								<p className="font-medium font-sans text-base leading-normal tracking-[-0.5px]">
									Add development
								</p>
							</div>
						)}
					</div>
					<ul className="flex flex-col gap-3">
						{plan.features.map((feature) =>
							typeof feature === "string" ? (
								<li
									key={feature}
									className="flex items-center gap-3"
								>
									<div className="size-4.5 shrink-0 bg-primary" />
									<p className="text-base text-primary tracking-[-0.5px]">
										{feature}
									</p>
								</li>
							) : (
								<a
									href={feature.link}
									key={feature.title}
									className="flex items-center gap-1 underline"
									target="_blank"
									rel="noopener"
								>
									<li className="flex items-center gap-3">
										<div className="size-4.5 shrink-0 bg-primary" />
										<p className="text-base text-primary tracking-[-0.5px]">
											{feature.title}
										</p>
									</li>
									<HugeiconsIcon
										icon={ArrowUpRight01Icon}
										strokeWidth={2}
										className="size-5 text-primary"
									/>
								</a>
							),
						)}
					</ul>
				</div>
				<CardFooter className="rounded-none border-none bg-transparent p-0 shadow-none drop-shadow-none">
					<Button
						variant="default"
						className="h-12 w-full rounded-full"
					>
						{plan.ctaLabel}
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	);
};
