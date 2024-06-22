import { createClient } from "@/app/utils/supabase/supabase";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.from("user").select("*");

  if (!error) return NextResponse.json({ users: data });
  return NextResponse.json({ ...error }, { status: 500 });
}
