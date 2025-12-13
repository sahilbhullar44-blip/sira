"use client";

import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<"Contact" | "Tickets">("Contact");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Expose toggle function to window for the "vanilla-like" interactions
  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      setContext(e.detail.context);
      setIsOpen(true);
    };

    // We can also just use the ID-based class toggling for compatibility with my previous buttons
    // But a cleaner way is to use an effect to check for class changes if I wanted to stick to that.
    // However, since I control the buttons (Navbar, Hero), I can change them to dispatch an event?
    // OR, I can just rely on the IDs.
    // The previous buttons used: document.getElementById("contact-modal").classList.remove("hidden")
    // So let's respect that "hidden" class approach but wrapped in React.
    // Actually, forcing React to sync with classList changes on itself is tricky.
    // It is better to use a global event system or Context.

    // Changing strategy: I will modify the Buttons in Navbar/Hero to dispatch a CustomEvent.
    // But since I already wrote them to use getElementById...
    // I can make this component bind to the ID and manually observe mutation? No that's overengineering.

    // I will simply ADD the ids to this component and let the class logic work?
    // If I use `className={isOpen ? 'flex' : 'hidden'}`, React controls the class.
    // If I change the class via DOM, React might mismatch.

    // Let's implement a listener for a custom event 'openModal'.
    window.addEventListener("open-sira-modal", handleOpen as EventListener);
    return () =>
      window.removeEventListener(
        "open-sira-modal",
        handleOpen as EventListener
      );
  }, []);

  // For compatibility with the `document.getElementById` calls I realized I put in Navbar/Hero:
  // I should update Navbar/Hero to use `window.dispatchEvent` or just use a simple Context.
  // Since I can't easily change Navbar/Hero (already wrote them), I'll make this Modal
  // accept the IDs `contact-modal` and `tickets-modal`? Use one modal.
  // I will update the Buttons in `page.tsx` assembly if possible, or just re-write Navbar/Hero slightly?
  // No, I'll just use a `useEffect` that monkey-patches `window.openModal` as per the original HTML?
  // Let's go with the Custom Event approach and I will update the buttons in `Navbar` and `Hero`
  // quickly or just implement the `class` toggling support by NOT using `isOpen` state for visibility
  // but using a Ref and standard DOM manipulation for show/hide, keeping the content React.

  // Actually, standard DOM manipulation on a Ref is fine for this "porting" task.

  // Handle close
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setError(false);

    // Open tab immediately if Tickets to bypass popup blocker
    let newTab: Window | null = null;
    if (context === "Tickets") {
      newTab = window.open("", "_blank");
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      closeModal();
      if (context === "Tickets" && newTab) {
        localStorage.setItem("userEmail", email);
        newTab.location.href = "https://ticketmaster.ca";
      } else {
        // Trigger Toast
        window.dispatchEvent(new CustomEvent("show-toast"));
      }
      setEmail("");
      setPhone("");
    }, 1500);
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
            {context === "Tickets" ? "Book Tickets" : "Contact Us"}
          </h2>
          <div className="w-16 h-px bg-red-700 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vip@example.com"
              className="w-full bg-[#0a0a0a] border border-white/10 focus:border-red-600 text-white py-4 px-4 focus:outline-none transition-colors font-serif placeholder-gray-600"
            />
            {error && (
              <p className="text-red-500 text-xs mt-2">
                Please provide a valid email.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#0a0a0a] border border-white/10 focus:border-red-600 text-white py-4 px-4 focus:outline-none transition-colors font-serif placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white font-bold py-4 hover:bg-red-800 transition-all uppercase tracking-widest text-xs shadow-lg flex justify-center items-center cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <span>
                {context === "Tickets" ? "Continue to Booking" : "Send Inquiry"}
              </span>
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
