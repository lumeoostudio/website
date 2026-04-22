import { ImageGallery } from "#/components/ImageGallery";
import { SectionHeading } from "#/routes/-components/section-heading";

export const OurWorks: React.FC<{
	works: { src: string; alt: string }[];
	sectionId?: string;
}> = ({ works, sectionId }) => {
	return (
		<section
			id={sectionId}
			className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-4 py-10 sm:px-10 sm:py-30 lg:px-16"
		>
			<SectionHeading eyebrow="OUR WORKS">
				See how well
				<br />
				we do across niches
			</SectionHeading>
			<ImageGallery
				images={works}
				dialogLabel="Work gallery preview"
			/>
		</section>
	);
};
