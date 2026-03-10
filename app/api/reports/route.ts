import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; 
import Report from '@/models/Report';
import mongoose from 'mongoose';

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    if (!data.userId || !data.description || !data.department) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newReport = await Report.create({
      userId: data.userId,
      userName: data.userName,
      department: data.department,
      description: data.description,
      image: data.image, 
      status: 'Pending',
      createdAt: new Date(),
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get("dept");
    const userId = searchParams.get("userId");

    let query: any = {};
    if (dept) query.department = dept;
    if (userId) query.userId = userId;
  
    const limitValue = dept && !userId ? 5 : 0; 

    const reports = await Report.find(query)
      .sort({ createdAt: -1 })
      .limit(limitValue);

    return NextResponse.json(reports, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}