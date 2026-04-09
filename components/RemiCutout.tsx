export function RemiCutout() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center"
      aria-hidden
    >
      <div className="remi-cutout-anim relative h-[min(38vh,260px)] w-[min(88vw,320px)] sm:h-[min(40vh,300px)] sm:w-[min(72vw,380px)]">
        {/* Native img avoids next/image SSR/client src & wrapper mismatches (hydration warnings). */}
        <img
          src="/remi/remi-cutout.webp"
          alt=""
          width={640}
          height={800}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-full w-full object-contain object-bottom select-none"
        />
      </div>
    </div>
  );
}
