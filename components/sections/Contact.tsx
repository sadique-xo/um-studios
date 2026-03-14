"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { SALON_INFO } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="text-xs tracking-widest uppercase text-[#C6A86C] mb-4 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Find Us
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-[#F5F0EB] text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Visit the Studio
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column — Details */}
          <motion.div
            className="space-y-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-[#C6A86C] mt-1 shrink-0" />
              <p className="text-[#E8E0D4] leading-relaxed">
                {SALON_INFO.address}
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-[#C6A86C] mt-1 shrink-0" />
              <div className="space-y-1">
                <a
                  href={`tel:${SALON_INFO.phone.replace(/\s/g, "")}`}
                  className="block text-[#E8E0D4] hover:text-[#C6A86C] transition-colors"
                >
                  {SALON_INFO.phone}
                </a>
                <a
                  href={`tel:${SALON_INFO.altPhone.replace(/\s/g, "")}`}
                  className="block text-[#E8E0D4] hover:text-[#C6A86C] transition-colors"
                >
                  {SALON_INFO.altPhone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-[#C6A86C] mt-1 shrink-0" />
              <p className="text-[#E8E0D4]">
                {SALON_INFO.days}, {SALON_INFO.hours}
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 pt-2">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#C6A86C] hover:text-[#B8975C] transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={SALON_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#C6A86C] hover:text-[#B8975C] transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Right column — Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            {SALON_INFO.googleMapsEmbed ? (
              <iframe
                src={SALON_INFO.googleMapsEmbed}
                className="w-full h-80 rounded-xl border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UM Studios Location"
              />
            ) : (
              <div className="w-full h-80 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#E8E0D4]/50 text-sm tracking-wide">
                  Map
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
