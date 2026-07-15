import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface FeatureItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    badge: "Precision Tools",
    title: "Automate the tedious, focus on the creative.",
    description:
      "Our intelligent engine learns your team's patterns and suggests contextual automations that save up to 15 hours per person every single week. Zero code required.",
    bullets: ["Smart Workflow Builder", "AI-Driven Pattern Recognition"],
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAp8yR9wQOcXpsGadvB1tc6qRW2AmSHwD90V6bpJSH8692SzP_0-XAlIXw6qc-IoqFfYrDVdZ8ZQi7tG84K1WeX0eMP7gE-WHYSrcG2xO2gykp1Byr2bA6Bw_iFds7vpuAqc2rns8H8dB-THDSiwL-VM8ydZbjJ0iOvjDI0q7Fv2zZOK_n4gf9igIMLQC78g8RhqeIr9-I3cuzaTPd4Riu8e_5l22l1X0FWQHXu6UH4421K8tYpf0_y",
    imageAlt:
      "A macro shot of a sleek metallic surface reflecting soft cyan and indigo light, representing the technological precision of the workflow engine. The image has a very shallow depth of field, highlighting sharp edges and premium textures in a minimalist, light-themed composition. The atmosphere is sophisticated and quiet, mirroring the quiet luxury brand pillar.",
  },
  {
    id: 2,
    badge: "Global Collaboration",
    title: "Synchronized team effort, globally distributed.",
    description:
      "Work together perfectly in real time across any time zone. AuraFlow ensures everyone stays entirely aligned with shared multiplayer live cursors, detailed version history, and contextual in-line commentary.",
    bullets: ["Multi-player Editing", "Time-travel Versioning"],
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALoVycuWzMPyaspeNKgCQomleY9DKuJCuXcnGxvQcyl1Cw1JBFJfviPS8LhrfTuNxeqU4s5jsXSy1rHFlew-Mh2CVh6u_N1TcixvR6n4wxxVaikqdt-E3bukchLHZSgGzPdUwL2Y5fxoDDNUDoEtRHCCgPQCThkqXncxcZ7sqNVxO9aBqmBlhd3sUgMxZ_53TknQMacifu-YnM-bkWfOWDLm62KZsu-zxMfj2LkyW9guhJOXVQmI-9",
    imageAlt:
      "An abstract visualization of global connectivity featuring glowing points of light interconnected by thin, crystalline lines over a soft white background. The image uses a palette of muted blues and luminous whites to evoke a sense of high-end technology and global reach. The lighting is ethereal and bright, fitting a premium, spacious UI aesthetic.",
    isReversed: true,
  },
  {
    id: 3,
    badge: "Insightful Data",
    title: "Decisions backed by authoritative data.",
    description:
      "Move completely beyond simple gut feelings. AuraFlow systematically processes your raw operational metrics into clean, highly actionable intelligence built on predictive forecasting frameworks.",
    bullets: ["Predictive Analytics", "Custom Reporting Engine"],
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpykFkouotrlPynsJMuUoM-M3TT0SCnqCPA8NlyMBLUA8mEUH1TJEmK2LW7020zvwAl432wu_rrGLpuzAp2xuhvmaJPQeThdqdUraXFV9EunwY8eTXbq5fTE_XnThsUukCXRQk0t1q21SjkaQH85mvxo1ZJXkdDx3zxJzbOgE-zDSrQaXe2JiJksqXPWLI-cXqEDSNjXaYSrLwmKpVrmojVcBrVuFNljY9IKTt1j8cYK485UKuRIX-",
    imageAlt:
      "A minimalist architectural detail of a modern white building featuring clean lines and sharp shadows under a bright, high-key sun. The image represents structure and clarity, using a monochrome palette with subtle gray gradients. The composition is spacious and balanced, emphasizing the brand's commitment to precision and authority.",
  },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-50/60 overflow-hidden border-t border-zinc-200/50">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 space-y-24 sm:space-y-36">
        {FEATURES_DATA.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 group ${
              feature.isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Context Content Column */}
            <div className="flex-1 space-y-6 w-full">
              {/* Specialized Tag Capsule */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-indigo-600 bg-white border border-zinc-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] font-['Inter']">
                {feature.badge}
              </div>

              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
                {feature.title}
              </h2>

              <p className="font-['Inter'] text-[15px] sm:text-base text-zinc-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Checkmark Bullet Layout */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200/60">
                {feature.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                      <Check className="w-3 h-3 text-indigo-600 stroke-[3]" />
                    </div>
                    <span className="font-['Inter'] text-[14.5px] font-medium text-zinc-700 group-hover/item:text-zinc-900 transition-colors duration-200">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Card Column Frame */}
            <div className="flex-1 w-full">
              <div className="rounded-[32px] bg-white p-3 sm:p-4 border border-zinc-200/70 shadow-[0_15px_35px_rgba(0,0,0,0.03)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] group-hover:-translate-y-1 transition-all duration-500 ease-out">
                <Image
                  className="w-full h-auto rounded-[20px] sm:rounded-[24px] object-cover"
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  width={600}
                  height={400}
                  priority={feature.id === 1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
