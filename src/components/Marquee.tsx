import { Star } from "lucide-react";

export default function Marquee() {
  const items = [
    "LIVE CONCERTS",
    "BOLLYWOOD STARS",
    "GLOBAL TOURS",
    "CULTURAL EVENTS",
    "PREMIER PRODUCTION",
  ];

  return (
    <div className="bg-red-700 text-white py-2 overflow-hidden relative z-20 border-y border-red-800 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
      <div className="animate-marquee flex items-center whitespace-nowrap min-w-full">
        {/* First Set */}
        {items.map((item, i) => (
          <div key={`a-${i}`} className="flex items-center mx-8">
            <Star className="w-3 h-3 text-red-950 fill-red-950 mr-8 animate-spin-slow" />
            <span className="font-serif font-bold text-lg md:text-2xl tracking-widest italic opacity-90 mx-2">
              {item}
            </span>
          </div>
        ))}
        {/* Duplicate Set for Loop */}
        {items.map((item, i) => (
          <div key={`b-${i}`} className="flex items-center mx-8">
            <Star className="w-3 h-3 text-red-950 fill-red-950 mr-8 animate-spin-slow" />
            <span className="font-serif font-bold text-lg md:text-2xl tracking-widest italic opacity-90 mx-2">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
