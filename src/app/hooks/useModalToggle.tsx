"use client";
import { useEffect, useState } from "react";

export const useModalToggle = () => {
  const [showModal, setShowModal] = useState(false);

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

  return { showModal, openModal, closeModal };
};
