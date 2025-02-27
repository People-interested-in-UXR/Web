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
            "Cache-Control": "no-store",
          },
          cache: "no-store",
          next: {
            revalidate: 0,
            tags: ["members"],
          },
        })
      )?.json()
    : null;

  return user;
};

export default getUserInfo;
