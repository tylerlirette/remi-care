"use client";

import Image from "next/image";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
};

export function ImageLightbox({ src, alt, children }: Props) {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="font-bold underline decoration-amber-700/70 underline-offset-2 transition-colors hover:text-snoot hover:decoration-snoot hover:cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open
        ? createPortal(
            <div
              id={dialogId}
              className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/70"
                aria-label="Close photo"
                onClick={close}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                <div className="pointer-events-auto relative w-full max-w-[min(90vw,52rem)]">
                  <button
                    ref={closeBtnRef}
                    type="button"
                    className="absolute hover:cursor-pointer -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-2xl font-light leading-none text-stone-700 shadow-md transition hover:bg-stone-50 sm:-right-3 sm:-top-3"
                    aria-label="Close"
                    onClick={close}
                  >
                    ×
                  </button>
                  <div className="relative h-[min(85vh,720px)] w-full overflow-hidden rounded-2xl bg-stone-900/5 shadow-2xl">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 90vw, 832px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
