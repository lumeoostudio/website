import { type RefObject, useLayoutEffect } from "react";

const BASE = "stacked-nudge";
const ACTIVE = "stacked-nudge--active";

export type StackedImageHoverOptions = {
  /** Seconds; same for in and out so interrupted hovers don’t “restart” the curve */
  duration?: number;
  /** One CSS <timing-function> for both directions (keeps transition stable) */
  easing?: string;
};

const defaultOptions: Required<StackedImageHoverOptions> = {
  duration: 0.35,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
};

/**
 * Per-image hover nudge. Transition timing is set once on the container via CSS
 * custom properties and never changed on `pointerenter` / `pointerleave`, so
 * moving between stacked images (or re-entering mid-animation) interpolates
 * from the current transform without jitter.
 */
export const useStackedImageHover = <T extends HTMLElement>(containerRef: RefObject<T | null>, options: StackedImageHoverOptions = {}) => {
  const { duration, easing } = { ...defaultOptions, ...options };

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return;
    }

    const images = root.querySelectorAll<HTMLImageElement>("img");
    const targets: HTMLImageElement[] = [];
    for (const img of images) {
      if (img.hasAttribute("data-nudge-left") || img.hasAttribute("data-nudge-up")) {
        targets.push(img);
      }
    }
    if (targets.length === 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const nudgeL = (el: HTMLImageElement) => Number.parseFloat(el.getAttribute("data-nudge-left") ?? "0");
    const nudgeU = (el: HTMLImageElement) => Number.parseFloat(el.getAttribute("data-nudge-up") ?? "0");

    root.style.setProperty("--stack-nudge-duration", `${duration}s`);
    root.style.setProperty("--stack-nudge-ease", easing);

    const cleanups: (() => void)[] = [];

    for (const img of targets) {
      img.classList.add(BASE);
      img.style.setProperty("--stack-nudge-l", `${nudgeL(img)}px`);
      img.style.setProperty("--stack-nudge-u", `${nudgeU(img)}px`);

      const onPointerEnter = () => {
        img.classList.add(ACTIVE);
      };

      const onPointerLeave = () => {
        img.classList.remove(ACTIVE);
      };

      img.addEventListener("pointerenter", onPointerEnter);
      img.addEventListener("pointerleave", onPointerLeave);
      cleanups.push(() => {
        img.removeEventListener("pointerenter", onPointerEnter);
        img.removeEventListener("pointerleave", onPointerLeave);
        img.classList.remove(BASE, ACTIVE);
        img.style.removeProperty("--stack-nudge-l");
        img.style.removeProperty("--stack-nudge-u");
      });
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
      root.style.removeProperty("--stack-nudge-duration");
      root.style.removeProperty("--stack-nudge-ease");
    };
  }, [containerRef, duration, easing]);
};
