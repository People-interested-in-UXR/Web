import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createServer } from "@/app/utils/supabase";
import { isEnvTrue } from "@/app/utils/helpers/cookie/isEnvTrue";
import { sameSiteHandler } from "@/app/utils/helpers/cookie/sameSiteHandler";

export async function GET(request: Request) {
  const url = new URL(request?.url);
  const cookie = await cookies();

  // * Google access token
  const { access_token, expires_in } = await (
    await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${url.searchParams.get("code")}&client_id=${
        process.env.GOOGLE_CLIENT_ID
      }&client_secret=${
        process.env.GOOGLE_CLIENT_SECRET
      }&redirect_uri=${`${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/google/callback`}&grant_type=authorization_code`,
    })
  ).json();

  // * Google user info
  const { email } = await (
    await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-cache",
      }
    )
  ).json();

  cookie.set("_gt", access_token, {
    httpOnly: true,
    maxAge: expires_in,
    sameSite: sameSiteHandler(),
    secure: isEnvTrue({ env: process.env.COOKIE_SECURE }),
    path: "/",
  });

  const emailJwtToken = jwt.sign({ email }, process.env.PRIVATE_TOKEN_KEY!, {
    expiresIn: expires_in,
  });

  cookie.set("_ui", emailJwtToken, {
    httpOnly: true,
    maxAge: expires_in,
    sameSite: sameSiteHandler(),
    secure: isEnvTrue({ env: process.env.COOKIE_SECURE }),
    path: "/",
  });

  // * Supabase
  const supabase = await createServer();

  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("email", email)
    .limit(1)
    .single();

  //TODO: 만약 kakao로 가입한 이메일과 구글로 가입한 이메일이 같을 때 공지하기 위한 방법 찾기
  if (data?.platform === "kakao") {
    const { error } = await supabase
      .from("user")
      .update({ platform: "google" });
    if (error?.message)
      console.log(
        "가입된 구글 이메일이 있는데 해당 이메일이 카카오로 가입된 이메일과 같을 경우 platform key 만 업데이트를 진행했을 때 발생하는 에러 : ",
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
      .insert({ email, platform: "google" });
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
