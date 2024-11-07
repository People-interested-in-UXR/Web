import { getChips, getNotionData } from "@/app/_domain/databases";
import { getUserInfo } from "@/app/_domain/user";
import { Board } from "@/app/_ui/_atomics/Board";

import { PostDetailModal } from "@/app/_ui/_components";
import { NAV, NOTION } from "@/app/utils/consts";

type ArchiveChip =
  | "전체"
  | "북스터디"
  | "모임운영"
  | "자유토론"
  | "패널토크"
  | "아티클"
  | "오프라인"
  | "컨퍼런스";

export default async function Page({}) {
  const loggedInUser = await getUserInfo();
  const id = NOTION.DATABASE_ID.ARCHIVE;

  const archiveData = await getNotionData(id, NOTION.KEY.ARCHIVE, {
    start: 1,
    end: 6,
  });
  const database = {
    ...archiveData,
    pages: archiveData.pages.filter(
      (page: any) =>
        page.properties["모임유형"]?.select?.name !== "컨퍼런스" &&
        page.properties["모임유형"]?.select?.name !== "오프라인"
    ),
  };
  const chips = await (
    await getChips<ArchiveChip>(id, NOTION.KEY.ARCHIVE)
  ).filter(
    (chip) => chip?.category !== "오프라인" && chip?.category !== "컨퍼런스"
  );

  return (
    <section className="flex flex-col items-center my-10 gap-16 relative min-h-calc-header h-full">
      <Board<ArchiveChip>
        title={"지식 저장소"}
        description={`아카이브는 모임에서 진행한 스터디 / 토론에 대한 기록을 남겨두는 곳이에요.
          도움이 필요한 자료가 있으면 자유롭게 활용해주세요.`}
        chips={chips}
        database={database}
        breadcrumb={[]}
        loggedInUser={loggedInUser}
      />

      <PostDetailModal
        mode="create"
        breadcrumb={[NAV.ARCHIVE, NOTION.VALUE.ARCHIVE]}
        database={database}
        loggedInUser={loggedInUser}
      />
    </section>
  );
}
