import { Container, PIXRHeader } from "@/app/_containers";
import { Calendar } from "@/app/_ui";
import { Icon, RegisterButton } from "@/app/_ui/_atomics";

export default async function Page({}) {
  // const data = await fetch("http://localhost:3000/api/notion/schedule", {
  //   cache: "no-store",
  // });
  // const { results } = await data.json();

  return (
    <Container className="min-h-screen h-full bg-default">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16 px-4">
        <Calendar />
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
