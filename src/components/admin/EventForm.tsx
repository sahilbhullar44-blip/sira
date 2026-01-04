"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import type { IEvent } from "@/models/Event";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    road?: string;
    house_number?: string;
  };
};

type EventFormValues = {
  title: string;
  subtitle: string;
  tagline: string;
  date: string;
  doorsOpenTime: string;
  location: string;
  venue: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  contactInfo: string;
  ticketUrl: string;
  themeColor: string;
};

type EventFormProps = {
  initialData?: IEvent;
  isEditing?: boolean;
};

export default function EventForm({
  initialData,
  isEditing = false,
}: EventFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);

  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  // Removed address search query separate state as it's not used explicitly anymore
  const [activeField, setActiveField] = useState<"global" | "address" | null>(
    null
  );

  // Handler for performing search
  const performSearch = async (query: string) => {
    if (!query || query.length < 3) return;
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("OSM Search Error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce global search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (globalSearchQuery.length >= 3) {
        performSearch(globalSearchQuery);
      } else if (globalSearchQuery.length === 0) {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [globalSearchQuery]);

  const mutation = useMutation({
    mutationFn: async (values: EventFormValues) => {
      // Need to cast values to any to satisfy createEvent partial that still has other fields
      // or we just send what we have.
      const payload: Partial<IEvent> = {
        ...values,
        date: new Date(values.date),
        imageUrl: values.imageUrl || undefined,
        coordinates: {
          lat: Number(values.coordinates.lat),
          lng: Number(values.coordinates.lng),
        },
      };

      if (isEditing && initialData?._id) {
        return updateEvent(String(initialData._id), payload);
      }

      return createEvent(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/admin/events");
    },
  });

  const form = useForm({
    defaultValues: {
      title: initialData?.title ?? "",
      subtitle: initialData?.subtitle ?? "",
      tagline: initialData?.tagline ?? "",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().slice(0, 16)
        : "",
      doorsOpenTime: initialData?.doorsOpenTime ?? "",
      location: initialData?.location ?? "", // General location (e.g. City)
      venue: initialData?.venue ?? "",
      coordinates: initialData?.coordinates ?? { lat: 0, lng: 0 },
      imageUrl: initialData?.imageUrl ?? "",
      contactInfo: initialData?.contactInfo ?? "",
      ticketUrl: initialData?.ticketUrl ?? "",
      themeColor: initialData?.themeColor ?? "red",
    },

    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  const handleSearchResultSelect = (result: NominatimResult) => {
    // Extract location (City, State)
    const city =
      result.address?.city ||
      result.address?.town ||
      result.address?.village ||
      "";
    const state = result.address?.state || "";
    const locationStr = [city, state].filter(Boolean).join(", ");

    // Auto-fill fields
    form.setFieldValue("venue", result.name || "");
    // address field removed from form, so we don't set it in visible form

    form.setFieldValue("location", locationStr);
    form.setFieldValue("coordinates", {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    });

    // Clear search states
    setSearchResults([]);
    setGlobalSearchQuery("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/admin/events"
        className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
      >
        <div className="p-2 rounded-full bg-white mr-3 shadow-xs border border-gray-200 group-hover:border-gray-300 transition-colors">
          <ArrowLeft size={16} />
        </div>
        <span className="font-medium">Back to Events</span>
      </Link>

      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8">
            {isEditing ? "Edit Event" : "Create New Event"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* General Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                General Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="title">
                  {(field) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Event Title
                      </label>
                      <input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none placeholder-gray-400"
                        placeholder="e.g. The Superhit Tour"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="subtitle">
                  {(field) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Subtitle (Artist/Host)
                      </label>
                      <input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none placeholder-gray-400"
                        placeholder="e.g. Vishal & Sheykhar"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="tagline">
                  {(field) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Tagline
                      </label>
                      <input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none placeholder-gray-400"
                        placeholder="e.g. Edmonton • Live Concert"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="themeColor">
                  {(field) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Theme Color
                      </label>
                      <select
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none"
                      >
                        <option value="red">Red</option>
                        <option value="purple">Purple</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                      </select>
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Date & Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="date">
                  {(field) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Show Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="doorsOpenTime">
                  {(field) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Doors Open Time
                      </label>
                      <input
                        type="time"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Location (OSM Integration) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Location (OpenStreetMap)
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
                    Search Venue / Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={globalSearchQuery}
                      onChange={(e) => {
                        setGlobalSearchQuery(e.target.value);
                        setActiveField("global");
                      }}
                      onFocus={() => setActiveField("global")}
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none placeholder-gray-400"
                      placeholder="Search for a location..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          performSearch(globalSearchQuery);
                          setActiveField("global");
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        performSearch(globalSearchQuery);
                        setActiveField("global");
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors border border-gray-200"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Search />
                      )}
                    </button>
                  </div>

                  {activeField === "global" && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                      {searchResults.map((result, i) => (
                        <button
                          key={i}
                          type="button"
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-600 border-b border-gray-100 last:border-0"
                          onClick={() => handleSearchResultSelect(result)}
                        >
                          <p className="font-bold text-gray-900">
                            {result.name}
                          </p>
                          <p className="text-xs truncate text-gray-500">
                            {result.display_name}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <form.Field name="venue">
                    {(field) => (
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                          Venue Name
                        </label>
                        <input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none"
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="location">
                    {(field) => (
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                          City / Region
                        </label>
                        <input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <form.Field name="coordinates">
                    {(field) => (
                      <>
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                            Latitude
                          </label>
                          <input
                            value={field.state.value.lat}
                            disabled
                            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                            Longitude
                          </label>
                          <input
                            value={field.state.value.lng}
                            disabled
                            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>

            {/* Tickets & Contact */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Tickets & Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="contactInfo">
                  {(f) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Contact Info
                      </label>
                      <input
                        value={f.state.value}
                        onChange={(e) => f.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none placeholder-gray-400"
                        placeholder="e.g. info@siraconcerts.com"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="ticketUrl">
                  {(f) => (
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                        Ticket URL
                      </label>
                      <input
                        value={f.state.value}
                        onChange={(e) => f.handleChange(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none placeholder-gray-400"
                        placeholder="e.g. https://ticketmaster.com/..."
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Image Upload */}
            <form.Field name="imageUrl">
              {(f) => (
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500">
                    Event Poster
                  </label>
                  <div className="flex items-center gap-4">
                    {f.state.value && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                        <Image
                          src={f.state.value}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formData = new FormData();
                          formData.append("file", file);

                          try {
                            const res = await fetch(
                              "/api/upload?filename=" + file.name,
                              {
                                method: "POST",
                                body: formData,
                              }
                            );

                            if (!res.ok) throw new Error("Upload failed");

                            const data = await res.json();
                            f.handleChange(data.url);
                          } catch (error) {
                            console.error("Upload error:", error);
                            alert("Failed to upload image");
                          }
                        }}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Upload event poster (JPG, PNG, WebP)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form.Field>

            <div className="pt-8 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
              >
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="uppercase tracking-widest text-xs">
                    {isEditing ? "Save Changes" : "Create Event"}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
