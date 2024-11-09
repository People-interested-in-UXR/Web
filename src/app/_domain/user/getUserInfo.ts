import { cookies } from "next/headers";

const getUserInfo = async () => {
  const cookie = await cookies();
  const userCookie = cookie.get("_ui")?.value;
  const user = userCookie
    ? await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info`, {
          method: "GET",
          headers: {
            Cookie: `_ui=${userCookie}`,
          },
          next: {
            tags: ["members"],
          },
        })
      )?.json()
    : null;

  return user;
};

export default getUserInfo;
