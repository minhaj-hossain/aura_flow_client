
"use client";

import React from "react";

export default function ProjectCard({ template }: { template: any }) {
  return (
    <div className="group bg-[#ffffff] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-[#c7c6ca]/5">
      <div className="aspect-[3/2] overflow-hidden bg-[#edeeef]">
        <img
          src={template.imageUrl}
          alt={template.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-[#4648d4]/10 text-[#4648d4] text-[12px] font-semibold rounded-full uppercase tracking-wider">
            {template.category.replace("_", " ")}
          </span>
          <span className="text-[12px] text-[#77777b] ml-auto font-medium">
            {template.price === 0 ? "Free" : `$${template.price}`}
          </span>
        </div>
        <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#000000] mb-2 line-clamp-1">
          {template.title}
        </h3>
        <p className="font-['Inter'] text-[16px] text-[#46464a] mb-6 line-clamp-2">
          {template.description}
        </p>
        <button className="mt-auto w-full h-12 bg-[#000000] text-[#ffffff] rounded-xl font-semibold text-[14px] hover:bg-[#4648d4] transition-all active:scale-95">
          View Project
        </button>
      </div>
    </div>
  );
}
