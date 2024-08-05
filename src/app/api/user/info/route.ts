import { createClient } from "@/app/utils/supabase/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const cookie = cookies().get("_ui");

  if (!cookie)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(cookie?.value) as JwtPayload;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email);

  console.log("supabase: GET /user/info", data, error);
  if (!error) return NextResponse.json({ ...data[0] });
  return NextResponse.json({ ...error }, { status: 500 });
}

export async function PATCH(request: Request) {
  const json = await request.json();

  const cookie = cookies().get("_ui");

  console.log("supabase: PATCH /user/info", cookie);
  if (!cookie)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(cookie?.value) as JwtPayload;

  const supabase = createClient();
  await supabase
    .from("user")
    .update({ ...json })
    .eq("email", email)
    .select();

  return NextResponse.json(`${process.env.NEXT_PUBLIC_BASE_URL}`);
}
