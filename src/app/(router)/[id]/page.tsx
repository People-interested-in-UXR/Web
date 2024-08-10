import { getUserInfo } from "@/app/_domain/user";
import { SignUpForm } from "@/app/_ui";

export default async function Page({}) {
  const user = await getUserInfo();

  return (
    <div className="w-full  bg-default flex justify-center h-full min-h-calc-header">
      <div className="flex flex-col justify-center text-center gap-8 my-12 ">
        <h1 className="text-brown-900 h1-700-32 break-keep text-pretty px-[84px]">
          프로필을 수정해주세요
        </h1>
        {/* 샘플 프로필 이미지 */}
        <SignUpForm user={user} />
      </div>
    </div>
  );
}
