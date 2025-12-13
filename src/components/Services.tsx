"use client";

import { Mic2, Aperture, Radio } from "lucide-react";
import { GSAPReveal } from "./GSAPReveal";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <GSAPReveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 italic font-serif">
              Your pass to world-class entertainment
            </p>
          </div>
        </GSAPReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          {/* Service 1 */}
          <GSAPReveal>
            <div className="group ticket-card flex flex-col md:flex-row w-full min-h-[200px] ticket-notches hover:translate-y-[-5px]">
              <div className="w-full md:w-48 bg-[#151515] flex flex-col items-center justify-center p-6 ticket-border-dashed border-b md:border-b-0 md:border-r border-white/10 relative">
                <Mic2 className="w-10 h-10 text-red-700 mb-4" />
                <span className="font-mono text-xs text-gray-500 tracking-widest rotate-0 md:-rotate-90">
                  ADMIT ONE
                </span>
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border border-white/5 border-l-0">
                <h3 className="font-serif font-bold text-3xl text-white mb-3 group-hover:text-red-600 transition-colors">
                  Artist Tours
                </h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-2xl text-sm md:text-base">
                  Comprehensive tour management for international artists. We
                  handle logistics, technical production, and hospitality to
                  ensure seamless performances across Canadian cities.
                </p>
              </div>
            </div>
          </GSAPReveal>

          {/* Service 2 */}
          <GSAPReveal delay={0.1}>
            <div className="group ticket-card flex flex-col md:flex-row w-full min-h-[200px] ticket-notches hover:translate-y-[-5px]">
              <div className="w-full md:w-48 bg-[#151515] flex flex-col items-center justify-center p-6 ticket-border-dashed border-b md:border-b-0 md:border-r border-white/10 relative">
                <Aperture className="w-10 h-10 text-red-700 mb-4" />
                <span className="font-mono text-xs text-gray-500 tracking-widest rotate-0 md:-rotate-90">
                  VIP PASS
                </span>
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border border-white/5 border-l-0">
                <h3 className="font-serif font-bold text-3xl text-white mb-3 group-hover:text-red-600 transition-colors">
                  Event Production
                </h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-2xl text-sm md:text-base">
                  From stage design to audio-visual mastery. We transform empty
                  venues into immersive environments using state-of-the-art
                  technology and creative direction.
                </p>
              </div>
            </div>
          </GSAPReveal>

          {/* Service 3 */}
          <GSAPReveal delay={0.2}>
            <div className="group ticket-card flex flex-col md:flex-row w-full min-h-[200px] ticket-notches hover:translate-y-[-5px]">
              <div className="w-full md:w-48 bg-[#151515] flex flex-col items-center justify-center p-6 ticket-border-dashed border-b md:border-b-0 md:border-r border-white/10 relative">
                <Radio className="w-10 h-10 text-red-700 mb-4" />
                <span className="font-mono text-xs text-gray-500 tracking-widest rotate-0 md:-rotate-90">
                  MARKETING
                </span>
              </div>

              <div className="flex-1 p-6 md:p-12 flex flex-col justify-center border border-white/5 border-l-0">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3 group-hover:text-red-600 transition-colors">
                  Promotion & PR
                </h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-2xl text-sm md:text-base">
                  Strategic marketing campaigns that generate buzz. We utilize
                  digital channels, influencer partnerships, and traditional
                  media to ensure sold-out shows.
                </p>
              </div>
            </div>
          </GSAPReveal>
        </div>
      </div>
    </section>
  );
}
