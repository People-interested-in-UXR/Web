import { createClient } from "@/app/utils/supabase/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

  console.log("access_token & expires_in : ", access_token, expires_in);

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

  console.log("email : ", email);

  //* supabase
  const supabase = createClient();
  const { error } = await supabase
    .from("user")
    .insert({ email, platform: "kakao" });

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

  //* 처음 가입하는 거라면 term으로 보내기
  if (!error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up/term`
    );

  //* 현재 가입되어 쿠키만 갱신하고 있다면 바로 홈으로 보내기
  console.error("Error fetching users:", error);
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
}
