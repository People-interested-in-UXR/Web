import { Calendar } from "@/app/_ui";

export const dynamic = "force-dynamic";

export default async function Page({}) {
  const database_id = "2a3a7fdc75d64c4d8251c09354cd572d";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/schedule/${database_id}`,
    {
      cache: "no-cache",
    }
  );
  const { pages } = await data.json();

  return (
    <section className="w-full px-4 max-h-calc-header py-10 h-full flex justify-center items-center">
      <Calendar pages={pages} />
      {/* <RegisterButton>
          <Icon
            src={"/icon/common/pencil.svg"}
            alt={"plus icon"}
            height={24}
            width={24}
          />
          <span className="h4-600-18">일정 등록하기</span>
        </RegisterButton> */}
    </section>
  );
}
