"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function Counter({
  target,
  duration = 2, // GSAP duration is in seconds usually, but let's keep it adaptable or assume seconds if small
  suffix = "",
  className = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Use a proxy object to animate cleanly
    const proxy = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        value: target,
        duration: duration,
        scrollTrigger: {
          trigger: node,
          start: "top 85%", // Start animation when 85% of viewport is reached
          once: true, // Only run once
        },
        ease: "power2.out",
        onUpdate: () => {
          setCount(Math.floor(proxy.value));
        },
      });
    }, nodeRef);

    return () => ctx.revert();
  }, [target, duration]);

  return (
    <span ref={nodeRef} className={className}>
      {count}
      {suffix}
    </span>
  );
}
