import { Container, PIXRHeader } from "@/app/_containers";
import { Form } from "@/app/_ui";

export default function Page() {
  return (
    <Container>
      <PIXRHeader />
      <div className="w-full h-calc-header bg-default flex justify-center items-center">
        <div className="flex flex-col justify-center text-center gap-10 w-[300px]">
          <h1 className="text-brown-900 h1-700-32 break-keep text-pretty">
            약관에 동의가 필요해요
          </h1>
          <Form />
        </div>
      </div>
    </Container>
  );
}
