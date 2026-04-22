import { ImageGalleryThumbnails } from "#/components/ImageGallery";
import { SectionHeading } from "#/routes/-components/section-heading";

export const OurWorks: React.FC<{
	works: { src: string; alt: string }[];
	/** First global index in the site image gallery (hero images come first) */
	startIndex: number;
	sectionId?: string;
}> = ({ works, startIndex, sectionId }) => {
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
			<ImageGalleryThumbnails
				images={works}
				startIndex={startIndex}
			/>
		</section>
	);
};
