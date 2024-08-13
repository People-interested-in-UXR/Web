"use client";
import { useBodyScrollLock } from "@/app/_hooks/useBodyScrollLock";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PostCardModal from "./PostCardModal";

const PostCard = ({
  page,
  breadcrumb,
}: {
  page: any;
  breadcrumb: string[];
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
    <div className="bg-muted rounded-3xl shadow-md sm:h-[360px] sm:aspect-[4/3] flex flex-col cursor-pointer ">
      {!page?.cover?.external?.url && !page?.cover?.file?.url ? (
        <div
          className="flex justify-center items-center w-full rounded-tl-3xl rounded-tr-3xl h-[252px]"
          onClick={openModal}
        >
          <Image
            className="opacity-40"
            src={"/logo/PIXR_logo_light.svg"}
            alt={"card image"}
            width={149}
            height={68}
          />
        </div>
      ) : (
        <Image
          className="h-[252px] w-full rounded-tl-3xl rounded-tr-3xl object-cover"
          src={page?.cover?.external?.url || page?.cover?.file?.url}
          alt={"card image"}
          width={480}
          height={252}
          onClick={openModal}
        />
      )}
      <div
        className="bg-secondary  rounded-br-3xl rounded-bl-3xl w-full "
        onClick={openModal}
      >
        <div className="h-[108px] p-6 flex flex-col gap-2 justify-center">
          <div className="flex justify-between">
            <h2 className="sm:h3-700-20 h4-700-16 text-title">
              {page?.properties["제목"]?.title[0]?.plain_text}
            </h2>
            <div className="sm:b2-600-16 b1-500-12 text-sub">
              {page?.properties["모임 유형"]?.select?.name ?? "모임 유형"} ·{" "}
              {page?.properties["진행 상태"]?.select?.name ?? "진행 상태"}
            </div>
          </div>
          <p className="text-sub sm:b2-400-16 b1-400-12 text-ellipsis line-clamp-1">
            {page?.contents.map((content: any) =>
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
