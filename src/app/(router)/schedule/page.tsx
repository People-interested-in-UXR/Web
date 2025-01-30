import { Calendar } from "@/app/components/features/Calendar/Calendar";
import Description from "@/app/components/ui/Description/Description";
import { NOTION } from "@/app/utils/consts";

export default async function Page({}) {
  const database_id = NOTION.DATABASE_ID.SCHEDULE;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/schedule/${database_id}`,
    {
      next: { revalidate: 1800 },
    }
  );
  const { pages } = await data.json();

  return (
    <section className="w-full sm:px-4 pb-10  md:py-10 h-full flex items-center flex-col">
      <div className="max-md:hidden">
        <Description
          title="우리 모임 일정"
          description={`모임에서 진행되는 다양한 이벤트 일정을 알 수 있어요.
다음 스터디는 언제인지 바로 확인해보세요.`}
          position="center"
        />
      </div>
      <Calendar pages={pages} />
    </section>
  );
}
