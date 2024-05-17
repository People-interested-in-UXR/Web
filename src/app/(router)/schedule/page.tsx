import { Container, PIXRHeader } from "@/app/_containers";

export default async function Page({}) {
  const data = await fetch("http://localhost:3001/api/notion/schedule", {
    cache: "no-store",
  });
  const { results } = await data.json();

  return (
    <Container>
      <PIXRHeader />
      dd
    </Container>
  );
}
