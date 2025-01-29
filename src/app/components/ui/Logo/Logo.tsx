import { Theme } from "@/app/utils/types";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ theme = "system" }: { theme: Theme }) => {
  return (
    <Link href={"/"}>
      <Image
        width={96}
        height={47}
        className="max-md:w-[49px] max-md:h-6"
        src={`${
          theme === "light"
            ? "/logo/PIXR_logo_light.svg"
            : "/logo/PIXR_logo_dark.svg"
        }`}
        alt={"pixr 로고입니다."}
        priority
        style={{ width: "auto", height: "auto" }}
      ></Image>
    </Link>
  );
};
