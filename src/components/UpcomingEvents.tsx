"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { GSAPReveal } from "./GSAPReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/admin-api";
import type { IEvent } from "@/models/Event";

interface CustomWindow extends Window {
  openModal?: (
    action: string,
    data?: { ticketUrl?: string; eventTitle?: string }
  ) => void;
}

declare const window: CustomWindow;

interface Event {
  id: string;
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
  ticketUrl?: string;
}

export default function UpcomingEvents() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: events = [], isLoading: loading } = useQuery<Event[]>({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const data = await getEvents();
      return data
        .filter((e: IEvent) => new Date(e.date) >= new Date())
        .map((e: IEvent) => ({
          id: String(e._id),
          poster: e.imageUrl || "/assets/events/default-poster.jpg",
          subtitle: e.tagline || "",
          title: e.title,
          artist: e.subtitle || "",
          details: {
            Date: new Date(e.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "America/Edmonton",
            }),
            Time: `${
              e.doorsOpenTime ? `Doors Open ${e.doorsOpenTime} | ` : ""
            }Show Start ${new Date(e.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              timeZone: "America/Edmonton",
            })}`,
            Venue: e.venue || "",
            Address: e.fullAddress || e.location || "",
            Contact: e.contactInfo || "info@siraconcerts.com",
          },
          buttonText: e.ticketUrl ? "Buy Tickets" : "Contact Us",
          buttonAction: (e.ticketUrl ? "Tickets" : "Contact") as
            | "Tickets"
            | "Contact",
          themeColor: e.themeColor || "red",
          ticketUrl: e.ticketUrl,
        }));
    },
  });

  const nextSlide = useCallback(() => {
    if (events.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevSlide = useCallback(() => {
    if (events.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    // Only auto-play if not paused by hover
    if (!isPaused && events.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, events.length]);

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

  if (loading) return null; // Or a loader
  if (events.length === 0) return null; // Don't show section if no upcoming events

  const event = events[currentSlide];

  return (
    <section
      id="upcoming-events"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <GSAPReveal>
          <div className="mb-12 md:mb-16 border-b border-white/10 pb-6 flex justify-between items-end">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white">
              Upcoming Events
            </h2>
            {events.length > 1 && (
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
            )}
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
                {Object.entries(event.details).map(
                  ([key, value]) =>
                    (value as string).trim() !== "" && (
                      <div
                        key={key}
                        className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                      >
                        <span className="uppercase tracking-widest text-xs text-white/50 w-24">
                          {key}
                        </span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    )
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    if (event.buttonAction === "Tickets") {
                      window.openModal?.("Tickets", {
                        ticketUrl: event.ticketUrl,
                        eventTitle: event.title,
                      });
                    } else {
                      window.openModal?.(event.buttonAction);
                    }
                  }}
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
