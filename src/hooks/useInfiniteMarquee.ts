import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef } from "react";

type UseInfiniteMarqueeOptions = {
  speedPxPerSec?: number;
  hoverTimeScaleDuration?: number;
  pauseOnHover?: boolean;
};

export const useInfiniteMarquee = <T extends HTMLElement>({ speedPxPerSec = 48, hoverTimeScaleDuration = 0.2, pauseOnHover = true }: UseInfiniteMarqueeOptions = {}) => {
  const trackRef = useRef<T>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const timeScaleEaseRef = useRef<gsap.core.Tween | null>(null);
  const hoverRef = useRef(false);

  const rampTimeScale = useCallback(
    (target: number) => {
      const tween = tweenRef.current;
      if (!tween) return;
      timeScaleEaseRef.current?.kill();
      timeScaleEaseRef.current = gsap.to(tween, {
        timeScale: target,
        duration: hoverTimeScaleDuration,
        ease: target === 0 ? "sine.out" : "sine.in",
      });
    },
    [hoverTimeScaleDuration]
  );

  const onPointerEnter = useCallback(() => {
    if (!pauseOnHover) return;
    hoverRef.current = true;
    rampTimeScale(0);
  }, [pauseOnHover, rampTimeScale]);

  const onPointerLeave = useCallback(() => {
    if (!pauseOnHover) return;
    hoverRef.current = false;
    rampTimeScale(1);
  }, [pauseOnHover, rampTimeScale]);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const setup = () => {
        tweenRef.current?.kill();
        timeScaleEaseRef.current?.kill();
        gsap.set(track, { x: 0 });
        const half = track.scrollWidth / 2;
        if (half < 1) return;
        tweenRef.current = gsap.to(track, {
          x: -half,
          duration: half / speedPxPerSec,
          ease: "none",
          repeat: -1,
        });
        if (pauseOnHover && hoverRef.current) {
          gsap.set(tweenRef.current, { timeScale: 0 });
        }
      };

      setup();
      const resizeObserver = new ResizeObserver(setup);
      resizeObserver.observe(track);

      return () => {
        resizeObserver.disconnect();
        timeScaleEaseRef.current?.kill();
        tweenRef.current?.kill();
      };
    },
    { dependencies: [pauseOnHover, speedPxPerSec] }
  );

  return {
    trackRef,
    onPointerEnter,
    onPointerLeave,
  };
};
