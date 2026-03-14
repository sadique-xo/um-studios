"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { SALON_INFO } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    salonName: SALON_INFO.name,
    tagline: SALON_INFO.tagline,
    phonePrimary: SALON_INFO.phone,
    phoneSecondary: SALON_INFO.altPhone,
    email: "",
    address: SALON_INFO.address,
    openingTime: "10:00",
    closingTime: "21:00",
    instagramUrl: SALON_INFO.instagram,
    facebookUrl: SALON_INFO.facebook,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved (demo mode)");
  };

  const inputClass =
    "w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:ring-2 focus:ring-[#C8A35F]/50 focus:border-[#C8A35F]/50 transition-colors";
  const labelClass = "block text-sm text-[#F5F0E8]/60 mb-1.5";

  return (
    <div>
      <h1 className="text-2xl font-serif text-[#F5F0E8] mb-6">Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-6 max-w-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className={labelClass}>Salon Name</label>
            <input
              type="text"
              name="salonName"
              value={formData.salonName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone (Primary)</label>
            <input
              type="text"
              name="phonePrimary"
              value={formData.phonePrimary}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone (Secondary)</label>
            <input
              type="text"
              name="phoneSecondary"
              value={formData.phoneSecondary}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@umstudios.in"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Opening Time</label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Closing Time</label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              type="url"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              type="url"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#C8A35F] text-[#0A0A0A] text-sm font-medium hover:bg-[#B8933F] transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
