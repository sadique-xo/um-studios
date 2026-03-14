import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { Clock, ArrowRight } from "lucide-react";

const STATIC_SERVICES = [
  { name: "Haircut – Men", category: "hair", description: "Precision cuts and trending styles", durationMin: 30, price: 300, priceLabel: null },
  { name: "Haircut – Women", category: "hair", description: "Expert cuts tailored to your style", durationMin: 45, price: 500, priceLabel: "Starting from" },
  { name: "Hair Colouring – Women", category: "hair", description: "Premium colouring with L'Oréal products", durationMin: 90, price: 1500, priceLabel: "Starting from" },
  { name: "Highlights / Balayage", category: "hair", description: "Dimensional colour techniques", durationMin: 120, price: 2500, priceLabel: "Starting from" },
  { name: "Beard Grooming & Styling", category: "hair", description: "Sharp, styled and groomed", durationMin: 20, price: 200, priceLabel: null },
  { name: "Keratin Treatment", category: "treatments", description: "Smooth, frizz-free hair for months", durationMin: 120, price: 2999, priceLabel: "Starting from" },
  { name: "Hair Smoothening", category: "treatments", description: "Silky smooth transformation", durationMin: 150, price: 3999, priceLabel: "Starting from" },
  { name: "Botox Hair Spa", category: "treatments", description: "Deep repair and rejuvenation", durationMin: 90, price: 1999, priceLabel: "Starting from" },
  { name: "Deep Conditioning Hair Spa", category: "treatments", description: "Intensive moisture and repair", durationMin: 60, price: 999, priceLabel: null },
  { name: "Bridal Makeup – HD", category: "makeup", description: "Flawless HD bridal look", durationMin: 120, price: 8999, priceLabel: "Starting from" },
  { name: "Bridal Makeup – Airbrush", category: "makeup", description: "Long-lasting airbrush perfection", durationMin: 120, price: 12999, priceLabel: "Starting from" },
  { name: "Party Makeup", category: "makeup", description: "Glamorous looks for any occasion", durationMin: 60, price: 2999, priceLabel: "Starting from" },
  { name: "Engagement Makeup", category: "makeup", description: "Picture-perfect engagement look", durationMin: 90, price: 5999, priceLabel: "Starting from" },
  { name: "Manicure – Classic", category: "nails", description: "Clean, shaped and polished nails", durationMin: 30, price: 499, priceLabel: null },
  { name: "Pedicure – Aroma", category: "nails", description: "Luxurious aromatic pedicure", durationMin: 60, price: 999, priceLabel: null },
  { name: "Nail Art", category: "nails", description: "Express yourself with creative designs", durationMin: 45, price: 399, priceLabel: "Starting from" },
  { name: "Facial – De-Tan", category: "skin", description: "Remove tan and restore glow", durationMin: 60, price: 999, priceLabel: null },
  { name: "Hydra Facial", category: "skin", description: "Deep hydration and rejuvenation", durationMin: 60, price: 2499, priceLabel: null },
  { name: "Full Body Polishing", category: "skin", description: "Head to toe glow treatment", durationMin: 90, price: 2999, priceLabel: null },
  { name: "Head Massage", category: "spa", description: "Relaxing vedic head massage", durationMin: 30, price: 499, priceLabel: null },
  { name: "Body Massage – Swedish", category: "spa", description: "Full body relaxation therapy", durationMin: 60, price: 1999, priceLabel: null },
  { name: "Deep Tissue Therapy", category: "spa", description: "Intensive muscle relief", durationMin: 60, price: 2499, priceLabel: null },
  { name: "Rica Full Body Wax", category: "waxing", description: "Smooth, gentle full body waxing", durationMin: 90, price: 1999, priceLabel: null },
  { name: "Underarms Wax", category: "waxing", description: "Quick and clean", durationMin: 15, price: 149, priceLabel: null },
  { name: "Full Legs Wax", category: "waxing", description: "Smooth legs with premium wax", durationMin: 45, price: 599, priceLabel: null },
];

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return services.length > 0 ? services : STATIC_SERVICES;
  } catch {
    return STATIC_SERVICES;
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  const groupedServices = SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    services: services.filter((s) => s.category === cat.key),
  })).filter((group) => group.services.length > 0);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero Banner */}
      <section className="px-6 pb-16 pt-32 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#C8A35F]">
          Services Crafted for You
        </p>
        <h1 className="font-serif text-4xl font-light tracking-tight text-[#F5F0EB] sm:text-5xl md:text-6xl">
          Our Services
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#C8A35F] to-transparent" />
      </section>

      {/* Content with Sidebar */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex gap-12">
          {/* Sticky Sidebar - Desktop only */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <nav className="sticky top-32">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A35F]">
                Categories
              </p>
              <ul className="space-y-1">
                {groupedServices.map((group) => (
                  <li key={group.key}>
                    <a
                      href={`#${group.key}`}
                      className="block rounded-lg px-3 py-2 text-sm text-[#F5F0EB]/60 transition-colors hover:bg-[#1A1A1A] hover:text-[#F5F0EB]"
                    >
                      {group.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-20">
            {groupedServices.map((group) => (
              <section key={group.key} id={group.key} className="scroll-mt-28">
                {/* Category Heading */}
                <div className="mb-8">
                  <h2 className="font-serif text-3xl font-light text-[#F5F0EB]">
                    {group.label}
                  </h2>
                  <div className="mt-3 h-px w-16 bg-[#C8A35F]" />
                </div>

                {/* Services Grid */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {group.services.map((service) => (
                    <div
                      key={service.name}
                      className="group rounded-xl border border-[#C8A35F]/20 bg-[#1A1A1A] p-6 transition-colors hover:border-[#C8A35F]/40"
                    >
                      <h3 className="text-lg font-medium text-[#F5F0EB]">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#F5F0EB]/50">
                        {service.description}
                      </p>

                      <div className="mt-4 flex items-center gap-3 text-sm text-[#F5F0EB]/40">
                        <Clock className="h-4 w-4" />
                        <span>{service.durationMin} min</span>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          {service.priceLabel && (
                            <p className="text-xs text-[#F5F0EB]/40">
                              {service.priceLabel}
                            </p>
                          )}
                          <p className="text-xl font-semibold text-[#C8A35F]">
                            &#8377;{service.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <Link
                          href={`/book?service=${encodeURIComponent(service.name)}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#C8A35F]/10 px-4 py-2 text-sm font-medium text-[#C8A35F] transition-colors hover:bg-[#C8A35F]/20"
                        >
                          Book This
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
