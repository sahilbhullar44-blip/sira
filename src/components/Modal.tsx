"use client";

import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<"Contact" | "Tickets">("Contact");
  const [email, setEmail] = useState("");
  // Ticket flow state
  const [ticketUrl, setTicketUrl] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  // New Inquiry State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Expose toggle function to window for the "vanilla-like" interactions
  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      setContext(e.detail.context);
      if (e.detail.context === "Tickets") {
        setTicketUrl(e.detail.ticketUrl || "");
        setEventTitle(e.detail.eventTitle || "");
      }
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
    // Reset ticket state on close
    setTimeout(() => {
      setTicketUrl("");
      setEventTitle("");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);
    setLoading(true);

    try {
      // Use local API
      const baseUrl = ""; // Relative path works fine
      let res;

      if (context === "Contact") {
        if (!firstName || !lastName || !email || !message) {
          setError(true);
          setLoading(false);
          return;
        }
        res = await fetch(`${baseUrl}/api/inquire`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, message }),
        });
      } else {
        // Tickets context
        if (!email || email.length < 3) {
          setError(true);
          setLoading(false);
          return;
        }

        // Use the existing contact endpoint
        res = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailOrPhone: email,
            // We can try sending eventTitle if the backend learns to accept it later,
            // but for now api/contact only takes emailOrPhone.
            // keeping it simple to match existing api.
          }),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.details || errorData.error || "Failed to submit"
        );
      }

      if (context === "Tickets") {
        // Use dynamic URL if present, otherwise fallback (or just close if empty)
        if (ticketUrl) {
          window.open(ticketUrl, "_blank");
        } else {
          // Fallback if no specific URL was passed (legacy support)
          window.open(
            "https://www.ticketmaster.ca/event/1100638F104A9995",
            "_blank"
          );
        }
      } else {
        // Trigger Toast
        window.dispatchEvent(new CustomEvent("show-toast"));
        // Reset Inquiry Fields
        setFirstName("");
        setLastName("");
        setMessage("");
      }

      setEmail("");
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(
        `Something went wrong: ${
          err instanceof Error ? err.message : "Please try again."
        }`
      );
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
          {context === "Tickets" && eventTitle && (
            <p className="text-white/70 text-sm mb-4">
              For <span className="text-red-500 font-bold">{eventTitle}</span>
            </p>
          )}
          <div className="w-16 h-px bg-red-700 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {context === "Tickets" ? (
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
          ) : (
            <div className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full bg-white text-black placeholder-gray-500 border-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-serif rounded-sm"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full bg-white text-black placeholder-gray-500 border-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-serif rounded-sm"
                />
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full bg-white text-black placeholder-gray-500 border-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-serif rounded-sm"
              />

              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className="w-full bg-white text-black placeholder-gray-500 border-none py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-serif rounded-sm resize-none"
              ></textarea>

              {error && (
                <p className="text-red-500 text-xs text-center">
                  Please fill in all fields correctly.
                </p>
              )}
            </div>
          )}

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
  window.openModal = (
    context: "Contact" | "Tickets",
    data?: { ticketUrl?: string; eventTitle?: string }
  ) => {
    window.dispatchEvent(
      new CustomEvent("open-sira-modal", { detail: { context, ...data } })
    );
  };
}
