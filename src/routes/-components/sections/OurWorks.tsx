import { SectionHeading } from "#/routes/-components/section-heading";

export const OurWorks: React.FC<{ works: { src: string; alt: string }[] }> = ({ works }) => {
  return (
    <section className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-16 py-30">
      <SectionHeading eyebrow="OUR WORKS">
        See how well
        <br />
        we do across niches
      </SectionHeading>
      <ul className="grid grid-cols-12 gap-x-8 gap-y-6">
        {works.map((work) => (
          <img key={work.src} src={work.src} alt={work.alt} className="col-span-6" />
        ))}
      </ul>
    </section>
  );
};
