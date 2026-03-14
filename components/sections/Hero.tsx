"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/image3-hero.webp"
        alt="UM Studios interior"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0A0A0A]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="text-xs md:text-sm tracking-widest uppercase text-[#C6A86C] mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Premium Unisex Salon &amp; Spa
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-serif text-[#F5F0EB] leading-tight mb-6 whitespace-pre-line"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {"Not Just Another Salon.\nIt\u2019s a Masterpiece."}
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-[#E8E0D4] max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Where artistry meets expertise. Over a decade of transforming looks
          and elevating confidence in the heart of Ranchi.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a
            href="/book"
            className="inline-block bg-[#C6A86C] text-[#0A0A0A] font-semibold rounded-full px-8 py-3 text-sm tracking-wide hover:bg-[#B8975C] transition-colors"
          >
            Book Your Appointment
          </a>
          <a
            href="/services"
            className="inline-block border border-[#C6A86C] text-[#C6A86C] font-semibold rounded-full px-8 py-3 text-sm tracking-wide hover:bg-[#C6A86C]/10 transition-colors"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" as const }}
      >
        <ChevronDown className="h-6 w-6 text-[#C6A86C]/70" />
      </motion.div>
    </section>
  );
}
