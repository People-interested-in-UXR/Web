import { createServer } from "@/app/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createServer();
  const { data, error } = await supabase.from("user").select("*");

  if (!error) return NextResponse.json({ users: data });
  return NextResponse.json({ ...error }, { status: 500 });
}
