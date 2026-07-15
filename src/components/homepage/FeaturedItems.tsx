import React from "react";
import { BarChart3, Boxes, ShieldCheck, Zap } from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    title: "Real-time Analytics",
    description:
      "Instant insights with millisecond latency across your entire distributed data ecosystem.",
    icon: BarChart3,
    iconBg: "bg-indigo-50 group-hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: 2,
    title: "Seamless Sync",
    description:
      "Connect your favorite tools instantly with our robust library of 200+ native integrations.",
    icon: Boxes,
    iconBg: "bg-sky-50 group-hover:bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    id: 3,
    title: "Enterprise Security",
    description:
      "SOC2 Type II compliant end-to-end encryption for absolute peace of mind at every layer.",
    icon: ShieldCheck,
    iconBg: "bg-emerald-50 group-hover:bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    title: "Fast Execution",
    description:
      "Highly optimized infrastructure designed to handle peak high-volume loads without breaking a sweat.",
    icon: Zap,
    iconBg: "bg-amber-50 group-hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
];

export default function FeaturedItems() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-50 border-t border-zinc-200/60">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Optional Clean Header Block */}
        <div className="mb-14 max-w-xl">
          <span className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-indigo-600 block mb-3">
            Core Capabilities
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Everything you need to ship faster.
          </h2>
        </div>

        {/* Scalable Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES_DATA.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white p-6 sm:p-8 rounded-[24px] border border-zinc-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-zinc-300/50 transition-all duration-300 flex flex-col h-full"
              >
                {/* Dynamically Styled Icon Capsule */}
                <div
                  className={`w-12 h-12 ${feature.iconBg} ${feature.iconColor} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shrink-0`}
                >
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Content Details */}
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-zinc-900 mb-2.5 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                  {feature.title}
                </h3>

                <p className="font-['Inter'] text-[14px] leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
