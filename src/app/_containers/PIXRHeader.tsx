import { Header, Logo, Navigation } from "../_ui";
import { cookies } from "next/headers";

const PIXRHeader = async () => {
  const user = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info`, {
      method: "GET",
      cache: "default",
      headers: {
        Cookie: `_ui=${cookies().get("_ui")?.value}`,
      },
    })
  )?.json();

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
