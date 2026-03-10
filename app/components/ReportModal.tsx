'use client';

import React, { useState } from 'react';
import { Camera, X, UploadCloud, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function ReportModal({ deptName, deptId, onClose }: { deptName: string, deptId: string, onClose: () => void }) {
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(null); // for preview & upload
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Instant preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // preview
      setImage(url);

      // Convert file to base64 for Cloudinary
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please sign in first");
    setLoading(true);

    try {
      let imageUrl = null;

      // Upload image to Cloudinary
      if (image) {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image }),
        });
        const data = await res.json();
        imageUrl = data.url;
      }

      // Submit report to your backend
      const res2 = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.fullName,
          department: deptId,
          description: message,
          image: imageUrl,
        }),
      });

      if (res2.ok) {
        alert("Report submitted successfully!");
        onClose();
      } else {
        alert("Failed to submit report.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Report to {deptName}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="relative group">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/10 rounded-3xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all overflow-hidden">
                {image ? (
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Camera className="text-slate-500 mb-2" size={32} />
                    <span className="text-slate-400 text-sm font-medium">Capture or Upload Image</span>
                  </>
                )}
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Description</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="Describe the issue (e.g. Broken street light near Main St...)"
                rows={4}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <UploadCloud size={20} />}
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}