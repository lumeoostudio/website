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
			width: 82,
			height: 80,
			description:
				"We design digital products that solve real problems and improves user experience.",
			image: "/assets/what-we-offer/offer-1.webp",
			imageAlt: "Product design offering",
		},
		{
			title: "Website design ",
			smallTitle: "(& No code Dev.)",
			width: 101,
			height: 66,
			description:
				"Designing and building fast, scalable websites that just works without the complexity of code.",
			image: "/assets/what-we-offer/offer-2.webp",
			imageAlt: "Website design and no-code development offering",
		},
		{
			title: "Brand design",
			width: 99,
			height: 61,
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
						{offers.map((offer, index) => (
							<li
								key={offer.title}
								className="flex flex-col gap-16 bg-white p-6"
							>
								{/* <img
									src={offer.image}
									alt={offer.imageAlt}
									width={offer.width}
									height={offer.height}
									className="object-fill"
								/> */}
								{index === 0 && <WhatWeOfferImage1 />}
								{index === 1 && <WhatWeOfferImage2 />}
								{index === 2 && <WhatWeOfferImage3 />}
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
					<SectionEyebrow>WHAT WE WORK WITH</SectionEyebrow>
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

const WhatWeOfferImage1 = () => {
	return (
		<figure className="relative h-20">
			<img
				src="public/assets/what-we-offer/offer-1/part-3.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-0 left-11.25 h-18.25 w-8.5 rotate-[2.65deg]"
			/>
			<img
				src="public/assets/what-we-offer/offer-1/part-2.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-1 left-6.25 h-18.25 w-8.5 rotate-[8deg]"
			/>
			<img
				src="public/assets/what-we-offer/offer-1/part-1.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-0.5 h-18.25 w-8.5 -rotate-2"
			/>
		</figure>
	);
};

const WhatWeOfferImage2 = () => {
	return (
		<figure className="relative h-16">
			<img
				src="public/assets/what-we-offer/offer-2/part-2.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-2 left-2 h-14 w-22.75 -rotate-2"
			/>
			<img
				src="public/assets/what-we-offer/offer-2/part-1.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-0 left-0 h-14 w-22.75"
			/>
		</figure>
	);
};

const WhatWeOfferImage3 = () => {
	return (
		<figure className="relative h-15.25">
			<img
				src="public/assets/what-we-offer/offer-3/part-2.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-2 left-2 h-13.5 w-22.75"
			/>
			<img
				src="public/assets/what-we-offer/offer-3/part-1.webp"
				alt="Product design offering"
				className="filter-[drop-shadow(12.3019px_30.7548px_13.5321px_rgba(0,0,0,0.01))_drop-shadow(7.38115px_17.2227px_11.0717px_rgba(0,0,0,0.03))_drop-shadow(2.46038px_7.38115px_8.61134px_rgba(0,0,0,0.05))_drop-shadow(1.23019px_2.46038px_4.92077px_rgba(0,0,0,0.06))] absolute top-0 left-0 size-13.5"
			/>
		</figure>
	);
};
