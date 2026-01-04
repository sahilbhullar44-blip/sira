"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { IEvent } from "@/models/Event";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvents, deleteEvent } from "@/lib/admin-api";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Edit,
  Trash2,
  Plus,
  LayoutGrid,
  List as ListIcon,
  Calendar,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const columnHelper = createColumnHelper<IEvent>();

export default function EventsPage() {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Event",
        cell: (info) => (
          <div className="flex items-center gap-3">
            {info.row.original.imageUrl && (
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={info.row.original.imageUrl}
                  alt={info.getValue()}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div>
              <div className="font-bold text-gray-900 leading-tight">
                {info.getValue()}
              </div>
              {info.row.original.subtitle && (
                <div className="text-xs text-yellow-600 font-medium">
                  {info.row.original.subtitle}
                </div>
              )}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("date", {
        header: "Date & Time",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">
              {format(new Date(info.getValue()), "MMM d, yyyy")}
            </span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Clock size={10} />
              {format(new Date(info.getValue()), "h:mm a")}
              {info.row.original.doorsOpenTime &&
                ` (Doors ${info.row.original.doorsOpenTime})`}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("venue", {
        header: "Venue",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">
              {info.getValue()}
            </span>
            <span className="text-gray-500 text-xs">
              {info.row.original.location}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={clsx(
              "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border",
              info.getValue() === "upcoming"
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-gray-50 text-gray-500 border-gray-200"
            )}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: (info) => (
          <div className="flex justify-end gap-2">
            <Link
              href={`/admin/events/${info.row.original._id}/edit`}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit size={16} />
            </Link>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this event?")) {
                  deleteMutation.mutate(
                    info.row.original._id as unknown as string
                  );
                }
              }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      }),
    ],
    [deleteMutation]
  );

  const data = useMemo(() => events || [], [events]);
  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center text-gray-400 animate-pulse">
        <Loader2 className="animate-spin mr-2" /> Loading events...
      </div>
    );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">
            Events Management
          </h2>
          <p className="text-gray-500 text-sm">
            Create and manage your upcoming shows.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "p-2 rounded-md transition-colors",
                viewMode === "grid"
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              )}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "p-2 rounded-md transition-colors",
                viewMode === "list"
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              )}
              title="List View"
            >
              <ListIcon size={18} />
            </button>
          </div>
          <Link
            href="/admin/events/new"
            className="flex-1 md:flex-none bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            <span className="uppercase tracking-wide text-xs">
              Create Event
            </span>
          </Link>
        </div>
      </div>

      {!events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
            No events found
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            You haven&apos;t created any events yet. Get started by adding your
            first upcoming show.
          </p>
          <Link
            href="/admin/events/new"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            <span className="uppercase tracking-wide text-xs">
              Create Event
            </span>
          </Link>
        </div>
      ) : viewMode === "list" ? (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-5 whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 border-none">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50">
            <button
              className="px-4 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-white text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-white text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id as unknown as string}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full"
            >
              <div className="h-56 bg-gray-100 relative overflow-hidden">
                {event.imageUrl ? (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 bg-gray-50">
                    <Calendar size={48} strokeWidth={1.5} />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-sm",
                      event.status === "upcoming"
                        ? "bg-white/90 text-green-700 border-white/50"
                        : "bg-black/70 text-white border-white/20"
                    )}
                  >
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  {event.subtitle && (
                    <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">
                      {event.subtitle}
                    </p>
                  )}
                  <h3 className="text-xl font-bold font-serif text-gray-900 leading-tight">
                    {event.title}
                  </h3>
                  {event.tagline && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                      {event.tagline}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Calendar size={16} className="text-yellow-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {format(new Date(event.date), "EEE, MMM d, yyyy")}
                      </span>
                      <div className="text-xs text-gray-500">
                        Show: {format(new Date(event.date), "h:mm a")}
                        {event.doorsOpenTime &&
                          ` • Doors: ${event.doorsOpenTime}`}
                      </div>
                    </div>
                  </div>

                  {(event.venue || event.location) && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin size={16} className="text-yellow-500 mt-0.5" />
                      <div>
                        {event.venue && (
                          <span className="font-medium text-gray-900 block">
                            {event.venue}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 block">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <Link
                    href={`/admin/events/${event._id}/edit`}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium py-2.5 rounded-xl text-center transition-colors text-sm border border-gray-200 flex items-center justify-center gap-2"
                  >
                    <Edit size={14} />
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this event?")
                      ) {
                        deleteMutation.mutate(event._id as unknown as string);
                      }
                    }}
                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
