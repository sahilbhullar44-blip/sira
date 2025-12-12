"use client";

import { useState } from "react";
import { AlignRight, Instagram, Twitter, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  };

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-black/40 border-b border-white/10"
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex justify-between items-center">
          {/* Logo */}
          <Link href="#" className="flex flex-col group items-center">
            <div className="relative h-12 w-8 md:h-16 md:w-10">
              <Image
                src="/logo.png"
                alt="SiRa Logo"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(214,0,28,0.5)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                window.lenis?.scrollTo("#about");
              }}
              className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors relative group"
            >
              About
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                window.lenis?.scrollTo("#services");
              }}
              className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors relative group"
            >
              Services
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                window.lenis?.scrollTo("#events");
              }}
              className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors relative group"
            >
              Events
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <button
              onClick={() => window.openModal?.("Contact")}
              className="border border-red-700/50 px-6 py-2 text-sm uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-red-600 transition-colors z-50 relative cursor-pointer"
          >
            <AlignRight className="w-8 h-8" />
          </button>
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
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  window.lenis?.scrollTo("#about");
                }}
                className="group flex items-end gap-4 border-b border-white/5 pb-4"
              >
                <span className="text-xs font-mono text-red-700/50 group-hover:text-red-600 transition-colors mb-1">
                  01
                </span>
                <span className="font-serif text-4xl text-white group-hover:translate-x-2 transition-transform duration-300">
                  About
                </span>
              </Link>
              <Link
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
                <span className="font-serif text-4xl text-white group-hover:translate-x-2 transition-transform duration-300">
                  Services
                </span>
              </Link>
              <Link
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  window.lenis?.scrollTo("#events");
                }}
                className="group flex items-end gap-4 border-b border-white/5 pb-4"
              >
                <span className="text-xs font-mono text-red-700/50 group-hover:text-red-600 transition-colors mb-1">
                  03
                </span>
                <span className="font-serif text-4xl text-white group-hover:translate-x-2 transition-transform duration-300">
                  Events
                </span>
              </Link>
            </div>

            {/* Footer Action */}
            <div className="mt-auto">
              <button
                onClick={() => {
                  closeMobileMenu();
                  window.openModal?.("Contact");
                }}
                className="w-full py-5 border border-red-700/30 text-white uppercase tracking-widest text-xs hover:bg-red-700 hover:text-white transition-colors mb-8 cursor-pointer"
              >
                Inquire Now
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
