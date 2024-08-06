import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  ["_ui", "_gt", "_kt"].forEach((key) => {
    cookies().delete(key);
  });

  return NextResponse.next();
}
