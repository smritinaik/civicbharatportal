'use client';
import Link from 'next/link';

export default function ReportButtonWrapper({ deptId }: { deptId: string }) {
  return (
    <Link href={`/departments/${deptId}/report`} className="w-full">
      <button 
        className="w-full py-4 rounded-xl font-bold bg-white text-black hover:scale-[1.05] transition-all active:scale-95 shadow-xl shadow-white/5"
      >
        Add Report
      </button>
    </Link>
  );
}