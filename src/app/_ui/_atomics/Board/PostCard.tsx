"use client";
import { useBodyScrollLock } from "@/app/_hooks/useBodyScrollLock";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PostCardModal from "./PostCardModal";
import { User } from "@/app/utils/types/user/user";

const PostCard = ({
  page,
  breadcrumb,
  loggedInUser,
}: {
  page: any;
  breadcrumb: string[];
  loggedInUser?: User;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const openModal = () => {
    lockScroll();
    setShowModal(true);
  };
  const closeModal = () => {
    openScroll();
    setShowModal(false);
  };

  useEffect(() => {
    if (!window?.document) return;

    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <div className="bg-muted rounded-3xl shadow-md flex flex-col cursor-pointer sm:w-[480px] w-[288px]">
      {!page?.cover?.external?.url && !page?.cover?.file?.url ? (
        <div
          className="flex justify-center items-center w-full rounded-tl-3xl rounded-tr-3xl sm:h-[252px] h-[136px] relative"
          onClick={openModal}
        >
          <Image
            className="opacity-40"
            src={"/logo/PIXR_logo_light.svg"}
            alt={"card cover image"}
            width={149}
            height={68}
          />
          {loggedInUser?.email === page?.properties["작성자 이메일"]?.email && (
            <div className="w-[92px] h-[40px] py-2 px-4 flext items-center justify-center bg-red-100 absolute top-[16px] right-[16px] text-primary-red b2-600-16 rounded-lg">
              내 게시글
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-tl-3xl rounded-tr-3xl relative sm:h-[252px] h-[136px] overflow-hidden">
          <Image
            className=" rounded-tl-3xl rounded-tr-3xl object-cover"
            src={page?.cover?.external?.url || page?.cover?.file?.url}
            alt={"card cover image"}
            fill
            onClick={openModal}
          />
          {loggedInUser?.email === page?.properties["작성자 이메일"]?.email && (
            <div className="w-[92px] h-[40px] py-2 px-4 flext items-center justify-center bg-red-100 absolute top-[16px] right-[16px] text-primary-red b2-600-16 rounded-lg">
              내 게시글
            </div>
          )}
        </div>
      )}
      <div
        className="bg-secondary  rounded-br-3xl rounded-bl-3xl  w-full overflow-hidden"
        onClick={openModal}
      >
        <div className="sm:h-[108px] h-20 sm:p-6 p-4 flex flex-col gap-2 justify-center text-pretty break-words">
          <div className="flex justify-between gap-2 items-center">
            <h2 className="sm:h3-700-20 h4-700-16 text-title text-pretty break-words w-full line-clamp-1">
              {page?.properties?.["제목"]
                ? page?.properties?.["제목"]?.title[0]?.plain_text
                : page?.properties?.["주제"]?.title[0]?.plain_text}
            </h2>
            <div className="sm:b2-600-16 b1-500-12 text-sub min-w-[120px] flex justify-end ">
              {page?.properties?.["모임유형"]?.select?.name || "모임유형"} ·{" "}
              {page?.properties?.["진행여부"]?.select?.name ||
                page?.properties?.["진행여부"]?.status?.name ||
                "진행여부"}
            </div>
          </div>
          <p className="text-sub sm:b2-400-16 b1-400-12 text-pretty break-words text-clip overflow-hidden">
            {page?.contents?.map((content: any) =>
              content?.paragraph?.rich_text
                ?.map((block: any) => block?.text?.content)
                .join(" ")
            )}
          </p>
        </div>
      </div>
      {showModal &&
        document?.body &&
        createPortal(
          <PostCardModal
            breadcrumb={breadcrumb}
            page={page}
            closeModal={closeModal}
          />,
          document?.body,
          "read"
        )}
    </div>
  );
};

export default PostCard;
