import React from "react";

interface StatItem {
  id: number;
  value: string;
  label: string;
  highlightColor: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 1,
    value: "99.99%",
    label: "Platform Uptime Guaranteed",
    highlightColor: "text-emerald-400",
  },
  {
    id: 2,
    value: "450k+",
    label: "Active Global Users",
    highlightColor: "text-indigo-400",
  },
  {
    id: 3,
    value: "12ms",
    label: "Average API Response",
    highlightColor: "text-cyan-400",
  },
  {
    id: 4,
    value: "24/7",
    label: "Enterprise Support",
    highlightColor: "text-zinc-100",
  },
];

const CHART_BARS = [
  { height: "h-[40%]", delay: "delay-100", primary: false },
  { height: "h-[60%]", delay: "delay-200", primary: false },
  { height: "h-[50%]", delay: "delay-300", primary: false },
  { height: "h-[80%]", delay: "delay-700", primary: false },
  { height: "h-[70%]", delay: "delay-500", primary: false },
  { height: "h-[95%]", delay: "delay-1000", primary: true },
];

export default function Statistics() {
  return (
    <section className="py-20 sm:py-28 bg-[#09090b] text-white overflow-hidden relative border-y border-zinc-800/50">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Text Copy & Statistics Grid */}
          <div className="space-y-12">
            <div className="space-y-4 max-w-xl">
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Unrivaled performance at scale.
              </h2>
              <p className="font-['Inter'] text-[15px] sm:text-base text-zinc-400 leading-relaxed">
                Engineered to handle complex enterprise workflows with absolute
                reliability, global compliance, and lightning-fast speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-12">
              {STATS_DATA.map((stat) => (
                <div key={stat.id} className="space-y-2 group">
                  <div
                    className={`font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-extrabold tracking-tighter transition-transform duration-300 group-hover:translate-x-1 ${stat.highlightColor}`}
                  >
                    {stat.value}
                  </div>
                  <p className="font-['Inter'] text-[14px] text-zinc-400 font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Dashboard Chart Mockup */}
          <div className="relative bg-zinc-900/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md border border-zinc-800/60 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            {/* Chart Header UI Decorator */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Network Throughput
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                Live Optimization
              </span>
            </div>

            {/* Chart Plot Area */}
            <div className="h-[280px] w-full flex items-end gap-2.5 sm:gap-4 relative pt-4">
              {/* Fake Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full border-t border-dashed border-zinc-600" />
                <div className="w-full border-t border-dashed border-zinc-600" />
                <div className="w-full border-t border-dashed border-zinc-600" />
                <div className="w-full border-t border-dashed border-zinc-600" />
              </div>

              {/* Dynamic Interactive Bars */}
              {CHART_BARS.map((bar, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t-xl transition-all duration-500 ease-out cursor-pointer group/bar ${bar.height} ${
                    bar.primary
                      ? "bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-[0_0_25px_rgba(79,70,229,0.3)] animate-pulse"
                      : "bg-zinc-700/60 hover:bg-zinc-600"
                  }`}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-zinc-800 text-white font-mono text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none transition-all duration-200 border border-zinc-700">
                    {index * 15 + 40}k/s
                  </div>
                </div>
              ))}
            </div>

            {/* X-Axis Horizontal Months Strip */}
            <div className="mt-6 flex justify-between text-zinc-500 font-mono text-[11px] font-medium px-1">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
