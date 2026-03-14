"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryItems = [
  { src: "/images/image3-hero.webp", aspect: "aspect-[4/3]", alt: "Reception and styling area" },
  { src: "/images/image1.webp", aspect: "aspect-[3/4]", alt: "The styling floor" },
  { src: "/images/image2.webp", aspect: "aspect-square", alt: "Hair wash & spa stations" },
  { src: "/images/image1.webp", aspect: "aspect-[3/4]", alt: "Interior details" },
  { src: "/images/image3-hero.webp", aspect: "aspect-[4/3]", alt: "Salon ambience" },
  { src: "/images/image2.webp", aspect: "aspect-square", alt: "Spa area" },
];

export default function Gallery() {
  return (
    <section className="bg-[#0A0A0A] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs md:text-sm tracking-widest uppercase text-gold mb-4">
            INSIDE THE STUDIO
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-off-white leading-tight">
            Where Every Detail Speaks Luxury
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }}
              className="break-inside-avoid"
            >
              <div
                className={`${item.aspect} w-full rounded-xl overflow-hidden relative transition-transform duration-500 hover:scale-[1.03] cursor-pointer`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
