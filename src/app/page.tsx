import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Events />
      <Footer />
      <Modal />
      <Toast />
    </main>
  );
}
