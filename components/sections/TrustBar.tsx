import { Star, Award, Gem, MapPin } from "lucide-react";

const items = [
  {
    icon: Star,
    text: "4.6 Rating \u00B7 570+ Google Reviews",
  },
  {
    icon: Award,
    text: "10+ Years of Excellence",
  },
  {
    icon: Gem,
    text: "L\u2019Or\u00E9al Professionnel Partner",
  },
  {
    icon: MapPin,
    text: "Plaza Chowk, Lalpur, Ranchi",
  },
];

export default function TrustBar() {
  return (
    <section className="border-t border-[#C6A86C]/40 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center gap-3 px-4 ${
                idx < items.length - 1
                  ? "md:border-r md:border-[#C6A86C]/20"
                  : ""
              }`}
            >
              <item.icon className="h-5 w-5 text-[#C6A86C] shrink-0" />
              <span className="text-sm text-[#E8E0D4]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
