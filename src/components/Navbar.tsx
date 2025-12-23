"use client";

import { useState } from "react";
import { AlignRight, Instagram, Twitter, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false); // Mobile dropdown state

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
    setIsEventsOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-black/40 border-b border-white/10"
        id="navbar"
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 h-20 md:h-28 flex justify-between items-center relative">
          {/* LEFT SECTION: Balaji Logo (Pinned) */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="relative h-12 w-12 xl:h-16 xl:w-16">
              <Image
                src="/assets/logos/balaji.png"
                alt="Balaji Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* CENTER ELEMENTS - ABSOLUTE POSITIONING FOR PERFECT CENTER */}

          {/* 1. Navigation Links (Left of Center) */}
          <div className="hidden md:flex absolute right-[50%] top-1/2 -translate-y-1/2 items-center gap-6 xl:gap-8 mr-16 xl:mr-20">
            <Link
              href="/#about"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.lenis?.scrollTo("#about");
                }
              }}
              className="px-5 py-2 text-xs xl:text-sm uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-300 cursor-pointer rounded-sm"
            >
              About
            </Link>

            {/* Events Dropdown */}
            <div className="relative group">
              <Link
                href="/#events"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    window.lenis?.scrollTo("#events");
                  }
                }}
                className="px-5 py-2 text-xs xl:text-sm uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-2 group-hover:bg-red-700 group-hover:text-white rounded-sm"
              >
                Events
                <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 transition-transform group-hover:rotate-180" />
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 min-w-[200px] flex flex-col gap-2 shadow-2xl rounded-sm">
                  <Link
                    href="/upcoming-events"
                    className="text-xs xl:text-sm text-gray-300 hover:text-red-500 uppercase tracking-widest py-2 px-4 hover:bg-white/5 transition-all text-center rounded-sm"
                  >
                    Upcoming
                  </Link>
                  <Link
                    href="/past-events"
                    className="text-xs xl:text-sm text-gray-300 hover:text-red-500 uppercase tracking-widest py-2 px-4 hover:bg-white/5 transition-all text-center rounded-sm"
                  >
                    Past
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Sira Logo (Exact Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Link
              href="#"
              className="block relative h-16 w-12 md:h-20 md:w-16 group"
            >
              <Image
                src="/assets/logos/sira.png"
                alt="SiRa Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(214,0,28,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(214,0,28,0.6)] transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* 3. Action Buttons (Right of Center) */}
          <div className="hidden md:flex absolute left-[50%] top-1/2 -translate-y-1/2 items-center gap-4 ml-16 xl:ml-20">
            <button
              onClick={() => window.openModal?.("Contact")}
              className="px-5 py-2 text-xs xl:text-sm uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-300 cursor-pointer rounded-sm"
            >
              Contact us
            </button>
            <button
              onClick={() => window.openModal?.("Tickets")}
              className="px-5 py-2 text-xs xl:text-sm uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-300 cursor-pointer rounded-sm"
            >
              Buy Tickets
            </button>
          </div>

          {/* RIGHT SECTION: Paradox Logo (Pinned) */}
          <div className="hidden md:flex items-center">
            <div className="relative h-10 w-24 xl:h-12 xl:w-28">
              <Image
                src="/paradox-logo.png"
                alt="Paradox Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* MOBILE VIEW: Toggle + Spacer to balance Center Logo */}
          <div className="flex md:hidden justify-between w-full items-center">
            {/* Empty div to balance the flex (since logo is absolute center) or just AlignRight on the right */}
            {/* Actually, if logo is absolute center, we just need the hamburger on the right. */}
            <div className="w-8"></div> {/* Spacer */}
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-red-600 transition-colors z-50 relative cursor-pointer"
            >
              <AlignRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-100 md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={toggleMobileMenu}
          />

          {/* Drawer */}
          <div
            className={`absolute right-0 top-0 h-screen w-[85%] max-w-sm backdrop-blur-3xl bg-black/90 border-l border-red-700/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col p-8 pt-28 overflow-y-auto ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close Button Inside Drawer */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-8 right-8 text-white hover:text-red-600 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col gap-10 flex-1">
              <Link
                href="/#about"
                onClick={(e) => {
                  closeMobileMenu();
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    window.lenis?.scrollTo("#about");
                  }
                }}
                className="group flex items-end gap-4 border-b border-white/5 pb-4"
              >
                <span className="text-xs font-mono text-red-700/50 group-hover:text-red-600 transition-colors mb-1">
                  01
                </span>
                <span className="font-serif font-bold text-4xl text-white group-hover:translate-x-2 transition-transform duration-300">
                  About
                </span>
              </Link>
              {/* Services Link - Commented Out */}
              {/* <Link
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  window.lenis?.scrollTo("#services");
                }}
                className="group flex items-end gap-4 border-b border-white/5 pb-4"
              >
                <span className="text-xs font-mono text-red-700/50 group-hover:text-red-600 transition-colors mb-1">
                  02
                </span>
                <span className="font-serif font-bold text-4xl text-white group-hover:translate-x-2 transition-transform duration-300">
                  Services
                </span>
              </Link> */}

              {/* Mobile Events Dropdown */}
              <div className="border-b border-white/5 pb-4">
                <div className="flex items-end justify-between w-full gap-4">
                  <Link
                    href="/#events"
                    onClick={(e) => {
                      closeMobileMenu();
                      if (window.location.pathname === "/") {
                        e.preventDefault();
                        window.lenis?.scrollTo("#events");
                      }
                    }}
                    className="group flex items-end gap-4 flex-1"
                  >
                    <span className="text-xs font-mono text-red-700/50 group-hover:text-red-600 transition-colors mb-1">
                      02
                    </span>
                    <span className="font-serif font-bold text-4xl text-white group-hover:translate-x-2 transition-transform duration-300">
                      Events
                    </span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEventsOpen(!isEventsOpen);
                    }}
                    className="p-2 -mr-2 text-white hover:text-red-500 transition-colors"
                  >
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isEventsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`flex flex-col gap-6 pl-12 overflow-hidden transition-all duration-300 ${
                    isEventsOpen
                      ? "max-h-40 mt-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <Link
                    href="/upcoming-events"
                    onClick={() => closeMobileMenu()}
                    className="text-xl font-serif text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Upcoming
                  </Link>
                  <Link
                    href="/past-events"
                    onClick={() => closeMobileMenu()}
                    className="text-xl font-serif text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Past
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-auto">
              {/* Mobile Logos Display */}
              <div className="flex justify-center gap-8 mb-8 opacity-70">
                <div className="relative h-10 w-10">
                  <Image
                    src="/assets/logos/balaji.png"
                    alt="Balaji"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative h-8 w-20">
                  <Image
                    src="/paradox-logo.png"
                    alt="Paradox"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  closeMobileMenu();
                  window.openModal?.("Tickets");
                }}
                className="w-full py-5 bg-red-700 text-white uppercase tracking-widest text-xs hover:bg-red-800 transition-colors mb-4 cursor-pointer"
              >
                Buy Tickets
              </button>
              <button
                onClick={() => {
                  closeMobileMenu();
                  window.openModal?.("Contact");
                }}
                className="w-full py-5 border border-red-700/30 text-white uppercase tracking-widest text-xs hover:bg-red-700 hover:text-white transition-colors mb-8 cursor-pointer"
              >
                Contact Now
              </button>

              <div className="flex justify-between items-center text-gray-600 text-[10px] uppercase tracking-widest border-t border-white/5 pt-6">
                <span>© 2025 SiRa Ent.</span>
                <div className="flex gap-4">
                  <Instagram className="w-4 h-4 hover:text-white transition-colors" />
                  <Twitter className="w-4 h-4 hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
