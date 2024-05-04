"use client";
import Link from "next/link";
import { Header, Logo } from "../_ui";
import { NAV } from "../utils/consts";

const PIXRHeader = ({}) => {
  return (
    <Header>
      <Link href={"/"} className="flex items-center gap-4">
        <Logo theme="light" />
        <p className="h3-700-20 ">UX 리서치에 관심 있는 사람</p>
      </Link>

      <div className="flex gap-16 b2-400-16 items-center">
        <Link href={"/"}>{NAV.HOME}</Link>
        <Link href={"/about-us"}>{NAV.ABOUT_US}</Link>
        <div>{NAV.MEMBERS}</div>
        <div>{NAV.SCHEDULE}</div>
        <div>{NAV.MEETUPS}</div>
        <div>{NAV.ARCHIVE}</div>
        <div>{NAV.BOARD}</div>
        <div className="text-primary-red b2-600-16">{NAV.SIGN_UP}</div>
      </div>
    </Header>
  );
};

export default PIXRHeader;
