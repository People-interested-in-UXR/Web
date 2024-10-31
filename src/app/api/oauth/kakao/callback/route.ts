import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createServer } from "@/app/utils/supabase";

export async function GET(request: Request) {
  const cookie = await cookies();
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

  cookie.set("_kt", access_token, {
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
  cookie.set("_ui", emailJwtToken, {
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
  const supabase = await createServer();

  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("email", email)
    .limit(1)
    .single();

  //TODO: 만약 kakao로 가입한 이메일과 구글로 가입한 이메일이 같을 때 공지하기 위한 방법 찾기
  if (data?.platform === "google") {
    const { error } = await supabase.from("user").update({ platform: "kakao" });
    if (error?.message)
      console.log(
        "가입된 카카오 이메일이 있는데 해당 이메일이 구글로 가입된 이메일과 같을 경우 platform key 만 업데이트를 진행했을 때 발생하는 에러 : ",
        error?.message
      );
  }

  if (error?.message)
    console.log(
      "해당 유저가 가입되어 있는지 확인할 때 발생하는 Error 메세지 : ",
      error.message
    );
  if (!data) {
    //* 처음 가입할 때(DB에 데이터가 없을 때)
    const { error } = await supabase
      .from("user")
      .insert({ email, platform: "kakao" });
    if (error?.message)
      console.log(
        "처음 가입자를 대상으로 하는 유저를 DB에 저장할 때 발생하는 Error 메세지 : ",
        error.message
      );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up/term`
    );
  } else {
    //* 쿠키 갱신만 진행하면 될 때 (DB내에 데이터가 있을 때)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }
}
