import { SectionHeading } from "#/routes/-components/section-heading";

export const OurWorks: React.FC<{
  works: { src: string; alt: string }[];
  sectionId?: string;
}> = ({ works, sectionId }) => {
  return (
    <section id={sectionId} className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-4 py-10 sm:px-10 sm:py-30 lg:px-16">
      <SectionHeading eyebrow="OUR WORKS">
        See how well
        <br />
        we do across niches
      </SectionHeading>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12">
        {works.map((work) => (
          <img key={work.src} src={work.src} alt={work.alt} className="col-span-6" />
        ))}
      </ul>
    </section>
  );
};
