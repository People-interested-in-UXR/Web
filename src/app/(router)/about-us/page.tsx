import { Board } from "@/app/components/features/Board/Board";
import Description from "@/app/components/ui/Description/Description";
import Image from "next/image";

import { ReactNode } from "react";

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
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/manager`,
    { method: "GET", cache: "force-cache", next: { tags: ["members"] } }
  ).then((res) => res.json());

  return (
    <>
      {/* 모임 소개 */}
      <div className="flex flex-col items-center w-full sm:py-20 py-8 gap-16 bg-background-muted sm:px-10 px-8">
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
      <section className="flex flex-col items-center my-10 gap-16 min-h-calc-header">
        <Board
          title={"우리 모임 멤버"}
          description={`우리 모임과 함께하는 사람들은 어떤 사람들 일까요?
          네트워킹을 통해 즐거운 모임을 만들고 서로 서로 도와요.`}
          users={users}
          database={undefined}
          breadcrumb={[]}
        />
      </section>
    </>
  );
}
