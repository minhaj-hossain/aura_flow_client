
"use client";

import React from "react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 px-6 pr-10 appearance-none bg-transparent border border-[#c7c6ca]/30 rounded-full font-['Inter'] text-[14px] font-semibold hover:bg-[#f3f4f5] transition-all focus:ring-2 focus:ring-[#4648d4]/20 outline-none cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
      {/* <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#46464a]">
        expand_more
      </span> */}
    </div>
  );
}
