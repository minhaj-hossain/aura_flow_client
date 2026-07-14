"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/homepage/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/20 selection:text-primary">
      {/* Shared Responsive Navbar */}
      <Navbar />

      {/* Hero / Main Area with spacing under fixed Navbar */}
      <Hero />

      {/* Shared Footer Section */}
      <Footer />
    </div>
  );
}
