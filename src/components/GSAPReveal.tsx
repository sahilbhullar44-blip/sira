"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPRevealProps {
  children: React.ReactNode;
  delay?: number; // Delay in SECONDS for GSAP
  y?: number;
  duration?: number;
  className?: string;
  stagger?: number;
}

export function GSAPReveal({
  children,
  delay = 0,
  y = 50,
  duration = 1,
  className = "",
  stagger = 0,
}: GSAPRevealProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { y: y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%",
            toggleActions: "play none none none", // Play once and stay
          },
        }
      );
    }, el);

    return () => ctx.revert(); // Proper cleanup
  }, [delay, y, duration, stagger]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
