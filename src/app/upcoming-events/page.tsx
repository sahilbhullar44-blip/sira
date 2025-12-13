import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UpcomingEvents() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="font-serif font-bold text-3xl md:text-7xl text-white mb-6 leading-tight">
          COMING <br className="md:hidden" />{" "}
          <span className="text-red-600">SOON</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-light mb-12 tracking-wide">
          We are currently crafting this experience. <br />
          Stay tuned for upcoming events.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-red-500 transition-colors uppercase tracking-widest text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            href="/past-events"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
          >
            View Archive
          </Link>
        </div>
      </div>
    </div>
  );
}
