"use client";

import { redirect, useRouter } from "next/navigation";
import { Icon } from "../Icon/Icon";

interface IOAuthButton {
  OAuthURL: string;
  iconSrc: string;
  iconAlt: string;
  social: "kakao" | "google";
}

export default function OAuthButton({
  OAuthURL,
  iconSrc,
  iconAlt,
  social,
}: IOAuthButton) {
  const router = useRouter();

  const handleClick = async () => {
    router.push(OAuthURL);
  };

  return (
    <button
      className={`${
        social === "kakao" ? "bg-[#FEE500]" : "bg-white"
      } h-[45px] w-full rounded-[7px] px-4 py-3 flex items-center gap-[77px] cursor-pointer`}
      onClick={handleClick}
    >
      <Icon width={20} height={20} src={iconSrc} alt={iconAlt} />

      <p className="b3-600-14 text-[#181600]">
        {social === "kakao" ? "카카오" : "구글"} 로그인
      </p>
    </button>
  );
}
