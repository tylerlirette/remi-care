import Image from "next/image";
import { RemiCutout } from "@/components/RemiCutout";
import { SmoothScrollTo } from "@/components/SmoothScrollTo";

const REMI_PHOTOS = [
  {
    src: "/remi/PXL_20251101_191608892.PORTRAIT.jpg",
    alt: "Remi looking handsome",
    caption: "Something smells weird...",
  },
  {
    src: "/remi/PXL_20251223_221207686.PORTRAIT.jpg",
    alt: "Remi being a very good boy",
    caption: "So regal... and handsome.",
  },
  {
    src: "/remi/20231110_150614.jpg",
    alt: "Remi on an adventure",
    caption: "What the heck are you looking at?",
  },
  {
    src: "/remi/PXL_20260315_153650783.jpg",
    alt: "Remi says hello",
    caption: "Dis is my simba",
  },
  {
    src: "/remi/PXL_20251011_195239179.jpg",
    alt: "Remi relaxing",
    caption: "Hard day of napping. Don’t ask.",
  },
  {
    src: "/remi/20240331_110607.jpg",
    alt: "Remi in the sunshine",
    caption: "Solar powered. Also snack powered",
  },
  {
    src: "/remi/PXL_20220529_004205522.jpg",
    alt: "Remi puppy energy",
    caption: "Hey guys, how's it going?",
  },
  {
    src: "/remi/PXL_20260303_004933828.jpg",
    alt: "Remi checking in",
    caption: "Just making sure you still love me (you do)",
  },
  {
    src: "/remi/20230923_105602.jpg",
    alt: "Remi being photogenic",
    caption: "I may have gotten a little muddy on this day",
  },
  {
    src: "/remi/PXL_20231111_183355826.MP.jpg",
    alt: "Remi after a good day",
    caption: "Oh hi",
  },
  {
    src: "/remi/PXL_20260131_014801199.jpg",
    alt: "Remi late night thoughts",
    caption: "I like to sleep",
  },
  {
    src: "/remi/PXL_20251112_160419397.jpg",
    alt: "Remi approves this message",
    caption: "Legal says I can sign with nose print",
  },
] as const;

/** Layout chunks: interleave photos instead of a flat grid */
const PHOTO_GROUPS = [
  { kind: "spotlight" as const, indices: [0], blurb: "Yes, there are many of me. I’m worth the bandwidth." },
  { kind: "pair" as const, indices: [1, 2] },
  { kind: "solo-wide" as const, indices: [3], blurb: "Fun fact: I have never once lied about being hungry." },
  { kind: "trio" as const, indices: [4, 5, 6] },
  { kind: "pair" as const, indices: [7, 8] },
  { kind: "spotlight" as const, indices: [9], blurb: "If you’re still scrolling, thank you. If not, rude." },
  { kind: "pair" as const, indices: [10, 11] },
];

const ROTATE = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"] as const;

function SectionTitle({
  children,
  emoji,
  id,
}: {
  children: React.ReactNode;
  emoji: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight text-snoot sm:text-3xl"
    >
      <span className="mr-2" aria-hidden>
        {emoji}
      </span>
      {children}
    </h2>
  );
}

function PolaroidCard({
  photo,
  rotateClass,
  className = "",
  priority = false,
  tall = false,
}: {
  photo: (typeof REMI_PHOTOS)[number];
  rotateClass: string;
  className?: string;
  priority?: boolean;
  tall?: boolean;
}) {
  return (
    <figure
      className={`rounded-sm bg-white p-2 pb-3 shadow-[4px_6px_0_rgb(61,47,36,0.12),0_12px_28px_rgb(61,47,36,0.08)] ring-1 ring-amber-900/10 transition-transform hover:z-10 hover:rotate-0 sm:hover:scale-[1.02] ${rotateClass} ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden bg-stone-200 ${tall ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-[4/5]"}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 92vw, 320px"
          priority={priority}
        />
      </div>
      <figcaption className="font-[family-name:var(--font-fredoka)] mt-2.5 px-1 text-center text-[0.8125rem] leading-snug text-amber-950/85 sm:text-sm">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

function TimeCard({
  time,
  title,
  sticker,
  children,
}: {
  time: string;
  title: string;
  sticker?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border-2 border-dashed border-amber-800/25 bg-white/90 p-5 shadow-[0_8px_30px_rgb(61,47,36,0.08)] backdrop-blur-sm sm:p-6">
      {sticker ? (
        <span
          className="absolute -right-1 -top-1 flex h-11 w-11 items-center justify-center rounded-full bg-amber-300/90 text-lg shadow-sm ring-2 ring-white"
          aria-hidden
        >
          {sticker}
        </span>
      ) : null}
      <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold uppercase tracking-widest text-amber-800/80">
        {time}
      </p>
      <h3 className="mt-1 font-[family-name:var(--font-fredoka)] text-xl font-semibold text-foreground">
        {title}
      </h3>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/90">
        {children}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <RemiCutout />
      <div className="remi-page-bg relative overflow-x-hidden">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl"
          aria-hidden
        />

        <main className="relative mx-auto max-w-5xl px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-8 sm:px-6 sm:pt-14">
          <header className="text-center sm:text-left">
            <p className="inline-flex rotate-[-1deg] items-center rounded-full border-2 border-amber-800/20 bg-amber-100/80 px-3 py-1 font-[family-name:var(--font-fredoka)] text-xs font-semibold uppercase tracking-[0.12em] text-amber-900 sm:text-sm">
              QR code tour · rated G (for Good boy)
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-fredoka)] text-[2.125rem] font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-center md:text-6xl">
              Hi. It me.{" "}
              <span className="relative inline-block text-snoot">
                Remi.
                <span
                  className="absolute -right-2 top-0 text-lg leading-none text-amber-600 sm:text-2xl"
                  aria-hidden
                >
                  ★
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-left text-foreground/90 md:mx-auto md:text-center">
              Hey{" "}
              <strong className="text-foreground">Sara</strong>,{" "}
              <strong className="text-foreground">Garritt</strong>, and{" "} 
              <strong className="text-foreground">Uncle P P</strong> — Mom and Dad
              packed some bags and left. I can only assume they are gone forever. So, you all will have to take care of me now.{" "}
              They kept sayign something about <strong className="text-foreground">August</strong>, but it's April... I think they've lost it. As you all know, I will bark
              at you like you&apos;re a burglar every time you come over. Barking is my love language. Everything you need to love and take care of me is below; walks are always a yes if
              someone&apos;s up for a slow sniff tour (I promise I won't try and mark everything under the sun (I lied. That will totally happen)).
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:items-start md:mx-auto md:max-w-xl md:items-center">
              <SmoothScrollTo
                targetId="todays-instructions"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-snoot px-5 py-3 text-center font-[family-name:var(--font-fredoka)] text-base font-semibold text-amber-50 shadow-[0_4px_0_rgb(80,60,20,0.35)] transition hover:-translate-y-0.5 hover:bg-amber-800 active:translate-y-0 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snoot"
              >
                <span className="text-xl" aria-hidden>
                  🦴
                </span>
                Skip the pics — show me the chores
              </SmoothScrollTo>
              <p className="text-center text-xs text-foreground/50 sm:text-left md:text-center">
                (It just scrolls down. I&apos;m not a wizard. I&apos;m a dog.)
              </p>
            </div>
          </header>

          <section
            className="mt-16"
            aria-labelledby="photos-heading"
          >
            <h2
              id="photos-heading"
              className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight text-snoot sm:text-3xl"
            >
              <span className="mr-2" aria-hidden>
                🖼️
              </span>
              The mandatory Remi montage
            </h2>
            <p className="mt-3 max-w-2xl text-foreground/80">
              I had a feeling this day would come, so I made Dad take a bunch of pictures of me, so it would be easier for people to love me.
            </p>

            <div className="mt-10 space-y-12 sm:space-y-16">
              {PHOTO_GROUPS.map((group, gi) => {
                const photos = group.indices.map((i) => REMI_PHOTOS[i]);

                if (group.kind === "spotlight") {
                  const p = photos[0];
                  const idx = group.indices[0];
                  return (
                    <div
                      key={`spotlight-${idx}`}
                      className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10"
                    >
                      <PolaroidCard
                        photo={p}
                        rotateClass={ROTATE[gi % ROTATE.length]}
                        className="mx-auto w-full max-w-[280px] shrink-0 md:mx-0"
                        priority={idx === 0}
                        tall
                      />
                      <div className="relative flex-1 rounded-2xl border-2 border-amber-800/15 bg-amber-50/60 p-5 font-[family-name:var(--font-fredoka)] text-lg leading-snug text-amber-950/90 shadow-sm sm:p-6 sm:text-xl">
                        <span
                          className="absolute -left-1 top-4 hidden h-10 w-3 rounded-sm bg-amber-400/80 shadow-sm md:block"
                          aria-hidden
                        />
                        {group.blurb}
                      </div>
                    </div>
                  );
                }

                if (group.kind === "pair") {
                  return (
                    <div
                      key={`pair-${group.indices.join("-")}`}
                      className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6"
                    >
                      {photos.map((p, j) => (
                        <PolaroidCard
                          key={p.src}
                          photo={p}
                          rotateClass={ROTATE[(gi + j) % ROTATE.length]}
                          className="mx-auto w-full max-w-[260px] sm:mx-0"
                        />
                      ))}
                    </div>
                  );
                }

                if (group.kind === "solo-wide") {
                  const p = photos[0];
                  return (
                    <div
                      key={`wide-${group.indices[0]}`}
                      className="space-y-4"
                    >
                      <p className="max-w-prose font-[family-name:var(--font-fredoka)] text-base italic text-amber-900/80 sm:text-lg">
                        {group.blurb}
                      </p>
                      <div className="flex justify-center sm:justify-start">
                        <PolaroidCard
                          photo={p}
                          rotateClass="rotate-1"
                          className="w-full max-w-md"
                        />
                      </div>
                    </div>
                  );
                }

                /* trio */
                return (
                  <div
                    key={`trio-${group.indices.join("-")}`}
                    className="relative mx-auto max-w-3xl"
                  >
                    <div className="absolute -left-2 top-1/2 hidden h-24 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-amber-300/0 via-amber-400/60 to-amber-300/0 sm:block" />
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                      {photos.map((p, j) => (
                        <PolaroidCard
                          key={p.src}
                          photo={p}
                          rotateClass={ROTATE[(gi + j) % ROTATE.length]}
                          className="mx-auto w-full max-w-[220px] sm:max-w-none"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            id="todays-instructions"
            className="mt-20 scroll-mt-10 sm:scroll-mt-12"
            aria-labelledby="schedule-heading"
          >
            <SectionTitle emoji="🗓️" id="schedule-heading">
              Today&apos;s quest log (repeat daily)
            </SectionTitle>
            <p className="mt-3 max-w-2xl text-foreground/80">
              Times are squishy. I am a dog, not a Swiss watch. Follow the vibe:
              food, potty, pills, dramatic sighs, repeat.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              <TimeCard
                time="Morning · ~8:00–8:30 (flex is fine)"
                title="Breakfast of champions"
                sticker="🌅"
              >
                <p>
                  Let me out. I will do my business (like a professional). When I
                  come back in, please{" "}
                  <strong>wipe my paws</strong>. My paws be getting real dirty.
                </p>
                <p>
                  <strong>Food time!</strong> One <strong>large, heaping scoop</strong> of my dry
                  food. Then take the <strong>chicken-based fresh food from the bag in the fridge</strong> (I love this part) and pour it loosely on top — just enough to <strong>lightly cover</strong> the kibble. Lik a hat.
                </p>
              </TimeCard>

              <TimeCard
                time="Evening · ~5:00"
                title="Pills, peanut butter, drama (minimal)"
                sticker="💊"
              >
                <p>
                  Out again. Same deal:{" "}
                  <strong>paws get wiped</strong> when I return. I did not invent
                  mud; I simply redistribute it.
                </p>
                <p>
                  Pills go with a little{" "}
                  <strong>peanut butter</strong>. I do not need a whole jar. A
                  polite dab is enough. I am a gentleman.
                </p>
                <ul className="list-inside list-disc space-y-1 pl-1 marker:text-snoot">
                  <li>
                    <strong>1</strong> fish oil pill
                  </li>
                  <li>
                    <strong>1</strong> probiotic pill (it lives in a{" "}
                    <strong>small pink box</strong>)
                  </li>
                  <li>
                    <strong>2</strong> Al-R-G pills
                  </li>
                </ul>
                <p>
                  After that I get my <strong>dental treat</strong>. I act casual
                  about it but I am internally screaming with joy. I will grab it from you and retreat off into the distance to eat it.
                </p>
              </TimeCard>

              <TimeCard
                time="Night · ~9:00"
                title="Dinner + last patrol"
                sticker="🌙"
              >
                <p>
                  Another <strong>big overfull scoop</strong> of dry food (yes,
                  this is allowed; I wrote this website (definitely not Dad)).
                </p>
                <p>
                  Then let me out <strong>one last time</strong> for the night.
                  Paws wiped on the way in. Then I assume my position as hallway
                  security until morning.
                </p>
              </TimeCard>
            </div>
          </section>

          <section
            className="mt-14 rounded-3xl border-2 border-dashed border-sky-700/25 bg-sky-50/70 p-5 sm:p-8"
            aria-labelledby="water-heading"
          >
            <h2
              className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-sky-950 sm:text-3xl"
              id="water-heading"
            >
              <span className="mr-2" aria-hidden>
                💧
              </span>
              Hydration station (I’m basically a fish in a dog suit)
            </h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-sky-950/90">
              <p>
                There are <strong>two water bowls</strong>: one in the{" "}
                <strong>front</strong> and one in{" "}
                <strong>the bedroom</strong>. Please peek at both and make sure I
                am not running a desert simulator.
              </p>
              <p>
                The <strong>bedroom bowl</strong> tends to run empty faster
                because I am committed to hydration. There is a{" "}
                <strong>large cup above that bowl</strong> — use it to refill (give me the good water!).
                Science thanks you. I thank you louder, with my mouth.
              </p>
            </div>
          </section>

          <footer className="mt-16 border-t-2 border-dotted border-amber-800/20 pt-10 text-center">
            <p className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-snoot">
              Woof sincerely, Remi
            </p>
            <p className="mt-2 text-sm text-foreground/60">
              P.S. Tell Tyler and fam congrats on August. Extra butt scratches
              accepted as legal tender when they get home.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
