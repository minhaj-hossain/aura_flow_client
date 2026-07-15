"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Eye,
  Lightbulb,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

// Types for data collections
interface StatItem {
  value: string;
  label: string;
}

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// Structured mock data matching the branding requirements
const STATS_DATA: StatItem[] = [
  { value: "500k+", label: "Active Users" },
  { value: "150+", label: "Team Members" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "12+", label: "Global Offices" },
];

const VALUES_DATA: ValueItem[] = [
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    description:
      "We don't settle for standard 'best practices'—we actively redefine them through continuous architectural experimentation and absolute aesthetic precision.",
  },
  {
    icon: ShieldCheck,
    title: "Radical Integrity",
    description:
      "Privacy and complete operational transparency aren't mere features; they represent the structural bedrock of our code and user relationships.",
  },
  {
    icon: UserCheck,
    title: "User-Centricity",
    description:
      "Every single interaction point and pixel depth is evaluated rigorously against its functional utility and the clean emotional space it leaves behind.",
  },
];

const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "2021",
    title: "The Founding",
    description:
      "AuraFlow is conceptualized within a selective London design studio with the single target of reimagining the structural chaos of modern workflow pipelines.",
  },
  {
    year: "2022",
    title: "Series A Funding",
    description:
      "Secured $25M in institutional funding led by Zenith Capital to expand the machine-learning core of our proactive workflow automation stack.",
  },
  {
    year: "2023",
    title: "1M Milestone",
    description:
      "AuraFlow passes 1 million globally synchronized user nodes across 40 countries, proving the enterprise market demand for intentional design systems.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Provisioned regional data environments and operational offices in Tokyo and New York, scaling framework localization models for international clients.",
  },
];

const TEAM_DATA: TeamMember[] = [
  {
    name: "Adrian Thorne",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Elena Vance",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marcus Chen",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sarah Jenkins",
    role: "Chief Operations Officer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] font-['Inter'] antialiased selection:bg-[#4648d4]/10">
      {/* Dynamic Navigation Component */}
      

      <main>
        {/* Typographic Hero Block */}
        <section className="relative overflow-hidden pt-28 pb-20 px-6 sm:px-12 bg-[#f8f9fa]">
          <div className="absolute inset-0 bg-[radial-gradient(#4648d4_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] text-[12px] font-semibold uppercase tracking-widest">
              Our Vision
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Pioneering the Future of Workflow Intelligence
            </h1>
            <p className="text-[17px] sm:text-[19px] leading-relaxed text-[#46464a] max-w-2xl mx-auto font-normal">
              AuraFlow is constructing the intelligent connective tissue for
              modern enterprise frameworks—transforming multi-channel
              fragmentation into unified tactical momentum.
            </p>
          </div>
        </section>

        {/* Balanced Brand Narrative Block */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 bg-zinc-100/60 border-y border-zinc-200/40">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6">
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold text-black tracking-tight">
                Designed for Clarity, Built for Scale
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-[#46464a]">
                Founded in 2021, AuraFlow materialized from a single workspace
                baseline friction: modern collaboration tools were progressively
                scaling the exact structural static they originally set out to
                quiet. We broke away to formulate an ecosystem that explicitly
                shifts from mapping task components to evaluating the geometric
                landscape of internal intent.
              </p>
              <p className="text-[15px] sm:text-base leading-relaxed text-[#46464a]">
                Our architecture initiated within a localized boutique
                incubator, anchored to the strict principle that modern workflow
                environments should carry the exact tactile fluidity and visual
                calmness of premium architectural real estate. Today, we empower
                globally scaled product ecosystems to drop internal friction and
                unlock pristine workflow cycles.
              </p>
            </div>
            {/* Themed Visual Card Container */}
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-gradient-to-br from-zinc-900 to-indigo-950 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              {/* Dynamic Abstract Canvas Graphic / Structural Placeholder image */}
              <div className="w-full h-full flex items-center justify-center p-12">
                <div className="w-full h-full relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-lg">
                    <Sparkles className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-1/3 bg-white/20 rounded" />
                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                    <div className="h-2 w-1/2 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Glassmorphic Grid */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#f8f9fa]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/60 p-10 sm:p-12 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_40px_70px_-10px_rgba(0,0,0,0.06)] group">
              <div className="w-14 h-14 bg-[#4648d4]/10 rounded-2xl flex items-center justify-center mb-8 text-[#4648d4] group-hover:bg-[#4648d4] group-hover:text-white transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-black mb-4">
                Our Mission
              </h3>
              <p className="text-[15px] sm:text-base leading-relaxed text-[#46464a]">
                To strip away cognitive load and systems complexity across team
                interactions by actively cross-synthesizing fragmented data
                inputs into high-fidelity, autonomous workflows.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/60 p-10 sm:p-12 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_40px_70px_-10px_rgba(0,0,0,0.06)] group">
              <div className="w-14 h-14 bg-[#4648d4]/10 rounded-2xl flex items-center justify-center mb-8 text-[#4648d4] group-hover:bg-[#4648d4] group-hover:text-white transition-all duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-black mb-4">
                Our Vision
              </h3>
              <p className="text-[15px] sm:text-base leading-relaxed text-[#46464a]">
                An ecosystem where cross-functional operations cease to feel
                like a navigation through dynamic technical friction, scaling
                towards the complete automation of human operational potential.
              </p>
            </div>
          </div>
        </section>

        {/* High-Contrast Core Data Metrics */}
        <section className="py-20 bg-[#1c1b1c] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-[1280px] mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center relative z-10">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-extrabold text-[#c0c1ff] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest pt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Values Framework Section */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 bg-zinc-50 border-b border-zinc-200/60">
          <div className="max-w-[1280px] mx-auto space-y-20">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold text-black tracking-tight">
                Guided by Our Core Values
              </h2>
              <p className="text-[15px] leading-relaxed text-[#46464a]">
                The operational core systems tracking how we build engineering
                frameworks, communicate across nodes, and approach workflow
                problems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES_DATA.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 sm:p-10 rounded-3xl border border-zinc-200/50 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:border-[#4648d4] transition-colors duration-300 group"
                  >
                    <IconComponent className="text-[#4648d4] mb-6 w-8 h-8 group-hover:scale-110 transition-transform duration-300 ease-out" />
                    <h4 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-black mb-3">
                      {val.title}
                    </h4>
                    <p className="text-[14.5px] leading-relaxed text-[#46464a]">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Chronological Evolutionary Timeline */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold text-black text-center mb-20 tracking-tight">
              Our Evolution
            </h2>

            <div className="relative max-w-4xl mx-auto">
              {/* Central Tracking Vector Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#4648d4] via-indigo-200 to-zinc-200 -translate-x-1/2" />

              <div className="space-y-16">
                {TIMELINE_DATA.map((event, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`relative flex flex-col md:flex-row items-start ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Node spacer element layout */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 text-left md:text-right separator-align">
                        <div
                          className={`space-y-2 ${isEven ? "md:text-left" : "md:text-right"}`}
                        >
                          <span className="inline-block px-3 py-1 rounded-lg bg-zinc-100 text-zinc-900 font-semibold text-[13px] tracking-wide">
                            {event.year}
                          </span>
                          <h4 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-black">
                            {event.title}
                          </h4>
                          <p className="text-[14px] leading-relaxed text-[#46464a] max-w-md ml-auto mr-0 md:inline-block">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Explicit Timeline Point Element */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#4648d4] -translate-x-1/2 top-1.5 shadow-sm z-10" />

                      {/* Technical visual balance layout child */}
                      <div className="hidden md:block w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Profile Grid Section */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 bg-zinc-100/50 border-t border-zinc-200/60">
          <div className="max-w-[1280px] mx-auto space-y-20">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold text-black tracking-tight">
                The Minds Behind the Flow
              </h2>
              <p className="text-[15px] leading-relaxed text-[#46464a]">
                A disciplined engineering collective of systems designers,
                computational leads, and spatial optimization strategists.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_DATA.map((member, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[4/5] rounded-[24px] overflow-hidden mb-4 bg-zinc-200 relative shadow-sm">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      width={400}
                      height={500}
                    />
                  </div>
                  <h5 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-black mb-0.5">
                    {member.name}
                  </h5>
                  <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ambient CTA Section Block */}
        <section className="py-28 px-6 sm:px-12 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto bg-white border border-zinc-200/70 p-12 sm:p-16 rounded-[40px] text-center relative z-10 shadow-[0_40px_80px_rgba(0,0,0,0.03)]">
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
              Ready to Experience the Flow?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#46464a] mb-8 max-w-xl mx-auto leading-relaxed">
              Join elite globally distributed engineering organizations that
              have systematically swapped technical noise for integrated
              workflow transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <button className="w-full sm:w-auto inline-flex items-center justify-center h-13 px-8 bg-black text-white rounded-xl font-semibold text-[14px] hover:bg-zinc-900 transition-all duration-200 active:scale-98 group cursor-pointer shadow-sm">
                <span>Join the Flow</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="w-full sm:w-auto h-13 px-8 bg-white border border-zinc-200 text-black rounded-xl font-semibold text-[14px] hover:bg-zinc-50 transition-all duration-200 active:scale-98 cursor-pointer">
                Explore Careers
              </button>
            </div>
          </div>
          {/* Radial structural glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4648d4]/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
      </main>

      {/* Symmetrical Foot Structure */}
      {/* <footer className="bg-zinc-50 border-t border-zinc-200/60 w-full py-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <div className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-black">
              AuraFlow
            </div>
            <p className="text-[13.5px] text-[#46464a]">
              The computational landscape for continuous productivity
              intelligence.
            </p>
            <p className="text-[12px] text-zinc-400 font-normal pt-2">
              © 2026 AuraFlow Technologies Inc. All systems secured.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end text-[12.5px] font-medium text-[#46464a]">
            <a href="#" className="hover:text-[#4648d4] transition-colors">
              Privacy Framework
            </a>
            <a href="#" className="hover:text-[#4648d4] transition-colors">
              Terms of Operations
            </a>
            <a href="#" className="hover:text-[#4648d4] transition-colors">
              Cookie Configurations
            </a>
            <a href="#" className="hover:text-[#4648d4] transition-colors">
              Contact Node
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
