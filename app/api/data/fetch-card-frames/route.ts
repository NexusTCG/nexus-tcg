import { NextResponse } from 'next/server';
import { fetchCardFrames } from '@/app/server/actions';

export async function GET() {
  try {
    const cardFrames = await fetchCardFrames();
    return NextResponse.json(cardFrames);
  } catch (error) {
    console.error('Error fetching card frames:', error);
    return NextResponse.json({ error: 'Failed to fetch card frames' }, { status: 500 });
  }
}