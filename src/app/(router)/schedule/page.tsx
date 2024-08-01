import { Container, PIXRHeader } from "@/app/_containers";
import { Calendar } from "@/app/_ui";
import { Icon, RegisterButton } from "@/app/_ui/_atomics";

export default async function Page({}) {
  const database_id = "2a3a7fdc75d64c4d8251c09354cd572d";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/schedule/${database_id}`,
    {
      cache: "no-store",
    }
  );
  const { pages } = await data.json();

  return (
    <Container className="min-h-screen h-full bg-default">
      <PIXRHeader />
      <section className="flex flex-col items-center mt-10 gap-16 px-4">
        <Calendar pages={pages} />
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
