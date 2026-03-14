import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data (order matters due to foreign keys)
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.settings.deleteMany();

  console.log("Cleared existing data.");

  // ── Services ──────────────────────────────────────────────────────────
  const servicesData = [
    // Hair
    { name: "Haircut – Men", category: "hair", description: "Precision cuts and trending styles for men", durationMin: 30, price: 300, priceLabel: null, sortOrder: 1 },
    { name: "Haircut – Women", category: "hair", description: "Stylish and customised cuts tailored for women", durationMin: 45, price: 500, priceLabel: "Starting from", sortOrder: 2 },
    { name: "Haircut – Kids", category: "hair", description: "Fun and gentle haircuts for children", durationMin: 20, price: 200, priceLabel: null, sortOrder: 3 },
    { name: "Beard Grooming & Styling", category: "hair", description: "Expert beard shaping, trimming, and styling", durationMin: 20, price: 200, priceLabel: null, sortOrder: 4 },
    { name: "Hair Colouring – Men", category: "hair", description: "Professional hair colouring and grey coverage for men", durationMin: 60, price: 800, priceLabel: "Starting from", sortOrder: 5 },
    { name: "Hair Colouring – Women", category: "hair", description: "Full hair colour transformation with premium products", durationMin: 90, price: 1500, priceLabel: "Starting from", sortOrder: 6 },
    { name: "Highlights / Balayage", category: "hair", description: "Dimensional colour with hand-painted highlights or balayage", durationMin: 120, price: 2500, priceLabel: "Starting from", sortOrder: 7 },
    { name: "Hair Styling & Blow Dry", category: "hair", description: "Salon-finish blow dry and styling for any occasion", durationMin: 45, price: 600, priceLabel: null, sortOrder: 8 },
    { name: "Clean Shave", category: "hair", description: "Classic hot-towel clean shave for a smooth finish", durationMin: 15, price: 150, priceLabel: null, sortOrder: 9 },

    // Treatments
    { name: "Keratin Treatment", category: "treatments", description: "Frizz-free, silky smooth hair with long-lasting keratin infusion", durationMin: 120, price: 2999, priceLabel: "Starting from", sortOrder: 10 },
    { name: "Hair Straightening", category: "treatments", description: "Permanent straightening for sleek, manageable hair", durationMin: 150, price: 3499, priceLabel: "Starting from", sortOrder: 11 },
    { name: "Hair Smoothening", category: "treatments", description: "Anti-frizz smoothening for naturally flowing hair", durationMin: 150, price: 3999, priceLabel: "Starting from", sortOrder: 12 },
    { name: "Botox Hair Spa", category: "treatments", description: "Intensive repair treatment restoring damaged and lifeless hair", durationMin: 90, price: 1999, priceLabel: "Starting from", sortOrder: 13 },
    { name: "Deep Conditioning Hair Spa", category: "treatments", description: "Deep nourishment and hydration for dry, stressed hair", durationMin: 60, price: 999, priceLabel: null, sortOrder: 14 },
    { name: "L'Oréal Hair Spa", category: "treatments", description: "Premium L'Oréal spa therapy for revitalised, glossy hair", durationMin: 60, price: 1299, priceLabel: null, sortOrder: 15 },
    { name: "Scalp Treatment", category: "treatments", description: "Targeted scalp therapy for dandruff, dryness, and hair fall", durationMin: 45, price: 799, priceLabel: null, sortOrder: 16 },

    // Makeup
    { name: "Bridal Makeup – HD", category: "makeup", description: "Flawless HD bridal makeup for your perfect day", durationMin: 120, price: 8999, priceLabel: "Starting from", sortOrder: 17 },
    { name: "Bridal Makeup – Airbrush", category: "makeup", description: "Long-lasting airbrush bridal makeup with a dewy finish", durationMin: 120, price: 12999, priceLabel: "Starting from", sortOrder: 18 },
    { name: "Engagement Makeup", category: "makeup", description: "Elegant makeup look for your engagement ceremony", durationMin: 90, price: 5999, priceLabel: "Starting from", sortOrder: 19 },
    { name: "Party Makeup", category: "makeup", description: "Glamorous makeup for parties, events, and special occasions", durationMin: 60, price: 2999, priceLabel: "Starting from", sortOrder: 20 },
    { name: "Groom Makeup", category: "makeup", description: "Subtle, polished makeup to ensure the groom looks his best", durationMin: 45, price: 1999, priceLabel: null, sortOrder: 21 },
    { name: "Pre-Bridal Package", category: "makeup", description: "Complete pre-bridal skin and beauty prep package", durationMin: 180, price: 7999, priceLabel: "Starting from", sortOrder: 22 },

    // Nails
    { name: "Manicure – Classic", category: "nails", description: "Classic manicure with nail shaping, cuticle care, and polish", durationMin: 30, price: 499, priceLabel: null, sortOrder: 23 },
    { name: "Manicure – Aroma", category: "nails", description: "Aromatic spa manicure with essential oils and hand massage", durationMin: 45, price: 799, priceLabel: null, sortOrder: 24 },
    { name: "Pedicure – Classic", category: "nails", description: "Relaxing pedicure with exfoliation, cuticle care, and polish", durationMin: 45, price: 599, priceLabel: null, sortOrder: 25 },
    { name: "Pedicure – Aroma", category: "nails", description: "Luxurious aroma pedicure with soak, scrub, and massage", durationMin: 60, price: 999, priceLabel: null, sortOrder: 26 },
    { name: "Nail Art", category: "nails", description: "Creative nail art designs from minimal to intricate", durationMin: 45, price: 399, priceLabel: "Starting from", sortOrder: 27 },
    { name: "Nail Extensions", category: "nails", description: "Durable acrylic or gel nail extensions in your desired length", durationMin: 75, price: 1499, priceLabel: "Starting from", sortOrder: 28 },

    // Skin
    { name: "Facial – De-Tan", category: "skin", description: "Tan removal facial for brighter, even-toned skin", durationMin: 60, price: 999, priceLabel: null, sortOrder: 29 },
    { name: "Facial – Gold", category: "skin", description: "Gold-infused facial for radiant, youthful glow", durationMin: 75, price: 1499, priceLabel: null, sortOrder: 30 },
    { name: "Facial – Diamond", category: "skin", description: "Premium diamond facial for deep cleansing and luminous skin", durationMin: 75, price: 1999, priceLabel: null, sortOrder: 31 },
    { name: "Hydra Facial", category: "skin", description: "Multi-step hydra facial for deep hydration and skin renewal", durationMin: 60, price: 2499, priceLabel: null, sortOrder: 32 },
    { name: "Full Body Polishing", category: "skin", description: "Head-to-toe exfoliation and polishing for silky smooth skin", durationMin: 90, price: 2999, priceLabel: null, sortOrder: 33 },
    { name: "Bleach & Clean-Up (Face)", category: "skin", description: "Face bleach and clean-up for a fresh, glowing complexion", durationMin: 45, price: 599, priceLabel: null, sortOrder: 34 },
    { name: "Threading – Eyebrows", category: "skin", description: "Precise eyebrow threading for clean, defined brows", durationMin: 10, price: 50, priceLabel: null, sortOrder: 35 },
    { name: "Threading – Full Face", category: "skin", description: "Complete face threading for smooth, hair-free skin", durationMin: 20, price: 150, priceLabel: null, sortOrder: 36 },

    // Spa
    { name: "Head Massage", category: "spa", description: "Stress-relieving head massage to ease tension and improve circulation", durationMin: 30, price: 499, priceLabel: null, sortOrder: 37 },
    { name: "Body Massage – Swedish", category: "spa", description: "Full body Swedish massage for relaxation and muscle relief", durationMin: 60, price: 1999, priceLabel: null, sortOrder: 38 },
    { name: "Deep Tissue Therapy", category: "spa", description: "Intense deep tissue massage targeting chronic muscle tension", durationMin: 60, price: 2499, priceLabel: null, sortOrder: 39 },
    { name: "Aromatherapy Massage", category: "spa", description: "Calming full body massage with therapeutic essential oils", durationMin: 75, price: 2999, priceLabel: null, sortOrder: 40 },

    // Waxing
    { name: "Rica Full Body Wax", category: "waxing", description: "Gentle full body waxing with premium Rica wax", durationMin: 90, price: 1999, priceLabel: null, sortOrder: 41 },
    { name: "Underarms Wax", category: "waxing", description: "Quick and smooth underarm waxing", durationMin: 15, price: 149, priceLabel: null, sortOrder: 42 },
    { name: "Full Arms Wax", category: "waxing", description: "Complete arm waxing from shoulder to wrist", durationMin: 30, price: 399, priceLabel: null, sortOrder: 43 },
    { name: "Half Arms Wax", category: "waxing", description: "Waxing for lower or upper arms", durationMin: 20, price: 249, priceLabel: null, sortOrder: 44 },
    { name: "Full Legs Wax", category: "waxing", description: "Full leg waxing from thigh to ankle", durationMin: 45, price: 599, priceLabel: null, sortOrder: 45 },
    { name: "Half Legs Wax", category: "waxing", description: "Waxing for lower or upper legs", durationMin: 25, price: 349, priceLabel: null, sortOrder: 46 },
    { name: "Bikini Wax", category: "waxing", description: "Gentle and hygienic bikini line waxing", durationMin: 20, price: 499, priceLabel: null, sortOrder: 47 },
  ];

  const createdServices = await Promise.all(
    servicesData.map((s) =>
      prisma.service.create({ data: s })
    )
  );

  console.log(`Seeded ${createdServices.length} services.`);

  // Build a name -> id lookup map
  const serviceMap = new Map<string, string>();
  for (const s of createdServices) {
    serviceMap.set(s.name, s.id);
  }

  // ── Bookings ──────────────────────────────────────────────────────────
  const bookingsData = [
    { customerName: "Priya Sharma", customerPhone: "9876543210", serviceName: "Keratin Treatment", preferredDate: "2026-03-14", preferredTime: "11:00", status: "pending" },
    { customerName: "Rahul Kumar", customerPhone: "9123456789", serviceName: "Haircut – Men", preferredDate: "2026-03-14", preferredTime: "14:00", status: "confirmed" },
    { customerName: "Sneha Verma", customerPhone: "9988776655", serviceName: "Bridal Makeup – HD", preferredDate: "2026-03-15", preferredTime: "10:30", status: "pending" },
    { customerName: "Amit Singh", customerPhone: "9876512345", serviceName: "Beard Grooming & Styling", preferredDate: "2026-03-14", preferredTime: "16:00", status: "completed" },
    { customerName: "Nisha Gupta", customerPhone: "9234567890", serviceName: "Hydra Facial", preferredDate: "2026-03-15", preferredTime: "12:00", status: "pending" },
    { customerName: "Deepak Oraon", customerPhone: "9345678901", serviceName: "Hair Colouring – Men", preferredDate: "2026-03-16", preferredTime: "11:30", status: "confirmed" },
    { customerName: "Anjali Kumari", customerPhone: "9456789012", serviceName: "Pedicure – Aroma", preferredDate: "2026-03-14", preferredTime: "15:00", status: "cancelled" },
    { customerName: "Vikash Mahto", customerPhone: "9567890123", serviceName: "Head Massage", preferredDate: "2026-03-16", preferredTime: "17:00", status: "pending" },
    { customerName: "Ritu Sinha", customerPhone: "9678901234", serviceName: "Full Body Polishing", preferredDate: "2026-03-17", preferredTime: "10:00", status: "confirmed" },
    { customerName: "Saurav Das", customerPhone: "9789012345", serviceName: "Haircut – Men", preferredDate: "2026-03-14", preferredTime: "18:00", status: "completed" },
  ];

  const createdBookings = await Promise.all(
    bookingsData.map((b) => {
      const serviceId = serviceMap.get(b.serviceName);
      if (!serviceId) {
        throw new Error(`Service not found: ${b.serviceName}`);
      }
      return prisma.booking.create({
        data: {
          customerName: b.customerName,
          customerPhone: b.customerPhone,
          serviceId,
          preferredDate: new Date(b.preferredDate),
          preferredTime: b.preferredTime,
          status: b.status,
        },
      });
    })
  );

  console.log(`Seeded ${createdBookings.length} bookings.`);

  // ── Gallery ───────────────────────────────────────────────────────────
  const galleryData = [
    { imageUrl: "https://placehold.co/800x600?text=Hair+Styling", caption: "Trending hair transformations", category: "hair", sortOrder: 1 },
    { imageUrl: "https://placehold.co/800x600?text=Bridal+Makeup", caption: "Bridal makeup artistry", category: "makeup", sortOrder: 2 },
    { imageUrl: "https://placehold.co/800x600?text=Nail+Art", caption: "Creative nail art designs", category: "nails", sortOrder: 3 },
    { imageUrl: "https://placehold.co/800x600?text=Skin+Care", caption: "Glowing skin treatments", category: "skin", sortOrder: 4 },
    { imageUrl: "https://placehold.co/800x600?text=Spa+Vibes", caption: "Relaxing spa experience", category: "spa", sortOrder: 5 },
  ];

  const createdGallery = await Promise.all(
    galleryData.map((g) => prisma.gallery.create({ data: g }))
  );

  console.log(`Seeded ${createdGallery.length} gallery entries.`);

  // ── Settings ──────────────────────────────────────────────────────────
  await prisma.settings.create({
    data: {
      id: 1,
      salonName: "UM Studios",
      tagline: "Not just another salon. It's a masterpiece.",
      phonePrimary: "+91 80921 61616",
      phoneSecondary: "+91 80921 41414",
      email: "hello@umstudios.in",
      address:
        "4th Floor, Hall No. 4A, Damyantika Complex, East Jail Road, Near Plaza Chowk, Lalpur, Ranchi, Jharkhand – 834001",
      googleMapsUrl: "https://maps.app.goo.gl/umstudiosranchi",
      openingTime: "10:00",
      closingTime: "21:00",
      instagramUrl: "https://www.instagram.com/um.studios/",
      facebookUrl: "https://www.facebook.com/umstudiosranchi/",
    },
  });

  console.log("Seeded settings.");

  console.log("Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
