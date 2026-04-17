import { NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const TheStudio = () => {
	return (
		<section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-12 px-16 py-30">
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-6">
					<p className="font-medium font-secondary text-base text-secondary leading-[1.1] tracking-normal">
						THE STUDIO
					</p>
					<div className="flex gap-4">
						<h1 className="flex-1 font-medium font-primary text-[48px] text-primary leading-[1.1] tracking-[-3%]">
							Four minds.
							<br /> One goal.
						</h1>
						<p className="flex-1 font-medium text-primary/70 text-xl leading-[1.4] tracking-[-3%]">
							We founded Lumeo because we were tired of design that looked good
							but didn't work. Three specialists, one shared conviction: that
							beautiful design and rigorous research are not opposites.
						</p>
					</div>
				</div>
				<ul className="grid grid-cols-4 gap-8">
					{team.map((member) => (
						<li
							key={member.name}
							className="flex flex-col gap-4"
						>
							<figure className="h-103 bg-[#F9F9FA] p-6">
								<img
									src={member.image}
									alt={member.name}
									className="size-full object-cover object-center"
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
