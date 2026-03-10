import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft, MapPin, Tag, Calendar } from "lucide-react";


export default async function MyInquiryPage() {
  const user = await currentUser();

  if (!user) return <div className="text-white p-10">Please sign in.</div>;

  let reports = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    // Logic: Only pass userId to get ALL departments
    const res = await fetch(`${baseUrl}/api/reports?userId=${user.id}`, { cache: 'no-store' });
    reports = await res.json();
  } catch (e) {
    console.error(e);
  }

  return (
    
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="flex items-center text-slate-500 hover:text-white transition gap-2 mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-6xl font-black text-white tracking-tighter">Global <span className="text-orange-500">Inbox</span></h1>
            <p className="text-slate-400 mt-2 text-lg">All your civic contributions in one place.</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Reports</span>
            <div className="text-3xl font-black text-white">{reports.length}</div>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="bg-slate-900/40 border border-white/5 p-20 rounded-[3rem] text-center">
            <p className="text-slate-500 italic">No reports found across any department.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reports.map((report: any) => (
              <div key={report._id} className="bg-slate-900/60 border border-white/5 p-6 rounded-4x hover:border-white/10 transition-colors flex flex-col md:flex-row gap-8 items-center">
                
                {/* Image Section */}
                <div className="w-full md:w-48 h-40 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                  {report.image ? (
                    <img src={report.image} alt="Issue" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs italic">No Image</div>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Dynamic Department Tag */}
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1">
                      <Tag size={10} /> {report.department}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                      {report.status}
                    </span>
                  </div>

                  <p className="text-slate-300 text-lg font-medium leading-snug mb-4 line-clamp-2">
                    {report.description}
                  </p>

                  <div className="flex items-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5"><Calendar size={14}/> {new Date(report.createdAt).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1.5 font-mono">ID: {report._id.slice(-6)}</div>
                  </div>
                </div>

                <Link href={`/departments/${report.department}`} className="shrink-0">
                   <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all">
                      <ArrowLeft className="rotate-180 text-slate-400" size={20} />
                   </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}