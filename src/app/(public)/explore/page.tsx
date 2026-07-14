// app/explore/page.tsx
import React from "react";
import ExploreContainer from "@/components/explore/ExploreContainer";
import { Metadata } from "next";

// Server-side Metadata for clean SEO performance
export const metadata: Metadata = {
  title: "Explore Library | AuraFlow AI",
  description: "Discover premium AI assets and workflow templates.",
};

export default function ExplorePage() {
  return (
    <div className=" mt-20 w-full min-h-screen bg-[#f8f9fa]">
      <div className="max-w-[1280px] mx-auto px-16">
        {/* 
          This renders the modular system container. 
          It internally handles the state layout sync for the filters, 
          search operations, sorting dropdowns, card grids, and pagination bars.
        */}
        <ExploreContainer />
      </div>
    </div>
  );
}
