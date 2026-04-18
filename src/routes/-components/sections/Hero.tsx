import { ChartUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "#/components/ui/button";

export const Hero = () => {
  return (
    <section className="mx-auto flex w-full flex-col items-center gap-25 py-20">
      <div className="flex w-full max-w-4xl flex-1 flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-4.5">
          <p className="w-full text-center font-medium text-[64px] leading-[1.1] tracking-[-2%]">
            <span className="text-muted"> Design</span> <span className="text-primary">partner </span> <span className="text-muted"> for</span>{" "}
            <span className="relative pl-13 text-primary">
              <span className="absolute top-1/2 -left-1 grid size-13 -translate-y-1/2 rotate-7 place-content-center rounded-[1rem] bg-primary">
                <HugeiconsIcon icon={ChartUpIcon} className="size-5 text-white" />
              </span>
              growth
            </span>
            <span className="text-muted"> minded</span>{" "}
            <span className="relative pl-13 text-primary">
              <span className="absolute top-1/2 -left-1 grid size-13 -translate-y-1/2 -rotate-10 place-content-center rounded-[1rem] bg-primary">
                <HugeiconsIcon icon={ChartUpIcon} className="size-5 text-white" />
              </span>
              startups
            </span>
          </p>

          <p className="max-w-135 text-center font-tertiary text-primary text-xl leading-[1.4] tracking-[-3%]">
            We pair rigorous UX research with bold, crafted design so your products look great and perform
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Button className="box-content rounded-full px-6.25 py-3.25 text-xl leading-7.5">Book a Call</Button>
          <Button className="box-content rounded-full px-6.25 py-3.25 text-xl leading-7.5" variant="tertiary">
            See Our Projects
          </Button>
        </div>
      </div>
      <div className="relative h-249 w-full overflow-hidden">
        <ul className="absolute flex h-full items-center gap-8">
          <img src="/assets/hero/hero-1.webp" alt="Hero Carousel 1" className="h-full w-auto object-cover" draggable={false} />

          <img src="/assets/hero/hero-2.webp" alt="Hero Carousel 2" className="h-full w-auto object-cover" draggable={false} />

          <img src="/assets/hero/hero-3.webp" alt="Hero Carousel 3" className="h-full w-auto object-cover" draggable={false} />

          <img src="/assets/hero/hero-4.webp" alt="Hero Carousel 4" className="h-full w-auto object-cover" draggable={false} />
        </ul>
      </div>
    </section>
  );
};
