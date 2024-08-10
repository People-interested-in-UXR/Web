import { Container, PIXRFooter, PIXRHeader } from "@/app/_containers";
import { WritingModal } from "@/app/_ui";
import { Board } from "@/app/_ui/_atomics/Board";
import { NAV } from "@/app/utils/consts";
import { IPageProperty, ISelect } from "@/app/utils/types/notion/page";

import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const DynamicModal = dynamic(() => Promise.resolve(WritingModal), {
  ssr: false,
});

export default async function Page({}) {
  const userInfo = cookies().get("_ui");

  const database_id = "d45fa5365c054b549d0a56b9a4ed5070";
  const { pages } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/board/${database_id}`,
      {
        cache: "default",
      }
    )
  ).json();

  const { props }: { props: IPageProperty[] } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/prop/?database_id=${database_id}`,
      {
        cache: "default",
      }
    )
  ).json();

  const database = {
    id: database_id,
    props,
    pages,
  };

  const filterdProps = props.filter(
    (prop) => "select" in prop && prop.name === "모임 유형"
  )[0] as Pick<ISelect, "select">;

  const chips = [
    { category: "전체" },
    ...(filterdProps.select.options ?? []).map((option) => ({
      category: option.name,
    })),
  ];

  return (
    <section className="flex flex-col items-center my-10 gap-16 relative min-h-calc-header h-full">
      <Board
        title={"자유 게시판"}
        description={`자유게시판은 누구나 자유로운 의견을 남기는 공간입니다. \n 잡담 / 궁금한 질문 / 새로운 소식 / 인사이트 공유 등 다양한 이야기를 공유해주세요.`}
        chips={chips}
        breadcrumb={[NAV.BOARD, "자유 게시판"]}
        database={database}
      />
      <DynamicModal
        mode="create"
        breadcrumb={[NAV.BOARD, "자유 게시판"]}
        database={database}
        userInfo={userInfo}
      />
    </section>
  );
}
