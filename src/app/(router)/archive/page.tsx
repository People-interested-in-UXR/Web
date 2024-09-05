import { getChips, getNotionData } from "@/app/_domain/databases";
import { getUserInfo } from "@/app/_domain/user";
import { Board } from "@/app/_ui/_atomics/Board";
import { IChip } from "@/app/_ui/_atomics/Board/Board";
import { FixedSection, PostDetailModal } from "@/app/_ui/_components";
import { COOKIE, NAV, NOTION } from "@/app/utils/consts";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

type ArchiveChip =
  | "전체"
  | "북스터디"
  | "모임운영"
  | "자유토론"
  | "패널토크"
  | "아티클"
  | "오프라인"
  | "컨퍼런스";

const DynamicModal = dynamic(() => Promise.resolve(PostDetailModal), {
  ssr: false,
});

export default async function Page({}) {
  const loggedInUser = await getUserInfo();
  const id = NOTION.DATABASE_ID.ARCHIVE;

  const archiveData = await getNotionData(id, NOTION.KEY.ARCHIVE);
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
        database={archiveData}
        breadcrumb={[]}
        loggedInUser={loggedInUser}
      />

      <DynamicModal
        mode="create"
        breadcrumb={[NAV.ARCHIVE, NOTION.VALUE.ARCHIVE]}
        database={archiveData}
        loggedInUser={loggedInUser}
      />
    </section>
  );
}
