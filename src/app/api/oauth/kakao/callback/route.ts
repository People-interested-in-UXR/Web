import { createClient } from "@/app/utils/supabase/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import isObjectEmpty from "@/app/utils/isObjectEmpty";
import { User } from "@/app/utils/types/user/user";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // * kakao access token
  const { access_token, expires_in } = await (
    await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${url.searchParams.get("code")}&client_id=${process.env.KAKAO_CLIENT_ID}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&redirect_uri=${`${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/kakao/callback`}&grant_type=authorization_code`,
    })
  ).json();

  // * kakao user info
  const {
    kakao_account: { email },
  } = await (
    await fetch(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    })
  ).json();

  cookies().set("_kt", access_token, {
    httpOnly: true,
    maxAge: expires_in,
    sameSite: "strict",
    secure: true,
    path: "/",
  });

  //* email 정보 토큰
  const emailJwtToken = jwt.sign({ email }, process.env.PRIVATE_TOKEN_KEY!, {
    expiresIn: expires_in,
  });
  cookies().set("_ui", emailJwtToken, {
    httpOnly: true,
    maxAge: expires_in,
    sameSite: "strict",
    secure: true,
    path: "/",
  });

  /**
   * ! Error log
   * {
   * msg: 'ip mismatched! callerIp=44.222.113.50. check out registered ips.',
   * code: -401
   * }
   */

  //* supabase
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("email", email)
    .limit(1)
    .single();

  //* 처음 가입하는게 아니라면
  if (!isObjectEmpty<User>(data))
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  try {
    const { error } = await supabase
      .from("user")
      .insert({ email, platform: "kakao" });
    console.error("Supabase Error: ", error);
  } catch (error) {
    console.error("Error insert users:", error);
  }

  //* 처음 가입하는 거라면 term으로 보내기
  if (!error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up/term`
    );

  //* 현재 가입되어 쿠키만 갱신하고 있다면 바로 홈으로 보내기
  console.error("Error fetching users:", error);
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
}
