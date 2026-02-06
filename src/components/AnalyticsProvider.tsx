"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

const BLACKLISTED_PATHS = ["/auth/sign-in", "/favicon.ico"];

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page view on route change
    // Don't track admin pages to avoid noise
    if (
      !pathname.startsWith("/admin") &&
      !BLACKLISTED_PATHS.includes(pathname)
    ) {
      trackEvent("page_view", pathname);
    }
  }, [pathname, trackEvent]);

  return <>{children}</>;
}
