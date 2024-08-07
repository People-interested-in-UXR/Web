import { Container, PIXRFooter, PIXRHeader } from "@/app/_containers";
import { SignUpForm } from "@/app/_ui";

export default function Page({}) {
  return (
    <Container className="h-full bg-default flex flex-col w-full min-h-screen">
      <PIXRHeader />
      <div className="w-full  bg-default flex justify-center">
        <div className="flex flex-col justify-center text-center gap-8 my-12">
          <h1 className="text-brown-900 h1-700-32 break-keep text-pretty px-[84px]">
            Members에 등록할 프로필을 만들어 볼까요?
          </h1>
          {/* 샘플 프로필 이미지 */}
          <SignUpForm />
        </div>
      </div>
      <PIXRFooter />
    </Container>
  );
}
