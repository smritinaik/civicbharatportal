import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Clock, CheckCircle2, User } from "lucide-react";

interface DeptInfo {
  name: string;
  color: string;
  bg: string;
}

const departmentData: Record<string, DeptInfo> = {
  pwd: { name: "Public Works (PWD)", color: "text-orange-500", bg: "bg-orange-500/10" },
  electricity: { name: "Electricity Board", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  water: { name: "Water & Sewage", color: "text-blue-500", bg: "bg-blue-500/10" },
  sanitation: { name: "Sanitation", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  health: { name: "Public Health", color: "text-red-500", bg: "bg-red-500/10" },
  safety: { name: "Safety & Police", color: "text-indigo-500", bg: "bg-indigo-500/10" },
};

export default async function DepartmentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dept = departmentData[id] || { name: "Not Found", color: "text-slate-400", bg: "bg-slate-800" };

  let reports = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reports?dept=${id}`, { cache: 'no-store' });
    reports = await res.json();
  } catch (e) {
    console.error("Fetch error:", e);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/departments" className="flex items-center text-slate-400 hover:text-white transition gap-2 mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Departments
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className={`p-4 rounded-2xl ${dept.bg} border border-white/5 shadow-inner`}>
            <AlertCircle className={dept.color} size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">{dept.name}</h1>
            <p className="text-slate-400">Manage and report issues for this sector.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden group">
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all group-hover:opacity-20 ${dept.bg.replace('/10', '')}`}></div>
            <h3 className="text-xl font-bold text-white mb-4">Report New Issue</h3>
            <p className="text-slate-400 mb-6 text-sm">Notify the {dept.name} ground team immediately.</p>
            <Link href={`/departments/${id}/report`} className="w-full inline-block">
              <button className="w-full py-4 rounded-xl font-bold bg-white text-black hover:scale-[1.02] transition-all shadow-xl">
                Add Report
              </button>
            </Link>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Department Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Clock size={16} /> Response Time</span>
                <span className="text-white font-mono text-xs">~24 Hours</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-2"><CheckCircle2 size={16} /> Resolution Rate</span>
                <span className="text-emerald-500 font-mono text-xs font-bold">88%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity (Dynamic List) */}
        <div className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2>
          
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report: any) => (
                <div key={report._id} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-start">
                  {report.image && (
                    <img src={report.image} className="w-full md:w-32 h-32 object-cover rounded-2xl border border-white/10" alt="Issue" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">{report.status}</span>
                      <span className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed mb-4">{report.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                      <User size={12} /> Reported by {report.userName || "Anonymous Citizen"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/20 border border-white/5 p-16 rounded-[2.5rem] text-center">
              <p className="text-slate-500 italic font-light">No active reports found in {dept.name}.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}