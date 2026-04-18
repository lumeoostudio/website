import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SectionHeading } from "#/routes/-components/section-heading";

export const StartAProject = () => {
  const contactLinks = ["Email", "X (Twitter)", "Telegram"];

  return (
    <section className="bg-[#F9F9FA]">
      <div className="mx-auto flex w-full max-w-340 items-stretch justify-between gap-16 px-16 py-30">
        <div className="flex flex-col justify-between gap-6 self-stretch">
          <SectionHeading eyebrow="START A PROJECT">
            Let's build something
            <br />
            that actually works
          </SectionHeading>
          <ul className="flex flex-col gap-2">
            {contactLinks.map((contactLink) => (
              <a key={contactLink} href="https://calendly.com/lumeo-studio/30min" className="flex items-center justify-between bg-white px-6 py-3">
                <p className="font-medium font-tertiary text-base text-primary leading-[1.4] tracking-[-3%]">{contactLink}</p>
                <HugeiconsIcon icon={ArrowUpRight} className="size-6 text-primary/70" />
              </a>
            ))}
          </ul>
        </div>

        <figure className="relative grid h-120 max-w-1/2 flex-1 place-content-center bg-black">
          <img src="/assets/start-a-project-bg.png" alt="Start a Project Background" className="absolute top-0 left-0 size-full object-cover object-center" />
          <p className="font-quote text-[40px] text-white italic leading-[1.9] tracking-[-1%]">CALENDLY</p>
        </figure>
      </div>
    </section>
  );
};
