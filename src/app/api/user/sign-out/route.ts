import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = await cookies();
  ["_ui", "_gt", "_kt"].forEach((key) => {
    cookie.delete(key);
  });

  return NextResponse.json({ message: "로그아웃 되었습니다." });
}
