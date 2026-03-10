"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What is CivicBharat?",
    a: "CivicBharat is a platform that helps citizens connect directly with government departments to submit inquiries and track civic issues.",
  },
  
  {
    q: "How do I submit a report?",
    a: "Sign in to your account, go to 'See Departments', select the relevant department, and submit the form.",
  },

  {
    q: "How can I track my inquiries?",
    a: "Visit the My Inquiry page from the navigation bar to view the status of all your submitted inquiries.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. We use secure authentication and do not share your personal information with unauthorized parties.",
  },
  {
    q: "How long does it take to get a response?",
    a: "Response times vary by department, but most inquiries receive updates within a few working days.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="flex items-center text-slate-400 hover:text-white transition gap-2 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter">
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h1>
          <p className="text-slate-400 mt-3">
            Quick answers to common questions about CivicBharat.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/10 transition"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-slate-400">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          Still need help? Visit the Support page.
        </div>
      </div>
    </main>
  );
}
