import { Footer, Header } from "./_ui/_components";
import { Container, PIXRHeader, Section } from "./_containers";

export default function Home() {
  return (
    <Container className="w-full h-screen">
      <PIXRHeader />
      <Section></Section>
      <Footer></Footer>
    </Container>
  );
}
