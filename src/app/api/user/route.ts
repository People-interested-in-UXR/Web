import { createClient } from "@/app/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.from("user").select("*");

  if (!error) return NextResponse.json({ users: data });
  return NextResponse.json({ ...error }, { status: 500 });
}
