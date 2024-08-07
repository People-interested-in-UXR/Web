"use client";

import { NAV } from "@/app/utils/consts";

import Image from "next/image";
import Link from "next/link";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModalToggle } from "../../hooks";
import { User } from "@/app/utils/types/user/user";

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
            className={`${children === NAV.SIGN_UP ? "text-primary-red b2-700-16 hover:bg-primary-red hover:text-white p-2 rounded-lg text-start" : "p-2 rounded-lg hover:bg-secondary hover:text-accent"}`}
          >
            {children}
          </li>
        </Link>
      ) : (
        <button onClick={onClick} className="w-full">
          <li className="text-primary-red b2-700-16 hover:bg-primary-red hover:text-white p-2 rounded-lg text-start w-full">
            {children}
          </li>
        </button>
      )}
    </>
  );
};

interface INavigation {
  user: User;
}
const Navigation = ({ user }: INavigation) => {
  const { showModal, openModal, closeModal } = useModalToggle();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const target = event?.currentTarget as Window;
      if (showProfile && target?.innerWidth >= 1280)
        return setShowProfile(false);
      // 1280px 이상일 때 모달이 켜져 있으면 끄기
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showProfile]);

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
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/meet-up`}>
              {NAV.MEETUPS}
            </Link>
          </li>
          <li className="hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/archive`}>
              {NAV.ARCHIVE}
            </Link>
          </li>
          <li className="hover:text-muted active:text-default focus:font-bold active:font-bold focus:text-default">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/board`}>
              {NAV.BOARD}
            </Link>
          </li>
          {user?.id ? null : (
            <li className="text-primary-red hover:text-btn-hover b2-600-16">
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`}>
                {NAV.SIGN_UP}
              </Link>
            </li>
          )}
          {user?.id ? (
            <li
              className="flex items-center gap-2 hover:text-muted active:text-default focus:b2-700-16 focus:text-default focus:font-bold active:font-bold cursor-pointer"
              onClick={handleProfileClick}
            >
              <Image
                src={user?.profile || "/sample.png"}
                alt={"user profile iamge"}
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
          ) : (
            <></>
          )}
        </ul>
        {showProfile && (
          <div
            className="w-[300px]  absolute right-10 bg-white rounded-2xl p-6 top-[100px] animate-fade-down drop-shadow-m z-10"
            // onMouseLeave={() => setShowProfile(false)}
          >
            <div className="border-b border-muted flex gap-4 pb-6">
              <Image
                src={user?.profile || "/sample.png"}
                alt={"user profile image"}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <h3 className="text-default h3-700-20">
                  {user?.name || "홍길동"}
                </h3>
                <p className="text-muted b2-600-16">
                  {user?.position || "UX Researcher"}
                </p>
              </div>
            </div>
            <div className="pt-6">
              <div className="flex flex-col gap-6 b3-400-14">
                <Link
                  className="flex gap-2 cursor-pointer"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.id}`}
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icon/common/edit.svg"}
                    alt={""}
                  />
                  <div className="text-sub">프로필 수정</div>
                </Link>
                <button
                  className="flex gap-2 cursor-pointer"
                  onClick={handleSignOutClick}
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icon/common/logout.svg"}
                    alt={""}
                  />
                  <div className="text-sub">로그아웃</div>
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
                {user?.id ? (
                  <div className="flex gap-2 w-full items-center">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.id}`}
                      className="rounded-full cursor-pointer w-12 h-12 items-center flex"
                    >
                      <Image
                        src={user?.profile || "/sample.png"}
                        alt={""}
                        className="rounded-full"
                        width={48}
                        height={48}
                      />
                    </Link>
                    <PIXRHeaderNavList type="auth" onClick={handleSignOutClick}>
                      {NAV.SIGN_OUT}
                    </PIXRHeaderNavList>
                  </div>
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
