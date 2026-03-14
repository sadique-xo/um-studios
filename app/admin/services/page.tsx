"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMin: number;
  price: number;
  priceLabel: string | null;
  isActive: boolean;
  sortOrder: number;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        setServices(data);
      } catch {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const toggleActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
    toast.success("Toggled (visual only)");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[#C8A35F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif text-[#F5F0E8]">Services</h1>
        <span className="text-sm text-[#F5F0E8]/40">
          {services.length} services
        </span>
      </div>

      {services.length === 0 ? (
        <div className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-12 text-center">
          <p className="text-[#F5F0E8]/40">No services found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[#F5F0E8]/60">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Price</th>
                    <th className="text-left py-3 px-4 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 font-medium">Active</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-white/5 text-[#F5F0E8]/80"
                    >
                      <td className="py-3 px-4 font-medium text-[#F5F0E8]">
                        {service.name}
                      </td>
                      <td className="py-3 px-4 capitalize">
                        {service.category}
                      </td>
                      <td className="py-3 px-4">
                        {service.priceLabel || `Rs. ${service.price}`}
                      </td>
                      <td className="py-3 px-4">{service.durationMin} min</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleActive(service.id)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${
                            service.isActive
                              ? "bg-green-500/40"
                              : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                              service.isActive
                                ? "left-5 bg-green-400"
                                : "left-0.5 bg-white/40"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-[#F5F0E8]/30">
                          Edit (coming soon)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#F5F0E8] font-medium">
                    {service.name}
                  </span>
                  <button
                    onClick={() => toggleActive(service.id)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      service.isActive ? "bg-green-500/40" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                        service.isActive
                          ? "left-5 bg-green-400"
                          : "left-0.5 bg-white/40"
                      }`}
                    />
                  </button>
                </div>
                <div className="space-y-1 text-sm text-[#F5F0E8]/60">
                  <p className="capitalize">{service.category}</p>
                  <p>
                    {service.priceLabel || `Rs. ${service.price}`} &middot;{" "}
                    {service.durationMin} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
