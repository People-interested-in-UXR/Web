"use client";

import { useEffect, useState } from "react";

import { IDatabase } from "@/app/utils/types/notion/database";

import { User } from "@/app/utils/types/user/user";

import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";
import { PostCardModal } from "./PostCardModal";
import { Create } from "./Method/Create";

interface IPostDetailModal {
  mode: "create" | "edit" | "read";
  breadcrumb: string[];
  database: IDatabase;
  loggedInUser?: User;
}
export const PostDetailModal = ({
  mode,
  breadcrumb,
  database,
  loggedInUser,
}: IPostDetailModal) => {
  //* Modal과 관련됨
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
    if (window?.document) return;
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  if (mode === "create") {
    return (
      <Create
        database={database}
        breadcrumb={breadcrumb}
        showModal={showModal}
        openModal={openModal}
        closeModal={closeModal}
        loggedInUser={loggedInUser}
      />
    );
  }

  if (mode === "read") {
    return (
      <PostCardModal
        breadcrumb={breadcrumb}
        page={database?.pages}
        closeModal={closeModal}
        mode={"create"}
        database={database}
      />
    );
  }
};
