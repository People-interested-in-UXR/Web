import { getNotionData } from "@/app/_domain/databases";
import { Board } from "@/app/_ui/_atomics/Board";
import { IChip } from "@/app/_ui/_atomics/Board/Board";
import { FixedSection, PostDetailModal } from "@/app/_ui/_components";
import { COOKIE, NAV, NOTION } from "@/app/utils/consts";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

type ArchiveCategory =
  | "전체"
  | "Article Study"
  | "Book study"
  | "Discussion"
  | "Recommendation";

const DynamicModal = dynamic(() => Promise.resolve(PostDetailModal), {
  ssr: false,
});

export default async function Page({}) {
  const userCookieInfo = cookies().get(COOKIE.USER);

  const chipSamples: IChip<ArchiveCategory>[] = [
    { category: "전체" },
    { category: "Article Study" },
    { category: "Book study" },
    { category: "Discussion" },
    { category: "Recommendation" },
  ];

  const id = NOTION.DATABASE_ID.ARCHIVE;
  const archiveData = await getNotionData(id, NOTION.KEY.ARCHIVE);

  return (
    <section className="flex flex-col items-center my-10 gap-16 relative min-h-calc-header h-full">
      <Board<ArchiveCategory>
        title={"지식 저장소"}
        description={`아카이브는 모임에서 진행한 스터디 / 토론에 대한 기록을 남겨두는 곳이에요.
          도움이 필요한 자료가 있으면 자유롭게 활용해주세요.`}
        chips={chipSamples}
        database={archiveData}
        breadcrumb={[]}
      />

      <DynamicModal
        mode="create"
        breadcrumb={[NAV.ARCHIVE, NOTION.VALUE.ARCHIVE]}
        database={archiveData}
        userCookieInfo={userCookieInfo}
      />
    </section>
  );
}
