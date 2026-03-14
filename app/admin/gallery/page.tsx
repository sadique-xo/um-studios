"use client";

import React from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

const PLACEHOLDER_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  id: `placeholder-${i + 1}`,
  label: `Image ${i + 1}`,
}));

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif text-[#F5F0E8]">Gallery</h1>
        <button
          onClick={() => toast.info("Upload coming soon")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C8A35F] text-[#0A0A0A] text-sm font-medium hover:bg-[#B8933F] transition-colors"
        >
          <ImagePlus className="w-4 h-4" />
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PLACEHOLDER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="aspect-square bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <ImagePlus className="w-5 h-5 text-[#F5F0E8]/20" />
            </div>
            <span className="text-xs text-[#F5F0E8]/30">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
