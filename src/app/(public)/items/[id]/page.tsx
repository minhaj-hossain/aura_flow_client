"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface DetailsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  price: number;
  imageUrl: string;
  date: string;
  gallery: string[];
}

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState<DetailsItem | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchAssetDetails() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items/${id}`,
        );
        if (!res.ok) throw new Error("Data retrieval broken");
        const data = await res.json();
        setItem(data);
        setActiveImage(data.imageUrl);
      } catch (err) {
        console.error("Error reading workflow details layout:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAssetDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4648d4]" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] p-6">
        <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#000000]">
          Asset Not Found
        </h2>
        <p className="text-[#46464a] mt-2">
          The template resource you are searching for does not exist.
        </p>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen pt-28 pb-20 bg-[#f8f9fa]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Core Overview Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Gallery Segment Column Block */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full aspect-[16/10] bg-[#ffffff] rounded-[32px] overflow-hidden border border-[#e1e3e4]/60 shadow-sm relative">
              <Image
                src={activeImage}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                priority
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Interactive Thumbnail Selectors Row */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {item.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-28 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 transition-all border-2 bg-white relative ${
                    activeImage === imgUrl
                      ? "border-[#4648d4] scale-95 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail preview ${index}`}
                    fill
                    sizes="112px"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Core Descriptive Text & Fast Pricing Action Column */}
          <div className="lg:col-span-5 bg-[#ffffff] border border-[#e1e3e4]/60 p-8 rounded-[32px] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 bg-[#4648d4]/10 text-[#4648d4] text-[12px] font-bold tracking-wider rounded-full uppercase">
                  {item.category.replace("_", " ")}
                </span>
                <div className="flex items-center text-[#e1b000] gap-0.5">
                  <span className="text-[14px] text-[#000000] font-bold font-['Inter']">
                    4.9
                  </span>
                </div>
              </div>

              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold tracking-[-0.02em] text-[#000000] mb-3 leading-tight">
                {item.title}
              </h1>

              <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#46464a] mb-8">
                {item.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#f3f4f5]">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-['Inter'] text-sm text-[#77777b]">
                  Pricing Tier:
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#000000]">
                  {item.price === 0 ? "Free Access" : `$${item.price}`}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/items/${item.id}/download`}
                  className="w-full h-14 bg-[#000000] text-[#ffffff] font-['Inter'] font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#4648d4] transition-all duration-200 active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    download
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#e1e3e4]/60">
          <div className="bg-[#ffffff] border border-[#e1e3e4]/40 p-8 rounded-[32px] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4648d4]/10 rounded-xl flex items-center justify-center text-[#4648d4]"></div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[20px] font-semibold text-[#000000]">
                Technical Specifications
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 font-['Inter'] text-[14px]">
              <div className="flex justify-between py-2 border-b border-[#f3f4f5]">
                <span className="text-[#77777b]">Production Readiness</span>
                <span className="font-bold capitalize text-[#000000]">
                  {item.status} Priority
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#f3f4f5]">
                <span className="text-[#77777b]">Catalog Tagging</span>
                <span className="font-bold text-[#000000]">
                  {item.category}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#f3f4f5]">
                <span className="text-[#77777b]">Publishing Timestamp</span>
                <span className="font-bold text-[#000000]">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    dateStyle: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#77777b]">Distribution State</span>
                <span className="font-bold text-[#2d9d78] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2d9d78]" /> Live
                  Download Available
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#e1e3e4]/40 p-8 rounded-[32px] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4648d4]/10 rounded-xl flex items-center justify-center text-[#4648d4]">
                {/* <span className="material-symbols-outlined text-[20px]">
                  description
                </span> */}
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[20px] font-semibold text-[#000000]">
                Documentation Deep Dive
              </h3>
            </div>

            <p className="font-['Inter'] text-[14px] leading-[1.6] text-[#46464a]">
              This {item.title} module undergoes standard deployment screening
              pipelines to ensure structural validity before database entry.
              Fully compatible with enterprise design workflows, providing
              scalable integration mechanics right out of the box.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-[13px] text-[#46464a] font-['Inter']">
                <span>Optimized system layouts & clean code architecture</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#46464a] font-['Inter']">
                <span className="material-symbols-outlined text-[#2d9d78] text-[18px]">
                  check_circle
                </span>
                <span>
                  Includes comprehensive setup parameters & default profiles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
