import { Container, PIXRHeader } from "@/app/_containers";
import { Board } from "@/app/_ui/_atomics/Board";
import { IChip } from "@/app/_ui/_atomics/Board/Chip";

export default function Page({}) {
  const cardSamples = [
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article Study",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article Study",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article Study",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Discussion",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Discussion",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
  ];

  const chipSamples: IChip[] = [
    { category: "전체" },
    { category: "Article Study" },
    { category: "Book study" },
    { category: "Discussion" },
    { category: "Recommendation" },
  ];

  return (
    <Container className="h-full bg-default flex flex-col w-full">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16">
        <Board
          title={"지식 저장소"}
          description={`아카이브는 모임에서 진행한 스터디 / 토론에 대한 기록을 남겨두는 곳이에요.
          도움이 필요한 자료가 있으면 자유롭게 활용해주세요.`}
          chips={chipSamples}
          cards={cardSamples}
        />
      </section>
    </Container>
  );
}
