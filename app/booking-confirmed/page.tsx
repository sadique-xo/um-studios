import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BookingConfirmedPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="mx-auto max-w-md text-center">
          {/* Check Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>

          {/* Heading */}
          <h1 className="mb-3 font-serif text-3xl font-bold text-[#F5F0E8] sm:text-4xl">
            You&apos;re All Set!
          </h1>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-[#F5F0E8]/60">
            Your appointment request has been received. Our team will confirm
            your booking shortly via phone or WhatsApp.
          </p>

          {/* Phone Info */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C8A35F]/20 bg-[#C8A35F]/5 px-5 py-2.5">
            <Phone className="h-4 w-4 text-[#C8A35F]" />
            <span className="text-sm text-[#F5F0E8]/80">
              For immediate assistance, call us at{" "}
              <a
                href="tel:+918092161616"
                className="font-semibold text-[#C8A35F] hover:underline"
              >
                +91 80921 61616
              </a>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#C8A35F] px-8 text-sm font-semibold tracking-wide text-[#0A0A0A] transition-colors hover:bg-[#D4B06A]"
            >
              Book Another
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#333] px-8 text-sm font-medium text-[#F5F0E8] transition-colors hover:border-[#C8A35F]/50 hover:text-[#C8A35F]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
