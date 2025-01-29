"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { SyncLoader } from "react-spinners";

import { Description } from "../../../_ui/_atomics/Description";

import { User } from "@/app/utils/types/user/user";
import { Toast } from "../../ui/Toast";
import { TOAST, ToastMessageType } from "@/app/utils/consts";
import useToastMessage from "../../../hooks/useToastMessage";
import ChipContainer from "./ChipContainer";
import CardContainer from "../../../_ui/_atomics/Board/CardContainer";
import PostCardList from "./PostCardList";
import ProfileCardList from "./ProfileCardList";
import { usePathname, useSearchParams } from "next/navigation";

export interface IChip<K> {
  category: K;
}

interface IBoard<T> {
  title: string;
  chips?: Array<IChip<T>>;
  description: string;
  breadcrumb: string[];
  users?: Array<User>;
  database: any;
  loggedInUser?: User;
}

const ToggleButton = ({
  isToggled,
  toggle,
}: {
  isToggled: boolean;
  toggle: () => void;
}) => {
  return (
    <button
      onClick={toggle}
      className={`w-[51px] h-[31px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isToggled ? "bg-primary-red" : "bg-secondary"
      }`}
    >
      <div
        className={`bg-white w-[27px] h-[27px] rounded-full shadow-md transform transition-transform duration-300 ${
          isToggled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
};

const Board = <T extends {}>({
  title,
  description,
  breadcrumb,
  chips,
  users,
  database,
  loggedInUser,
}: IBoard<T | "전체">) => {
  const [_, param] = usePathname().split("/");

  const query: T | "전체" =
    (useSearchParams().get("chip") as T | "전체") || "전체";

  const [selectedChip, setSelectedChip] = useState<T | "전체">(query);
  const [toastMessage, setToastMessage] = useToastMessage<ToastMessageType>("");

  const [pagenation, setPagenation] = useState({ start: 7, end: 12 }); // 페이지 상태 추가
  const [data, setData] = useState(database?.pages); // 초

  //* 내 게시글 토글
  const [isMyPostCard, setIsMyPostCard] = useState(false);
  const toggle = () => setIsMyPostCard(!isMyPostCard);

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(database?.has_more);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/${param}/${database?.id}/?start=${pagenation?.start}&end=${pagenation?.end}`
      );
      const newPages = await res.json();

      setHasMore(newPages?.has_more);
      setData((prevData: any) => [...prevData, ...newPages?.pages]);
      setPagenation(({ start, end }) => ({ start: start + 6, end: end + 6 }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagenation, setPagenation]);

  useEffect(() => {
    //TODO: meet-up 페이지는 버튼형 페이지네이션
    if (param === "meet-up") return;
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, fetchMoreData]);

  // cover는 type을 넣으면 됨 cover[cover.type]
  return (
    <div className="w-full flex flex-col items-center max-w-[1490px] px-4 break-keep text-pretty  sm:gap-16 gap-4 h-full">
      <Description title={title} description={description} position="center" />
      {chips && (
        <ChipContainer<T>
          chips={chips}
          selectedChip={selectedChip}
          setSelectedChip={setSelectedChip}
        />
      )}
      {database?.pages && (
        <div className="w-full flex flex-col items-center px-4">
          {loggedInUser && (
            <div className="b2-600-16 sm:h3-700-20 text-primary-red flex items-center justify-end mb-8 gap-4 w-full">
              <p>내 게시글</p>
              <ToggleButton isToggled={isMyPostCard} toggle={toggle} />
            </div>
          )}

          <PostCardList
            database={{ ...database, pages: data }}
            selectedChip={selectedChip}
            breadcrumb={breadcrumb}
            loggedInUser={loggedInUser}
            isMyPostCard={isMyPostCard}
          />
        </div>
      )}
      {users && (
        <CardContainer>
          <ProfileCardList
            users={users}
            selectedChip={selectedChip}
            setToastMessage={setToastMessage}
          />
        </CardContainer>
      )}
      {/* //TODO: meet-up 페이지는 버튼형 페이지네이션 */}
      {isLoading && param !== "meet-up" && (
        <div className="w-full flex justify-between items-center flex-col  gap-6">
          <p className="b2-600-16 text-title">잠시만 기다려주세요.</p>
          <SyncLoader loading={isLoading} speedMultiplier={0.5} />
        </div>
      )}
      {/* //TODO: meet-up 페이지는 버튼형 페이지네이션 */}
      {param !== "meet-up" && <div ref={observerRef} className="h-1" />}
      {toastMessage && (
        <div className="fixed bottom-20">
          <Toast>
            <div>
              {toastMessage === TOAST.EMAIL
                ? TOAST.MESSAGE.EMAIL
                : TOAST.MESSAGE.SNS}
              이 복사되었습니다.
            </div>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default Board;
