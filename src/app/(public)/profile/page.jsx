import React from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { requireAuth } from "@/proxy";
import { User, Mail, Shield, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // Enforce session check on server-side using Better Auth Proxy
  const session = await requireAuth();
  const user = session.user;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#fafafb] to-[#f3f4f6]">
        <div className="max-w-2xl mx-auto px-5">
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#46464a] hover:text-[#4648d4] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="bg-white border border-[#c7c6ca]/20 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4648d4] text-3xl font-bold mb-4 shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h1 className="font-display text-2xl font-bold text-[#191c1d]">
                {user.name || "AuraFlow User"}
              </h1>
              <p className="font-sans text-sm text-[#46464a] mt-1">
                {user.email}
              </p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Session Active (Better Auth)
              </div>
            </div>

            <div className="py-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-[#191c1d] mb-2">
                Account Credentials
              </h2>
              
              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#4648d4]" />
                  <div>
                    <p className="text-xs text-[#46464a] font-medium">Display Name</p>
                    <p className="text-sm font-semibold text-[#191c1d]">{user.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#4648d4]" />
                  <div>
                    <p className="text-xs text-[#46464a] font-medium">Registered Email</p>
                    <p className="text-sm font-semibold text-[#191c1d]">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#4648d4]" />
                  <div>
                    <p className="text-xs text-[#46464a] font-medium">Unique User ID</p>
                    <p className="text-xs font-mono text-[#191c1d]">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <p className="text-xs text-gray-400 font-medium">
                Powered by Better Auth & MongoDB
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
