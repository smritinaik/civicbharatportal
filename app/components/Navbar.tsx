import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { MapPin, MessageSquare, PlusCircle, LifeBuoy } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-8 max-w-7xl mx-auto">
      {/* Logo Section */}
    <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter text-white">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-linear-to-tr from-orange-500 via-white to-emerald-500 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative bg-slate-900 p-2 rounded-lg border border-slate-700/50">
            <MapPin className="text-orange-400 size-6" />
          </div>
        </div>
        <span>Civic<span className="text-emerald-500">Bharat</span></span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <SignedIn>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            
            {/* My Inquiry - Glass Emerald */}
            <Link href="/my-inquiry">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-all active:scale-95">
                <MessageSquare className="size-4" />
                <span className="hidden md:block">My Inquiry</span>
              </button>
            </Link>

            {/* Ask Official - High Contrast Orange */}
            <Link href="/ask-official">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all active:scale-95">
                <PlusCircle className="size-4" />
                <span>Ask Official</span>
              </button>
            </Link>

            {/* Support - Minimalist */}
            <Link href="/support">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <LifeBuoy className="size-5" />
              </button>
            </Link>

            <div className="h-6 width:1px bg-white/10 mx-1" />

            {/* Profile */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-9 border border-white/20 hover:border-emerald-500/50 transition-colors",
                  userButtonPopoverCard: "bg-slate-950 border border-white/10 text-white shadow-2xl",
                }
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="relative group px-8 py-2.5 rounded-xl bg-white text-black font-bold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}