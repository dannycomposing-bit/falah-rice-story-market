import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/rice_fields_story.mp4.asset.json";
import heroPoster from "@/assets/rice_fields_poster.jpg.asset.json";

type Scene = { from: number; to: number; text: string; final?: boolean };

const scenes: Scene[] = [
  { from: 0, to: 0.18, text: "از دل شالیزارهای فریدونکنار" },
  { from: 0.2, to: 0.38, text: "ریشه در خاک حاصلخیز و آب زلال شمال" },
  { from: 0.4, to: 0.58, text: "خوشه‌های طلایی و معطر طارم اصیل" },
  { from: 0.6, to: 0.78, text: "فرآوری تمام‌اتوماتیک، یکدست و بهداشتی" },
  { from: 0.82, to: 1, text: "برنج طارم دانه بلند فلاح و پسران", final: true },
];

const FADE = 0.04;

function SceneText({ scene, progress }: { scene: Scene; progress: MotionValue<number> }) {
  const isFirst = scene.from === 0;
  const inputs = isFirst
    ? [0, scene.to - FADE, scene.to]
    : scene.final
      ? [scene.from, scene.from + FADE, 1]
      : [scene.from, scene.from + FADE, scene.to - FADE, scene.to];
  const opacities = isFirst ? [1, 1, 0] : scene.final ? [0, 1, 1] : [0, 1, 1, 0];
  const lifts = isFirst ? [0, 0, -30] : scene.final ? [30, 0, 0] : [30, 0, 0, -30];
  const opacity = useTransform(progress, inputs, opacities);
  const y = useTransform(progress, inputs, lifts);
  const blur = useTransform(opacity, [0, 1], ["blur(8px)", "blur(0px)"]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, y, filter: blur, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <span className="mb-5 block h-px w-16 bg-gold" />
      <h2
        className={
          scene.final
            ? "max-w-4xl text-4xl font-black leading-[1.4] text-ivory md:text-6xl lg:text-7xl"
            : "max-w-3xl text-3xl font-bold leading-[1.5] text-ivory md:text-5xl lg:text-6xl"
        }
      >
        {scene.text}
      </h2>
      {scene.final && (
        <>
          <p className="mt-5 max-w-xl text-base text-ivory/75 md:text-lg">
            مستقیم از کارخانه، با ضمانت اصالت و ارسال به سراسر ایران
          </p>
          <Button
            variant="gold"
            size="xl"
            className="mt-10"
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          >
            مشاهده و خرید محصولات
          </Button>
        </>
      )}
      {isFirst && (
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-ivory/70">
          <span className="text-xs tracking-wide">اسکرول کنید</span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-ivory/40 pt-2">
            <span className="block h-2 w-1 rounded-full bg-gold animate-scroll-cue" />
          </div>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      )}
    </motion.div>
  );
}

export function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // The video can finish loading before hydration attaches onLoadedData.
    if (video.readyState >= 2) setReady(true);
    let raf = 0;
    let current = 0;

    // iOS Safari only buffers a muted video after a play() call; prime it then pause.
    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
      window.removeEventListener("touchstart", prime);
    };
    window.addEventListener("touchstart", prime, { passive: true });

    const tick = () => {
      const duration = video.duration;
      if (duration && Number.isFinite(duration)) {
        const target = scrollYProgress.get() * (duration - 0.05);
        current += (target - current) * 0.12;
        if (Math.abs(target - current) < 0.001) current = target;
        if (!video.seeking && Math.abs(video.currentTime - current) > 0.008) {
          video.currentTime = current;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("touchstart", prime);
    };
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[450vh]" aria-label="داستان برنج فلاح و پسران">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <img
          src={heroPoster.url}
          alt="شالیزارهای فریدونکنار"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          src={heroVideo.url}
          muted
          playsInline
          preload="auto"
          poster={heroPoster.url}
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        {!ready && !failed && (
          <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs text-ivory/80 backdrop-blur">
            در حال بارگذاری ویدیو…
          </div>
        )}

        {scenes.map((scene) => (
          <SceneText key={scene.text} scene={scene} progress={scrollYProgress} />
        ))}

        <motion.div
          style={{ scaleX: barScale }}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-right bg-gradient-gold"
        />
      </div>
    </section>
  );
}
