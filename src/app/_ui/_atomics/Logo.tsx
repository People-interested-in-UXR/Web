import Image from "next/image";

export default function Logo({}) {
  return (
    <Image
      width={96}
      height={47}
      src={`/logo/PIXR_logo.svg`}
      alt={"pixr 로고입니다."}
    ></Image>
  );
}
