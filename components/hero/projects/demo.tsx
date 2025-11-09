"use client"

import { ClickableCarousel } from "@/components/hero/projects/index"; // Updated import name

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
]

function ClickableCarouselDemo() {
    return (
        <div className="h-screen w-full flex items-center justify-center"> {/* Simplified container */}
            <ClickableCarousel images={images} />
        </div>
    )
}

export { ClickableCarouselDemo };