"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-gray-200 text-gray-600 min-h-screen p-6 flex flex-col gap-8 sticky top-0 h-screen shadow-xs">
      <div className="px-2">
        <h1 className="text-2xl font-bold font-serif text-gray-900 tracking-wide">
          SiRa <span className="text-yellow-600">.</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
          Admin Console
        </p>
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200 shadow-sm"
                  : "hover:bg-gray-50 hover:text-gray-900 border border-transparent",
              )}
            >
              <Icon
                size={20}
                className={clsx(
                  "transition-colors",
                  isActive
                    ? "text-yellow-600"
                    : "text-gray-400 group-hover:text-gray-600",
                )}
              />
              <span className="font-medium tracking-wide text-sm">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <Link
        href={process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:text-gray-900 border border-transparent text-gray-600 mb-2 group"
      >
        <ExternalLink
          size={20}
          className="text-gray-400 group-hover:text-gray-600 transition-colors"
        />
        <span className="font-medium tracking-wide text-sm">Back to Site</span>
      </Link>

      <div className="p-4 rounded-xl bg-linear-to-tr from-gray-50 to-white border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            A
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              Administrator
            </p>
            <p className="text-xs text-gray-500 truncate">SiRa Entertainment</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
