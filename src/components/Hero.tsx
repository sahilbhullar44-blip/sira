"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null); // Top Text

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
      className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden perspective-1000"
    >
      {/* 1. Floating Video Canvas with 3D Tilt */}
      <div
        className="relative w-full max-w-[1600px] aspect-4/5 sm:aspect-square md:aspect-video rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-100 ease-out will-change-transform"
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
              src="https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Elegant Dark Overlay */}
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
          {/* Subtle Grain */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* 2. Centered Content Layer */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 sm:p-12 transform-style-3d translate-z-20">
          {/* Top Badge */}
          <div className="mb-8 opacity-0 hero-fade-in translate-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-white/90 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium">
                Est. 2025 • Canada
              </span>
            </div>
          </div>

          {/* Main Headline - Perfectly Balanced */}
          <div className="flex flex-col items-center gap-2 sm:gap-4 mix-blend-difference text-white">
            <h1 className="hero-text-reveal overflow-hidden font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
              LEGENDS
            </h1>
            <span className="hero-divider w-12 h-[2px] bg-red-500 scale-x-0"></span>
            <h1 className="hero-text-reveal overflow-hidden font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight italic">
              COME ALIVE
            </h1>
          </div>

          {/* Description - Restored */}
          <div className="mt-8 max-w-lg mx-auto opacity-0 hero-fade-in translate-y-4">
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed tracking-wide drop-shadow-md">
              SiRa Entertainment curates world-class experiences. We bridge the
              gap between iconic artists and the audiences who adore them.
            </p>
          </div>

          {/* Bottom Action */}
          <div className="mt-10 opacity-0 hero-fade-in translate-y-4 flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={() => window.openModal?.("Tickets")}
              className="group relative px-8 py-4 bg-white text-black font-bold text-xs sm:text-sm tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-300 min-w-[160px]"
            >
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                Book Tickets
              </span>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                window.lenis?.scrollTo("#events");
              }}
              className="group relative px-8 py-4 bg-transparent border border-white/30 text-white font-bold text-xs sm:text-sm tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-300 min-w-[160px]"
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
      <div className="absolute bottom-6 left-8 hidden md:block opacity-40">
        <span className="text-[10px] font-mono tracking-widest text-white/50">
          SIRA ENTERTAINMENT
        </span>
      </div>
      <div className="absolute bottom-6 right-8 hidden md:block opacity-40">
        <span className="text-[10px] font-mono tracking-widest text-white/50">
          Est. Canada
        </span>
      </div>
    </section>
  );
}
