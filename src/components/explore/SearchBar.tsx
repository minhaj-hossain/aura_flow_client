
'use client';

import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [innerValue, setInnerValue] = useState(value);

  // Debounce keystrokes to prevent visual hammering on remote operations
  useEffect(() => {
    const handler = setTimeout(() => onChange(innerValue), 350);
    return () => clearTimeout(handler);
  }, [innerValue, onChange]);

  return (
    <div className="relative max-w-xs w-full">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#77777b]">
        {/* search */}
      </span>
      <input
        type="text"
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        placeholder="Search templates..."
        className="w-full h-11 bg-[#f3f4f5] border-none rounded-full pl-12 pr-4 font-['Inter'] text-[16px] focus:ring-2 focus:ring-[#4648d4]/20 transition-all"
      />
    </div>
  );
}