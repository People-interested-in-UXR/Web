import { Container, PIXRHeader } from "@/app/_containers";
import { Board, Card } from "@/app/_ui/_atomics/Board";
import { ICard } from "@/app/_ui/_atomics/Board/Card";
import { Fragment } from "react";

export default function Page({}) {
  const sample = [
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
    {
      title: "게시글 제목",
      author: "작성자",
      category: "Article",
      description:
        "본문 내용 미리보기는 한 줄까지만 보여주기. 나머지는 말줌임표로 처리하기",
    },
  ];
  return (
    <Container className="h-screen bg-default flex flex-col w-full">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16">
        <Board
          title="오프라인 모임"
          description="우리 모임에서 진행한 다양한 오프라인 모임 / 행사에 대한 스케치에요. 함께 참여해요."
          cards={sample}
        />
        <Board
          title="컨퍼런스"
          description="우리 모임에서 진행한 다양한 오프라인 모임 / 행사에 대한 스케치에요. 함께 참여해요."
          cards={sample}
        />
      </section>
    </Container>
  );
}
