"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/shared/Navbar";
import {
  PlusCircle,
  AlignLeft,
  Send,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  ImageIcon,
  AlertTriangle,
  FileText,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // State for user feedback messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Protected route check: redirect unauthenticated users to login
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafb]">
        <Loader2 className="w-8 h-8 text-[#4648d4] animate-spin" />
      </div>
    );
  }

  // Handle addition of item using uncontrolled form element technique
  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;

    // Safe extraction of inputs using namedItem APIs
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const shortDescription = (
      form.elements.namedItem("shortDescription") as HTMLInputElement
    ).value;
    const fullDescription = (
      form.elements.namedItem("fullDescription") as HTMLTextAreaElement
    ).value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const priority = (form.elements.namedItem("priority") as HTMLSelectElement)
      .value;
    const imageUrl = (form.elements.namedItem("imageUrl") as HTMLInputElement)
      .value;

    // Strict validation and user feedback
    if (!title.trim()) return setError("Title is a required field.");
    if (!shortDescription.trim())
      return setError("Short Description is a required field.");
    if (!fullDescription.trim())
      return setError("Full Description is a required field.");
    if (!price || Number(price) <= 0)
      return setError("Please specify a valid Price greater than $0.");
    if (!date) return setError("Date is a required field.");
    if (!priority) return setError("Priority is a required field.");

    setIsSubmitting(true);

    try {
      // 📡 Hit your Express backend server endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            category: "Productivity",
            description: `${shortDescription}\n\n${fullDescription}`,
            priority,
            price: Number(price),
            imageUrl: imageUrl.trim() || undefined,
            userEmail: session.user.email, // Bind the item to the currently logged in session user
            date: new Date(date).toISOString(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to register item on the server.",
        );
      }

      // Smooth simulation transition out after structural database write success
      setSuccess(true);
      form.reset();

      setTimeout(() => {
        setSuccess(false);
        toast.success("Successfully created!");
        router.push("/items/manage");
      }, 1500);
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(
        err.message ||
          "A network error occurred. Please make sure your backend server is active.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#fafafb] to-[#f3f4f6]">
        <div className="max-w-2xl mx-auto px-5">
          {/* Back Action button */}
          <div className="mb-8">
            <button
              onClick={() => router.push("/manage-items")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#46464a] hover:text-[#4648d4] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Manage Items
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-[#c7c6ca]/20 rounded-3xl p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-60 -mr-12 -mt-12" />

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-50 text-[#4648d4] rounded-2xl border border-indigo-100">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-[#191c1d]">
                  Add New Item
                </h1>
                <p className="font-sans text-sm text-[#46464a] mt-0.5">
                  Register a brand new item inside your secure profile
                </p>
              </div>
            </div>

            {/* Error banner feedback */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-sm font-sans"
              >
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">System Alert</span>
                  <p className="mt-0.5 text-rose-700">{error}</p>
                </div>
              </motion.div>
            )}

            {success ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center py-12 px-4 bg-indigo-50/50 rounded-2xl border border-indigo-100"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-[#4648d4] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-display text-xl font-bold text-[#191c1d]">
                  Item Logged Successfully!
                </h2>
                <p className="font-sans text-sm text-[#46464a] mt-2 max-w-sm">
                  Your entry has been securely registered inside MongoDB.
                  Redirecting to log...
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleAddItem} className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                  >
                    Title <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="e.g. Premium Productivity Package"
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px]"
                    />
                    <Bookmark className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label
                    htmlFor="shortDescription"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                  >
                    Short Description <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="shortDescription"
                      name="shortDescription"
                      type="text"
                      placeholder="e.g. A lightweight starter pack for modern workspaces."
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px]"
                    />
                    <FileText className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <label
                    htmlFor="fullDescription"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                  >
                    Full Description <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="fullDescription"
                      name="fullDescription"
                      rows={4}
                      placeholder="e.g. Provide the comprehensive layout, benefits, specific attributes, and terms of the item..."
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px] resize-none"
                    />
                    <AlignLeft className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                {/* Price, Date, and Priority Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                    >
                      Price ($) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="99.99"
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px]"
                      />
                      <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                    >
                      Date <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label
                      htmlFor="priority"
                      className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                    >
                      Priority Level <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="priority"
                        name="priority"
                        defaultValue="Medium"
                        className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px] cursor-pointer"
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-[#46464a] mb-2"
                  >
                    Image URL{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      type="url"
                      placeholder="e.g. https://picsum.photos/400"
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c7c6ca]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] focus:border-transparent transition-all font-sans text-[14px]"
                    />
                    <ImageIcon className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                {/* Form submit action */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#4648d4] text-white hover:bg-[#3436ad] active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl font-sans text-[14px] font-bold tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving Entry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Add Item
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
