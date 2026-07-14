// components/explore/ExploreContainer.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import FilterSection from "./FilterSection";
import CardGrid from "./CardGrid";
import Pagination from "./Pagination";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  price: number;
  imageUrl: string;
  date: string;
}

export default function ExploreContainer() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1000);

  // 🔥 FIX 1: Change initial status from 'trending' to '' (empty string)
  // This ensures ALL database items show up initially instead of filtering them out immediately.
  const [status, setStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        categories: selectedCategories.join(","),
        maxPrice: priceRange.toString(),
        status,
        sortBy,
        page: page.toString(),
        limit: "8",
      });

      // 🛠️ CHANGE THIS PORT (e.g., 5000 or 8080) to match your Express server's port
      const EXPRESS_BACKEND_URL = `http://localhost:8000/api/items?${queryParams.toString()}`;

      console.log(
        "📡 Frontend is attempting to fetch from:",
        EXPRESS_BACKEND_URL,
      );

      const res = await fetch(EXPRESS_BACKEND_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Server responded with HTTP status ${res.status}`);
      }

      const data = await res.json();

      // 🔍 This log prints the actual data structure inside your browser console (F12)
      console.log("📦 Data successfully received by frontend:", data);

      setTemplates(data.templates || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("❌ Frontend Fetch System Failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedCategories, priceRange, status, sortBy, page]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleFilterChange = (updater: () => void) => {
    updater();
    setPage(1);
  };

  return (
    <div className="flex w-full gap-8">
      <FilterSection
        selectedCategories={selectedCategories}
        setSelectedCategories={(cats) =>
          handleFilterChange(() => setSelectedCategories(cats))
        }
        priceRange={priceRange}
        setPriceRange={(price) =>
          handleFilterChange(() => setPriceRange(price))
        }
        status={status}
        setStatus={(stat) => handleFilterChange(() => setStatus(stat))}
      />

      <main className="flex-1 py-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[30px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#000000]">
              Explore Library
            </h1>
            <p className="font-['Inter'] text-[16px] text-[#46464a] mt-1">
              Discover premium AI assets and workflow templates.
            </p>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto w-full sm:w-auto justify-end">
            <SearchBar
              value={search}
              onChange={(val) => handleFilterChange(() => setSearch(val))}
            />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </header>

        {isLoading ? (
          <div className="w-full h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4648d4]" />
          </div>
        ) : (
          <>
            <CardGrid templates={templates} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
