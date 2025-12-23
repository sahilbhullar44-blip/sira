import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Supporters from "@/components/Supporters";
// import Services from "@/components/Services";
import UpcomingEvents from "@/components/UpcomingEvents";
import Events from "@/components/Events";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Marquee />
      <About />
      <Supporters />
      {/* <Services /> */}
      <UpcomingEvents />
      <Events />
    </main>
  );
}
