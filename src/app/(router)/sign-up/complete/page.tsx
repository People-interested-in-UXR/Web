import { Container, PIXRHeader } from "@/app/_containers";
import { Icon } from "@/app/_ui";
import Image from "next/image";

const ProfileCard = () => (
  <div className="relative w-[380px] h-[460px] bg-secondary p-2 rounded-3xl flex flex-col items-center drop-shadow-lg mt-10">
    <div className="absolute z-10 right-4 top-6 grid grid-cols-1 gap-4">
      <Icon
        src={"/icon/common/email.svg"}
        alt={"email icon"}
        height={36}
        width={36}
      />
      <Icon
        src={"/icon/common/sns.svg"}
        alt={"sns icon"}
        height={36}
        width={36}
      />
    </div>
    <Image
      src={"/sample.png"}
      alt={"profile image"}
      width={364}
      height={320}
      className="rounded-3xl"
    />
    <div className="p-4 text-sub w-full">
      <div className="flex gap-2 mt-2">
        <span className="h3-700-20 text-title">홍길동</span>
        <span className="b2-600-16 ">UX Researcher</span>
      </div>
      <div className="flex text-[8px] mt-2">
        <div className="b2-400-16  w-full break-words line-clamp-2 text-sub">
          안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?
        </div>
      </div>
    </div>
  </div>
);

export default function Page({}) {
  return (
    <Container className="h-screen bg-default flex flex-col w-full">
      <PIXRHeader />
      <div className="flex items-center flex-col gap-4 mt-10">
        {/* <div className="absolute flex justify-between w-[640px] rounded-2xl bg-brown-900 text-accent items-center px-6 py-[17px] mt-6">
          <div>회원가입이 완료되었습니다.</div>
          <button className="flex text-btn-default cursor-pointer">
            <div>Members 바로가기</div>
            <Icon
              src={"/icon/common/bottom_point_arrows_red.svg"}
              alt={"bottom pointer arrow"}
              className="rotate-[270deg] fill-btn-default"
              height={20}
              width={20}
            />
          </button>
        </div> */}

        <div className="flex flex-col items-center gap-8">
          <Icon
            src={"/icon/common/firecracker.svg"}
            alt={"email icon"}
            width={90}
            height={120}
            className=""
          />
          <div className="flex items-center flex-col gap-4">
            <h1 className="h1-700-32 text-title">PIXR 가입완료!</h1>
            <div className="flex flex-col items-center b1-500-20 text-sub">
              <div className="">가입을 환영해요!</div>
              <div>
                이제 PIXR에서 UX research에 대해 자유롭게 이야기를 시작해보세요
              </div>
            </div>
          </div>
        </div>

        <ProfileCard />

        <div className="flex justify-between w-[640px] rounded-2xl bg-brown-900 text-accent items-center px-6 py-[17px] mt-6">
          <div>회원가입이 완료되었습니다.</div>
          <button className="flex text-btn-default cursor-pointer">
            <div>Members 바로가기</div>
            <Icon
              src={"/icon/common/bottom_point_arrows_red.svg"}
              alt={"bottom pointer arrow"}
              className="rotate-[270deg] fill-btn-default"
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </Container>
  );
}
