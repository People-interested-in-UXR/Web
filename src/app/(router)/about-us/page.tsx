import Image from "next/image";

import { ReactNode, SetStateAction } from "react";

import { Container, PIXRHeader } from "@/app/_containers";
import { Description, ProfileCard } from "@/app/_ui/_atomics";

const Card = ({
  imagePosition,
  Image,
  Description,
}: {
  imagePosition: "left" | "right";
  Image: any;
  Description: ReactNode;
}) => {
  return (
    <div className="max-w-[900px] w-full break-keep text-pretty">
      {imagePosition === "left" ? (
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
          {Image}
          {Description}
        </div>
      ) : (
        <div className="flex justify-between items-center max-sm:flex-col-reverse max-sm:gap-4">
          {Description}
          {Image}
        </div>
      )}
    </div>
  );
};

export default async function Page({}) {
  return (
    <Container className="h-full min-h-screen">
      <PIXRHeader />
      {/* 모임 소개 */}
      <div className="flex flex-col items-center w-full sm:py-20 py-8 gap-16 bg-muted sm:px-10 px-8">
        <Card
          imagePosition="right"
          Image={
            <Image
              src={"/goal.png"}
              alt={"goal picture"}
              width={240}
              height={240}
            />
          }
          Description={
            <Description
              title="우리 모임은?"
              description={`우리 모임은 UX리서치에 관심있는 사람들이 함께 모여
          누구나 편하게 자신의 이야기를 나누는 공간이에요.
          사용자에 대해 알고자 하는 여러분들을 모두 환영해요!`}
            />
          }
        />
        <Card
          imagePosition="left"
          Image={
            <Image
              src={"/action.png"}
              alt={"action picture"}
              width={240}
              height={240}
            />
          }
          Description={
            <Description
              title="다양한 활동으로 만나요!"
              description={`아티클 스터디 / 북스터디 / 자유 토론 / 오프라인 밋업 등 다양한 활동이 진행되어요.
              새롭게 진행했으면 하는 활동이 있다면 자유롭게 제안해주세요.`}
            />
          }
        />
        <Card
          imagePosition="right"
          Image={
            <Image
              src={"/thinking.png"}
              alt={"thinking picture"}
              width={240}
              height={240}
            />
          }
          Description={
            <Description
              title="모임은 너무 무겁지 않게!"
              description={`우리 모임은 모임장이 혼자 UX리서처로 일하며 배움을 찾다보니 만들어졌어요.
              때문에 전문적인 정보를 알려드리기 보다는 함께 배우는 공간으로 만들어가고 있어요. 
              
              너무 무겁지 않게 UX리서치에 관심 있는 분들의 이야기를 나누는 곳이 되었으면 해요.
              자유롭게 떠나거나 언제든 돌아와 편하게 대화할 수 있는 곳으로 함께 만들어봐요.`}
            />
          }
        />
        <Card
          imagePosition="left"
          Image={
            <Image
              src={"/talk_about.png"}
              alt={"talk_about picture"}
              width={240}
              height={240}
            />
          }
          Description={
            <Description
              title="이런 이야기들을 나눠요!"
              description={`서로의 근황부터 최근의 관심사 혹은 업계에서 핫한 이야기들 무엇이든 좋아요.
              모임에서 이야기해보고 싶은 주제가 있다면 편하게 나눠주세요.
              꼭 UX리서치가 아니더라도 UX와 관련된 다양한 주제도 환영해요.`}
            />
          }
        />
      </div>
      {/* 운영진 */}
      <div className="sm:py-20 py-8 flex flex-col items-center w-full gap-4">
        <Description
          title="운영진"
          description="우리 모임을 함께 만들어가는 사람들"
          position="center"
        />
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 justify-center sm:gap-6 gap-4 mt-8">
          <ProfileCard
            name={"홍길동"}
            position={"UX Researcher"}
            introduce={`안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`}
            email={""}
            profile={""}
            secondary_email={""}
            sns={""}
          />
          <ProfileCard
            name={"홍길동"}
            position={"UX Researcher"}
            introduce={`안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`}
            email={""}
            profile={""}
            secondary_email={""}
            sns={""}
          />
          <ProfileCard
            name={"홍길동"}
            position={"UX Researcher"}
            introduce={`안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`}
            email={""}
            profile={""}
            secondary_email={""}
            sns={""}
          />
          <ProfileCard
            name={"홍길동"}
            position={"UX Researcher"}
            introduce={`안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`}
            email={""}
            profile={""}
            secondary_email={""}
            sns={""}
          />
          <ProfileCard
            name={"홍길동"}
            position={"UX Researcher"}
            introduce={`안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`}
            email={""}
            profile={""}
            secondary_email={""}
            sns={""}
          />
          <ProfileCard
            name={"홍길동"}
            position={"UX Researcher"}
            introduce={`안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에
          더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`}
            email={""}
            profile={""}
            secondary_email={""}
            sns={""}
          />
        </div>
      </div>
    </Container>
  );
}
