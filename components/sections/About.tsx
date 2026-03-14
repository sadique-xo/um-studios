"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
      <div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      >
        {/* Left - copy */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-xs tracking-widest uppercase text-[#C6A86C] mb-4">
            Our Story
          </p>

          <h2 className="text-3xl md:text-5xl font-serif text-[#F5F0EB] leading-tight mb-6">
            Crafting Beauty Since Day One
          </h2>

          <div className="space-y-4 text-[#E8E0D4] leading-relaxed">
            <p>
              UM Studios was born from a simple yet powerful belief: everyone
              deserves to feel extraordinary. What started as a small dream in
              the heart of Ranchi has grown into one of the city&rsquo;s most
              trusted destinations for premium grooming and beauty.
            </p>
            <p>
              With over a decade of experience and a passionate team of skilled
              artists, we blend global trends with personalised care &mdash;
              creating looks that don&rsquo;t just follow fashion, but set it.
              From precision haircuts and colour transformations to rejuvenating
              spa rituals, every service at UM Studios is crafted to make you
              look and feel your absolute best.
            </p>
          </div>
        </motion.div>

        {/* Right - image placeholder */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-[3/4] w-full max-w-md mx-auto rounded-t-full overflow-hidden relative">
            <Image
              src="/images/image1.webp"
              alt="UM Studios styling floor"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
