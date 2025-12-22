import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Supporters from "@/components/Supporters";
// import Services from "@/components/Services";
import UpcomingEvents from "@/components/UpcomingEvents";
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
      <Supporters />
      {/* <Services /> */}
      <UpcomingEvents />
      <Events />
      <Footer />
      <Modal />
      <Toast />
    </main>
  );
}
