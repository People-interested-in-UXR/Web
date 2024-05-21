"use client";
import Link from "next/link";
import { Header, Logo } from "../_ui";
import { NAV } from "../utils/consts";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface IPIXRHeaderNavList {
  type: "common" | "auth";
  href: string;
  children: ReactNode;
}
const PIXRHeaderNavList = ({
  type,
  href = "",
  children,
}: IPIXRHeaderNavList) => {
  return (
    <Link href={href}>
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

const PIXRHeader = ({}) => {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <Header>
      <div className="flex items-center gap-4 w-full ">
        <Logo theme="light" />
        <p className="md:h3-700-20 b3-400-14 text-sub">
          UX 리서치에 관심 있는 사람
        </p>
      </div>

      {/* Desktop */}
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
          <li className="hover:text-muted active:text-default">
            <Link href={"/meet-up"}>{NAV.MEETUPS}</Link>
          </li>
          <li className="hover:text-muted active:text-default">
            <Link href={"/archive"}>{NAV.ARCHIVE}</Link>
          </li>
          <li className="hover:text-muted active:text-default">
            <Link href={"/board"}>{NAV.BOARD}</Link>
          </li>
          <li className="text-primary-red hover:text-btn-hover b2-600-16">
            <Link href={"/sign-up"}>{NAV.SIGN_UP}</Link>
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
            // onClick={closeModal}
            onClick={closeModal}
          >
            {/* Modal Menu */}
            <nav
              className="fixed min-w-[216px] max-w-[400px] h-full bg-white z-20  right-0"
              onClick={(event) => event.stopPropagation()}
            >
              <ul className="p-4 gap-4 flex flex-col text-sub b2-400-16 ">
                <PIXRHeaderNavList type="auth" href="/sign-up">
                  {NAV.SIGN_UP}
                </PIXRHeaderNavList>
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
                <PIXRHeaderNavList type="common" href="/meet-up">
                  {NAV.MEETUPS}
                </PIXRHeaderNavList>
                <PIXRHeaderNavList type="common" href="/archive">
                  {NAV.ARCHIVE}
                </PIXRHeaderNavList>
                <PIXRHeaderNavList type="common" href="/board">
                  {NAV.BOARD}
                </PIXRHeaderNavList>
              </ul>
            </nav>
          </div>,
          document.body
        )}
    </Header>
  );
};

export default PIXRHeader;
