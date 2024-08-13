import { Container, PIXRFooter, PIXRHeader } from "@/app/_containers";

import { Board } from "@/app/_ui/_atomics/Board";
import { IChip } from "@/app/_ui/_atomics/Board/Board";

import { User } from "@/app/utils/types/user/user";

export const dynamic = "force-dynamic";
type MemberCategory =
  | "전체"
  | "UX Researcher"
  | "Product Designer"
  | "PO/PM"
  | "Data Analyst"
  | "Developer"
  | "Maketer"
  | "Student"
  | "ETC";

export default async function Page({}) {
  //! 일어나서 이거 수정할 것 ( build 시 JSON.stringpy 에러 나옴)
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    cache: "no-cache",
  });

  const { users }: { users: User[] } = await data.json();

  const chipSamples: IChip<MemberCategory>[] = [
    { category: "전체" },
    { category: "UX Researcher" },
    { category: "Product Designer" },
    { category: "PO/PM" },
    { category: "Data Analyst" },
    { category: "Developer" },
    { category: "Maketer" },
    { category: "Student" },
    { category: "ETC" },
  ];

  return (
    <section className="flex flex-col items-center my-10 gap-16 min-h-calc-header">
      <Board
        title={"우리 모임 멤버"}
        description={`우리 모임과 함께하는 사람들은 어떤 사람들 일까요?
          네트워킹을 통해 즐거운 모임을 만들고 서로 서로 도와요.`}
        chips={chipSamples}
        users={users}
        database={undefined}
        breadcrumb={[]}
      />
    </section>
  );
}
