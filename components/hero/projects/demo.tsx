"use client";

import { ClickableCarousel } from "@/components/hero/projects/index";

const images = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png",
  "/9.png",
  "/10.png",
];

function ClickableCarouselDemo() {
  return (
    <>
      <div className="-mt-32 sm:-mt-40 md:-mt-48 lg:-mt-56 xl:-mt-64 2xl:-mt-72">
        <ClickableCarousel images={images} speed={45} pauseOnHover={true} />
      </div>
    </>
  );
}

export { ClickableCarouselDemo };