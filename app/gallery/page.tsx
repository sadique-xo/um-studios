"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FILTERS = ["All", "Interior", "Hair", "Makeup", "Nails"] as const;

const GALLERY_ITEMS = [
  { id: 1, category: "Interior", aspect: "aspect-[4/5]", gradient: "from-[#2A1F1A] via-[#1A1510] to-[#0F0D0A]" },
  { id: 2, category: "Hair", aspect: "aspect-square", gradient: "from-[#1A1A2E] via-[#16213E] to-[#0F0F1A]" },
  { id: 3, category: "Makeup", aspect: "aspect-[3/4]", gradient: "from-[#2A1520] via-[#1A0F15] to-[#0F0A0D]" },
  { id: 4, category: "Interior", aspect: "aspect-square", gradient: "from-[#1A2A1F] via-[#101A15] to-[#0A0F0D]" },
  { id: 5, category: "Nails", aspect: "aspect-[4/5]", gradient: "from-[#2A2520] via-[#1A1815] to-[#0F0D0A]" },
  { id: 6, category: "Hair", aspect: "aspect-[3/4]", gradient: "from-[#201A2A] via-[#15101A] to-[#0D0A0F]" },
  { id: 7, category: "Makeup", aspect: "aspect-square", gradient: "from-[#2A201A] via-[#1A1510] to-[#0F0D0A]" },
  { id: 8, category: "Interior", aspect: "aspect-[4/5]", gradient: "from-[#1A2028] via-[#101520] to-[#0A0D12]" },
  { id: 9, category: "Nails", aspect: "aspect-[3/4]", gradient: "from-[#281A20] via-[#201018] to-[#120A0D]" },
  { id: 10, category: "Hair", aspect: "aspect-square", gradient: "from-[#1F2A1A] via-[#151A10] to-[#0D0F0A]" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === active);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero Banner */}
      <section className="px-6 pb-16 pt-32 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#C8A35F]">
          Where Every Detail Speaks Luxury
        </p>
        <h1 className="font-serif text-4xl font-light tracking-tight text-[#F5F0EB] sm:text-5xl md:text-6xl">
          Gallery
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#C8A35F] to-transparent" />
      </section>

      {/* Filter Buttons */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active === filter
                  ? "bg-[#C8A35F] text-[#0A0A0A]"
                  : "border border-[#C8A35F]/20 bg-transparent text-[#F5F0EB]/60 hover:border-[#C8A35F]/40 hover:text-[#F5F0EB]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="columns-2 gap-5 md:columns-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`mb-5 overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} ${item.aspect} break-inside-avoid`}
            >
              <div className="flex h-full w-full items-end p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-[#F5F0EB]/20">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-[#F5F0EB]/40">
            No items in this category yet.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
