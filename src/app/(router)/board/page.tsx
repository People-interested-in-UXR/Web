import { getChips, getNotionData } from "@/app/_domain/databases";
import { WritingModal } from "@/app/_ui";
import { Board } from "@/app/_ui/_atomics/Board";
import { COOKIE, NAV, NOTION } from "@/app/utils/consts";

import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const DynamicModal = dynamic(() => Promise.resolve(WritingModal), {
  ssr: false,
});

export default async function Page({}) {
  const userInfo = cookies().get(COOKIE.USER);
  const id = NOTION.DATABASE_ID.BOARD;

  const boardData = await getNotionData(id, NOTION.KEY.BOARD);
  const chips = await getChips(id, NOTION.KEY.BOARD);

  return (
    <section className="flex flex-col items-center my-10 gap-16 relative min-h-calc-header h-full">
      <Board
        title={NOTION.VALUE.BOARD}
        description={`자유게시판은 누구나 자유로운 의견을 남기는 공간입니다. \n 잡담 / 궁금한 질문 / 새로운 소식 / 인사이트 공유 등 다양한 이야기를 공유해주세요.`}
        chips={chips}
        breadcrumb={[NAV.BOARD, NOTION.VALUE.BOARD]}
        database={boardData}
      />
      <DynamicModal
        mode="create"
        breadcrumb={[NAV.BOARD, NOTION.VALUE.BOARD]}
        database={boardData}
        userInfo={userInfo}
      />
    </section>
  );
}
