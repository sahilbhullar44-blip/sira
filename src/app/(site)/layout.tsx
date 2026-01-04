"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroller from "@/components/SmoothScroller";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SmoothScroller />
      <div className="noise-overlay" />
      <Navbar />
      {children}
      <Footer />
      <Modal />
      <Toast />
    </>
  );
}
