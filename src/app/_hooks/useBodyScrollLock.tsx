"use client";
import { useCallback, useRef } from "react";

export function useBodyScrollLock() {
  let scrollPosition = useRef(0);
  const lockScroll = useCallback(() => {
    scrollPosition.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.width = "100%";
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition.current);
  }, []);

  return { lockScroll, openScroll };
}
