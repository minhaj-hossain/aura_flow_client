"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Menu,
  X,
  LogOut,
  Mail,
  User as UserIcon,
  PlusCircle,
  LayoutList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const logout = async () => {
    await authClient.signOut();
  };

  // Define navigation items dynamically based on auth state
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/product", label: "Product" },
    { path: "/features", label: "Features" },
    ...(user
      ? [
          { path: "/add-item", label: "Add Item", icon: PlusCircle },
          { path: "/manage-items", label: "Manage Items", icon: LayoutList },
        ]
      : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#c7c6ca]/20 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-16 h-20 flex justify-between items-center">
        {/* Left: Brand Logo (takes 1 share of flex space) */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="font-display text-[24px] font-bold tracking-tighter text-[#4648d4] transition-all duration-300 hover:opacity-85 whitespace-nowrap"
          >
            AuraFlow
          </Link>
        </div>

        {/* Middle: Desktop Navigation (Centered & Safe from wrapping) */}
        <div className="hidden lg:flex justify-center items-center gap-1 xl:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            // const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative px-4 py-2 rounded-full group whitespace-nowrap"
              >
                {/* Fluid Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-[#4648d4]/10 rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Nav Link Content */}
                <span
                  className={`relative z-10 flex items-center gap-1.5 font-sans text-[14px] font-semibold tracking-wider transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-[#4648d4]"
                      : "text-[#46464a] group-hover:text-[#4648d4]"
                  }`}
                >
                  {/* {Icon && <Icon className="w-4 h-4 flex-shrink-0" />} */}
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right: User Profile / Auth Buttons (takes 1 share of flex space to balance center) */}
        <div className="flex-1 flex justify-end items-center gap-5">
          {/* Desktop Right Side Content */}
          <div className="hidden lg:flex items-center gap-5">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="w-12 h-12 rounded-full bg-[#f3f4f5] border border-[#c7c6ca]/30 flex items-center justify-center hover:border-[#4648d4] text-[#46464a] hover:text-[#4648d4] transition-all duration-300 cursor-pointer shadow-sm"
                  aria-label="User Profile Menu"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
                  </div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-[#c7c6ca]/30 rounded-2xl shadow-xl py-3 z-50 origin-top-right"
                    >
                      <div className="px-4 py-2 border-b border-[#f3f4f5] mb-2">
                        <p className="font-sans text-[12px] font-bold text-[#4648d4] uppercase tracking-wider">
                          Active Account
                        </p>
                        <p className="font-sans text-[14px] font-bold text-[#191c1d] mt-1 truncate">
                          {user.name || "AuraFlow User"}
                        </p>
                        <p className="font-sans text-[12px] text-[#46464a] truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="px-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left font-sans text-[13px] font-semibold text-[#46464a] hover:bg-[#f3f4f5] hover:text-[#191c1d] transition-all duration-200 whitespace-nowrap"
                        >
                          <UserIcon className="w-4 h-4 text-[#4648d4]" />
                          My Profile Page
                        </Link>

                        <button
                          onClick={logout}
                          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left font-sans text-[13px] font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200 cursor-pointer whitespace-nowrap"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2.5 font-sans text-[14px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] transition-all duration-300 cursor-pointer text-center whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3 bg-[#0a0a0b] text-white rounded-xl font-sans text-[14px] font-semibold tracking-wider hover:bg-[#0a0a0b]/90 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm text-center whitespace-nowrap"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#46464a] hover:text-[#0a0a0b] transition-all duration-300 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#c7c6ca]/20 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            // const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-[15px] font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#4648d4]/10 text-[#4648d4]"
                    : "text-[#46464a] hover:bg-[#f3f4f5] hover:text-[#4648d4]"
                }`}
              >
                {/* {Icon && (
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#4648d4]" : ""}`}
                  />
                )} */}
                {item.label}
              </Link>
            );
          })}

          {user && (
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-[15px] font-semibold tracking-wider transition-all duration-300 ${
                pathname === "/profile"
                  ? "bg-[#4648d4]/10 text-[#4648d4]"
                  : "text-[#46464a] hover:bg-[#f3f4f5] hover:text-[#4648d4]"
              }`}
            >
              <UserIcon className="w-4 h-4" />
              My Profile Page
            </Link>
          )}

          <div className="h-[1px] bg-[#c7c6ca]/20 my-4" />

          <div className="flex flex-col sm:flex-row gap-3">
            {user ? (
              <div className="w-full flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-[#f3f4f5] rounded-xl border border-[#c7c6ca]/10">
                  <Mail className="w-5 h-5 text-[#4648d4]" />
                  <div className="flex flex-col">
                    <span className="font-sans text-[14px] font-bold text-[#191c1d] leading-none">
                      {user.name}
                    </span>
                    <span className="font-sans text-[11px] text-[#46464a] mt-0.5">
                      {user.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3.5 bg-rose-600 text-white hover:bg-rose-700 font-sans text-[14px] font-semibold tracking-wider text-center rounded-xl active:scale-95 transition-all duration-300 cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 font-sans text-[15px] font-semibold tracking-wider text-[#46464a] hover:text-[#0a0a0b] text-center border border-transparent hover:bg-[#f3f4f5] rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-[#0a0a0b] text-white font-sans text-[15px] font-semibold tracking-wider text-center rounded-xl hover:bg-[#0a0a0b]/90 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
