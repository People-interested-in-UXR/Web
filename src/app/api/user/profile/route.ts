import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createServer } from "@/app/utils/supabase";
import { revalidateTag } from "next/cache";

export async function PATCH(request: Request) {
  const userInfoCookie = (await cookies()).get("_ui");
  const { profile } = await request.json();

  revalidateTag("members");

  if (!userInfoCookie)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(userInfoCookie?.value) as JwtPayload;

  const supabase = await createServer();
  await supabase.from("user").update({ profile }).eq("email", email).select();

  return NextResponse.json(`${process.env.NEXT_PUBLIC_BASE_URL}`);
}
