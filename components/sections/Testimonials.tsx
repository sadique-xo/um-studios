"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "UM Studios completely transformed my look for my wedding. The bridal makeup was flawless and lasted the entire day. I felt like a queen!",
    name: "Priya Sharma",
  },
  {
    quote:
      "Best salon experience in Ranchi, hands down. The keratin treatment made my hair unbelievably smooth. The staff truly knows their craft.",
    name: "Anjali Mehta",
  },
  {
    quote:
      "I've been coming here for over two years now and the consistency is remarkable. Every visit feels like a luxury retreat. Highly recommend the Vedic Spa.",
    name: "Rahul Verma",
  },
  {
    quote:
      "The attention to detail is what sets UM Studios apart. From the ambiance to the service quality, everything screams premium. Worth every penny.",
    name: "Sneha Gupta",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#1A1A1A] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm tracking-widest uppercase text-gold mb-4">
            WHAT OUR CLIENTS SAY
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-off-white leading-tight">
            570+ Happy Clients Can&apos;t Be Wrong
          </h2>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[380px] bg-[#0A0A0A] border border-cognac/20 rounded-xl p-8 snap-start flex flex-col justify-between"
            >
              <p className="text-cream italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-off-white font-medium text-sm">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
