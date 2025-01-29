import { SignUpForm } from "@/app/_ui";

export default function Page({}) {
  return (
    <div className="w-full  bg-background-default flex justify-center min-h-calc-header">
      <div className="flex flex-col justify-center text-center gap-8 my-12">
        <h1 className="text-brown-900 h1-700-32 break-keep text-pretty px-[84px]">
          Members에 등록할 프로필을 만들어 볼까요?
        </h1>
        {/* 샘플 프로필 이미지 */}
        <SignUpForm user={undefined} />
      </div>
    </div>
  );
}
