import { Container, PIXRHeader } from "@/app/_containers";
import { Checkbox } from "@/app/_ui";

export default function Page({}) {
  return (
    <Container>
      <PIXRHeader />
      <div className="w-full h-calc-header bg-default flex justify-center items-center">
        <div className="flex flex-col justify-center text-center gap-10">
          <h1 className="text-brown-900 h1-700-32">약관에 동의가 필요해요</h1>
          <form action="" method="post">
            <div>
              <Checkbox id={"all"}>전체동의 선택항목에 대한 동의 포함</Checkbox>
            </div>
            <div>
              <Checkbox id={"all"}>전체동의 선택항목에 대한 동의 포함</Checkbox>
            </div>
            <div>
              <Checkbox id={"all"}>전체동의 선택항목에 대한 동의 포함</Checkbox>
            </div>
            <div>
              <Checkbox id={"all"}>전체동의 선택항목에 대한 동의 포함</Checkbox>
            </div>
            <div>
              <Checkbox id={"all"}>전체동의 선택항목에 대한 동의 포함</Checkbox>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
