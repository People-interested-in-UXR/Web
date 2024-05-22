import { Container, PIXRHeader } from "@/app/_containers";
import { Board } from "@/app/_ui/_atomics/Board";
import { IChip } from "@/app/_ui/_atomics/Board/Chip";
export interface IProfileCard {
  name: string;
  job: string;
  introduce: string;
}
export default function Page({}) {
  const cardSamples = [
    {
      name: "홍길동",
      job: "UX Researcher",
      introduce: `안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에 더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`,
    },
    {
      name: "홍길동",
      job: "UX Researcher",
      introduce: `안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에 더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`,
    },
    {
      name: "홍길동",
      job: "Product designer",
      introduce: `안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에 더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`,
    },
    {
      name: "홍길동",
      job: "Data Analyst",
      introduce: `안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에 더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`,
    },
    {
      name: "홍길동",
      job: "Developer",
      introduce: `안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경 입니다.만약에 더 작성하게 되면 ... 처리로 줄여야 할 것 같은데 몇자까지?`,
    },
  ];

  const chipSamples: IChip[] = [
    { category: "전체" },
    { category: "UX Researcher" },
    { category: "Product designer" },
    { category: "PO/PM" },
    { category: "Data Analyst" },
    { category: "Developer" },
    { category: "Maketer" },
    { category: "Student" },
    { category: "ETC" },
  ];

  return (
    <Container className="h-full bg-default flex flex-col w-full">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16">
        <Board
          title={"우리 모임 멤버"}
          description={`우리 모임과 함께하는 사람들은 어떤 사람들 일까요?
          네트워킹을 통해 즐거운 모임을 만들고 서로 서로 도와요.`}
          chips={chipSamples}
          profileCards={cardSamples}
        />
      </section>
    </Container>
  );
}
