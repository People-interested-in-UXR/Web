import { cookies } from "next/headers";

const getUserInfo = async () => {
  const user = cookies().get("_ui")?.value
    ? await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info`, {
          method: "GET",
          headers: {
            Cookie: `_ui=${cookies().get("_ui")?.value}`,
          },
          next: {
            tags: ["user-info"],
          },
        })
      )?.json()
    : null;

  return user;
};

export default getUserInfo;
