"use client";

import { NAV } from "@/app/utils/consts";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { useModalToggle } from "../../hooks";

interface IPIXRHeaderNavList {
  type: "common" | "auth";
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}
const PIXRHeaderNavList = ({
  type,
  href = "",
  children,
  onClick,
}: IPIXRHeaderNavList) => {
  return (
    <>
      {type === "common" || children !== NAV.SIGN_OUT ? (
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}${href}`}
          onClick={onClick}
        >
          <li
            className={`${children === NAV.SIGN_UP ? "text-primary-red b2-600-16 hover:bg-primary-red hover:text-white p-2 rounded-lg text-start" : "p-2 rounded-lg hover:bg-secondary hover:text-accent"}`}
          >
            {children}
          </li>
        </Link>
      ) : (
        <button onClick={onClick}>
          <li className="text-primary-red b2-600-16 hover:bg-primary-red hover:text-white p-2 rounded-lg text-start">
            {children}
          </li>
        </button>
      )}
    </>
  );
};

interface Cookie {
  name: string;
  value: string;
}

interface INavigation {
  loginInfo: Array<Cookie>;
}
const Navigation = ({ loginInfo }: INavigation) => {
  const { isLogin, isKakaoLogin, isGoogleLogin } = {
    isKakaoLogin: loginInfo.find((cookie) => cookie.name === "_kt"),
    isGoogleLogin: loginInfo.find((cookie) => cookie.name === "_gt"),
    isLogin: loginInfo.find((cookie) => cookie.name === "_ui"),
  };
  const router = useRouter();
  const { showModal, openModal, closeModal } = useModalToggle();
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOutClick = async () => {
    closeModal();
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/sign-out`, {
      cache: "no-store",
    });

    setTimeout(async () => {
      window.location.reload();
    }, 200);
  };

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <>
      <nav className="w-full flex items-center max-md:hidden">
        {/* Desktop */}
        <ul className="flex justify-between w-full b2-400-16 items-center max-xl:hidden">
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>{NAV.HOME}</Link>
          </li>
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/about-us`}>
              {NAV.ABOUT_US}
            </Link>
          </li>
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/member`}>
              {NAV.MEMBERS}
            </Link>
          </li>
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/schedule`}>
              {NAV.SCHEDULE}
            </Link>
          </li>
          {/* <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/meet-up`}>{NAV.MEETUPS}</Link>
          </li>
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/archive`}>{NAV.ARCHIVE}</Link>
          </li> */}
          <li className="hover:text-muted active:text-default focus:font-bold active:font-bold focus:text-default">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/board`}>
              {NAV.BOARD}
            </Link>
          </li>
          <li className="text-primary-red hover:text-btn-hover b2-600-16">
            {isLogin ? (
              <button onClick={handleSignOutClick}>{NAV.SIGN_OUT}</button>
            ) : (
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`}>
                {NAV.SIGN_UP}
              </Link>
            )}
          </li>
          <li
            className="flex items-center gap-2 hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={"/sample.png"}
              alt={""}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex gap-2">
              <div>마이페이지</div>
              <Image
                src={"/icon/common/navigation_profile_arrow.svg"}
                alt={""}
                width={16}
                height={16}
              />
            </div>
          </li>
        </ul>
        {showProfile && (
          <div
            className="w-[300px]  absolute right-10 bg-white rounded-2xl p-6 top-[100px] animate-fade-down drop-shadow-m"
            // onMouseLeave={() => setShowProfile(false)}
          >
            <div className="border-b border-muted flex gap-4 pb-6">
              <Image
                src={"/sample.png"}
                alt={""}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <h3 className="text-default h3-700-20">홍길동</h3>
                <p className="text-muted b2-600-16">UX Researcher</p>
              </div>
            </div>
            <div className="pt-6">
              <div className="flex flex-col gap-6 b3-400-14">
                <button className="flex gap-2">
                  <Image
                    width={16}
                    height={16}
                    src={"/icon/common/edit.svg"}
                    alt={""}
                  />
                  <div className="text-sub">Edit / 프로필 수정</div>
                </button>
                <button className="flex gap-2">
                  <Image
                    width={16}
                    height={16}
                    src={"/icon/common/logout.svg"}
                    alt={""}
                  />
                  <div className="text-sub">Logout / 로그아웃</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile */}
      {!showModal && (
        <Image
          className="xl:hidden cursor-pointer"
          src={"/icon/common/collapse.svg"}
          alt={"헤더 네비게이션 아이콘"}
          width={24}
          height={24}
          onClick={openModal}
        />
      )}
      {showModal &&
        createPortal(
          <div
            className="xl:hidden top-0 fixed w-full h-full bg-brown-800 bg-opacity-60"
            onClick={closeModal}
          >
            {/* Modal Menu */}
            <nav
              className="fixed min-w-[216px] max-w-[400px] h-full bg-white z-20  right-0"
              onClick={(event) => event.stopPropagation()}
            >
              <ul className="p-4 gap-4 flex flex-col text-sub b2-400-16 ">
                {isLogin ? (
                  <PIXRHeaderNavList type="auth" onClick={handleSignOutClick}>
                    {NAV.SIGN_OUT}
                  </PIXRHeaderNavList>
                ) : (
                  <PIXRHeaderNavList type="auth" href="/sign-in">
                    {NAV.SIGN_UP}
                  </PIXRHeaderNavList>
                )}
                <PIXRHeaderNavList type="common" href="/">
                  {NAV.HOME}
                </PIXRHeaderNavList>
                <PIXRHeaderNavList type="common" href="/about-us">
                  {NAV.ABOUT_US}
                </PIXRHeaderNavList>
                <PIXRHeaderNavList type="common" href="/member">
                  {NAV.MEMBERS}
                </PIXRHeaderNavList>
                <PIXRHeaderNavList type="common" href="/schedule">
                  {NAV.SCHEDULE}
                </PIXRHeaderNavList>
                {/* <PIXRHeaderNavList type="common" href="/meet-up">
                  {NAV.MEETUPS}
                </PIXRHeaderNavList>
                <PIXRHeaderNavList type="common" href="/archive">
                  {NAV.ARCHIVE}
                </PIXRHeaderNavList> */}
                <PIXRHeaderNavList type="common" href="/board">
                  {NAV.BOARD}
                </PIXRHeaderNavList>
              </ul>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navigation;
