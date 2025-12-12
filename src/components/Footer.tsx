"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 pt-20 pb-10 border-t border-red-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16">
          <div className="text-center md:text-left">
            <div className="relative h-16 w-10 mx-auto md:mx-0 mb-4">
              <Image
                src="/logo.png"
                alt="SiRa Logo"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(214,0,28,0.5)]"
              />
            </div>
            <p className="text-gray-500 max-w-xs font-light">
              Crafting legendary moments in time through the power of live
              entertainment.
            </p>
          </div>

          <div className="flex gap-8">
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors uppercase text-sm tracking-widest"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors uppercase text-sm tracking-widest"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors uppercase text-sm tracking-widest"
            >
              Facebook
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-xs text-gray-600 tracking-widest uppercase text-center md:text-left">
          <p>&copy; 2025 SiRa Entertainment Ltd.</p>
          <button
            onClick={() => window.lenis?.scrollTo(0)}
            className="group flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
          <Link
            href="https://sahilpreet.in"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            Designed by Sahilpreet.in
          </Link>
        </div>
      </div>
    </footer>
  );
}
