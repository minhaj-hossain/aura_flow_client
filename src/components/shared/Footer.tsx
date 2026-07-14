"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="shared-footer"
      className="bg-white border-t border-[#c7c6ca]/20"
    >
      {/* Top Footer Section */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-[120px] grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Description Column */}
        <div className="flex flex-col gap-6">
          <Link
            href="#"
            className="font-display text-[24px] font-bold tracking-tighter text-[#0a0a0b] transition-all duration-300 hover:opacity-85"
          >
            AuraFlow
          </Link>
          <p className="font-sans text-[14px] text-[#46464a] leading-[1.6] pr-4">
            Empowering the world&apos;s most ambitious teams through intelligent
            design and performance.
          </p>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-[14px] font-semibold tracking-wider text-[#191c1d]">
            Company
          </h4>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Careers
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Press Kit
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Support Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-[14px] font-semibold tracking-wider text-[#191c1d]">
            Support
          </h4>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Support
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Status
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Docs
            </Link>
          </div>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-[14px] font-semibold tracking-wider text-[#191c1d]">
            Legal
          </h4>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Security
            </Link>
            <Link
              href="#"
              className="font-sans text-[14px] text-[#46464a] hover:text-[#4648d4] transition-all duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-[#c7c6ca]/20 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[12px] text-[#46464a]">
            © 2024 AuraFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-sans text-[12px] text-[#46464a] hover:text-[#0a0a0b] transition-all duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="font-sans text-[12px] text-[#46464a] hover:text-[#0a0a0b] transition-all duration-200"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="font-sans text-[12px] text-[#46464a] hover:text-[#0a0a0b] transition-all duration-200"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
