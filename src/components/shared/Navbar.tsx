"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#c7c6ca]/20 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-12">
          <Link
            href="#"
            className="font-display text-[24px] font-bold tracking-tighter text-primary transition-all duration-300 hover:opacity-85"
          >
            AuraFlow
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link
              href="#"
              className="font-sans text-[14px] font-semibold tracking-wider text-[#4648d4] border-b-2 border-[#4648d4] pb-1 transition-all duration-300"
            >
              Product
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] pb-1 border-b-2 border-transparent hover:border-[#0a0a0b]/10 transition-all duration-300"
            >
              Features
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] pb-1 border-b-2 border-transparent hover:border-[#0a0a0b]/10 transition-all duration-300"
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="px-6 py-2.5 font-sans text-[14px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] transition-all duration-300 cursor-pointer">
            Login
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-[#0a0a0b] text-white rounded-xl font-sans text-[14px] font-semibold tracking-wider hover:bg-[#0a0a0b]/90 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm text-center"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#46464a] hover:text-[#0a0a0b] transition-all duration-300 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#c7c6ca]/20 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-5">
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="font-sans text-[15px] font-semibold tracking-wider text-[#4648d4]"
          >
            Product
          </Link>
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="font-sans text-[15px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] transition-all duration-300"
          >
            Features
          </Link>
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="font-sans text-[15px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] transition-all duration-300"
          >
            Pricing
          </Link>

          <div className="h-[1px] bg-[#c7c6ca]/20 my-2" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 font-sans text-[15px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] text-center border border-transparent hover:bg-stone-50 rounded-xl transition-all duration-300 cursor-pointer"
            >
              Login
            </Link>
            {/* <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#0a0a0b] text-white font-sans text-[15px] font-semibold tracking-wider text-center rounded-xl hover:bg-[#0a0a0b]/90 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
            >
              Get Started
            </button> */}
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#0a0a0b] text-white font-sans text-[15px] font-semibold tracking-wider text-center rounded-xl hover:bg-[#0a0a0b]/90 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
