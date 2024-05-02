import { Container, PIXRHeader } from "@/app/_containers";
import { Icon } from "@/app/_ui";
import Link from "next/link";

export default function Page({}) {
  return (
    <Container>
      <PIXRHeader />
      <div className="w-full h-calc-header bg-default flex justify-center items-center">
        <div className="flex flex-col justify-center text-center gap-10">
          <h1 className="text-brown-900 h1-700-32">가입하고 스터디 참여하기</h1>
          <div className="flex flex-col gap-[11px] mx-2">
            <Link
              href={"/sign-up/term"}
              className="bg-[#FEE500] h-[45px] w-full rounded-[7px] px-4 py-3 flex items-center gap-[77px]"
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
              href={"/sign-up/term"}
              className="bg-white h-[45px] w-full rounded-[7px] px-4 py-3 flex items-center gap-[77px]"
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
