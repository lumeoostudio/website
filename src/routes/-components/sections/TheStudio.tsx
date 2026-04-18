import { NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "#/lib/utils";
import {
	SectionHeading,
	sectionHeadingTitleClassName,
} from "#/routes/-components/section-heading";

export const TheStudio = () => {
	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-12 px-4 py-10 sm:px-10 sm:py-30 lg:px-16">
			<div className="flex flex-col gap-16">
				<SectionHeading
					eyebrow="THE STUDIO"
					unstyledTitle
				>
					<div className="flex flex-col gap-4 sm:flex-row">
						<h1 className={cn(sectionHeadingTitleClassName, "flex-1")}>
							Four minds.
							<br /> One goal.
						</h1>
						<p className="flex-1 font-medium text-primary/70 text-xl leading-[1.4] tracking-[-3%]">
							We founded Lumeo because we were tired of design that looked good
							but didn't work. Four specialists, one shared conviction: that
							beautiful design and rigorous research are not opposites.
						</p>
					</div>
				</SectionHeading>
				<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{team.map((member) => (
						<li
							key={member.name}
							className="flex flex-col gap-4"
						>
							<figure className="aspect-3/4 h-103 bg-[#F9F9FA] p-6">
								<img
									src={member.image}
									alt={member.name}
									className="aspect-3/4 size-full object-cover object-center"
								/>
							</figure>
							<div className="flex justify-between gap-2">
								<div>
									<p className="font-medium font-tertiary text-lg text-primary leading-[1.4] tracking-[-3%]">
										{member.name}
									</p>
									<p className="font-medium font-secondary text-primary/60 text-sm leading-[1.4] tracking-[-3%]">
										{member.role}
									</p>
								</div>
								<a
									href={member.social_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<HugeiconsIcon
										icon={NewTwitterIcon}
										className="size-6 text-primary"
									/>
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

const team = [
	{
		name: "Tobi",
		role: "Product Designer",
		image: "/assets/the-studio/person-1.png",
		social_url: "https://x.com/Babayanski_12",
	},
	{
		name: "Abiola",
		role: "Product Designer",
		image: "/assets/the-studio/person-1.png",
		social_url: "https://x.com/Babayanski_12",
	},
	{
		name: "Michael",
		role: "Brand Designer",
		image: "/assets/the-studio/person-1.png",
		social_url: "https://x.com/Babayanski_12",
	},
	{
		name: "Adetunji",
		role: "Developer",
		image: "/assets/the-studio/person-1.png",
		social_url: "https://x.com/itzadetunji1",
	},
];
