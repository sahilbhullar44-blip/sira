"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getInquiries, getDashboardStats } from "@/lib/admin-api";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { LayoutDashboard, Ticket, MessageSquare, Users } from "lucide-react";

export default function AdminDashboard() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats", page],
    queryFn: () => getDashboardStats(page, limit),
    placeholderData: keepPreviousData,
  });

  // ... (rest of queries)

  // ... (stat cards)

  const { data: inquiries, isLoading: inquiriesLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: getInquiries,
  });

  if (statsLoading || inquiriesLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400 animate-pulse">
        Loading dashboard data...
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Events",
      value: stats?.events || 0,
      icon: LayoutDashboard,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Tickets Sold",
      value: stats?.ticketsSold || 0,
      icon: Ticket,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },
    {
      label: "Total Inquiries",
      value: stats?.inquiries || 0,
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      label: "Active Users",
      value: stats?.users || 0,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      label: "Total Visits",
      value: stats?.totalVisits || 0,
      icon: LayoutDashboard, // Reuse icon or import Eye/Activity
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
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
        {statCards.map((stat, index) => {
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
        eventsData={stats?.eventsData || []}
        inquiriesData={inquiries || []}
      />

      {/* Recent Interactions Table */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent User Interactions
          </h3>
          <span className="text-xs text-gray-400">
            Page {stats?.pagination?.page || 1} of{" "}
            {stats?.pagination?.totalPages || 1}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {stats?.recentInteractions.map((interaction) => (
                <tr key={interaction._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        interaction.type === "click"
                          ? "bg-blue-100 text-blue-700"
                          : interaction.type === "form_submit"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {interaction.type.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {interaction.action}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(interaction.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {!stats?.recentInteractions.length && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    No recent interactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((p) =>
                stats?.pagination?.totalPages && p < stats.pagination.totalPages
                  ? p + 1
                  : p,
              )
            }
            disabled={
              !stats?.pagination?.totalPages ||
              page >= stats.pagination.totalPages
            }
            className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
