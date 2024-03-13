import { Theme } from "@/app/utils/types";
import Image from "next/image";

export default function Logo({ theme = "system" }: { theme: Theme }) {
  return (
    <Image
      width={96}
      height={47}
      src={`${theme === "light" ? "/logo/PIXR_logo_light.svg" : "/logo/PIXR_logo_dark.svg"}`}
      alt={"pixr 로고입니다."}
    ></Image>
  );
}
