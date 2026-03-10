import React from 'react';
import { MapPin, BarChart3, CheckCircle2, ArrowRight, Camera, Bell, Shield } from 'lucide-react';
import Link from 'next/link';
import Navbar from './components/Navbar';

// 1. Import Clerk Components
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-orange-500/30 font-sans">

      {/* Subtle Indian Flag Gradient Top Bar */}
      <div className="h-1 w-full flex">
        <div className="h-full flex-1 bg-orange-500"></div>
        <div className="h-full flex-1 bg-white"></div>
        <div className="h-full flex-1 bg-emerald-600"></div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-24 pb-40 px-6">
        {/* Premium Glow Accents */}
        <div className="absolute top-0 -z-10 h-full w-full">
          <div className="absolute top-[-10%] left-[20%] height:400px width:400px rounded-full bg-orange-600/10 blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[20%] height:400px width:400px rounded-full bg-emerald-600/10 blur-[120px]"></div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-slate-300 uppercase tracking-widest">Digital India Initiative</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black max-w-5xl leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500">
          Transform Your City <br />
          <span className="text-white">With One Report.</span>
        </h1>

        <p className="mt-10 text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
          A world-class transparent grievance system built for the modern Indian citizen. Fast, reliable, and accountable.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-5">
          {/* PRIMARY ACTION: SEE DEPARTMENTS */}
          <Link href="/departments" className="w-full sm:w-auto">
            <button className="group relative w-full flex items-center justify-center bg-white text-black px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:cursor-pointer">
              See Departments
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* SECONDARY ACTION: SHOW SIGN IN IF LOGGED OUT, SHOW DASHBOARD IF LOGGED IN */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-5 rounded-2xl font-bold text-white hover:bg-white/10 transition-all hover:cursor-pointer">
                Join the Movement
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-5 rounded-2xl font-bold text-white hover:bg-white/10 transition-all">
                <BarChart3 className="mr-2 size-5 text-emerald-400" />
                My Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>
      {/* Steps and Stats sections remain the same for design consistency... */}
      {/* (Skipped for brevity, but you should keep them from the previous version) */}

      <footer className="py-20 text-center">
        <div className="flex justify-center gap-1 mb-6">
          <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
          <div className="w-8 h-1 bg-white rounded-full"></div>
          <div className="w-8 h-1 bg-emerald-500 rounded-full"></div>
        </div>
        <p className="text-slate-500 text-sm">Proudly supporting the Swachh Bharat Mission</p>
      </footer>
    </main>
  );
}