"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Waves,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // 1. Password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // 2. Form submit handler calling real Better Auth signIn.email
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    // Grab elements from the event target using name key matching as requested
    const target = e.target as HTMLFormElement & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const email = target.email.value;
    const password = target.password.value;

    // Simple validation checks
    if (!email || !password) {
      setStatusMessage({ text: "Please fill in all fields.", isError: true });
      return;
    }

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
        rememberMe: true,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          setIsSubmitting(false);
          setStatusMessage({
            text: "Logged in successfully! Welcome back.",
            isError: false,
          });
          // Redirect to homepage after a brief moment to show success
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1200);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setStatusMessage({ text: ctx.error.message, isError: true });
          alert(ctx.error.message);
        },
      },
    );
  };

  const handleDemoClick = async () => {
    setStatusMessage(null);
    await authClient.signIn.email(
      {
        email: "demo@auraflow.io",
        password: "demopass123",
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          setIsSubmitting(false);
          setStatusMessage({
            text: "Logged in with Demo Account!",
            isError: false,
          });
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1200);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setStatusMessage({
            text: "Failed to authenticate demo user. You may need to Sign Up with 'demo@auraflow.io' first if the database is fresh.",
            isError: true,
          });
          alert(
            ctx.error.message +
              "\n\n(Hint: If this is a fresh database, please click Get Started and register 'demo@auraflow.io' first!)",
          );
        },
      },
    );
  };

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] text-[#191c1d] font-sans overflow-x-hidden flex flex-col justify-between p-6 md:p-16">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#4648d4]/5 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#009668]/5 blur-[120px]"></div>
      </div>

      {/* Main Container */}
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-[480px] z-10">
          {/* Brand Logo Anchor */}
          <div className="flex justify-center mb-10">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-[24px] font-bold tracking-tighter text-black">
                AuraFlow
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-[#c7c6ca]/20 shadow-[0_40px_64px_-12px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-10">
              <h1 className="font-display text-[28px] md:text-[30px] font-bold text-black mb-3">
                Welcome back
              </h1>
              <p className="font-sans text-[15px] text-[#46464a] leading-relaxed">
                Access your premium creative workflow environment.
              </p>
            </div>

            {/* Notification Banner */}
            {statusMessage && (
              <div
                className={`mb-6 p-4 rounded-xl text-sm font-medium transition-all ${
                  statusMessage.isError
                    ? "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]"
                    : "bg-[#6ffbbe]/15 text-[#005236] border border-[#6ffbbe]/30"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  className="block font-sans text-[13px] font-semibold text-[#46464a] ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77777b] group-focus-within:text-[#4648d4] transition-colors">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    className="w-full h-14 pl-12 pr-4 bg-[#f3f4f5] border border-[#c7c6ca]/50 rounded-xl font-sans text-[15px] text-[#191c1d] transition-all focus:border-[#4648d4] focus:ring-0 placeholder:text-[#77777b]/50 outline-none"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    type="email"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="font-sans text-[13px] font-semibold text-[#46464a]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="font-sans text-[13px] font-semibold text-[#4648d4] hover:text-[#4648d4]/80 transition-colors"
                    href="#"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77777b] group-focus-within:text-[#4648d4] transition-colors">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    className="w-full h-14 pl-12 pr-12 bg-[#f3f4f5] border border-[#c7c6ca]/50 rounded-xl font-sans text-[15px] text-[#191c1d] transition-all focus:border-[#4648d4] focus:ring-0 placeholder:text-[#77777b]/50 outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77777b] hover:text-[#191c1d] transition-colors p-1 cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3 px-1">
                <div className="relative flex items-center">
                  <input
                    className="w-5 h-5 rounded bg-[#f3f4f5] border-[#c7c6ca]/50 text-[#4648d4] focus:ring-[#4648d4] focus:ring-offset-0 cursor-pointer"
                    id="remember"
                    name="remember"
                    type="checkbox"
                    disabled={isSubmitting}
                  />
                </div>
                <label
                  className="font-sans text-[14px] text-[#46464a] cursor-pointer select-none"
                  htmlFor="remember"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Primary Actions */}
              <div className="space-y-4 pt-2">
                <button
                  className="w-full h-14 bg-black text-white font-sans text-[14px] font-semibold tracking-wider rounded-xl hover:bg-[#4648d4] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-stone-400 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Login to AuraFlow
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  className="w-full h-14 border border-[#c7c6ca] text-black font-sans text-[14px] font-semibold rounded-xl hover:bg-[#f3f4f5] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={handleDemoClick}
                  disabled={isSubmitting}
                >
                  Demo Login
                </button>
              </div>

              {/* Divider */}
              <div className="relative py-4 flex items-center">
                <div className="flex-grow border-t border-[#c7c6ca]/30"></div>
                <span className="mx-4 font-sans text-[13px] text-[#77777b]">
                  or
                </span>
                <div className="flex-grow border-t border-[#c7c6ca]/30"></div>
              </div>

              {/* Social Login */}
              <button
                className="w-full h-14 bg-white border border-[#c7c6ca]/50 text-black font-sans text-[14px] font-semibold rounded-xl hover:bg-[#f3f4f5] transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={() => {
                  alert(
                    "Google OAuth connection is ready to configure. In development mode, please use Email/Password sign up or the pre-loaded Demo account.",
                  );
                }}
                disabled={isSubmitting}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                Continue with Google
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="font-sans text-[14px] text-[#46464a]">
                Don&apos;t have an account?
                <Link
                  className="font-semibold text-[#4648d4] hover:text-[#4648d4]/80 underline underline-offset-4 decoration-[#4648d4]/30 hover:decoration-[#4648d4] transition-all ml-1"
                  href="/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Small Links */}
          <div className="mt-8 flex justify-center gap-6">
            <Link
              className="font-sans text-[12px] text-[#77777b] hover:text-[#46464a] transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-sans text-[12px] text-[#77777b] hover:text-[#46464a] transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="font-sans text-[12px] text-[#77777b] hover:text-[#46464a] transition-colors"
              href="#"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
