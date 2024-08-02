"use client";

import { NAV } from "@/app/utils/consts";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IPIXRHeaderNavList {
  type: "common" | "auth";
  href: string;
  children: ReactNode;
  onClick?: () => void;
}
const PIXRHeaderNavList = ({
  type,
  href = "",
  children,
  onClick,
}: IPIXRHeaderNavList) => {
  const router = useRouter();
  return (
    <Link href={href} onClick={onClick}>
      {type === "common" ? (
        <li className="p-2 rounded-lg hover:bg-secondary hover:text-accent">
          {children}
        </li>
      ) : (
        <li className="text-primary-red b2-600-16 hover:bg-primary-red hover:text-white p-2 rounded-lg">
          {children}
        </li>
      )}
    </Link>
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
  const [showModal, setShowModal] = useState(false);

  //* 로그아웃을 하고 로그인 했을 시
  useEffect(() => {
    setShowModal(false);
  }, [isLogin, isKakaoLogin, isGoogleLogin]);

  // Resize
  // TODO: 메모리 최적화 하기
  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const target = event?.currentTarget as Window;
      if (target?.innerWidth >= 1280 && showModal) return setShowModal(false);
      // 1280px 이상일 때 모달이 켜져 있으면 끄기
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSignOutClick = () => {
    closeModal();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  {
    /* Desktop */
  }
  return (
    <>
      <nav className="w-full flex items-center max-md:hidden">
        <ul className="flex justify-between w-full b2-400-16 items-center max-xl:hidden">
          <li className="hover:text-muted active:text-default">
            <Link href={"/"}>{NAV.HOME}</Link>
          </li>
          <li className="hover:text-muted active:text-default">
            <Link href={"/about-us"}>{NAV.ABOUT_US}</Link>
          </li>
          <li className="hover:text-muted active:text-default">
            <Link href={"/member"}>{NAV.MEMBERS}</Link>
          </li>
          <li className="hover:text-muted active:text-default">
            <Link href={"/schedule"}>{NAV.SCHEDULE}</Link>
          </li>
          {/* <li className="hover:text-muted active:text-default">
            <Link href={"/meet-up"}>{NAV.MEETUPS}</Link>
          </li>
          <li className="hover:text-muted active:text-default">
            <Link href={"/archive"}>{NAV.ARCHIVE}</Link>
          </li> */}
          <li className="hover:text-muted active:text-default">
            <Link href={"/board"}>{NAV.BOARD}</Link>
          </li>
          <li className="text-primary-red hover:text-btn-hover b2-600-16">
            {isLogin ? (
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/sign-out`}
                onClick={handleSignOutClick}
              >
                {NAV.SIGN_OUT}
              </Link>
            ) : (
              <Link href={"/sign-in"}>{NAV.SIGN_UP}</Link>
            )}
          </li>
        </ul>
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
                  <PIXRHeaderNavList
                    type="auth"
                    href="/api/user/sign-out"
                    onClick={handleSignOutClick}
                  >
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
