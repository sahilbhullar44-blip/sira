"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import type { IEvent } from "@/models/Event";
import type { IInquiry } from "@/models/Inquiry";

interface DashboardEvent extends IEvent {
  ticketsSold?: number;
  capacity?: number;
}

interface DashboardChartsProps {
  eventsData: DashboardEvent[];
  inquiriesData: IInquiry[];
}

export default function DashboardCharts({
  eventsData,
  inquiriesData,
}: DashboardChartsProps) {
  // Process data for charts
  const ticketSalesData = eventsData.map((event) => ({
    name: event.title,
    sold: event.ticketsSold,
    capacity: event.capacity,
  }));

  // Group inquiries by date (mock logic for demo if no date field explicitly aggregated)
  // Assuming inquiries have createdAt
  const inquiriesByDate = inquiriesData.reduce(
    (acc: Record<string, number>, inquiry) => {
      const date = new Date(inquiry.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const inquiriesChartData = Object.keys(inquiriesByDate).map((date) => ({
    date,
    count: inquiriesByDate[date],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Ticket Sales vs Capacity
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ticketSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#3b82f6" name="Tickets Sold" />
              <Bar dataKey="capacity" fill="#e5e7eb" name="Total Capacity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Inquiries Over Time
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={inquiriesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={2}
                name="Inquiries"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
