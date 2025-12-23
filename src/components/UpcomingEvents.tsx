"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { GSAPReveal } from "./GSAPReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface Event {
  id: number;
  poster: string;
  subtitle: string;
  title: string;
  artist: string;
  details: {
    Date: string;
    Time: string;
    Venue: string;
    Address: string;
    Contact: string;
  };
  buttonText: string;
  buttonAction: "Tickets" | "Contact";
  themeColor: string;
}

const events: Event[] = [
  {
    id: 1,
    poster: "/assets/events/vishal-sheykhar-new-poster.jpg",
    subtitle: "Edmonton • Live Concert",
    title: "The Superhit Tour",
    artist: "Vishal & Sheykhar",
    details: {
      Date: "Tuesday, June 30th, 2026",
      Time: "Doors Open 6:00 PM | Show Start 8:00 PM",
      Venue: "Edmonton Expo Centre",
      Address: "7515 118 Ave NW, Edmonton, AB T5B 0J2",
      Contact: "info@siraconcerts.com",
    },
    buttonText: "Buy Tickets",
    buttonAction: "Tickets",
    themeColor: "red",
  },
  {
    id: 2,
    poster: "/assets/events/nye-2026-poster.jpg",
    subtitle: "Edmonton • New Year's Eve",
    title: "NYE 2026",
    artist: "Hosted by JJ Ventures",
    details: {
      Date: "December 31st, 2026",
      Time: "Doors Open 7:00 PM",
      Venue: "Star Banquets",
      Address: "6930 34 St, Edmonton",
      Contact: "Jyoti Joshi (780-884-7573) | Rama Airi (780-953-7384)",
    },
    buttonText: "Buy Tickets",
    buttonAction: "Tickets",
    themeColor: "purple",
  },
];

export default function UpcomingEvents() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, currentSlide]);

  useEffect(() => {
    if (slideRef.current && contentRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [currentSlide]);

  const event = events[currentSlide];

  return (
    <section
      id="upcoming-events"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <GSAPReveal>
          <div className="mb-12 md:mb-16 border-b border-white/10 pb-6 flex justify-between items-end">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white">
              Upcoming Events
            </h2>
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white"
                aria-label="Next event"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </GSAPReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Event Poster */}
          <div ref={slideRef}>
            <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:max-w-none border border-white/10 rounded-sm overflow-hidden group">
              <div
                className={`absolute inset-0 bg-${event.themeColor}-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
              ></div>
              <Image
                src={event.poster}
                alt={`${event.title}: ${event.artist}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Right: Event Details */}
          <div ref={contentRef}>
            <div className="flex flex-col justify-center text-center lg:text-left">
              <span
                className={`text-${event.themeColor}-600 font-bold tracking-widest uppercase text-sm mb-4`}
              >
                {event.subtitle}
              </span>
              <h3 className="font-serif font-bold text-4xl md:text-6xl text-white mb-2 leading-tight">
                {event.title}
              </h3>
              <h4 className="font-serif text-2xl md:text-4xl text-gray-300 mb-8">
                {event.artist}
              </h4>

              <div className="space-y-6 mb-10 text-gray-400 text-lg">
                {Object.entries(event.details).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                      {key}
                    </span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.openModal?.(event.buttonAction)}
                  className={`px-8 py-4 bg-${event.themeColor}-700 text-white uppercase tracking-widest text-sm font-bold hover:bg-${event.themeColor}-800 transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.3)] hover:shadow-[0_0_30px_rgba(185,28,28,0.5)]`}
                  style={{
                    boxShadow: `0 0 20px rgba(${
                      event.themeColor === "purple" ? "126,34,206" : "185,28,28"
                    }, 0.3)`,
                  }}
                >
                  {event.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-red-900/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </section>
  );
}
