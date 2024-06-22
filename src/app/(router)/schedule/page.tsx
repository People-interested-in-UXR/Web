import { Container, PIXRHeader } from "@/app/_containers";
import { Icon, RegisterButton } from "@/app/_ui/_atomics";

export default async function Page({}) {
  const data = await fetch("http://localhost:3000/api/notion/schedule", {
    cache: "no-store",
  });
  const { results } = await data.json();

  return (
    <Container className="h-full min-h-screen ">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16">
        <div>Content</div>
        <RegisterButton>
          <Icon
            src={"/icon/common/pencil.svg"}
            alt={"plus icon"}
            height={24}
            width={24}
          />
          <span className="h4-600-18">일정 등록하기</span>
        </RegisterButton>
      </section>
    </Container>
  );
}
