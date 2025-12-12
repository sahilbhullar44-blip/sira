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

    // Use a small timeout to ensure DOM is ready?
    // Actually GSAP handles it well usually.

    // Initial state set by GSAP to avoid FOUC
    gsap.set(el.current, { y: y, opacity: 0 });

    gsap.to(el.current, {
      y: 0,
      opacity: 1,
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el.current,
        start: "top 85%", // Trigger when top of element hits 85% of viewport height
        toggleActions: "play none none reverse", // Play on enter, reverse on leave back up
      },
    });

    return () => {
      // Cleanup happens automatically mostly with ScrollTrigger but good practice
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [delay, y, duration, stagger]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
