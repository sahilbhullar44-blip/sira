"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { GSAPReveal } from "@/components/GSAPReveal";
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
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["upcoming-events-page"],
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
            }),
            Time: `${
              e.doorsOpenTime ? `Doors Open ${e.doorsOpenTime} | ` : ""
            }Show Start ${new Date(e.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
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

  return (
    <div className="min-h-screen bg-[#050505] pt-32 md:pt-40 pb-12 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <GSAPReveal>
          <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-white">
              Upcoming Events
            </h1>
            <Link
              href="/past-events"
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors font-bold"
            >
              View Archive
            </Link>
          </div>
        </GSAPReveal>

        {isLoading ? (
          <div className="text-white text-center py-20">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-white text-center py-20">
            No upcoming events at the moment.
          </div>
        ) : (
          events.map((event, index) => (
            <div key={event.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <GSAPReveal>
                  <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:max-w-none border border-white/10 rounded-sm overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-${event.themeColor}-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
                    ></div>
                    <Image
                      src={event.poster}
                      alt={`${event.title}: ${event.artist}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                </GSAPReveal>

                <GSAPReveal delay={0.2}>
                  <div className="flex flex-col justify-center text-center lg:text-left h-full">
                    <span
                      className={`text-${event.themeColor}-600 font-bold tracking-widest uppercase text-sm mb-4`}
                    >
                      {event.subtitle}
                    </span>
                    <h2 className="font-serif font-bold text-4xl md:text-6xl text-white mb-2 leading-tight">
                      {event.title}
                    </h2>
                    <h3 className="font-serif text-2xl md:text-4xl text-gray-300 mb-8">
                      {event.artist}
                    </h3>

                    <div className="space-y-6 mb-10 text-gray-400 text-lg bg-white/5 p-8 rounded-lg border border-white/10">
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
                              <span className="text-white font-medium">
                                {value}
                              </span>
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
                            event.themeColor === "purple"
                              ? "126,34,206"
                              : "185,28,28"
                          }, 0.3)`,
                        }}
                      >
                        {event.buttonText}
                      </button>
                    </div>
                  </div>
                </GSAPReveal>
              </div>

              {/* Divider between events, but not after the last one */}
              {index < events.length - 1 && (
                <div className="w-full h-px bg-white/10 my-16 md:my-24"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
