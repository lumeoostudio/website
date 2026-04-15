import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";

export const Pricing = () => {
	const productPlans = [
		{
			title: "ONE TIMER",
			description:
				"For teams who need a clear outcome, without extended commitment.",
			startingFromLabel: "STARTING FROM:",
			price: "$2,000",
			features: [
				"End-to-end product design across mobile, web, or desktop",
				"In-depth user research and UX strategy",
				"Fast iteration cycles with structured feedback loops",
				"Organized design handoff (Dev-ready + export assets)",
			],
			ctaLabel: "Book a call",
		},
		{
			title: "RETAINER",
			description:
				"For teams who need ongoing design support, not just a one-off deliverable.",
			startingFromLabel: "STARTING FROM:",
			price: "$3,500",
			features: [
				"One active task at a time, fully focused",
				"Flexible scope that adapts as priorities shift",
				"Consistent progress updates every weekday",
				"Dedicated project lead for coordination and delivery",
			],
			ctaLabel: "Book a call",
		},
	];

	const prod = productPlans.map((plan) => (
		<Card
			key={plan.title}
			className="flex-1 rounded-none bg-[#F9F9FA] p-8 ring-0"
		>
			<CardHeader className="gap-1 p-0">
				<CardTitle className="flex flex-col font-medium text-primary text-xl leading-normal tracking-[-0.5px]">
					{plan.title}
				</CardTitle>
				<p className="font-medium font-tertiary text-base leading-normal tracking-[-0.5px]">
					{plan.description}
				</p>
			</CardHeader>
			<CardContent className="flex flex-col gap-8 p-0 pb-8!">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-1">
						<p className="font-medium font-tertiary text-base leading-normal tracking-[-0.5px]">
							{plan.startingFromLabel}
						</p>
						<p className="font-medium text-[40px] text-base leading-normal tracking-[-0.5px]">
							{plan.price}
						</p>
					</div>
					<ul className="flex flex-col gap-3">
						{plan.features.map((feature) => (
							<li
								key={feature}
								className="flex items-start gap-3"
							>
								<div className="mt-1 size-4.5 bg-primary" />
								<p className="text-base text-primary tracking-[-0.5px]">
									{feature}
								</p>
							</li>
						))}
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
	));

	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-12 px-16 py-30">
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-6">
					<p className="font-medium font-secondary text-base text-secondary leading-[1.1] tracking-normal">
						PRICING
					</p>
					<h1 className="font-medium font-primary text-[48px] text-primary leading-[1.1] tracking-[-3%]">
						Prices that help you
						<br /> grow and thrive
					</h1>
				</div>
				<div className="flex flex-col gap-8">
					<Tabs
						defaultValue="product"
						className=""
					>
						<TabsList className="gap2-.5 h-13.5! rounded-none bg-[#F5F5F6] p-2">
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
							className="flex gap-6"
						>
							{prod}
						</TabsContent>
						<TabsContent
							value="landing"
							className="flex gap-6"
						>
							{prod}
						</TabsContent>
						<TabsContent
							value="branding"
							className="flex gap-6"
						>
							{prod}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
};
