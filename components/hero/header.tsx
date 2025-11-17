"use client";
import { Button } from "@/components/ui/button";
import { Github, Package, GalleryHorizontalEnd } from "lucide-react";
type Lenis = {
  scrollTo: (
    target: Element | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      lock?: boolean;
    },
  ) => void;
};
import { useCallback } from "react";
import { ThemeToggleButton } from "../mode-toggle";

function Header() {
  const navItems = [
    { id: "Templates", label: "Templates" },
    { id: "Components", label: "Components" },
    { id: "how-it-works", label: "How it Works" },
  ];

  const getLenis = () => (window as typeof window & { lenis?: Lenis }).lenis;

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(`#${href}`) as HTMLElement | null;
      if (target) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -20,
            duration: 1.4,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            immediate: false,
            lock: false,
          });
        } else {
          const headerHeight = 100;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    },
    [],
  );

  const handleScrollToTop = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        immediate: false,
        lock: false,
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <header className="sticky z-50 top-0 px-4 pt-5">
      <div className="z-50 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between backdrop-blur-xs bg-white/1 border border-white/10 rounded-2xl">
        {/* Left */}
        <div
          className="flex items-center space-x-1 z-10 cursor-pointer transition-all duration-200 hover:opacity-90"
          onClick={handleScrollToTop}
        >
          <GalleryHorizontalEnd className="h-6 w-6 text-black dark:text-white -mt-[2px]" />
          <span className="text-lg sm:text-xl ml-1 font-semibold text-black dark:text-white">
            COOK-UI
          </span>
        </div>

        {/* Center */}
        <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleSmoothScroll(e, item.id)}
              className="text-gray-900 dark:text-white hover:text-gray-500 transition-all duration-300 ease-out text-sm font-medium bg-transparent border-none cursor-pointer relative group"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center space-x-2 sm:space-x-4 z-10">
          <Button
            variant="ghost"
            className="hidden sm:flex bg-white/1 backdrop-blur-md border border-white/20 text-black dark:text-white hover:text-neutral-700 dark:hover:text-white hover:bg-white/10 transition-all duration-200"
            asChild
          >
            <a
              href="https://github.com/ibxbit/cook-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button
            className="hidden sm:flex bg-white/1 backdrop-blur-md border border-white/20 text-black dark:text-white hover:text-neutral-700 dark:hover:text-white hover:bg-white/10 transition-all duration-200"
            asChild
          >
            <a
              href="#link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="h-4 w-4" />
              <span className="sm:inline">PNPM Package</span>
            </a>
          </Button>
          <div>
            {/* Mode Toggle */}
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
