"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents, getInquiries } from "@/lib/admin-api";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { LayoutDashboard, Ticket, MessageSquare, Users } from "lucide-react";

export default function AdminDashboard() {
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const { data: inquiries, isLoading: inquiriesLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: getInquiries,
  });

  if (eventsLoading || inquiriesLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400 animate-pulse">
        Loading dashboard data...
      </div>
    );
  }

  const totalEvents = events?.length || 0;
  const totalInquiries = inquiries?.length || 0;
  const totalTicketsSold =
    events?.reduce((acc, event) => acc + (event.ticketsSold || 0), 0) || 0;
  const totalUsers = 0; // Placeholder

  const stats = [
    {
      label: "Total Events",
      value: totalEvents,
      icon: LayoutDashboard,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Tickets Sold",
      value: totalTicketsSold,
      icon: Ticket,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },
    {
      label: "Total Inquiries",
      value: totalInquiries,
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      label: "Active Users",
      value: totalUsers,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-500">
          Welcome back. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${stat.border} shadow-sm`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-colors`}
                >
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Performance</h3>
      </div>
      <DashboardCharts
        eventsData={events || []}
        inquiriesData={inquiries || []}
      />
    </div>
  );
}
