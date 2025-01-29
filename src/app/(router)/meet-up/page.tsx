import { getNotionData } from "@/app/_domain/databases";
import { Board } from "@/app/components/features/Board/Board";

import { NOTION } from "@/app/utils/consts";

export default async function Page({}) {
  const id = NOTION.DATABASE_ID.MEET_UP;
  const meetUpData = await getNotionData(id, NOTION.KEY.MEET_UP);

  const [offline, conferences] = [
    meetUpData.pages.filter(
      (page: any) => page?.properties?.["모임유형"]?.select?.name === "오프라인"
    ),
    meetUpData.pages.filter(
      (page: any) => page?.properties?.["모임유형"]?.select?.name === "컨퍼런스"
    ),
  ];

  return (
    <section className="flex flex-col items-center my-10 gap-16 h-full min-h-calc-header">
      <Board
        title="오프라인 모임"
        description="우리 모임에서 진행한 다양한 오프라인 모임 / 행사에 대한 스케치에요. 함께 참여해요."
        database={{ pages: offline, has_more: meetUpData?.has_more }}
        breadcrumb={[]}
      />
      <Board
        title="컨퍼런스"
        description="우리 모임에서 진행한 다양한 오프라인 모임 / 행사에 대한 스케치에요. 함께 참여해요."
        database={{ pages: conferences, has_more: meetUpData?.has_more }}
        breadcrumb={[]}
      />
    </section>
  );
}
