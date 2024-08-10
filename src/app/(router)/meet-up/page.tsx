import { Container, PIXRFooter, PIXRHeader } from "@/app/_containers";
import { Board } from "@/app/_ui/_atomics/Board";

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
    <section className="flex flex-col items-center my-10 gap-16 h-full min-h-calc-header">
      <Board
        title="오프라인 모임"
        description="우리 모임에서 진행한 다양한 오프라인 모임 / 행사에 대한 스케치에요. 함께 참여해요."
        database={undefined}
        breadcrumb={[]}
      />
      <Board
        title="컨퍼런스"
        description="우리 모임에서 진행한 다양한 오프라인 모임 / 행사에 대한 스케치에요. 함께 참여해요."
        database={undefined}
        breadcrumb={[]}
      />
    </section>
  );
}
