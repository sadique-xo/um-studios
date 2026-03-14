import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="w-full bg-gradient-to-b from-dark-brown to-[#0A0A0A] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-off-white leading-tight mb-8">
          Ready for Your Transformation?
        </h2>
        <Link
          href="/book"
          className="inline-block bg-gold text-[#0A0A0A] font-semibold rounded-full px-10 py-4 text-sm tracking-wide hover:bg-gold-light transition-colors"
        >
          Book Your Appointment &rarr;
        </Link>
      </div>
    </section>
  );
}
