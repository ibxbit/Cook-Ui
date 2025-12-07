import * as React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GAP = 32;

interface ClickableCarouselProps {
  images: string[];
  speed?: number;
  pauseOnHover?: boolean;
}

const ClickableCarousel: React.FC<ClickableCarouselProps> = ({
  images,
  speed = 45,
  pauseOnHover = true,
}) => {
  const [cardWidth, setCardWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const duplicatedImages = [...images, ...images];
  const loopDistance = images.length * (cardWidth + GAP);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <section className="w-full pt-20 pb-32 md:pt-34 md:pb-40 font-inter overflow-hidden">
      <div className="relative w-full max-w-9xl mx-auto px-4">
        <h2 className="text-3xl font-bold mt-35 text-gray-800 dark:text-white mb-12 text-center">
          Get your Premium Templates
        </h2>

        <div
          className="overflow-hidden"
          onMouseEnter={() => pauseOnHover && setIsHovered(true)}
          onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        >
          <motion.div
            className="flex gap-8"
            animate={{ x: isHovered ? 0 : -loopDistance }}
            transition={{
              x: {
                duration: loopDistance / speed,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            {duplicatedImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                ref={i === 0 ? cardRef : null}
                className="group relative flex-shrink-0 w-full sm:w-[calc((100%-4rem)/3)] overflow-hidden rounded-2xl border border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-2xl"
                style={{ height: "360px" }}
              >
                {/* Top-Left Dot/Reflection */}
                <div className="absolute top-0.5 left-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 z-10 opacity-70"></div>
                {/* Top-Right Dot/Reflection */}
                <div className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 z-10 opacity-70"></div>

                {/* Bottom-Left Dot/Reflection */}
                <div className="absolute bottom-0.5 left-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 z-10 opacity-70"></div>

                {/* Bottom-Right Dot/Reflection */}
                <div className="absolute bottom-0.5 right-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 z-10 opacity-70"></div>

                <div className="absolute inset-4 rounded-lg overflow-hidden shadow-lg z-20">
                  <img
                    src={src}
                    alt={`Project ${i % images.length + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { ClickableCarousel };