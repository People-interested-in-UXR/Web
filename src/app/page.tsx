import { HTMLAttributes } from "react";
import { Container, PIXRHeader, Section, PIXRFooter } from "./_containers";
import Image from "next/image";

const Banner = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="py-20 flex justify-center items-center bg-default">
      {children}
    </div>
  );
};

const OrganizationRule = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="py-20 flex justify-center items-center">{children}</div>
  );
};

const Sponser = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="flex flex-col gap-10 bg-default items-center py-20">
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <Container className="w-full">
      <PIXRHeader />
      <Section>
        <Banner>
          <div className="flex gap-[154px]">
            <div>
              <h1 className="h0-700-40 whitespace-pre mb-10">{`우리 모임은 UX리서치에 관심 있는 사람\n누구나 환영합니다.`}</h1>
              <ul className="list-disc b1-500-20 text-sub mb-14 pl-7">
                <li>
                  누구나 편하게 자신의 UXR 경험, 고민을 편하게 나눌 수 있어요.
                </li>
                <li>
                  사용자에 대해 고민하고 더 나은 경험을 제공하기 위한 방법들을
                  함께 나누어봐요.
                </li>
                <li>여러분이 학생이든 주니어든 시니어든 상관 없어요. </li>
                <li>
                  사용자를 위한 마음과 열정 그리고 함께 나누고자 하는 마음만
                  있어면 돼요.
                </li>
              </ul>
              <div className="">
                <button className="bg-btn-default hover:bg-btn-hover text-accent h4-600-18 px-10 py-4 rounded-2xl">
                  모임 참여하기
                </button>
              </div>
            </div>
            <div>
              <Image
                width={385}
                height={385}
                src={`/home/banner.png`}
                alt="어피니티 다이어그램 이미지"
              />
            </div>
          </div>
        </Banner>
        <OrganizationRule>
          <div className="flex flex-col items-center gap-16">
            <div className="flex flex-col text-center gap-4">
              <h2 className="h1-700-32 text-title">우리 모임 운영 방식</h2>
              <div className="b1-500-20 text-sub">설명란</div>
            </div>
            <div className="flex gap-8">
              <div className="flex gap-8">
                <div className="rounded-3xl bg-white text-default p-6 flex flex-col items-center gap-2">
                  <Image
                    width={140}
                    height={140}
                    src={"/home/book.png"}
                    alt={"북 스터디 이미지"}
                  />
                  <div className="flex justify-between w-[223.5px]">
                    <p className="text-default h3-700-20">북 스터디</p>
                    <button className="text-primary-red text-xl">
                      &#10140;
                    </button>
                  </div>
                </div>
                <div className="rounded-3xl bg-white text-default p-6 flex flex-col items-center gap-2">
                  <Image
                    width={140}
                    height={140}
                    src={"/home/article.png"}
                    alt={"아티클 스터디 이미지"}
                  />
                  <div className="flex justify-between w-[223.5px]">
                    <p className="text-default h3-700-20">아티클 스터디</p>
                    <button className="text-primary-red text-xl">
                      &#10140;
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="rounded-3xl bg-white text-default p-6 flex flex-col items-center gap-2">
                  <Image
                    width={140}
                    height={140}
                    src={"/home/meeting.png"}
                    alt={"오프라인 정기모임 이미지"}
                  />
                  <div className="flex justify-between w-[223.5px]">
                    <p className="text-default h3-700-20">오프라인 정기모임</p>
                    <button className="text-primary-red text-xl">
                      &#10140;
                    </button>
                  </div>
                </div>
                <div className="rounded-3xl bg-white text-default p-6 flex flex-col items-center gap-2">
                  <Image
                    width={140}
                    height={140}
                    src={"/home/conference.png"}
                    alt={"컨퍼런스 / 세미나 이미지"}
                  />
                  <div className="flex justify-between w-[223.5px]">
                    <p className="text-default h3-700-20">컨퍼런스 / 세미나</p>
                    <button className="text-primary-red text-xl">
                      &#10140;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OrganizationRule>
        <Sponser>
          <div className="flex flex-col gap-4 items-center">
            <h2 className="h1-700-32">스폰서 모집</h2>
            <div className="flex flex-col items-center text-sub b1-500-20">
              <p>PIXR은 업계 네트워킹 활성화를 위해 후원을 받고 있어요</p>
              <p>
                후원비는 대관비, 모임 유지비 등으로 더 많은 리서치 활성화에
                도움이 됩니다
              </p>
            </div>
          </div>
          <div className="">
            <button className="bg-btn-default hover:bg-btn-hover text-accent h4-600-18 px-10 py-4 rounded-2xl">
              모임 참여하기
            </button>
          </div>
        </Sponser>
      </Section>
      <PIXRFooter />
    </Container>
  );
}
