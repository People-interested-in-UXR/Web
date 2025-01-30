import { Board, IChip } from "@/app/components/features/Board/Board";
import { MemberCategory, POSITIONS } from "@/app/utils/consts";

import { User } from "@/app/utils/types/user/user";

export const dynamic = "force-dynamic";

export default async function Page({}) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    cache: "force-cache",
    next: { tags: ["members"] },
  });

  const { users }: { users: User[] } = await data.json();

  const chipSamples: IChip<MemberCategory>[] = [
    { category: "전체" },
    ...POSITIONS.map((position) => ({ category: position })),
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
