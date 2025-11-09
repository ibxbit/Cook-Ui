import * as React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, forwardRef } from "react";

// Arrow icons
const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

// Props
interface ClickableCarouselProps {
  images: string[];
}

// Config
const GAP = 32; // Gap between cards in pixels

const Card = forwardRef<HTMLDivElement, { src: string; isFirst: boolean }>(({ src, isFirst }, ref) => {
  const elementRef = isFirst ? ref : null;
  

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="group relative flex-shrink-0 overflow-hidden rounded-xl shadow-xl 
                 w-full 
                 sm:w-[calc((100%-4rem)/3)]"
      style={{ 
        height: '360px' 
      }} 
    >
      {/* Image (Using a placeholder since Next.js Image is not supported here) */}
      <img
        src={src || `https://placehold.co/600x360/0a9396/ffffff?text=Project+Screen`}
        alt={`Project image ${src}`}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          // Fallback in case of broken image links
          e.currentTarget.src = 'https://placehold.co/600x360/0a9396/ffffff?text=Image+Not+Found';
        }}
      />

      {/* Optional dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
});

Card.displayName = "Card";

const ClickableCarousel: React.FC<ClickableCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalCards = images.length;

  // We are sliding one card at a time, so the max index is simply the last card.
  const maxIndex = Math.max(0, totalCards - 1);

  // Measure card width dynamically using ResizeObserver
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        // Get the actual computed width of the first card element
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    // Initial measure
    updateWidth();

    // Use ResizeObserver to detect width changes (e.g., orientation change, window resize)
    const observer = new ResizeObserver(updateWidth);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      // Cleanup observer on unmount
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const goToNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  };
  const goToPrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const translateX = cardWidth > 0 ? -currentIndex * (cardWidth + GAP) : 0;

  return (
    <section className="w-full py-12 md:py-20 -mt-165 font-inter">
      {/* Main Responsive Container: Full width with horizontal padding, limited max width, centered */}
      <div className="relative w-full max-w-9xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">Get your Premium Templates</h2>

        {/* Viewport – clips the overflowing card list */}
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <motion.div
            className="flex gap-8" // gap-8 = 32px 
            style={{ x: translateX }}
            animate={{ x: translateX }}
            // Smoother spring transition
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {images.map((src, idx) => (
              <Card 
                key={`${src}-${idx}`} 
                src={src} 
                // Only pass the ref to the first card to measure its dynamic width
                ref={idx === 0 ? cardRef : null}
                isFirst={idx === 0}
              />
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white shadow-lg text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 hover:shadow-xl transition-all duration-300"
            aria-label="Previous"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === maxIndex}
            className="p-3 rounded-full bg-white shadow-lg text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 hover:shadow-xl transition-all duration-300"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
        
        {/* Pagination Dots (Optional, but good for UX) */}
        <div className="flex justify-center space-x-2 mt-4">
            {images.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        idx === currentIndex 
                            ? 'bg-indigo-600' 
                            : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>

      </div>
    </section>
  );
};


export { ClickableCarousel };