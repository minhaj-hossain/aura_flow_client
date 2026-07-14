import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/20 selection:text-primary">
      {/* Shared Responsive Navbar in Public Layout */}
      <Navbar />

      <div className="flex-grow">{children}</div>

      {/* Shared Footer in Public Layout */}
      <Footer />
    </div>
  );
}
