"use client";

import React, { FormEvent } from "react";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    // Action framework placeholder
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Premium Core Banner Wrapper */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950 p-10 sm:p-16 md:p-20 rounded-[40px] text-center relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
          {/* Accent ambient decorative blur element */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-indigo-400 block">
              Monthly Intelligence
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Stay ahead of the flow.
            </h2>
            <p className="font-['Inter'] text-[15px] sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed pb-6">
              Get high-value analysis on engineering pipeline efficiency and
              product optimizations delivered right to your box.
            </p>

            {/* Inline subscription form stack */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3.5 max-w-md mx-auto relative"
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="w-full h-13 pl-11 pr-4 rounded-xl border border-zinc-800 bg-zinc-900/60 text-white placeholder-zinc-500 text-[14px] font-['Inter'] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="h-13 px-6 bg-white text-zinc-950 font-['Inter'] font-semibold text-[14px] rounded-xl hover:bg-zinc-100 transition-all duration-200 active:scale-98 whitespace-nowrap shadow-md cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>

            <p className="font-['Inter'] text-[12px] text-zinc-500 mt-6 block">
              Zero noise. Unsubscribe at any time with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
