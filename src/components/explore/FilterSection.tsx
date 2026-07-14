
"use client";

import React from "react";

interface FilterSectionProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  status: string;
  setStatus: (status: string) => void;
}

const CATEGORIES = [
  { id: "visual_design", label: "Visual Design" },
  { id: "data_analysis", label: "Data Analysis" },
  { id: "ai_modeling", label: "AI Modeling" },
];

const STATUS_OPTIONS = [
  { id: "trending", label: "Trending", icon: "bolt" },
  { id: "new_release", label: "New Release", icon: "new_releases" },
  { id: "best_value", label: "Best Value", icon: "star" },
];

export default function FilterSection({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  status,
  setStatus,
}: FilterSectionProps) {
  const handleCategoryToggle = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <aside className="w-64 hidden lg:flex flex-col p-6 gap-y-8 border-r border-[#e1e3e4]/40 h-[calc(100vh-80px)] sticky top-20">
      {/* Categories Multi-select */}
      <div>
        <h3 className="font-['Inter'] text-[14px] font-semibold tracking-widest text-[#000000] mb-4 uppercase">
          Categories
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.length === 0}
              onChange={() => setSelectedCategories([])}
              className="w-5 h-5 rounded border-[#c7c6ca] text-[#4648d4] focus:ring-[#4648d4]/20"
            />
            <span className="text-[#46464a] group-hover:text-[#000000] transition-colors">
              All Templates
            </span>
          </label>

          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                className="w-5 h-5 rounded border-[#c7c6ca] text-[#4648d4] focus:ring-[#4648d4]/20"
              />
              <span className="text-[#46464a] group-hover:text-[#000000] transition-colors">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <h3 className="font-['Inter'] text-[14px] font-semibold tracking-widest text-[#000000] mb-4 uppercase">
          Price Range
        </h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-[#4648d4]"
          />
          <div className="flex justify-between mt-2 font-['Inter'] text-[12px] text-[#77777b]">
            <span>$0</span>
            <span className="text-[#4648d4] font-medium">${priceRange}</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <h3 className="font-['Inter'] text-[14px] font-semibold tracking-widest text-[#000000] mb-4 uppercase">
          Status
        </h3>
        <div className="flex flex-col gap-2">
          {STATUS_OPTIONS.map((opt) => {
            const isActive = status === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setStatus(opt.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all font-semibold text-[14px] ${
                  isActive
                    ? "bg-[#6063ee]/10 text-[#4648d4]"
                    : "text-[#46464a] hover:bg-[#edeeef]"
                }`}
              >
                <span>{opt.label}</span>
                <span className="material-symbols-outlined text-sm">
                  {opt.icon}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
