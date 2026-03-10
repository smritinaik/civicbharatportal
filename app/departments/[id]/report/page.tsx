'use client';

import React, { useState, use } from 'react';
import { Camera, UploadCloud, Loader2, ArrowLeft } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const { user } = useUser();
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please sign in to submit a report.");
    setLoading(true);

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.fullName,
          department: id,
          description: message,
          image: image,
        }),
      });

      if (res.ok) {
        router.push(`/departments/${id}?success=true`);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <Link href={`/departments/${id}`} className="flex items-center text-slate-400 hover:text-white transition gap-2 mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
        </Link>

        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">File a Report</h1>
        <p className="text-slate-400 mb-10 border-l-2 border-emerald-500 pl-4">
          Reporting to: <span className="text-emerald-500 uppercase font-bold">{id}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-md shadow-2xl">
          {/* Image Upload Area */}
          <div className="relative group">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-input" />
            <label htmlFor="image-input" className="cursor-pointer flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-3xl hover:border-orange-500/50 hover:bg-orange-500/5 transition-all overflow-hidden bg-slate-950/50">
              {image ? (
                <img src={image} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="text-center">
                  <Camera className="text-slate-500 mx-auto mb-3" size={40} />
                  <p className="text-slate-300 font-semibold tracking-wide">Snap or Upload Issue Image</p>
                  <p className="text-slate-600 text-xs mt-2">Maximum file size: 10MB</p>
                </div>
              )}
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 ml-1">Issue Description</label>
            <textarea 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-700"
              placeholder="Describe the issue in detail (e.g., precise location, severity)..."
              rows={5}
            />
          </div>

          <button 
            disabled={loading}
            className="group w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : <UploadCloud size={22} />}
            {loading ? "Transmitting..." : "Submit to Digital Bharat"}
          </button>
        </form>
      </div>
    </main>
  );
}