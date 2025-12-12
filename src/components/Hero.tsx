"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Cinematic Entrance
      tl.from(".hero-element", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // Simple Parallax on Scroll
      gsap.to(textRef.current, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
        },
      });

      // Mouse Movement Parallax for Spotlight
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1

        gsap.to(spotlightRef.current, {
          x: x * 50,
          y: y * 50,
          duration: 1.5,
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
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background - Simple Global Style */}
      <div className="absolute inset-0 z-0 bg-transparent">
        {/* Global Background + noise overlay from layout */}
      </div>

      {/* Main Content - Centered & Grand */}
      <div
        ref={textRef}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Spotlight - Specifically behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <div
            ref={spotlightRef}
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-red-500/15 rounded-full blur-[120px] mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]"
          ></div>
        </div>

        {/* Badge */}
        <div className="hero-element mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-900/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-red-200 text-xs uppercase tracking-[0.3em] font-medium">
              Est. 2025 • Canada
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-element font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight mb-8 drop-shadow-2xl">
          LEGENDS
          <br />
          <span className="text-red-600 italic">COME ALIVE</span>
        </h1>

        {/* Description */}
        <p className="hero-element text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
          SiRa Entertainment curates world-class experiences. We bridge the gap
          between iconic artists and the audiences who adore them.
        </p>

        {/* Actions */}
        <div className="hero-element flex flex-col sm:flex-row items-center gap-6">
          <button
            onClick={() => window.openModal?.("Tickets")}
            className="group relative px-10 py-5 bg-red-700 hover:bg-red-800 transition-all duration-300 text-white font-bold text-sm tracking-widest uppercase overflow-hidden shadow-[0_0_40px_rgba(185,28,28,0.4)] hover:shadow-[0_0_60px_rgba(185,28,28,0.6)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            <span className="relative flex items-center gap-3">
              Upcoming Shows <ArrowRight className="w-5 h-5" />
            </span>
          </button>

          <Link
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              window.lenis?.scrollTo("#about");
            }}
            className="text-white/70 hover:text-red-400 uppercase tracking-[0.2em] text-xs border-b border-transparent hover:border-red-500 transition-all pb-1"
          >
            Discover More
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hero-element flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] tracking-[0.3em] font-medium text-white uppercase animate-pulse">
          Scroll
        </span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
