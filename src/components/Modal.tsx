"use client";

import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<"Contact" | "Tickets">("Contact");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState(""); // Unused
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Expose toggle function to window for the "vanilla-like" interactions
  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      setContext(e.detail.context);
      setIsOpen(true);
    };

    window.addEventListener("open-sira-modal", handleOpen as EventListener);
    return () =>
      window.removeEventListener(
        "open-sira-modal",
        handleOpen as EventListener
      );
  }, []);

  // Handle close
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email or phone (simple check for non-empty)
    if (!email || email.length < 3) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrPhone: email }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      if (context === "Tickets") {
        window.open(
          "https://www.ticketmaster.ca/event/1100638F104A9995",
          "_blank"
        );
      } else {
        // Trigger Toast
        window.dispatchEvent(new CustomEvent("show-toast"));
      }

      setEmail("");
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(`Something went wrong: ${err instanceof Error ? err.message : "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="emailModal"
      className={`fixed inset-0 z-1000 items-center justify-center p-4 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-lg transition-opacity"
        onClick={closeModal}
      ></div>

      <div className="relative glass-effect border border-red-700 w-full max-w-md p-6 md:p-10 shadow-[0_0_100px_-10px_rgba(212,175,55,0.3)]">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600"></div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
            {context === "Tickets" ? "Buy Tickets" : "Contact Us"}
          </h2>
          {/* Tag Line */}
          <p className="text-white/70 text-sm md:text-base mb-4 font-light tracking-wide">
            Proceed to Ticketmaster to move ahead.
          </p>
          <div className="w-16 h-px bg-red-700 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone"
              className="w-full bg-white text-black placeholder-gray-500 border-none py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors duration-300 text-center font-serif rounded-sm"
            />
            {error && (
              <p className="text-red-500 text-xs mt-2 text-center">
                Please provide a valid email or phone number.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white font-bold py-4 hover:bg-red-700 transition-all uppercase tracking-widest text-xs shadow-lg flex justify-center items-center cursor-pointer rounded-full"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <span>{context === "Tickets" ? "Continue" : "Send Inquiry"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Helper to open modal from anywhere (to mimic the original script)
if (typeof window !== "undefined") {
  window.openModal = (context: "Contact" | "Tickets") => {
    window.dispatchEvent(
      new CustomEvent("open-sira-modal", { detail: { context } })
    );
  };
}
