"use client";

import { GSAPReveal } from "./GSAPReveal";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Visual */}
        <GSAPReveal>
          <div className="relative group mx-auto max-w-lg lg:max-w-none">
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-full h-full border-r-2 border-b-2 border-red-700/50 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3"></div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
              <Image
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2670&auto=format&fit=crop"
                alt="Concert Crowd"
                fill
                className="object-cover transform transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
              />
            </div>
            {/* Magazine Style Floating Text */}
            <div className="absolute -bottom-6 right-0 md:-bottom-8 md:right-10 lg:-bottom-10 lg:-right-4 bg-black/90 backdrop-blur-md p-6 md:p-8 lg:p-10 border-l-4 border-red-700 max-w-[280px] md:max-w-sm z-20 shadow-xl">
              <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white italic leading-tight">
                &quot;We don&apos;t just host events. We craft{" "}
                <span className="text-red-600 font-bold">legacies.</span>&quot;
              </p>
            </div>
          </div>
        </GSAPReveal>

        {/* Content */}
        <div className="space-y-8 mt-12 lg:mt-0">
          <GSAPReveal delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-none text-center lg:text-left">
              THE <span className="text-red-600 block pl-0 ">ARCHITECTS</span>{" "}
              OF SOUND
            </h2>
          </GSAPReveal>

          <GSAPReveal delay={0.4}>
            <div className="flex gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="w-px h-16 md:h-24 bg-red-600 shrink-0"></div>
              <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg text-left">
                Founded on the principle that live music is a spiritual
                experience. SiRa Entertainment has quickly ascended to become
                Canada&apos;s premier boutique production house for South Asian
                and Global heavyweights.
              </p>
            </div>
          </GSAPReveal>

          <GSAPReveal delay={0.6}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-8 mt-8">
              <div className="text-center lg:text-left">
                <span className="block text-2xl md:text-3xl font-bold text-white mb-1">
                  50+
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Sold Out Shows
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl md:text-3xl font-bold text-white mb-1">
                  100k+
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Attendees
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl md:text-3xl font-bold text-white mb-1">
                  5+
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Cities
                </span>
              </div>
            </div>
          </GSAPReveal>
        </div>
      </div>
    </section>
  );
}
