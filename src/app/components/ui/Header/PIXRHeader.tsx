import { getUserInfo } from "../../../_domain/user";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

import Header from "./Header";

const PIXRHeader = async () => {
  const user = await getUserInfo();

  return (
    <Header>
      <div className="flex items-center gap-4 w-full">
        <Logo theme="light" />
        <p className="b3-500-14 md:h3-700-20">UX 리서치에 관심 있는 사람</p>
      </div>

      <Navigation user={user} />
    </Header>
  );
};

export default PIXRHeader;
