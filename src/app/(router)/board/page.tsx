import { getChips, getNotionData } from "@/app/_domain/databases";
import { getUserInfo } from "@/app/_domain/user";
import { Board } from "@/app/components/features/Board/Board";

import { PostDetailModal } from "@/app/components/features/Post/PostModal/PostDetailModal";
import { NAV, NOTION } from "@/app/utils/consts";

export type BoardChip = "전체" | "잡담" | "질문" | "새소식" | "인사이트";

export default async function Page({}) {
  const loggedInUser = await getUserInfo();
  const id = NOTION.DATABASE_ID.BOARD;

  const boardData = await getNotionData(id, NOTION.KEY.BOARD);
  const chips = await getChips<BoardChip>(id, NOTION.KEY.BOARD);

  return (
    <section className="flex flex-col items-center my-10 gap-16 relative min-h-calc-header h-full">
      <Board<BoardChip>
        title={NOTION.VALUE.BOARD}
        description={`자유게시판은 누구나 자유로운 의견을 남기는 공간입니다. \n 잡담 / 궁금한 질문 / 새로운 소식 / 인사이트 공유 등 다양한 이야기를 공유해주세요.`}
        chips={chips}
        breadcrumb={[NAV.BOARD, NOTION.VALUE.BOARD]}
        database={boardData}
        loggedInUser={loggedInUser}
      />
      <PostDetailModal
        mode="create"
        breadcrumb={[NAV.BOARD, NOTION.VALUE.BOARD]}
        database={boardData}
        loggedInUser={loggedInUser}
      />
    </section>
  );
}
