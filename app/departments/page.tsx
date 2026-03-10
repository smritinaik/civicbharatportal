import React from 'react';
import Link from 'next/link';
import { 
  Droplets, 
  Zap, 
  Trash2, 
  HardHat, 
  Stethoscope, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';

const departments = [
  { id: 'pwd', name: 'Public Works (PWD)', icon: <HardHat />, desc: 'Potholes, road damage, and bridges.', color: 'from-orange-500' },
  { id: 'electricity', name: 'Electricity Board', icon: <Zap />, desc: 'Street lights, power lines, and transformers.', color: 'from-yellow-400' },
  { id: 'water', name: 'Water & Sewage', icon: <Droplets />, desc: 'Leaking pipes, water supply, and drainage.', color: 'from-blue-500' },
  { id: 'sanitation', name: 'Sanitation', icon: <Trash2 />, desc: 'Garbage collection and public cleanliness.', color: 'from-emerald-500' },
  { id: 'health', name: 'Public Health', icon: <Stethoscope />, desc: 'Pest control and hospital facilities.', color: 'from-red-500' },
  { id: 'safety', name: 'Safety & Police', icon: <ShieldCheck />, desc: 'Public safety and law enforcement requests.', color: 'from-indigo-500' },
];

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="flex items-center text-slate-400 hover:text-white transition gap-2 mb-6">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-5xl font-black text-white tracking-tighter">
            Civic <span className="text-emerald-500">Departments</span>
          </h1>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            Select a department to view active issues or file a new grievance directly to the specialized wing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link key={dept.id} href={`/departments/${dept.id}`}>
              <div className="group relative bg-slate-900/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                
                {/* Accent Glow */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${dept.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white border border-white/10 group-hover:scale-110 transition-transform">
                  {React.cloneElement(dept.icon, { size: 28 })}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{dept.name}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {dept.desc}
                </p>

                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Reports <ArrowRight size={14} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}