"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteConfirmModal from "@/components/manage/DeleteConfirmModal";
import toast from "react-hot-toast";


interface AssetItem {
  id: string;
  title: string;
  category: string;
  date: string;
  status: string;
  imageUrl: string;
}

export default function ManageAssetsPage() {
  const [items, setItems] = useState<AssetItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isLoading, setIsLoading] = useState(true);

  // Modal tracking states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);


  // Fetch only user created assets
  useEffect(() => {
    async function fetchUserAssets() {
      try {
        const res = await fetch("http://localhost:8000/api/items/manage");
        if (!res.ok) throw new Error("Failed to fetch assets");

        const data = await res.json();

        // Defensively extract the array whether the backend sends an object or a raw array
        if (data && Array.isArray(data.items)) {
          setItems(data.items);
        } else if (data && Array.isArray(data.templates)) {
          setItems(data.templates);
        } else if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]); // Fallback to empty array if data structure is unexpected
        }
      } catch (err) {
        console.error("Error reading backend user assets:", err);
        setItems([]); // Fallback on error to prevent crashing
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserAssets();
  }, []);

  const openDeleteModal = (id: string, title: string) => {
    setItemToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
    toast.success("Successfully deleted!");
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4648d4]" />
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen pt-28 pb-20 bg-[#f8f9fa] text-[#191c1d]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Page Header */}
        <section className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl font-bold tracking-tight text-[#000000]">
              Manage Assets
            </h1>
            <p className="text-[#46464a] font-['Inter'] text-[16px] mt-2">
              Oversee and organize your portfolio&apos;s digital assets in
              real-time.
            </p>
          </div>
          <Link
            href="/items/add"
            className="bg-[#000000] text-[#ffffff] px-6 h-12 rounded-xl font-semibold flex items-center gap-2 hover:bg-neutral-900 transition-all active:scale-95 shadow-lg shadow-black/5 whitespace-nowrap self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Asset
          </Link>
        </section>

        {/* Filters & Workspace Controls */}
        <section className="mb-8">
          <div className="bg-[#ffffff] p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm border border-[#e7e8e9]">
            {/* Context Search Module */}
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#46464a]/60">
                {/* search */}
              </span>
              <input
                type="text"
                placeholder="Search by asset name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#c7c6ca] bg-[#f3f4f5] focus:ring-2 focus:ring-[#4648d4]/20 focus:border-[#4648d4] transition-all outline-none font-['Inter'] text-sm"
              />
            </div>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center bg-[#f3f4f5] p-1 rounded-xl border border-[#e7e8e9]">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === "table"
                    ? "bg-[#ffffff] text-[#4648d4] shadow-sm"
                    : "text-[#46464a] hover:text-[#000000]"
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  view_list
                </span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === "grid"
                    ? "bg-[#ffffff] text-[#4648d4] shadow-sm"
                    : "text-[#46464a] hover:text-[#000000]"
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  grid_view
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Items Content Frame */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#ffffff] border border-[#e7e8e9] rounded-[32px] p-16 text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-[#46464a]/40 mb-2">
              folder_open
            </span>
            <p className="text-[#46464a] font-medium">
              No matching assets found in your portfolio.
            </p>
          </div>
        ) : viewMode === "table" ? (
          /* ==================== TABLE VIEW MODE ==================== */
          <section className="bg-[#ffffff] rounded-[32px] shadow-sm border border-[#e7e8e9] overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-[#c7c6ca]/30">
                    <th className="px-8 py-6 font-semibold text-[#46464a]/60 uppercase tracking-widest text-[11px]">
                      Asset Details
                    </th>
                    <th className="px-6 py-6 font-semibold text-[#46464a]/60 uppercase tracking-widest text-[11px]">
                      Category
                    </th>
                    <th className="px-6 py-6 font-semibold text-[#46464a]/60 uppercase tracking-widest text-[11px]">
                      Date Created
                    </th>
                    <th className="px-6 py-6 font-semibold text-[#46464a]/60 uppercase tracking-widest text-[11px]">
                      Status
                    </th>
                    <th className="px-8 py-6 font-semibold text-[#46464a]/60 uppercase tracking-widest text-[11px] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c7c6ca]/10">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#f3f4f5]/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#edeeef] shadow-sm border border-[#c7c6ca]/20 shrink-0 relative">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              sizes="56px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-[16px] text-[#000000] tracking-tight">
                              {item.title}
                            </div>
                            <div className="text-[#46464a]/60 font-['Inter'] text-[13px]">
                              ID: {item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex px-3 py-1 rounded-full bg-[#4648d4]/10 text-[#4648d4] text-[12px] font-semibold uppercase tracking-wide">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[#46464a] font-['Inter'] text-[14px]">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-[#009668]">
                          <span
                            className={`w-2 h-2 rounded-full ${item.status === "active" ? "bg-[#009668] animate-pulse" : "bg-gray-400"}`}
                          />
                          <span className="font-semibold text-[13px] capitalize">
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/items/${item.id}`}
                            className="p-2 text-[#46464a] hover:bg-[#6063ee]/10 hover:text-[#4648d4] rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              visibility
                            </span>
                          </Link>
                          <button
                            onClick={() => openDeleteModal(item.id, item.title)}
                            className="p-2 text-[#46464a] hover:bg-[#ba1a1a]/10 hover:text-[#ba1a1a] rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          /* ==================== GRID VIEW MODE ==================== */
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#ffffff] border border-[#e7e8e9] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="p-5 space-y-4">
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#edeeef] relative border border-[#c7c6ca]/20">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 350px"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#4648d4] bg-[#4648d4]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#000000] mt-2 line-clamp-1 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-[#46464a]/60 font-['Inter'] mt-0.5">
                      ID: {item.id}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 bg-[#f3f4f5]/40 border-t border-[#e7e8e9] flex items-center justify-between">
                  <span className="text-[13px] text-[#46464a] font-['Inter']">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/items/${item.id}`}
                      className="p-2 text-[#46464a] hover:bg-[#6063ee]/10 hover:text-[#4648d4] rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        visibility
                      </span>
                    </Link>
                    <button
                      onClick={() => openDeleteModal(item.id, item.title)}
                      className="p-2 text-[#46464a] hover:bg-[#ba1a1a]/10 hover:text-[#ba1a1a] rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Reusable Decoupled Deletion Processing Modal Overlay Component */}
      {isDeleteModalOpen && itemToDelete && (
        <DeleteConfirmModal
          itemId={itemToDelete.id}
          itemTitle={itemToDelete.title}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </main>
  );
}
