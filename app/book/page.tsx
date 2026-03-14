"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Clock, IndianRupee, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMin: number;
  price: number;
  priceLabel: string | null;
}

const STEPS = ["Select Service", "Pick Date & Time", "Your Details"];

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
];

function getNext14Days(): { date: Date; label: string; dayName: string }[] {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return days;
}

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Service selection
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // Step 2: Date & Time
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Step 3: Details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dates = useMemo(() => getNext14Days(), []);

  const categories = useMemo(() => {
    const cats = [...new Set(services.map((s) => s.category))];
    return cats;
  }, [services]);

  const filteredServices = useMemo(() => {
    if (!activeCategory) return services;
    return services.filter((s) => s.category === activeCategory);
  }, [services, activeCategory]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) || null,
    [services, selectedServiceId]
  );

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
        if (data.length > 0) {
          const cats = [...new Set(data.map((s: Service) => s.category))];
          setActiveCategory(cats[0] as string);
        }
      } catch {
        console.error("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  function canProceed(): boolean {
    if (step === 1) return !!selectedServiceId;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!name.trim() && /^\d{10}$/.test(phone);
    return false;
  }

  function handleNext() {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerPhone: phone,
          customerEmail: email || undefined,
          serviceId: selectedServiceId,
          preferredDate: selectedDate?.toISOString(),
          preferredTime: selectedTime,
          notes: notes || undefined,
        }),
      });

      if (res.ok) {
        router.push("/booking-confirmed");
      } else {
        const data = await res.json();
        setErrors({ form: data.error || "Something went wrong" });
      }
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 pb-32 pt-28 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-[#F5F0E8] sm:text-4xl">
            Book Your Appointment
          </h1>
          <p className="mt-2 text-sm text-[#F5F0E8]/60">
            Choose your service, pick a time, and we&apos;ll take care of the rest.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;
              return (
                <div key={label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "border-[#C8A35F] bg-[#C8A35F] text-[#0A0A0A]"
                        : isActive
                          ? "border-[#C8A35F] bg-transparent text-[#C8A35F]"
                          : "border-[#333] bg-transparent text-[#555]"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  <span
                    className={`hidden text-xs font-medium tracking-wide sm:block ${
                      isActive || isCompleted ? "text-[#C8A35F]" : "text-[#555]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step > i ? "bg-[#C8A35F]" : "bg-[#222]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C8A35F] border-t-transparent" />
              </div>
            ) : (
              <>
                {/* Category Tabs */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                        activeCategory === cat
                          ? "bg-[#C8A35F] text-[#0A0A0A]"
                          : "border border-[#333] bg-transparent text-[#F5F0E8]/70 hover:border-[#C8A35F]/50 hover:text-[#F5F0E8]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Service List */}
                <div className="grid gap-3">
                  {filteredServices.map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-[#C8A35F] bg-[#C8A35F]/10"
                            : "border-[#222] bg-[#141414] hover:border-[#333] hover:bg-[#1A1A1A]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3
                              className={`font-medium ${
                                isSelected ? "text-[#C8A35F]" : "text-[#F5F0E8]"
                              }`}
                            >
                              {service.name}
                            </h3>
                            <p className="mt-1 text-sm text-[#F5F0E8]/50">
                              {service.description}
                            </p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-[#F5F0E8]/40">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {service.durationMin} min
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="flex items-center text-lg font-semibold text-[#C8A35F]">
                              <IndianRupee className="h-4 w-4" />
                              {service.priceLabel || service.price}
                            </span>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? "border-[#C8A35F] bg-[#C8A35F]"
                                  : "border-[#444]"
                              }`}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3 text-[#0A0A0A]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Pick Date & Time */}
        {step === 2 && (
          <div>
            {/* Date Selection */}
            <h2 className="mb-4 text-lg font-semibold text-[#F5F0E8]">
              Select Date
            </h2>
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
              {dates.map((d) => {
                const isSelected =
                  selectedDate?.toDateString() === d.date.toDateString();
                return (
                  <button
                    key={d.date.toISOString()}
                    onClick={() => setSelectedDate(d.date)}
                    className={`flex min-w-[72px] flex-col items-center gap-1 rounded-xl border px-3 py-3 transition-all duration-200 ${
                      isSelected
                        ? "border-[#C8A35F] bg-[#C8A35F]/10"
                        : "border-[#222] bg-[#141414] hover:border-[#333]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${
                        isSelected ? "text-[#C8A35F]" : "text-[#F5F0E8]/40"
                      }`}
                    >
                      {d.dayName}
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        isSelected ? "text-[#C8A35F]" : "text-[#F5F0E8]"
                      }`}
                    >
                      {d.date.getDate()}
                    </span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-[#C8A35F]/70" : "text-[#F5F0E8]/30"
                      }`}
                    >
                      {d.date.toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Time Selection */}
            <h2 className="mb-4 text-lg font-semibold text-[#F5F0E8]">
              Select Time
            </h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? "border-[#C8A35F] bg-[#C8A35F]/10 text-[#C8A35F]"
                        : "border-[#222] bg-[#141414] text-[#F5F0E8]/70 hover:border-[#333] hover:text-[#F5F0E8]"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Your Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#F5F0E8]/80">
                Full Name <span className="text-red-400">*</span>
              </label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Your full name"
                className="h-12 rounded-xl border-[#222] bg-[#141414] text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus-visible:border-[#C8A35F] focus-visible:ring-[#C8A35F]/20"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F5F0E8]/80">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="flex h-12 items-center rounded-xl border border-[#222] bg-[#141414] px-3 text-sm text-[#F5F0E8]/50">
                  +91
                </span>
                <Input
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhone(val);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  placeholder="10-digit phone number"
                  className="h-12 flex-1 rounded-xl border-[#222] bg-[#141414] text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus-visible:border-[#C8A35F] focus-visible:ring-[#C8A35F]/20"
                  inputMode="numeric"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F5F0E8]/80">
                Email <span className="text-[#F5F0E8]/30">(optional)</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 rounded-xl border-[#222] bg-[#141414] text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus-visible:border-[#C8A35F] focus-visible:ring-[#C8A35F]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F5F0E8]/80">
                Notes <span className="text-[#F5F0E8]/30">(optional)</span>
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or preferences..."
                rows={3}
                className="rounded-xl border-[#222] bg-[#141414] text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus-visible:border-[#C8A35F] focus-visible:ring-[#C8A35F]/20"
              />
            </div>

            {errors.form && (
              <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4">
                <p className="text-sm text-red-400">{errors.form}</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#222] bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Summary */}
          <div className="min-w-0 flex-1">
            {selectedService ? (
              <div>
                <p className="truncate text-sm font-medium text-[#F5F0E8]">
                  {selectedService.name}
                </p>
                <p className="flex items-center gap-2 text-xs text-[#F5F0E8]/50">
                  <span className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {selectedService.priceLabel || selectedService.price}
                  </span>
                  <span>|</span>
                  <span>{selectedService.durationMin} min</span>
                </p>
              </div>
            ) : (
              <p className="text-sm text-[#F5F0E8]/40">No service selected</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button
                onClick={handleBack}
                className="h-10 rounded-full border border-[#333] bg-transparent px-4 text-sm text-[#F5F0E8] hover:bg-[#1A1A1A]"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-10 rounded-full bg-[#C8A35F] px-6 text-sm font-semibold text-[#0A0A0A] hover:bg-[#D4B06A] disabled:opacity-40"
              >
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="h-10 rounded-full bg-[#C8A35F] px-6 text-sm font-semibold text-[#0A0A0A] hover:bg-[#D4B06A] disabled:opacity-40"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
