"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Image,
  Settings,
  Menu,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/services", label: "Services", icon: Scissors },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-serif text-[#C8A35F]">UM Studios</h1>
        <p className="text-sm text-[#F5F0E8]/60 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "text-[#C8A35F] border-l-2 border-[#C8A35F] bg-[#C8A35F]/5"
                  : "text-[#F5F0E8]/60 hover:text-[#F5F0E8] border-l-2 border-transparent"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors"
        >
          View Site <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-full bg-[#1A1A1A] z-40">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#1A1A1A] border-b border-white/10 z-40 flex items-center px-4 gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="p-2 text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 p-0 bg-[#1A1A1A] border-r-white/10"
            showCloseButton={false}
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div onClick={() => setOpen(false)}>
              <SidebarContent pathname={pathname} />
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-lg font-serif text-[#C8A35F]">UM Studios</span>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pt-18 md:pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
