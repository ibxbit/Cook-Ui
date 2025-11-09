"use client";

import { useEffect, useRef, useState } from "react";
import { TimelineContent } from "@/components/hero/timeline-animation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sparkles } from "lucide-react";
import { GridPattern } from "./grid-pattern";
import HomeHeaderRaw from "./header";
import GridOverlay from "../ui/HomeProjectGrid";
import { ClickableCarouselDemo } from "./projects/demo";
import PremiumButton from "../ui/heroButton";
import HeroSection from "../feature/feature";

const HomeHeader = HomeHeaderRaw as any;

export default function OrganizationHero() {
  const [localTheme, setLocalTheme] = useState<"light" | "dark">("light");
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 992px)");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", localTheme === "dark");
  }, [localTheme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setLocalTheme(saved ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", localTheme);
  }, [localTheme]);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.4, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.4, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", scale: 0.8, opacity: 0 },
  };

  return (
    <section ref={heroRef} className="relative min-h-screen pb-10">
      <GridPattern
        className="absolute inset-x-0 -top-14 -z-10 h-full w-full 
                   fill-neutral-100 dark:fill-secondary/30 
                   stroke-neutral-700/5 dark:stroke-secondary/30 
                   [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />
      <GridOverlay />
      <div className="relative z-50 w-full">
        <HomeHeader localTheme={localTheme} setLocalTheme={setLocalTheme} />
      </div>

      <TimelineContent
        as="article"
        animationNum={1}
        timelineRef={heroRef}
        customVariants={revealVariants}
        className="relative z-10 mx-auto max-w-5xl space-y-4 px-4 py-32 -mt-10 text-center text-neutral-800 lg:px-0"
      >
        <TimelineContent
          animationNum={2}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-md bg-black px-1.5 py-1 text-xs text-white sm:text-sm"
        >
          <span className="rounded-sm bg-blue-500 px-1">NEW</span>
          Make your event hand-picked with Guest Genius
        </TimelineContent>

        <TimelineContent
          as="h1"
          animationNum={3}
          timelineRef={heroRef}
          customVariants={scaleVariants}
          className="mb-6 capitalize text-4xl font-semibold text-gray-900 dark:text-white sm:text-5xl 2xl:text-6xl"
        >
          Launch projects instantly
          {!isMobile && <br />}
          <span className="inline-block pt-3 text-5xl sm:text-7xl 2xl:text-7xl">
            <span className="bg-gradient-to-b from-black to-black/40 bg-clip-text text-transparent dark:text-white">
              with our free OS{" "}
            </span>
            <TimelineContent
              as="span"
              animationNum={4}
              timelineRef={heroRef}
              customVariants={scaleVariants}
              className="inline-block rounded-xl border-2 border-blue-300 bg-blue-500/20 px-2 text-blue-500 backdrop-blur-md"
            >
              library
            </TimelineContent>
          </span>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={5}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="mx-auto max-w-2xl text-sm sm:text-base dark:text-white 2xl:max-w-3xl 2xl:text-lg"
        >
          Move beyond primitives. Our curated UI library provides not just components, but full,
          beautiful, and responsive website templates built on modern design principles. It's all
          free, open-source, and crafted to accelerate your development instantly.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={6}
          timelineRef={heroRef}
          customVariants={scaleVariants}
          className="mx-auto mt-5 flex w-fit gap-2"
        >
          <PremiumButton />
        </TimelineContent>
      </TimelineContent>
      <div>
        <ClickableCarouselDemo />
      </div>
      <div className="-mt-150">
        <HeroSection />
      </div>
    </section>
  );
}