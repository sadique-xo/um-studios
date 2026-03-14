export const SERVICE_CATEGORIES = [
  { key: "hair", label: "Hairdressing", icon: "Scissors" },
  { key: "treatments", label: "Hair Treatments", icon: "Sparkles" },
  { key: "makeup", label: "Makeup Studio", icon: "Palette" },
  { key: "nails", label: "Nail Bar", icon: "Hand" },
  { key: "skin", label: "Skin Care", icon: "Sun" },
  { key: "spa", label: "Vedic Spa", icon: "Flower2" },
  { key: "waxing", label: "Waxing", icon: "Zap" },
] as const;

export const SALON_INFO = {
  name: "UM Studios",
  tagline: "Not just another salon. It's a masterpiece.",
  phone: "+91 80921 61616",
  altPhone: "+91 80921 41414",
  address:
    "4th Floor, Hall No. 4A, Damyantika Complex, East Jail Road, Near Plaza Chowk, Lalpur, Ranchi, Jharkhand – 834001",
  hours: "10:00 AM – 9:00 PM",
  days: "Open 7 days a week",
  instagram: "https://www.instagram.com/um.studios/",
  facebook: "https://www.facebook.com/umstudiosranchi/",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.5!2d85.325!3d23.356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDIxJzIyLjAiTiA4NcKwMTknMzAuMCJF!5e0!3m2!1sen!2sin!4v1",
};

export const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30",
];

export const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};
