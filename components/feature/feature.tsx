"use client";
import { ArrowUpRight, Code2, Package, Sparkles, Zap } from "lucide-react";
import CommandBlock from "../ui/command-block";
import { FadeInWrapper } from "../ui/fade-in-wrapper";

export default function Hero() {
  return (
    <section className="relative z-30 py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-2 text-center flex items-center -mb-20 sm:-mb-28 lg:-mb-35">
      <div className="container mx-auto max-w-6xl px-2">

        {/* Main Headline */}
        <FadeInWrapper delay={200}>
          <h1 className="mb-4 sm:mb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-snug text-center px-2 mt-150">
            <span className="block bg-gradient-to-r from-black to-gray-400 dark:from-gray-200 to-black bg-clip-text text-transparent transition-all duration-300">
              npx and Done
            </span>
            <span
              className="bg-gradient-to-r from-pink-300 via-slate-600 to-gray-200 bg-clip-text text-transparent transition-all duration-300"
            >
              Your Start-Up is Live !
            </span>
          </h1>
        </FadeInWrapper>

        {/* Subtitle */}
        <FadeInWrapper delay={300}>
          <p className="mb-4 sm:mb-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4">
            A CLI tool that instantly creates modern, responsive StartUps with
            Next.js, Tailwind CSS, and TypeScript - minimal setup, maximum
            impact.
          </p>
        </FadeInWrapper>

        <FadeInWrapper delay={400}>
          <div className="mb-4 sm:mb-4">
            <CommandBlock />
          </div>
        </FadeInWrapper>
      </div>
    </section>
  );
}
