import React from "react";
import { Star } from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: "Marcus Thorne",
    role: "CTO at TechFlow",
    quote:
      "AuraFlow transformed how we handle large-scale deployments. The visibility it provides into our internal processes is simply unmatched by any other tool on the market.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRsS4DE7tfbIfomDl8AmSlzo6hT3e4BREV6TAv0za0hiwqCXuOjymCVcTjbzmrzV3LeR1ogjMOWD2Z7_gnPvcbny6ARlpjPPO8rTOueKytBhPtQorqfD9_CmKUD7kDb-DTlxCUMc7NrFNBl3z9utIJhevtK9RqT91q0kRnpjG6vjx8OLm0q6AXPRllY6lTR7_z2bC36XMYtnmf1_ksWNc6AD5JVtwaKHg746rOg0UTtisMrQY3X4ke",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Head of Product, Creative Lab",
    quote:
      "The user interface is a breath of fresh air. It's rare to find a platform that is both powerful and genuinely beautiful to use every day. Our team actually looks forward to logging in.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-sqpzuzlDQURXEYgEz3wu40jwkpyQ83ulv6-WZiEq_ZcNLkTvSR4ZjjTpH1M2607IrPS2oFc3D3NzVAGgjy_G2ZoF2DRBnT5JClWz5xV2L-DmZ8tdBksiGN025zdIDnunhyMf8y6iIa7IiMzMu4I0Q3oiwE7GcCqJgSLEhSxjUvMpLOtP_kKJngyKInDbxmKSIKOABQQ22yTqEeyZfbwrt0zQSpNdfnID1C5NzEnVuJ7JPYVqvMaD",
  },
  {
    id: 3,
    name: "Julian Vance",
    role: "VP of Global Operations",
    quote:
      "Integrating AuraFlow was seamless. Their enterprise support team helped us migrate our data in less than 48 hours. It's been a game-changer for our global operations.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrwR5iP1amCWnTAAh6Fdalk5vjey9wH1AL4rS-TXcumKRZ78SyyggAqS9aKifLmFuPASjjPutXpncmMxb4gygKLfJ6vd-tu89l8y618Jn3A9OrbAn8G0fLJe3Khg4cU8OIs97eFo5L_QbAjHcHWlf2Z3umhvMSctkYrDEMCYt22wOf1VFt-bA2i9fEQJVMlXnv0FLHa66vRXNb_",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8f9fa] border-t border-zinc-200/50">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header Title Block */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="font-['Inter'] text-[15px] text-zinc-500 leading-relaxed">
            See how forward-thinking engineering and product teams accelerate
            their workflows using AuraFlow.
          </p>
        </div>

        {/* Testimonials Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-8 sm:p-10 rounded-[28px] border border-zinc-200/60 hover:border-transparent hover:shadow-[0_24px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative"
            >
              {/* Star Rating Strip */}
              <div className="flex gap-1 text-amber-500 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-amber-400"
                  />
                ))}
              </div>

              {/* Review Quote Body */}
              <p className="font-['Inter'] text-[15px] leading-relaxed text-zinc-600 italic mb-10 flex-grow">
                "{item.quote}"
              </p>

              {/* User Meta Row */}
              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-zinc-100">
                <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden ring-2 ring-zinc-100/50 group-hover:ring-[#4648d4]/20 transition-all duration-300 shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={`Portrait of ${item.name}`}
                    src={item.avatarUrl}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-zinc-900 group-hover:text-[#4648d4] transition-colors duration-200">
                    {item.name}
                  </div>
                  <div className="font-['Inter'] text-[12px] text-zinc-400 mt-0.5 font-medium tracking-wide">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
