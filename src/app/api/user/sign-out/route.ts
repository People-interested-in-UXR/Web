import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  cookies().delete("_ui");
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}?logout=true`
  );
}
