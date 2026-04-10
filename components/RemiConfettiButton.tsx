"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";

const REMI_PALETTE = [
  "#8b6914",
  "#d97706",
  "#fbbf24",
  "#fef3c7",
  "#c4a574",
  "#3d2f24",
];

function fireCelebration() {
  const base = {
    colors: REMI_PALETTE,
    ticks: 220,
    gravity: 1.05,
  } as const;

  confetti({
    ...base,
    particleCount: 55,
    spread: 28,
    startVelocity: 52,
    origin: { x: 0.5, y: 0.72 },
    scalar: 1,
  });

  window.setTimeout(() => {
    confetti({
      ...base,
      particleCount: 40,
      spread: 68,
      startVelocity: 38,
      origin: { x: 0.2, y: 0.7 },
      scalar: 0.95,
    });
    confetti({
      ...base,
      particleCount: 40,
      spread: 68,
      startVelocity: 38,
      origin: { x: 0.8, y: 0.7 },
      scalar: 0.95,
    });
  }, 95);

  window.setTimeout(() => {
    confetti({
      ...base,
      particleCount: 45,
      spread: 100,
      decay: 0.9,
      origin: { x: 0.5, y: 0.68 },
      scalar: 0.88,
    });
  }, 180);
}

export function RemiConfettiButton() {
  const busy = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onClick = useCallback(() => {
    if (reduceMotion) return;

    if (busy.current) return;
    busy.current = true;
    setTimeout(() => {
      busy.current = false;
    }, 800);

    fireCelebration();
  }, [reduceMotion]);

  return (
    <div className="mt-5 flex flex-col items-stretch gap-2 sm:items-start">
      <button
        type="button"
        onClick={onClick}
        disabled={reduceMotion}
        aria-label={
          reduceMotion
            ? "Celebration disabled: reduced motion is on"
            : "Trigger confetti — thank you for feeding Remi"
        }
        className="text-fredoka hover:cursor-pointer inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-amber-900/20 bg-amber-200/95 px-5 py-3 text-center text-base font-semibold text-amber-950 shadow-[0_4px_0_rgb(120,90,30,0.35)] transition hover:-translate-y-0.5 hover:bg-amber-200 active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snoot disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:hover:translate-y-0"
      >
        <span className="text-xl" aria-hidden>
          🎉
        </span>
        I fed Remi (official)
      </button>
      <p className="text-center text-xs text-amber-950/55 sm:text-left">
        {reduceMotion ? (
          <>
            Reduced motion is on — no confetti, but the gratitude is still real.
          </>
        ) : (
          <>This button is 100% necessary.</>
        )}
      </p>
    </div>
  );
}
