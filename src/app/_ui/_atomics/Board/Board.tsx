"use client";
import { useState } from "react";

import { Description } from "../Description";

import { User } from "@/app/utils/types/user/user";
import { Toast } from "../Toast";
import { TOAST, ToastMessageType } from "@/app/utils/consts";
import useToastMessage from "../../hooks/useToastMessage";
import ChipContainer from "./ChipContainer";
import CardContainer from "./CardContainer";
import PostCardList from "./PostCardList";
import ProfileCardList from "./ProfileCardList";
import { useSearchParams } from "next/navigation";

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
  const query: T | "전체" =
    (useSearchParams().get("chip") as T | "전체") || "전체";

  const [selectedChip, setSelectedChip] = useState<T | "전체">(query);
  const [toastMessage, setToastMessage] = useToastMessage<ToastMessageType>("");

  //* 내 게시글 토글
  const [isMyPostCard, setIsMyPostCard] = useState(false);
  const toggle = () => setIsMyPostCard(!isMyPostCard);

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
        <div className="w-full flex flex-col items-center">
          <div className="b2-600-16 sm:h3-700-20 text-primary-red flex items-center justify-end mb-8 gap-4 w-full mt-12 ">
            <p>내 게시글</p>
            <ToggleButton isToggled={isMyPostCard} toggle={toggle} />
          </div>

          <PostCardList
            database={database}
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
