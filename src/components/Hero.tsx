"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null); // Top Text
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-12-24T10:00:00-07:00").getTime(); // Edmonton MST (UTC-7)

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // V4 Reveal: Elegant Fade Up
      tl.from(".hero-text-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      })
        .to(
          ".hero-divider",
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          ".hero-fade-in",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // 3D Tilt Effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;

        gsap.to(containerRef.current?.querySelector(".will-change-transform"), {
          rotateY: x * 5, // Subtle rotation
          rotateX: -y * 5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-dvh w-full bg-[#050505] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden perspective-1000"
    >
      {/* 1. Floating Video Canvas with 3D Tilt */}
      <div
        className="relative w-full max-w-[1700px] h-[95%] sm:h-[90%] md:h-[92%] rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-100 ease-out will-change-transform flex flex-col justify-end sm:justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source
              src="https://0q6cvqlghb3ubdsz.public.blob.vercel-storage.com/bg_video.mp4"
              type="video/mp4"
            />
          </video>
          {/* Elegant Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 sm:bg-black/30 mix-blend-multiply"></div>
          {/* Subtle Grain */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* 2. Centered Content Layer */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4 sm:p-12 transform-style-3d translate-z-20">
          {/* Top Badge */}
          {/* Top Badge - Countdown */}
          <div className="mb-4 sm:mb-8 opacity-0 hero-fade-in translate-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
              <div className="flex items-center gap-2 sm:gap-4 text-white font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                <span className="text-white/60 hidden sm:inline">
                  Event Starts In:
                </span>
                <div className="flex gap-2">
                  <span>{timeLeft.d}d</span>
                  <span>:</span>
                  <span>{timeLeft.h}h</span>
                  <span>:</span>
                  <span>{timeLeft.m}m</span>
                  <span>:</span>
                  <span>{timeLeft.s}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Headline - Perfectly Balanced */}
          <div className="flex flex-col items-center gap-1 sm:gap-4 mix-blend-difference text-white">
            <h1 className="hero-text-reveal overflow-hidden font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
              WHERE LEGENDS
            </h1>
            <span className="hero-divider w-8 sm:w-12 h-[2px] bg-red-500 scale-x-0"></span>
            <h1 className="hero-text-reveal overflow-hidden font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight italic">
              COME ALIVE
            </h1>
          </div>

          {/* Description - Restored */}
          <div className="mt-4 sm:mt-8 max-w-xs sm:max-w-lg mx-auto opacity-0 hero-fade-in translate-y-4 px-2">
            <p className="text-white/80 text-xs sm:text-lg font-light leading-relaxed tracking-wide drop-shadow-md line-clamp-3 sm:line-clamp-none">
              SiRa Entertainment curates world-class experiences. We bridge the
              gap between iconic artists and the audiences who adore them.
            </p>
          </div>

          {/* Bottom Action */}
          <div className="mt-6 sm:mt-10 opacity-0 hero-fade-in translate-y-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={() => window.openModal?.("Tickets")}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-300 min-w-full sm:min-w-[160px]"
            >
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                Buy Tickets
              </span>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                window.lenis?.scrollTo("#about");
              }}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-transparent border border-white/30 text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-300 min-w-full sm:min-w-[160px]"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center justify-center gap-2">
                Discover
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Branding - Outside the Frame */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 hidden md:block opacity-40">
        <span className="text-[10px] font-mono tracking-widest text-white/50">
          SIRA ENTERTAINMENT
        </span>
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 hidden md:block opacity-40">
        <span className="text-[10px] font-mono tracking-widest text-white/50">
          Est. Canada
        </span>
      </div>
    </section>
  );
}
