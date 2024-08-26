import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { uploadGeneratedArt } from '@/app/server/actions';

export async function POST(
  request: NextRequest
) {
  try {
    const { imageUrls } = await request.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const uploadedUrls = await uploadGeneratedArt(imageUrls);
    return NextResponse.json({ uploadedUrls });
  } catch (error) {
    console.error('Error uploading generated art:', error);
    return NextResponse.json({ 
      error: 'Failed to upload images' 
    }, { status: 500 });
  }
}