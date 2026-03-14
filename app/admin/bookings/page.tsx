"use client";

import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { STATUS_COLORS } from "@/lib/constants";

type Service = {
  id: string;
  name: string;
  category: string;
};

type Booking = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  serviceId: string;
  service: Service;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
  status: string;
  createdAt: string;
};

const STATUS_FILTERS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? updated : b))
      );
      toast.success(`Booking ${status}`);
    } catch {
      toast.error("Failed to update booking status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[#C8A35F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-serif text-[#F5F0E8] mb-6">Bookings</h1>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${
              filter === s
                ? "bg-[#C8A35F] text-[#0A0A0A] font-medium"
                : "bg-[#1A1A1A] text-[#F5F0E8]/60 hover:text-[#F5F0E8] border border-white/10"
            }`}
          >
            {s === "all" ? `All (${bookings.length})` : `${s} (${bookings.filter((b) => b.status === s).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-12 text-center">
          <p className="text-[#F5F0E8]/40">No bookings found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[#F5F0E8]/60">
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Time</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Phone</th>
                    <th className="text-left py-3 px-4 font-medium">Service</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-white/5 text-[#F5F0E8]/80"
                    >
                      <td className="py-3 px-4">
                        {format(new Date(booking.preferredDate), "dd MMM yyyy")}
                      </td>
                      <td className="py-3 px-4">{booking.preferredTime}</td>
                      <td className="py-3 px-4">{booking.customerName}</td>
                      <td className="py-3 px-4">{booking.customerPhone}</td>
                      <td className="py-3 px-4">{booking.service.name}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs border capitalize ${
                            STATUS_COLORS[booking.status] || ""
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <ActionButtons
                          booking={booking}
                          updatingId={updatingId}
                          onUpdate={updateStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#F5F0E8] font-medium">
                    {booking.customerName}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs border capitalize ${
                      STATUS_COLORS[booking.status] || ""
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-[#F5F0E8]/60 mb-3">
                  <p>
                    {format(new Date(booking.preferredDate), "dd MMM yyyy")} at{" "}
                    {booking.preferredTime}
                  </p>
                  <p>{booking.service.name}</p>
                  <p>{booking.customerPhone}</p>
                </div>
                <ActionButtons
                  booking={booking}
                  updatingId={updatingId}
                  onUpdate={updateStatus}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ActionButtons({
  booking,
  updatingId,
  onUpdate,
}: {
  booking: Booking;
  updatingId: string | null;
  onUpdate: (id: string, status: string) => void;
}) {
  const isUpdating = updatingId === booking.id;

  return (
    <div className="flex gap-2">
      {booking.status === "pending" && (
        <button
          onClick={() => onUpdate(booking.id, "confirmed")}
          disabled={isUpdating}
          className="px-3 py-1 text-xs rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
        >
          Confirm
        </button>
      )}
      {booking.status === "confirmed" && (
        <button
          onClick={() => onUpdate(booking.id, "completed")}
          disabled={isUpdating}
          className="px-3 py-1 text-xs rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors disabled:opacity-50"
        >
          Complete
        </button>
      )}
      {(booking.status === "pending" || booking.status === "confirmed") && (
        <button
          onClick={() => onUpdate(booking.id, "cancelled")}
          disabled={isUpdating}
          className="px-3 py-1 text-xs rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
