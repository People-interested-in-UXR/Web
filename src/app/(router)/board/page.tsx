import { Container, PIXRHeader } from "@/app/_containers";
import { Board } from "@/app/_ui/_atomics/Board";
import { IChip } from "@/app/_ui/_atomics/Board/Chip";

export default function Page({}) {
  const cardSamples = [
    {
      title: "게시글 제목",
      author: "작성자",
      category: "잡담",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "잡담",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "잡담",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "새소식",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "새소식",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
  ];

  const chipSamples: IChip[] = [
    { category: "전체" },
    { category: "잡담" },
    { category: "질문" },
    { category: "새소식" },
    { category: "인사이트" },
  ];

  return (
    <Container className="h-full bg-default flex flex-col w-full">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16">
        <Board
          title={"자유 게시판"}
          description={`자유게시판은 누구나 자유로운 의견을 남기는 공간입니다. \n 잡담 / 궁금한 질문 / 새로운 소식 / 인사이트 공유 등 다양한 이야기를 공유해주세요.`}
          chips={chipSamples}
          cards={cardSamples}
        />
      </section>
    </Container>
  );
}
