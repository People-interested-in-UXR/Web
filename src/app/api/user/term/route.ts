import { createClient } from "@/app/utils/supabase/supabase";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { isMarketing } = await request.json();

  const cookie = cookies().get("_ui");

  if (!cookie)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(cookie?.value) as JwtPayload;

  const supabase = createClient();
  await supabase
    .from("user")
    .update({ is_marketing: isMarketing })
    .eq("email", email)
    .select();

  return NextResponse.json({ ok: true });
}
