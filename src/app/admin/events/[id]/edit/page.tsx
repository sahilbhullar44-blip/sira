"use client";

import EventForm from "@/components/admin/EventForm";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/lib/admin-api";
import React from "react"; // Import React for use

// Correctly typing params for Next.js 15+ dynamic routes (awaitable params)
export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params using React.use()
  const { id } = React.use(params);

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-8">Loading event...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading event</div>;

  return <EventForm initialData={event} isEditing />;
}
