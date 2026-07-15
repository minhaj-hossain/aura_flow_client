import React from "react";
import {
  Megaphone,
  Terminal,
  Palette,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  cardBg: string;
  glowColor: string;
  accentColor: string;
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 1,
    title: "Marketing",
    description:
      "Campaign tracking, attribution modeling, and automated ROI analysis.",
    icon: Megaphone,
    cardBg: "from-zinc-900 via-zinc-900 to-indigo-950/50",
    glowColor: "group-hover:bg-indigo-500/10",
    accentColor: "text-indigo-400",
  },
  {
    id: 2,
    title: "Engineering",
    description:
      "Real-time CI/CD pipeline telemetry and system health monitoring.",
    icon: Terminal,
    cardBg: "from-zinc-900 via-zinc-900 to-emerald-950/40",
    glowColor: "group-hover:bg-emerald-500/10",
    accentColor: "text-emerald-400",
  },
  {
    id: 3,
    title: "Design",
    description:
      "Creative asset pipelines, version control, and design system syncing.",
    icon: Palette,
    cardBg: "from-zinc-900 via-zinc-900 to-fuchsia-950/40",
    glowColor: "group-hover:bg-fuchsia-500/10",
    accentColor: "text-fuchsia-400",
  },
  {
    id: 4,
    title: "Finance",
    description:
      "Granular predictive budgeting, forecasting, and real-time spend control.",
    icon: Wallet,
    cardBg: "from-zinc-900 via-zinc-900 to-amber-950/30",
    glowColor: "group-hover:bg-amber-500/10",
    accentColor: "text-amber-400",
  },
];

export default function CategoriesGrid() {
  return (
    <section className="py-20 sm:py-28 bg-[#09090b] text-white border-t border-zinc-900">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Centered Header Block */}
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <span className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-indigo-400 block">
            Functional Modules
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Tailored for every function
          </h2>
          <p className="font-['Inter'] text-[15px] sm:text-base text-zinc-400 leading-relaxed">
            A highly modular framework designed to adapt natively to your
            specific organizational and operational ecosystem needs.
          </p>
        </div>

        {/* Categories Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className={`group relative overflow-hidden rounded-[28px] h-72 bg-gradient-to-br ${category.cardBg} p-8 flex flex-col justify-end border border-zinc-800/60 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-zinc-700/70 hover:-translate-y-1.5 transition-all duration-300`}
              >
                {/* Dynamic Ambient Blur Background Layer */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${category.glowColor}`}
                />

                {/* Top-Right Background Watermark Icon */}
                <div className="absolute top-8 right-8 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 pointer-events-none">
                  <IconComponent
                    className={`w-16 h-16 opacity-[0.04] group-hover:opacity-10 transition-opacity duration-300 shrink-0 ${category.accentColor}`}
                  />
                </div>

                {/* Floating Contextual Link Arrow Indicator */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-zinc-200" />
                </div>

                {/* Content Elements Stack */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <IconComponent
                      className={`w-4 h-4 hidden sm:block ${category.accentColor}`}
                    />
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[19px] tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-200">
                      {category.title}
                    </h4>
                  </div>
                  <p className="font-['Inter'] text-[13.5px] leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
