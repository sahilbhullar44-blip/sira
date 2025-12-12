"use client";

import Link from "next/link";
import Image from "next/image";
import { GSAPReveal } from "./GSAPReveal";

export default function Events() {
  return (
    <section id="events" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <GSAPReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-white/10 pb-6 gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Past Events
            </h2>
            <Link
              href="#"
              className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              View Archive
            </Link>
          </div>
        </GSAPReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event 1 */}
          <GSAPReveal>
            <div className="group cursor-pointer relative">
              <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              <div className="relative overflow-hidden aspect-3/4 mb-6 border border-white/10 group-hover:border-red-600/30 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
                  alt="Concert"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="inline-block px-3 py-1 bg-red-700 text-white text-[10px] uppercase tracking-widest font-bold">
                    Sold Out
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start border-t border-white/5 pt-4 group-hover:border-red-600/30 transition-colors">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-red-500 transition-colors duration-300">
                    Vishal & Shekhar
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest group-hover:text-gray-400">
                    Toronto • 2024
                  </p>
                </div>
                <span className="text-white/20 font-serif italic text-4xl group-hover:text-red-700/50 transition-colors duration-500">
                  01
                </span>
              </div>
            </div>
          </GSAPReveal>

          {/* Event 2 */}
          <GSAPReveal delay={0.15}>
            <div className="group cursor-pointer relative">
              <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              <div className="relative overflow-hidden aspect-3/4 mb-6 border border-white/10 group-hover:border-red-600/30 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
                  alt="Concert"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="inline-block px-3 py-1 bg-red-700 text-white text-[10px] uppercase tracking-widest font-bold">
                    Limited
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start border-t border-white/5 pt-4 group-hover:border-red-600/30 transition-colors">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-red-500 transition-colors duration-300">
                    Bollywood Nights
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest group-hover:text-gray-400">
                    Vancouver • 2024
                  </p>
                </div>
                <span className="text-white/20 font-serif italic text-4xl group-hover:text-red-700/50 transition-colors duration-500">
                  02
                </span>
              </div>
            </div>
          </GSAPReveal>

          {/* Event 3 */}
          <GSAPReveal delay={0.3}>
            <div className="group cursor-pointer relative">
              <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              <div className="relative overflow-hidden aspect-3/4 mb-6 border border-white/10 group-hover:border-red-600/30 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
                  alt="Concert"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="inline-block px-3 py-1 bg-white text-black text-[10px] uppercase tracking-widest font-bold">
                    Past Event
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start border-t border-white/5 pt-4 group-hover:border-red-600/30 transition-colors">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-red-500 transition-colors duration-300">
                    Summer Jam
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest group-hover:text-gray-400">
                    Montreal • 2023
                  </p>
                </div>
                <span className="text-white/20 font-serif italic text-4xl group-hover:text-red-700/50 transition-colors duration-500">
                  03
                </span>
              </div>
            </div>
          </GSAPReveal>
        </div>
      </div>
    </section>
  );
}
