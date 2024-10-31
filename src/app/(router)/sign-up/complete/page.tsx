import { Section } from "@/app/_containers";
import { getUserInfo } from "@/app/_domain/user";
import { Fireworks, Icon, ProfileCard, SignUpToast } from "@/app/_ui";

import Link from "next/link";

export default async function Page({}) {
  const user = await getUserInfo();

  return (
    <Section>
      <div className="flex items-center flex-col gap-4 my-10 px-4 min-h-calc-header relative h-full">
        <div className="flex flex-col items-center gap-8">
          <Fireworks />
          <div className="flex items-center flex-col gap-4">
            <h1 className="h1-700-32 text-title">PIXR 가입완료!</h1>
            <div className="flex flex-col items-center b1-500-20 text-sub">
              <div className="">가입을 환영해요!</div>
              <div className="text-center text-pretty break-keep">
                이제 PIXR에서 UX research에 대해 자유롭게 이야기를 시작해보세요
              </div>
            </div>
          </div>
        </div>

        <ProfileCard {...user} />
      </div>
      <div className="sticky w-full h-full bottom-5 mb-[70px]">
        <SignUpToast>
          <div>회원가입이 완료!</div>
          <button className="flex text-btn-default cursor-pointer">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/member?refresh=true`}
            >
              맴버 소개 바로가기
            </Link>
            <Icon
              src={"/icon/common/bottom_point_arrows_red.svg"}
              alt={"bottom pointer arrow"}
              className="rotate-[270deg] fill-btn-default"
              height={20}
              width={20}
            />
          </button>
        </SignUpToast>
      </div>
    </Section>
  );
}
