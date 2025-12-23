"use client";

import Image from "next/image";
import { GSAPReveal } from "./GSAPReveal";

export default function UpcomingEvents() {
  return (
    <section
      id="upcoming-events"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <GSAPReveal>
          <div className="mb-12 md:mb-16 border-b border-white/10 pb-6">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white">
              Upcoming Event
            </h2>
          </div>
        </GSAPReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Event Poster */}
          <GSAPReveal>
            <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:max-w-none border border-white/10 rounded-sm overflow-hidden group">
              <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              <Image
                src="/assets/events/vishal-sheykhar-new-poster.jpg"
                alt="The Superhit Tour: Vishal and Sheykhar Live in Edmonton"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </GSAPReveal>

          {/* Right: Event Details */}
          <GSAPReveal delay={0.2}>
            <div className="flex flex-col justify-center text-center lg:text-left">
              <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                Edmonton • Live Concert
              </span>
              <h3 className="font-serif font-bold text-4xl md:text-6xl text-white mb-2 leading-tight">
                The Superhit Tour
              </h3>
              <h4 className="font-serif text-2xl md:text-4xl text-gray-300 mb-8">
                Vishal & Sheykhar
              </h4>

              <div className="space-y-6 mb-10 text-gray-400 text-lg">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                    Date
                  </span>
                  <span className="text-white font-medium">
                    Tuesday, June 30th, 2026
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                    Time
                  </span>
                  <span className="text-white font-medium">
                    Doors Open 6:00 PM | Show Start 8:00 PM
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                    Venue
                  </span>
                  <span className="text-white font-medium">
                    Edmonton Expo Centre
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                    Address
                  </span>
                  <span className="text-white font-medium">
                    7515 118 Ave NW, Edmonton, AB T5B 0J2
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                    Contact
                  </span>
                  <span className="text-white font-medium">
                    info@siraconcerts.com
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.openModal?.("Tickets")}
                  className="px-8 py-4 bg-red-700 text-white uppercase tracking-widest text-sm font-bold hover:bg-red-800 transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.3)] hover:shadow-[0_0_30px_rgba(185,28,28,0.5)]"
                >
                  Buy Tickets
                </button>
              </div>
            </div>
          </GSAPReveal>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-red-900/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </section>
  );
}
