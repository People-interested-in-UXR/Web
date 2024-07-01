import { google } from "googleapis";
import { Container, PIXRHeader } from "@/app/_containers";
import { Icon } from "@/app/_ui";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  if (isKakaoLogin) return redirect(kakaoAuthUrl);
  if (isGoogleLogin) return redirect(googleAuthUrl);

  return (
    <Container className="h-full min-h-screen ">
      <PIXRHeader />
      <div className="w-full h-calc-header bg-default flex justify-center items-center">
        <div className="flex flex-col justify-center text-center gap-10">
          <h1 className="text-brown-900 h1-700-32">가입하고 스터디 참여하기</h1>
          <div className="flex flex-col gap-[11px] mx-2">
            <Link
              className="bg-[#FEE500] h-[45px] w-full rounded-[7px] px-4 py-3 flex items-center gap-[77px]"
              href={kakaoAuthUrl}
              replace
            >
              <Icon
                width={20}
                height={20}
                src={`/icon/sns/kakao/kakao.svg`}
                alt={"카카오톡 아이콘"}
              />

              <p className="b3-600-14 text-[#181600]">카카오 로그인</p>
            </Link>

            <Link
              href={googleAuthUrl}
              className="bg-white h-[45px] w-full rounded-[7px] px-4 py-3 flex items-center gap-[77px]"
              replace
            >
              <Icon
                width={20}
                height={20}
                src={`/icon/sns/google.svg`}
                alt={"카카오톡 아이콘"}
              />

              <p className="b3-600-14 text-[#181600]">구글 로그인</p>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
