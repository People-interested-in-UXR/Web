import { createClient } from "@/app/utils/supabase/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PATCH(request: Request) {
  const { profile } = await request.json();

  const cookie = cookies().get("_ui");
  if (!cookie)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(cookie.value) as JwtPayload;

  const supabase = createClient();
  await supabase.from("user").update({ profile }).eq("email", email).select();

  return NextResponse.json(`${process.env.NEXT_PUBLIC_BASE_URL}`);
}
