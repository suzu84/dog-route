"use client";

import Image from "next/image";

const SLIDES = [
  "/images/about/slider01.jpg",
  "/images/about/slider02.jpg",
  "/images/about/slider03.jpg",
  "/images/about/slider04.jpg",
  "/images/about/slider05.jpg",
  "/images/about/slider06.jpg",
  "/images/about/slider07.jpg",
  "/images/about/slider08.jpg",
];

export default function AboutSlider() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 animate-slide">
        {[...SLIDES, ...SLIDES].map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[200px] h-[150px] lg:w-[240px] lg:h-[180px] rounded-lg overflow-hidden"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
