import { useEffect, useRef } from "react";

export type RippleOrigin = { x: number; y: number };

export type ParticleWaveFieldProps = {
  className?: string;
  /** Scales the ambient rolling wave (0 = flat terrain, 1 = default). */
  waveStrength?: number;
  /** Scales ripples that emanate from `rippleOrigin` (0 = none, 1 = default). */
  rippleStrength?: number;
  /** Scales hover / pointer-driven ripples only (1 = default, 2–3 = much stronger reaction). */
  pointerRippleStrength?: number;
  /** Normalized 0–1 point ripples propagate from (e.g. bottom-center `{ x: 0.5, y: 1 }`). */
  rippleOrigin?: RippleOrigin;
  /** 0 = ripple only from `rippleOrigin`, 1 = pointer position dominates. Default 0.65. */
  ripplePointerMix?: number;
  /** Multiplies animation speed (1 = default). */
  timeScale?: number;
  /** Shifts the wave phase so multiple instances feel distinct. Radians. */
  phaseOffset?: number;
  /**
   * When true, “near” (larger, stronger ripples) is drawn toward the **top** of the canvas instead of the bottom.
   * `rippleOrigin.y` is still depth: 1 = near, 0 = far — so with invert, use `{ y: 1 }` for a top-anchored swell.
   */
  depthInvert?: boolean;
  /** Fill behind particles each frame. Use `"transparent"` to overlay on imagery (clears the canvas). */
  backgroundColor?: string;
  /** Lighter particles for `transparent` overlays on dark backgrounds. */
  tone?: "default" | "onDark";
};

const BG = "#F9F9FA";
const GRAY_NEAR = { r: 136, g: 136, b: 136 };
const GRAY_FAR = { r: 204, g: 204, b: 204 };
const GRAY_ON_DARK_NEAR = { r: 210, g: 210, b: 210 };
const GRAY_ON_DARK_FAR = { r: 118, g: 118, b: 118 };

const DEFAULT_RIPPLE_ORIGIN: RippleOrigin = { x: 0.5, y: 1 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(t: number) {
  return {
    r: Math.round(lerp(GRAY_NEAR.r, GRAY_FAR.r, t)),
    g: Math.round(lerp(GRAY_NEAR.g, GRAY_FAR.g, t)),
    b: Math.round(lerp(GRAY_NEAR.b, GRAY_FAR.b, t)),
  };
}

function lerpColorOnDark(t: number) {
  return {
    r: Math.round(lerp(GRAY_ON_DARK_NEAR.r, GRAY_ON_DARK_FAR.r, t)),
    g: Math.round(lerp(GRAY_ON_DARK_NEAR.g, GRAY_ON_DARK_FAR.g, t)),
    b: Math.round(lerp(GRAY_ON_DARK_NEAR.b, GRAY_ON_DARK_FAR.b, t)),
  };
}

export function ParticleWaveField({
  className,
  waveStrength = 1,
  rippleStrength = 1,
  pointerRippleStrength = 2,
  rippleOrigin = DEFAULT_RIPPLE_ORIGIN,
  ripplePointerMix = 0.65,
  timeScale = 1,
  phaseOffset = 0,
  depthInvert = false,
  backgroundColor = BG,
  tone = "default",
}: ParticleWaveFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.75 });
  const rafRef = useRef(0);

  const waveStrengthRef = useRef(waveStrength);
  const rippleStrengthRef = useRef(rippleStrength);
  const pointerRippleStrengthRef = useRef(pointerRippleStrength);
  const rippleOriginRef = useRef<RippleOrigin>(rippleOrigin);
  const ripplePointerMixRef = useRef(ripplePointerMix);
  const timeScaleRef = useRef(timeScale);
  const phaseOffsetRef = useRef(phaseOffset);
  const depthInvertRef = useRef(depthInvert);
  const backgroundColorRef = useRef(backgroundColor);
  const toneRef = useRef(tone);

  waveStrengthRef.current = waveStrength;
  rippleStrengthRef.current = rippleStrength;
  pointerRippleStrengthRef.current = pointerRippleStrength;
  rippleOriginRef.current = rippleOrigin;
  ripplePointerMixRef.current = ripplePointerMix;
  timeScaleRef.current = timeScale;
  phaseOffsetRef.current = phaseOffset;
  depthInvertRef.current = depthInvert;
  backgroundColorRef.current = backgroundColor;
  toneRef.current = tone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = 52;
    const rows = 36;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const defaultPointer = { x: 0.5, y: 0.75 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (inside) {
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      } else {
        mouseRef.current = { ...defaultPointer };
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("pointermove", onPointerMove);

    const t0 = performance.now();

    const draw = (now: number) => {
      const time = (now - t0) * 0.001 * timeScaleRef.current + phaseOffsetRef.current;
      const bg = backgroundColorRef.current;
      if (bg === "transparent") {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const ws = waveStrengthRef.current;
      const rs = rippleStrengthRef.current;
      const prs = pointerRippleStrengthRef.current;
      const { x: ox, y: oy } = rippleOriginRef.current;
      const mix = ripplePointerMixRef.current;

      const focusX = lerp(ox, mx, mix);
      const focusY = lerp(oy, my, mix);

      const yTop = 0.12;
      const yBottom = 0.985;
      const invert = depthInvertRef.current;

      for (let j = 0; j < rows; j++) {
        const rowT = j / (rows - 1);
        const wz = invert ? 1 - rowT : rowT;
        const perspective = 0.14 + wz * 0.86;
        const grayT = 1 - wz;
        const depthAtten = 1 - wz;

        for (let i = 0; i < cols; i++) {
          const u = i / (cols - 1);
          const wx = (u - 0.5) * 5.4;

          const waveA = ws * (Math.sin(wx * 1.85 + time * 1.1) * Math.cos(wz * 2.4 - time * 0.85) + 0.45 * Math.sin(wx * 3.2 - wz * 2.1 + time * 1.35));
          const waveB = ws * 0.35 * Math.cos(wx * 2.1 + wz * 3 + time * 0.95);

          const distOrigin = Math.hypot(u - ox, wz - oy);
          const rippleRadial = Math.sin(distOrigin * 17 - time * 5.5) * Math.exp(-distOrigin * 0.35) * (0.28 + 0.72 * (1 - depthAtten));

          const distFocus = Math.hypot(u - focusX, wz - focusY);
          const rippleFocal =
            Math.exp(-distFocus * distFocus * 7) * Math.sin(distFocus * 21 - time * 6) * 0.55 +
            Math.exp(-((u - mx) ** 2 * 10 + (wz - my * 0.92 + 0.08) ** 2 * 2)) * (mx - 0.5) * 2.35;

          const ripple = rs * rippleRadial + prs * rippleFocal;

          const wy = (waveA + waveB + ripple) * (0.38 + perspective * 0.62);

          const spread = 58 + perspective * 98;
          const px = invert ? width * 0.5 + wx * (width / 5.4) : width * 0.5 + wx * spread;

          const syBase = height * lerp(yTop, yBottom, rowT);
          const verticalKick = wy * (18 + 10 * (1 - depthAtten)) * perspective;
          const sy = syBase - verticalKick;

          const radius = lerp(0.85, 3.2, perspective);
          const alpha = lerp(0.05, 0.94, perspective) * (0.5 + 0.5 * perspective);
          const c = toneRef.current === "onDark" ? lerpColorOnDark(grayT) : lerpColor(grayT);

          ctx.beginPath();
          ctx.arc(px, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
