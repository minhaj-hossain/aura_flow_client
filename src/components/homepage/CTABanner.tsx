import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden relative border-t border-zinc-900">
      {/* Centered Deep Radiance Blur Backdrop */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to revolutionize your team's workflow?
          </h2>

          <p className="font-['Inter'] text-zinc-400 text-base sm:text-[17px] max-w-xl mx-auto leading-relaxed">
            Join thousands of distributed engineering teams optimizing their
            development velocity and deployment security framework today.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto sm:max-w-none">
            <button className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 bg-indigo-600 text-white font-['Inter'] font-semibold text-[15px] rounded-xl hover:bg-indigo-500 transition-all duration-200 active:scale-[0.98] shadow-[0_4px_20px_rgba(79,70,229,0.3)] group cursor-pointer">
              <span>Start for Free</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button className="w-full sm:w-auto h-14 px-8 border border-zinc-800 bg-zinc-900/40 text-zinc-200 font-['Inter'] font-medium text-[15px] rounded-xl hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-all duration-200 active:scale-[0.98] cursor-pointer">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
