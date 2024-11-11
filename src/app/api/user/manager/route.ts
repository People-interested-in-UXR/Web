import { createServer } from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServer();

  try {
    const { data, error } = await supabase.from("user")
    .select("*")
    .eq('is_manager', true)
    .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 }
    );
  }
}


