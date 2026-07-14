"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 selection:bg-accent/20 selection:text-primary">
      <div className="w-full max-w-md bg-surface-lowest rounded-xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(10,10,11,0.05)] border border-surface-low/80 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_40px_80px_rgba(10,10,11,0.08)]">
        <div className="w-14 h-14 rounded-full bg-surface-low border border-surface-container flex items-center justify-center text-accent mb-6 shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-primary mb-3">
          Aura Flow
        </h1>

        <p className="font-sans text-body-md text-stone-500 leading-relaxed mb-6 max-w-xs">
          Your mindful coherence space. Ready to begin the next chapter.
        </p>

        <div className="w-full h-[1px] bg-surface-low my-4" />

        <div className="text-[11px] text-stone-400 font-sans tracking-wide uppercase">
          Zenith Baseline Active
        </div>
      </div>
    </main>
  );
}
