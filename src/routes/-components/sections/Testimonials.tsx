import { useInfiniteMarquee } from "#/hooks/useInfiniteMarquee";
import { SectionHeading } from "#/routes/-components/section-heading";

const testimonials = [
  {
    quote:
      '"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
    name: "Connor Caffery",
    role: "Founder US platform",
    image: "/assets/testimonials/testimonial-1.png",
  },
  {
    quote:
      '"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
    name: "Connor Caffery",
    role: "Founder US platform",
    image: "/assets/testimonials/testimonial-1.png",
  },
  {
    quote:
      '"The research phase alone changed how we thought about our product. They found friction points we\'d been blind to for months. The redesign that followed cut our drop-off rate in half."',
    name: "Connor Caffery",
    role: "Founder US platform",
    image: "/assets/testimonials/testimonial-1.png",
  },
];

/** Two identical sequences for a seamless GSAP loop (translate by exactly half of track width). */
const MARQUEE_LOOP = [...testimonials, ...testimonials] as const;

export const Testimonials = () => {
  const { trackRef, onPointerEnter, onPointerLeave } = useInfiniteMarquee<HTMLUListElement>();

  return (
    <section id="testimonials" className="mx-auto flex w-full max-w-340 flex-col items-stretch gap-16 px-4 py-10 sm:px-10 sm:py-30 lg:px-16">
      <SectionHeading eyebrow="OUR WORKS">
        What our
        <br />
        partners say.
      </SectionHeading>
      <div className="overflow-hidden" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
        <ul ref={trackRef} className="m-0 flex w-max list-none gap-6 p-0" aria-label="Partner testimonials">
          {MARQUEE_LOOP.map((testimonial, index) => (
            <li key={`${testimonial.name}-${index}`} className="flex max-h-71.25 min-h-71.25 max-w-100 shrink-0 flex-col justify-between gap-4 bg-[#F9F9FA] p-6 sm:min-w-95">
              <p className="font-tertiary text-primary/70 leading-[1.4] tracking-[-3%]">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <img src={testimonial.image} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover" />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-medium font-tertiary text-primary/70 leading-[1.4] tracking-[-3%]">{testimonial.name}</p>
                  <p className="font-tertiary text-primary/70 text-sm leading-[1.4] tracking-[-3%]">{testimonial.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
