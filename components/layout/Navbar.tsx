"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book Now", href: "/book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A1A1A] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="transition-opacity duration-200 hover:opacity-80">
          <Image
            src="/images/LOGO.png"
            alt="UM Studios"
            width={200}
            height={80}
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Center Nav Links - Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wider text-[#F5F0E8] uppercase transition-colors duration-200 hover:text-[#C8A35F]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA - Desktop */}
        <Link
          href="/book"
          className="hidden rounded-full bg-[#C8A35F] px-6 py-2.5 text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase transition-all duration-200 hover:bg-[#D4B06A] hover:shadow-lg hover:shadow-[#C8A35F]/20 md:inline-block"
        >
          Book Now
        </Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              className="rounded-md p-2 text-[#F5F0E8] transition-colors duration-200 hover:text-[#C8A35F]"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-[#C8A35F]/20 bg-[#1A1A1A]"
            >
              <SheetHeader>
                <SheetTitle className="font-serif text-xl font-bold text-[#C8A35F]">
                  UM Studios
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} render={<span />}>
                    <Link
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-base font-medium tracking-wider text-[#F5F0E8] uppercase transition-colors duration-200 hover:bg-[#C8A35F]/10 hover:text-[#C8A35F]"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 border-t border-[#C8A35F]/20 pt-4">
                  <SheetClose render={<span />}>
                    <Link
                      href="/book"
                      className="block rounded-full bg-[#C8A35F] px-6 py-3 text-center text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase transition-all duration-200 hover:bg-[#D4B06A]"
                    >
                      Book Now
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
