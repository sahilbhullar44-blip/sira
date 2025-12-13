"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Toast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleShow = () => {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    };

    window.addEventListener("show-toast", handleShow);
    return () => window.removeEventListener("show-toast", handleShow);
  }, []);

  return (
    <div
      className={`fixed top-24 right-6 z-1100 transition-all duration-500 pointer-events-none ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
    >
      <div className="glass-effect border border-red-700/50 text-white px-6 py-4 flex items-center gap-4 shadow-2xl">
        <div className="text-red-600">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-lg">Request Received</h4>
          <p className="text-xs text-gray-400">We will be in touch shortly.</p>
        </div>
      </div>
    </div>
  );
}
