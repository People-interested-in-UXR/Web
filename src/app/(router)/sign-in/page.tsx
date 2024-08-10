import { google } from "googleapis";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthButton } from "@/app/_ui/_atomics";

export default async function Page({}) {
  const loginInfo = cookies().getAll();
  const { isLogin, isKakaoLogin, isGoogleLogin } = {
    isKakaoLogin: loginInfo.find((cookie) => cookie.name === "_kt"),
    isGoogleLogin: loginInfo.find((cookie) => cookie.name === "_gt"),
    isLogin: loginInfo.find((cookie) => cookie.name === "_ui"),
  };

  const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/google/callback`;

  //MEMO: Google OAuth2
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri
  );

  const googleAuthUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    scope: ["email", "profile"],
  });

  //MEMO: Kakao OAuth2
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/kakao/callback&response_type=code`;

  if (isKakaoLogin) return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  if (isGoogleLogin) return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  return (
    <div className="w-full h-calc-header bg-default flex justify-center items-center">
      <div className="flex flex-col justify-center text-center gap-10">
        <h1 className="text-brown-900 h1-700-32">가입하고 스터디 참여하기</h1>
        <div className="flex flex-col gap-[11px] mx-2">
          <OAuthButton
            OAuthURL={kakaoAuthUrl}
            iconSrc={`/icon/sns/kakao/kakao.svg`}
            iconAlt={"카카오톡 아이콘"}
            social={"kakao"}
          />
          <OAuthButton
            OAuthURL={googleAuthUrl}
            iconSrc={`/icon/sns/google.svg`}
            iconAlt={"구글 아이콘"}
            social={"google"}
          />
        </div>
      </div>
    </div>
  );
}
