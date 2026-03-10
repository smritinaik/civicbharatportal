import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Plus, Tag } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  // 🔐 Protect route
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-[#020617]">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Please sign in to view your dashboard.</p>
          <Link href="/" className="text-emerald-500 underline">Return Home</Link>
        </div>
      </main>
    );
  }

  // --- FETCH DATA (GET FEATURE) ---
  let inquiries: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    // Fetching all reports for this specific user
    const res = await fetch(`${baseUrl}/api/reports?userId=${user.id}`, { 
      cache: 'no-store' 
    });
    if (res.ok) {
      inquiries = await res.json();
    }
  } catch (e) {
    console.error("Dashboard fetch error:", e);
  }

  // Dynamic Stats Calculation
  const stats = [
    { 
      label: "Total Reports", 
      value: inquiries.length, 
      icon: AlertCircle, 
      color: "text-blue-400",
      bg: "bg-blue-400/10" 
    },
    { 
      label: "In Progress", 
      value: inquiries.filter(i => i.status === 'Pending').length, 
      icon: Clock, 
      color: "text-orange-400",
      bg: "bg-orange-400/10" 
    },
    { 
      label: "Resolved", 
      value: inquiries.filter(i => i.status === 'Resolved').length, 
      icon: CheckCircle2, 
      color: "text-emerald-400", 
      bg: "bg-emerald-400/10"
    },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-emerald-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-orange-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-emerald-400 transition-colors gap-2 mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Home
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500">
              User <span className="text-white">Dashboard</span>
            </h1>
            <p className="text-slate-400 mt-2 text-lg italic">
              Jai Hind, {user.firstName}. Tracking your civic contributions.
            </p>
          </div>
          <Link href="/departments" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            <Plus size={20} /> New Report
          </Link>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-md relative overflow-hidden group">
              <div className={`absolute -right-4 -top-4 w-20 h-20 ${stat.bg} blur-2xl rounded-full`}></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded-md">Live Status</span>
              </div>
              <p className="text-4xl font-black relative z-10">{stat.value}</p>
              <p className="text-slate-400 font-medium relative z-10">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">Recent Reports</h2>
            <Link href="/my-inquiry" className="text-sm text-emerald-500 hover:underline">View All</Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="group border border-dashed border-white/10 rounded-[3rem] p-20 text-center bg-white/2 hover:bg-white/4 transition-all">
              <div className="inline-flex p-4 rounded-full bg-slate-900 mb-4">
                <AlertCircle className="text-slate-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-300">No active reports</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm">Your dashboard is currently empty. Help improve the community by reporting issues in your area.</p>
              <Link href="/departments" className="text-emerald-400 font-bold hover:underline underline-offset-4">Start your first report &rarr;</Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {inquiries.slice(0, 4).map((item) => (
                <div key={item._id} className="group p-6 rounded-4xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                     {item.image && (
                       <img src={item.image} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="Issue" />
                     )}
                     <div>
                       <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors line-clamp-1">{item.description}</h3>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] uppercase font-black text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
                            <Tag size={10} /> {item.department}
                          </span>
                          <p className="text-slate-500 text-xs font-medium">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                       </div>
                     </div>
                   </div>
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                     {item.status}
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}