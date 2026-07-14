"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Waves, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // 1. Uncomplicated visibility toggles for passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // 2. Simple state just to compute password strength on typing
  const [passwordInput, setPasswordInput] = useState("");

  // Compute password strength directly in render
  const getPasswordStrength = () => {
    if (!passwordInput) {
      return {
        score: 0,
        text: "Strength",
        colorClass: "bg-[#c7c6ca]/20",
        textColorClass: "text-[#46464a]/60",
      };
    }

    let score = 0;
    if (passwordInput.length > 0) score += 20;
    if (passwordInput.length >= 8) score += 20;
    if (/[A-Z]/.test(passwordInput)) score += 20;
    if (/[0-9]/.test(passwordInput)) score += 20;
    if (/[^A-Za-z0-9]/.test(passwordInput)) score += 20;

    let text = "Strength";
    let colorClass = "bg-[#c7c6ca]/30";
    let textColorClass = "text-[#46464a]/60";

    if (score <= 40) {
      text = "Weak";
      colorClass = "bg-[#ba1a1a]";
      textColorClass = "text-[#ba1a1a]";
    } else if (score <= 80) {
      text = "Good";
      colorClass = "bg-[#4648d4]";
      textColorClass = "text-[#4648d4]";
    } else {
      text = "Strong";
      colorClass = "bg-[#009668]";
      textColorClass = "text-[#009668]";
    }

    return { score, text, colorClass, textColorClass };
  };

  const passwordStrength = getPasswordStrength();

  // Simplified form submission handler using target elements
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    // Accessing elements directly from the HTMLFormElement target
    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    // Direct, clear validation checks
    if (!fullName || !email || !password || !confirmPassword) {
      setStatusMessage({ text: "Please fill in all fields.", isError: true });
      return;
    }

    if (password.length < 8) {
      setStatusMessage({
        text: "Password must be at least 8 characters long.",
        isError: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage({ text: "Passwords do not match.", isError: true });
      return;
    }

    await authClient.signUp.email(
      {
        email,
        password,
        name: fullName,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          setIsSubmitting(false);
          setStatusMessage({
            text: "Account created successfully! Redirecting...",
            isError: false,
          });
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1500);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setStatusMessage({ text: ctx.error.message, isError: true });
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] text-[#191c1d] font-sans overflow-x-hidden flex flex-col justify-between p-6 md:p-16">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#4648d4]/5 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[50%] rounded-full bg-[#4648d4]/10 blur-[100px]"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center py-8">
        <main className="w-full max-w-[520px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white/85 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-[#c7c6ca]/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            {/* Header Logo & Titles */}
            <div className="flex flex-col items-center text-center mb-10">
              <Link
                href="/"
                className="w-16 h-16 bg-[#0a0a0b] flex items-center justify-center rounded-2xl mb-6 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <Waves className="w-9 h-9 text-white" />
              </Link>
              <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#0a0a0b] tracking-tight mb-2">
                Join AuraFlow
              </h1>
              <p className="font-sans text-[15px] text-[#46464a] max-w-[320px] leading-relaxed">
                Elevate your workflow with precision-crafted intelligence.
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

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="relative">
                <label
                  className="block font-sans text-[13px] font-semibold text-[#46464a] mb-2 ml-1"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    className="w-full h-14 bg-[#f3f4f5] border border-[#c7c6ca]/30 focus:ring-[#4648d4]/20 rounded-xl px-5 py-2 font-sans text-[15px] focus:border-[#4648d4] focus:ring-1 transition-all outline-none text-[#191c1d] placeholder:text-[#77777b]/40 disabled:opacity-50"
                    id="fullName"
                    name="fullName"
                    placeholder="Jane Cooper"
                    type="text"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative mt-8">
                <label
                  className="block font-sans text-[13px] font-semibold text-[#46464a] mb-2 ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full h-14 bg-[#f3f4f5] border border-[#c7c6ca]/30 focus:ring-[#4648d4]/20 rounded-xl px-5 py-2 font-sans text-[15px] focus:border-[#4648d4] focus:ring-1 transition-all outline-none text-[#191c1d] placeholder:text-[#77777b]/40 disabled:opacity-50"
                    id="email"
                    name="email"
                    placeholder="jane@auraflow.io"
                    type="email"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative mt-8">
                <label
                  className="block font-sans text-[13px] font-semibold text-[#46464a] mb-2 ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full h-14 bg-[#f3f4f5] border border-[#c7c6ca]/30 focus:ring-[#4648d4]/20 rounded-xl px-5 py-2 font-sans text-[15px] focus:border-[#4648d4] focus:ring-1 transition-all outline-none text-[#191c1d] pr-12 placeholder:text-[#77777b]/40 disabled:opacity-50"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#46464a]/50 hover:text-[#4648d4] transition-colors p-1 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    disabled={isSubmitting}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="mt-3 px-1">
                  <div className="h-1.5 w-full bg-[#e7e8e9] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.colorClass}`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`font-sans text-[12px] font-medium transition-colors ${passwordStrength.textColorClass}`}
                    >
                      {passwordStrength.text}
                    </span>
                    <span className="font-sans text-[11px] text-[#46464a]/40">
                      Include uppercase, numbers & symbols
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative mt-8">
                <label
                  className="block font-sans text-[13px] font-semibold text-[#46464a] mb-2 ml-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="w-full h-14 bg-[#f3f4f5] border border-[#c7c6ca]/30 focus:ring-[#4648d4]/20 rounded-xl px-5 py-2 font-sans text-[15px] focus:border-[#4648d4] focus:ring-1 transition-all outline-none text-[#191c1d] pr-12 placeholder:text-[#77777b]/40 disabled:opacity-50"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#46464a]/50 hover:text-[#4648d4] transition-colors p-1 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    disabled={isSubmitting}
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full h-14 bg-[#0a0a0b] text-white font-sans text-[14px] font-semibold tracking-wider rounded-xl hover:bg-[#4648d4] active:scale-[0.98] transition-all shadow-lg hover:shadow-[#4648d4]/20 flex items-center justify-center gap-2 mt-8 cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative py-4 flex items-center">
                <div className="flex-grow border-t border-[#c7c6ca]/20"></div>
                <span className="flex-shrink mx-4 font-sans text-[11px] text-[#46464a]/40 tracking-wider">
                  OR CONTINUE WITH
                </span>
                <div className="flex-grow border-t border-[#c7c6ca]/20"></div>
              </div>

              {/* Google OAuth Access */}
              <button
                className="w-full h-14 bg-white border border-[#c7c6ca]/30 text-[#0a0a0b] font-sans text-[14px] font-semibold tracking-wider rounded-xl hover:bg-[#f3f4f5] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                type="button"
                onClick={() => {
                  alert(
                    "Google OAuth connection is ready to configure. In development mode, please use Email/Password sign up or the pre-loaded Demo account.",
                  );
                }}
                disabled={isSubmitting}
              >
                <svg
                  fill="none"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
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

            {/* Footer Sign-in Link */}
            <div className="mt-8 text-center">
              <p className="font-sans text-[14px] text-[#46464a]">
                Already have an account?
                <Link
                  className="text-[#4648d4] font-semibold hover:underline underline-offset-4 ml-1 transition-all"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Auxiliary Legal Information */}
      <footer className="py-4 flex justify-center gap-6 opacity-60">
        <Link
          className="font-sans text-[12px] text-[#46464a] hover:text-[#4648d4] transition-colors"
          href="#"
        >
          Privacy Policy
        </Link>
        <Link
          className="font-sans text-[12px] text-[#46464a] hover:text-[#4648d4] transition-colors"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="font-sans text-[12px] text-[#46464a] hover:text-[#4648d4] transition-colors"
          href="#"
        >
          Help Center
        </Link>
      </footer>
    </div>
  );
}
