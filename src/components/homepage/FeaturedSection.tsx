"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigDown, ArrowRight } from "lucide-react";

interface TemplateItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  price: number;
  imageUrl: string;
  date: string;
}

export default function FeaturedSection() {
  const [items, setItems] = useState<TemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopFour() {
      try {
        // Appends exact parameters to grab only the top 4 newest assets
        const res = await fetch(
          "http://localhost:8000/api/items?limit=4&sortBy=newest",
        );
        if (!res.ok) throw new Error("Failed execution");
        const data = await res.json();
        setItems(data.templates || []);
      } catch (error) {
        console.error("Error loading home assets:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTopFour();
  }, []);

  return (
    <section className="w-full py-16 bg-[#f8f9fa]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center">
        {/* Section Header Title */}
        <div className="w-full mb-12 text-center sm:text-left">
          <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold tracking-[-0.02em] text-[#000000]">
            Featured Highlights
          </h2>
          <p className="font-['Inter'] text-[16px] text-[#46464a] mt-2">
            Explore our highest rated system tools and premium models.
          </p>
        </div>

        {/* Dynamic Card Container Grid (Forced 4-column horizontal desktop structure) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-stretch">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))
            : items.map((item) => <FeaturedCard key={item.id} item={item} />)}
        </div>

        {/* Bottom Redirection Routing Button */}
        <Link
          href="/explore"
          className="inline-flex items-center justify-center h-14 px-8 bg-[#000000] text-[#ffffff] font-['Inter'] font-semibold text-[15px] rounded-full hover:bg-[#4648d4] shadow-sm hover:shadow-lg transition-all active:scale-95 group"
        >
          <span>Browse Full Library</span>
          <span className="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
}

/**
 * 🎴 Reusable Component matching Design Guidelines
 * Ensures layout, margins, paddings, and line drops scale uniformly.
 */
function FeaturedCard({ item }: { item: TemplateItem }) {
  // Format standard date cleanly inline
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-[#ffffff] rounded-[32px] overflow-hidden border border-[#e1e3e4]/40 hover:border-transparent hover:shadow-xl transition-all duration-300 flex flex-col h-full w-full">
      {/* 1. Equal Width aspect boundary box */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#edeeef] relative">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-[#ffffff]/90 backdrop-blur-md rounded-full font-['Inter'] font-bold text-[13px] text-[#000000]">
          {item.price === 0 ? "Free" : `$${item.price}`}
        </div>
      </div>

      {/* 2. Structured text block area containing unified paddings */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tag & Rating row elements */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 bg-[#4648d4]/10 text-[#4648d4] text-[11px] font-bold rounded-full uppercase tracking-wider">
            {item.category.replace("_", " ")}
          </span>
          <div className="flex items-center text-[#e1b000] gap-0.5">
            {/* <span className="material-symbols-outlined text-[16px] fill-current">
              star
            </span> */}
            <span className="text-[12px] text-[#46464a] font-bold font-['Inter']">
              4.9
            </span>
          </div>
        </div>

        <h3 className="font-['Plus_Jakarta_Sans'] text-[20px] font-semibold text-[#000000] mb-2 tracking-[-0.01em] line-clamp-1">
          {item.title}
        </h3>

        <p className="font-['Inter'] text-[14px] leading-[1.5] text-[#46464a] mb-5 line-clamp-2">
          {item.description}
        </p>

        {/* Meta details footer boundary wrapper */}
        <div className="pt-4 border-t border-[#f3f4f5] flex items-center justify-between font-['Inter'] text-[12px] text-[#77777b] mb-6 mt-auto">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              calendar_today
            </span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-[#2d9d78]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d9d78]" />
            {/* <span>Available</span> */}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/items/${item.id}`} className="mt-auto">
          <button className="w-full h-11 border border-[#000000] text-[#000000] rounded-xl font-['Inter'] font-semibold text-[13px] hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-200 active:scale-[0.98]">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

/**
 * 💀 Skeleton Loading Loader Component
 * Accurately replicates sizing shapes using dynamic placeholder elements.
 */
function CardSkeleton() {
  return (
    <div className="bg-[#ffffff] rounded-[32px] overflow-hidden border border-[#e1e3e4]/40 flex flex-col h-full w-full animate-pulse">
      <div className="aspect-[4/3] w-full bg-[#edeeef]" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between mb-4">
          <div className="h-5 w-24 bg-[#edeeef] rounded-full" />
          <div className="h-4 w-8 bg-[#edeeef] rounded" />
        </div>
        <div className="h-6 w-3/4 bg-[#edeeef] rounded mb-2" />
        <div className="h-4 w-full bg-[#edeeef] rounded mb-2" />
        <div className="h-4 w-5/6 bg-[#edeeef] rounded mb-6" />
        <div className="h-8 w-full bg-[#edeeef] rounded-xl mt-auto" />
      </div>
    </div>
  );
}
