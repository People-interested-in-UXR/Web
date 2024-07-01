import { Header, Logo, Navigation } from "../_ui";
import { cookies } from "next/headers";

const PIXRHeader = () => {
  const loginInfo = cookies().getAll();

  return (
    <Header>
      <div className="flex items-center gap-4 w-full ">
        <Logo theme="light" />
        <p className="md:h3-700-20 b3-400-14 text-sub">
          UX 리서치에 관심 있는 사람
        </p>
      </div>

      <Navigation loginInfo={loginInfo} />
    </Header>
  );
};

export default PIXRHeader;
