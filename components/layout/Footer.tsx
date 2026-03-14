import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Book Now", href: "/book" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/um.studios/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/umstudiosranchi/", icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#C8A35F]/20 bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="transition-opacity duration-200 hover:opacity-80">
              <Image
                src="/images/LOGO.png"
                alt="UM Studios"
                width={120}
                height={40}
                className="h-16 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#F5F0E8]/70">
              A premium salon experience crafted for those who appreciate the
              art of personal style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-widest text-[#C8A35F] uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5F0E8]/80 transition-colors duration-200 hover:text-[#C8A35F]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-widest text-[#C8A35F] uppercase">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-full border border-[#C8A35F]/30 p-2.5 text-[#F5F0E8]/80 transition-all duration-200 hover:border-[#C8A35F] hover:text-[#C8A35F]"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-[#C8A35F]/10 pt-6">
          <p className="text-center text-xs tracking-wide text-[#F5F0E8]/50">
            &copy; {new Date().getFullYear()} UM Studios, Ranchi. All rights reserved.
          </p>
          <p className="mt-2 text-center text-xs tracking-wide text-[#F5F0E8]/40">
            Built with love by{" "}
            <a
              href="https://sadique.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8A35F]/80 hover:text-[#C8A35F] transition-colors"
            >
              sadique.co
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
