import Link from "next/link";
import { ArrowLeft, LifeBuoy, Mail, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <LifeBuoy className="text-emerald-500" />
            Support Center
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl">
            Need help with CivicBharat? Choose an option below and our team
            will assist you.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Support */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <Mail className="text-orange-500 mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-2">
              Email Support
            </h3>
            <p className="text-slate-400 mb-4">
              Reach out to our support team via email for detailed help.
            </p>
            <a
              href="mailto:support@civicbharat.com"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              support@civicbharat.com
            </a>
          </div>

          {/* Help / FAQ */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <MessageCircle className="text-orange-500 mb-4" size={28} />
            <h3 className="text-xl font-semibold mb-2">
              Help & FAQs
            </h3>
            <p className="text-slate-400 mb-4">
              Browse common questions and quick solutions.
            </p>
            <Link
              href="/faq"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              View FAQs →
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          We typically respond within 24–48 hours.
        </div>
      </div>
    </main>
  );
}
