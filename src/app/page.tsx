import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import { HTMLAttributes, ReactNode } from "react";

import Button from "./components/ui/Button/Button";
import { Icon } from "./components/ui/Icon/Icon";
import { Section } from "./components/ui/Section/Section";
import { NAV } from "./utils/consts";

const Banner = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="py-20 flex justify-center items-center bg-background-default">
      {children}
    </div>
  );
};

const OrganizationRule = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="sm:py-20 py-8 flex justify-center items-center max-sm:px-8 bg-secondary">
      {children}
    </div>
  );
};

interface IGrid {
  imageSrc: string;
  imageAlt: string;
  href?: string;
  children: ReactNode;
}
const Grid = ({ imageSrc, imageAlt, href, children }: IGrid) => {
  return (
    <div className="w-full h-full ">
      <Link
        className="rounded-3xl bg-white text-default h-fit flex flex-col items-center gap-2 p-6 max-sm:p-4 group hover:bg-background-muted hover:border-primary-red hover:border-2 border-2 border-white"
        href={href || "#"}
        prefetch={true}
      >
        <Image
          width={140}
          height={140}
          src={imageSrc}
          alt={imageAlt}
          className="group-hover:scale-[1.2]"
        />
        <div className="flex justify-between w-[223.5px]">
          <p className="text-default h3-700-20 max-sm:h5-700-14 ">{children}</p>
          <button className="text-btn-default text-xl hover:text-btn-hover ">
            <Icon
              src={"/icon/common/right_arrow.svg"}
              alt={"링크 클릭을 위한 오른쪽 화살표 모양"}
              width={24.5}
              height={20}
              style={{ width: "100%", height: "auto" }}
            />
          </button>
        </div>
      </Link>
    </div>
  );
};

const Sponser = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="flex flex-col gap-10 bg-background-default items-center sm:py-20 py-10">
      {children}
    </div>
  );
};

export default async function Home() {
  const cookie = await cookies();
  const isLogin = cookie.has("_ui");

  return (
    <Section>
      <Banner>
        <div className="flex items-center justify-between max-lg:flex-col-reverse md:px-10 px-8 lg:gap-[154px] ">
          <div className="flex flex-col max-lg:items-center">
            <div className="">
              <h1 className="h0-700-40 max-sm:h3-700-20 mb-10 md:flex md:flex-col max-md:break-keep text-pretty ">
                <span>우리 모임은 UX리서치에 관심 있는 사람</span>
                <span>누구나 환영입니다.</span>
              </h1>
              <ul className="list-disc b1-500-20 text-sub mb-14 lg:pl-7 pl-4  break-words text-pretty max-sm:b1-500-12">
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
                  있으면 돼요.
                </li>
              </ul>
            </div>
            {isLogin ? (
              <div className="w-fit">
                <Link href={NAV.URL.MEMBERS}>
                  <Button>멤버 소개</Button>
                </Link>
              </div>
            ) : (
              <div className="w-fit">
                <Link href={NAV.URL.SIGN_UP}>
                  <Button>모임 참여하기</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
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
        <div className="flex flex-col items-center sm:gap-16 gap-8">
          <div className="flex flex-col text-center gap-4 break-keep text-pretty">
            <h2 className="sm:h1-700-32 h1-700-20 text-title">
              우리 모임 운영 방식
            </h2>
            <div className="b1-500-12 sm:b1-500-20  text-sub flex flex-col text-start">
              <p>
                온라인에서 주기적으로 북스터디 / 아티클 스터디 / 자유 토론
                세션을 열고있어요.
              </p>
              <p>
                또한 오프라인 네트워킹 모임과 컨퍼런스도 진행하고 있으니
                자유롭게 참여해요.
              </p>
            </div>
          </div>
          <div className="xl:flex sm:gap-8 gap-2 grid grid-cols-1">
            <div className="sm:flex sm:gap-8 gap-2 grid grid-cols-1">
              <Grid
                href={`${NAV.URL.ARCHIVE}?chip=북스터디`}
                imageSrc={"/home/book.png"}
                imageAlt={"북 스터디 이미지"}
              >
                북 스터디
              </Grid>
              <Grid
                href={`${NAV.URL.ARCHIVE}?chip=아티클`}
                imageSrc={"/home/article.png"}
                imageAlt={"아티클 스터디 이미지"}
              >
                아티클 스터디
              </Grid>
            </div>
            <div className="sm:flex sm:gap-8 gap-2 grid grid-cols-1">
              <Grid
                href={NAV.URL.MEETUPS}
                imageSrc={"/home/meeting.png"}
                imageAlt={"오프라인 정기모임 이미지"}
              >
                오프라인 / 컨퍼런스
              </Grid>
              <Grid
                href={NAV.URL.ARCHIVE}
                imageSrc={"/home/archive.png"}
                imageAlt={"컨퍼런스 / 세미나 이미지"}
              >
                지식저장소
              </Grid>
            </div>
          </div>
        </div>
      </OrganizationRule>
      <Sponser>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="sm:h1-700-32 h1-700-20">스폰서 모집</h2>
          <div className="flex flex-col items-center text-sub  sm:b1-500-20 b1-500-12">
            <p>PIXR은 업계 네트워킹 활성화를 위해 후원을 받고 있어요</p>
            <p>후원비는 대관비, 모임 유지비 등 비영리 활동에만 사용해요.</p>
            <p>여러분의 관심은 UXR 커뮤니티 활성화에 도움이 되어요.</p>
          </div>
        </div>
        <div className="">
          <Link
            href={"mailto:piiuxr.offical:gmail.com"}
            className="w-full h-full"
          >
            <Button>후원 문의하기</Button>
          </Link>
        </div>
      </Sponser>
    </Section>
  );
}
