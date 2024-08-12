import { getUserInfo } from "../_domain/user";
import { Header, Logo, Navigation } from "../_ui";

const PIXRHeader = async () => {
  const user = await getUserInfo();

  return (
    <Header>
      <div className="flex items-center gap-4 w-full ">
        <Logo theme="light" />
        <p className="md:h3-700-20 b3-400-14 text-sub">
          UX 리서치에 관심 있는 사람
        </p>
      </div>

      <Navigation user={user} />
    </Header>
  );
};

export default PIXRHeader;
