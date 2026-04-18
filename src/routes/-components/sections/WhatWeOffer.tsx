import {
	AdobeAfterEffectIcon,
	AdobeIllustratorIcon,
	AdobePhotoshopIcon,
	FramerIcon,
	WebflowIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { FigmaDuoToneIcon } from "#/components/svg/FigmaDuoToneIcon";
import { NotionDuoToneIcon } from "#/components/svg/NotionDuoToneIcon";
import {
	SectionEyebrow,
	SectionHeading,
} from "#/routes/-components/section-heading";

export const WhatWeOffer = () => {
	const offers = [
		{
			title: "Product design",
			description:
				"We design digital products that solve real problems and improves user experience.",
			image: "/assets/what-we-offer/offer-1.webp",
			imageAlt: "Product design offering",
		},
		{
			title: "Website design ",
			smallTitle: "(& No code Dev.)",
			description:
				"Designing and building fast, scalable websites that just works without the complexity of code.",
			image: "/assets/what-we-offer/offer-2.webp",
			imageAlt: "Website design and no-code development offering",
		},
		{
			title: "Brand design",
			description:
				"We help craft memorable brand identities that stand out and connect to the right audience.",
			image: "/assets/what-we-offer/offer-3.webp",
			imageAlt: "Brand design offering",
		},
	];

	return (
		<section className="bg-[#F9F9FA]">
			<div className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-12 px-4 py-10 sm:px-10 sm:py-30 lg:px-16">
				<div className="flex flex-col gap-16">
					<SectionHeading eyebrow="WHAT WE OFFER">
						Anything Product?
						<br /> Yes we do it!
					</SectionHeading>
					<ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{offers.map((offer) => (
							<li
								key={offer.title}
								className="flex flex-col gap-16 bg-white p-6"
							>
								<img
									src={offer.image}
									alt={offer.imageAlt}
									className="h-fit w-fit"
								/>
								<div className="flex flex-col gap-4">
									<p className="font-medium font-tertiary text-2xl text-primary tracking-[-3%]">
										{offer.title}{" "}
										<span className="font-tertiary text-lg">
											{offer.smallTitle}
										</span>
									</p>
									<p className="text-pretty font-tertiary leading-[1.4] tracking-[-3%]">
										{offer.description}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-6">
					<SectionEyebrow>WHAT WE OFFER</SectionEyebrow>
					<ul className="flex flex-wrap items-center gap-3">
						<li className="size-fit bg-white p-3">
							<FigmaDuoToneIcon
								className="size-6 fill-white"
								duoToneColor="#111111"
							/>
						</li>
						<li className="size-fit bg-white p-3">
							<HugeiconsIcon
								icon={FramerIcon}
								className="size-6 fill-primary text-primary"
							/>
						</li>
						<li className="size-fit bg-white p-3">
							<HugeiconsIcon
								icon={WebflowIcon}
								className="size-6 fill-primary text-primary"
							/>
						</li>
						<li className="size-fit bg-white p-3">
							<NotionDuoToneIcon className="size-6 text-black" />
						</li>
						<li className="size-fit bg-white p-3">
							<HugeiconsIcon
								icon={AdobeIllustratorIcon}
								className="size-6 fill-primary text-white"
							/>
						</li>
						<li className="size-fit bg-white p-3">
							<HugeiconsIcon
								icon={AdobePhotoshopIcon}
								className="size-6 fill-primary text-white"
							/>
						</li>
						<li className="size-fit bg-white p-3">
							<HugeiconsIcon
								icon={AdobeAfterEffectIcon}
								className="size-6 fill-primary text-white"
							/>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};
