import { Calendar } from "@/app/_ui";
import { NOTION } from "@/app/utils/consts";

export const dynamic = "force-dynamic";

export default async function Page({}) {
  const database_id = NOTION.DATABASE_ID.SCHEDULE;
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
    </section>
  );
}
