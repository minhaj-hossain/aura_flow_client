// components/explore/Pagination.tsx
"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 pb-20">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#c7c6ca]/30 text-[#46464a] hover:bg-[#f3f4f5] transition-all disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-[14px] transition-all ${
              isCurrent
                ? "bg-[#000000] text-[#ffffff]"
                : "text-[#46464a] hover:bg-[#f3f4f5]"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-10 px-4 flex items-center gap-2 rounded-xl border border-[#c7c6ca]/30 text-[#46464a] hover:bg-[#f3f4f5] font-semibold text-[14px] transition-all disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <span>Next</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </nav>
  );
}
