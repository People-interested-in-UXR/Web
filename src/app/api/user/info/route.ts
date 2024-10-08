import { createClient } from "@/app/utils/supabase/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const cookie = cookies().get("_ui");
  const isLogOut = cookie?.value === "undefined";

  if (isLogOut)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });

  const { email } = jwt.decode(cookie?.value as string) as JwtPayload;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email);

  if (!error) return NextResponse.json({ ...data[0] });
  return NextResponse.json({ ...error }, { status: 500 });
}

export async function PATCH(request: Request) {
  const json = await request.json();
  const cookie = cookies().get("_ui");
  const isLogOut = cookie?.value === "undefined";

  if (isLogOut)
    return NextResponse.json({ message: "have not cookie" }, { status: 401 });
  const { email } = jwt.decode(cookie?.value as string) as JwtPayload;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user")
    .update({ ...json })
    .eq("email", email)
    .select();

  if (error?.message) console.log(error);

  revalidateTag("user-info");

  return NextResponse.json(
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}` },
    { status: 200 }
  );
}
