import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { createServer } from "@/app/utils/supabase";

export async function POST(request: Request) {
  const { isMarketing } = await request.json();

  const userInfoCookie = (await cookies()).get("_ui");

  if (!userInfoCookie)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(userInfoCookie?.value) as JwtPayload;

  const supabase = await createServer();
  await supabase
    .from("user")
    .update({ is_marketing: isMarketing })
    .eq("email", email)
    .select();

  return NextResponse.json({ ok: true });
}
