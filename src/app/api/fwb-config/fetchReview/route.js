import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

export async function POST(req) {
  await dbConnect();
  try {
    const { name, star, message } = await req.json();
    if (!name || !star || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    const review = await Review.create({ name, star, message });
    return NextResponse.json({ success: true, review });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}