"use client";

import Image from "next/image";
import { GSAPReveal } from "./GSAPReveal";

export default function Supporters() {
  const logos = [
    "/assets/supporters/supporter-1.png",
    "/assets/supporters/supporter-2.png",
    "/assets/supporters/supporter-3.jpg",
    "/assets/supporters/supporter-4.png",
    "/assets/supporters/supporter-5.png",
  ];

  // Duplicate for seamless loop (enough to cover wide screens)
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-20 bg-black overflow-hidden relative border-t border-white/10">
      <div className="container mx-auto px-4 mb-12 text-center">
        <GSAPReveal>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-white mb-2">
            THANKS TO ALL <span className="text-red-600">SUPPORTERS</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </GSAPReveal>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients for smooth fade at edges */}
        <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-linear-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-linear-to-l from-black to-transparent z-10"></div>

        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
          {marqueeLogos.map((src, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[200px] md:min-w-[250px] mx-4 md:mx-8 h-24 md:h-32 transition-colors duration-300"
            >
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
                <Image
                  src={src}
                  alt={`Supporter ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
