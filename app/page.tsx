import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import BookingCTA from "@/components/sections/BookingCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <BookingCTA />
      <Contact />
      <Footer />
    </main>
  );
}
