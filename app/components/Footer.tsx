import React from 'react';
import { MapPin, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020617] mt-20">
      {/* Tricolor Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full flex-1 bg-orange-500/50"></div>
        <div className="h-full flex-1 bg-white/20"></div>
        <div className="h-full flex-1 bg-emerald-500/50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <MapPin className="text-orange-500 size-5" />
              <span>Civic<span className="text-emerald-500">Bharat</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering Indian citizens with a transparent, accountable, and 
              digital-first grievance redressal system. Built for a better tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/departments" className="hover:text-emerald-400 transition">Departments</a></li>
              <li><a href="/my-inquiry" className="hover:text-emerald-400 transition">My Inquiries</a></li>
              <li><a href="/support" className="hover:text-emerald-400 transition">Help Center</a></li>
            </ul>
          </div>

          {/* Social/Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition"><Github size={20} /></a>
              <a href="#" className="hover:text-white transition"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest font-medium">
          <p>© 2026 Civic Bharat • Digital India Initiative</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}