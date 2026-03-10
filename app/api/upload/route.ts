import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) return NextResponse.json({ message: 'No image provided' }, { status: 400 });

    const uploaded = await cloudinary.uploader.upload(image, {
      folder: 'user_reports',
    });

    return NextResponse.json({ url: uploaded.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Upload failed', error }, { status: 500 });
  }
}