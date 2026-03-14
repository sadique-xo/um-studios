"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = [
  "All",
  "Hairdressing",
  "Hair Treatments",
  "Makeup Studio",
  "Nail Bar",
  "Skin Care",
  "Vedic Spa",
  "Waxing",
] as const;

type Category = (typeof categories)[number];

interface Service {
  name: string;
  description: string;
  duration: string;
  price: number;
  category: Exclude<Category, "All">;
}

const services: Service[] = [
  // Hairdressing
  {
    name: "Precision Haircut & Styling",
    description:
      "Expert cut tailored to your face shape and lifestyle, finished with a luxe blowout.",
    duration: "45 min",
    price: 800,
    category: "Hairdressing",
  },
  {
    name: "Global Hair Color",
    description:
      "Full head color using premium Italian shades for rich, long-lasting vibrancy.",
    duration: "90 min",
    price: 3500,
    category: "Hairdressing",
  },
  {
    name: "Balayage & Highlights",
    description:
      "Hand-painted highlights for a natural, sun-kissed dimension that grows out beautifully.",
    duration: "120 min",
    price: 5000,
    category: "Hairdressing",
  },
  // Hair Treatments
  {
    name: "Keratin Smoothing Treatment",
    description:
      "Eliminate frizz and restore mirror-like shine with our signature keratin infusion.",
    duration: "150 min",
    price: 6000,
    category: "Hair Treatments",
  },
  {
    name: "Deep Conditioning Therapy",
    description:
      "Intensive hydration masque that repairs damage and revives dull, lifeless hair.",
    duration: "45 min",
    price: 1500,
    category: "Hair Treatments",
  },
  {
    name: "Scalp Detox & Rejuvenation",
    description:
      "Purifying treatment that removes buildup and stimulates healthy hair growth.",
    duration: "60 min",
    price: 2000,
    category: "Hair Treatments",
  },
  // Makeup Studio
  {
    name: "Bridal Makeup",
    description:
      "Complete bridal transformation with airbrush finish, lashes, and touch-up kit included.",
    duration: "120 min",
    price: 15000,
    category: "Makeup Studio",
  },
  {
    name: "Party & Event Makeup",
    description:
      "Glamorous look for any occasion with long-wear products and flawless blending.",
    duration: "60 min",
    price: 3000,
    category: "Makeup Studio",
  },
  {
    name: "HD Makeup",
    description:
      "Camera-ready finish using high-definition products perfect for photoshoots.",
    duration: "75 min",
    price: 5000,
    category: "Makeup Studio",
  },
  // Nail Bar
  {
    name: "Gel Nail Extensions",
    description:
      "Durable, chip-resistant gel extensions shaped and designed to your taste.",
    duration: "90 min",
    price: 2500,
    category: "Nail Bar",
  },
  {
    name: "Luxury Manicure",
    description:
      "Complete nail care with cuticle treatment, scrub, massage, and premium polish.",
    duration: "45 min",
    price: 800,
    category: "Nail Bar",
  },
  {
    name: "Nail Art & Design",
    description:
      "Custom hand-painted designs, chrome finishes, or embellishments on each nail.",
    duration: "60 min",
    price: 1500,
    category: "Nail Bar",
  },
  // Skin Care
  {
    name: "Signature Gold Facial",
    description:
      "24K gold-infused facial that brightens, firms, and delivers an instant radiant glow.",
    duration: "75 min",
    price: 3500,
    category: "Skin Care",
  },
  {
    name: "HydraFacial Treatment",
    description:
      "Multi-step cleanse, exfoliate, and hydrate for deeply nourished, clear skin.",
    duration: "60 min",
    price: 4000,
    category: "Skin Care",
  },
  {
    name: "Anti-Aging Renewal Facial",
    description:
      "Targets fine lines and wrinkles with collagen-boosting serums and LED therapy.",
    duration: "90 min",
    price: 5000,
    category: "Skin Care",
  },
  // Vedic Spa
  {
    name: "Abhyanga Full Body Massage",
    description:
      "Traditional Ayurvedic warm oil massage that melts tension and restores balance.",
    duration: "90 min",
    price: 3500,
    category: "Vedic Spa",
  },
  {
    name: "Shirodhara Therapy",
    description:
      "Warm herbal oil poured over the forehead for deep mental calm and clarity.",
    duration: "60 min",
    price: 3000,
    category: "Vedic Spa",
  },
  {
    name: "Aromatherapy Hot Stone Massage",
    description:
      "Heated basalt stones paired with essential oils for profound muscle relaxation.",
    duration: "75 min",
    price: 4000,
    category: "Vedic Spa",
  },
  // Waxing
  {
    name: "Full Body Waxing",
    description:
      "Complete body hair removal using gentle, skin-friendly premium wax formula.",
    duration: "120 min",
    price: 3000,
    category: "Waxing",
  },
  {
    name: "Rica Roll-On Waxing",
    description:
      "Pain-minimized waxing with Italian Rica wax, ideal for sensitive skin.",
    duration: "45 min",
    price: 1500,
    category: "Waxing",
  },
  {
    name: "Brazilian Wax",
    description:
      "Expert bikini waxing with soothing post-care for smooth, lasting results.",
    duration: "30 min",
    price: 1800,
    category: "Waxing",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="bg-[#0A0A0A] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm tracking-widest uppercase text-gold mb-4">
            WHAT WE OFFER
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-off-white leading-tight">
            Services Crafted for You
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-10 scrollbar-hide -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-gold text-[#0A0A0A] border-gold"
                  : "bg-transparent text-cream/60 border-cognac/20 hover:border-gold/50 hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((service, i) => (
              <motion.div
                key={service.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                className="bg-[#1A1A1A] rounded-xl p-6 border border-cognac/20 hover:border-gold transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-off-white font-medium text-base mb-2">
                    {service.name}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-cognac/10">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-cream/40">
                      {service.duration}
                    </span>
                    <span className="text-gold font-semibold">
                      &#8377;{service.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Link
                    href="/book"
                    className="text-gold text-sm font-medium hover:text-gold-light transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block text-gold hover:text-gold-light text-sm font-medium tracking-wide transition-colors"
          >
            View All Services &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
