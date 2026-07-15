"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "How long does implementation take?",
    answer:
      "Typical implementation for enterprise teams takes 2-4 weeks, which includes end-to-end data migration, API environment provisioning, and customized training sessions tailored to your workflows.",
  },
  {
    id: 2,
    question: "Is my data secure on your servers?",
    answer:
      "Absolutely. We employ strict end-to-end AES-256 encryption at rest and in transit. The platform is fully compliant with SOC2 Type II, GDPR, and HIPAA compliance standards.",
  },
  {
    id: 3,
    question: "Can I integrate with my current CRM?",
    answer:
      "Yes, we provide production-ready native integrations for Salesforce, HubSpot, and Microsoft Dynamics, alongside a robust developer-facing GraphQL API for custom frameworks.",
  },
  {
    id: 4,
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day full-access team trial for up to 5 members so your organization can experience the workflow enhancements firsthand before committing.",
  },
  {
    id: 5,
    question: "Is there a native mobile application?",
    answer:
      "Yes, AuraFlow is natively available on both iOS and Android platforms, offering real-time status updates and data synchronization parity with our desktop engine.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Default first item open

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#f8f9fa] border-t border-zinc-200/50">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <span className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-indigo-600 block">
            Support Matrix
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Stack Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-[20px] border border-zinc-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex justify-between items-center p-6 text-left cursor-pointer group focus:outline-none"
                >
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-zinc-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-zinc-50 border border-zinc-200/60 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-indigo-50 border-indigo-100 text-indigo-600" : "text-zinc-50"}`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 ${isOpen ? "text-indigo-600" : "text-zinc-500"}`}
                    />
                  </div>
                </button>

                {/* Animated content expansion */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-40 opacity-100 border-t border-zinc-100"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-6 font-['Inter'] text-[14.5px] leading-relaxed text-zinc-500 bg-zinc-50/30">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
