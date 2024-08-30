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
}

const Board = <T extends {}>({
  title,
  description,
  breadcrumb,
  chips,
  users,
  database,
}: IBoard<T | "전체">) => {
  const query: T | "전체" =
    (useSearchParams().get("chip") as T | "전체") || "전체";

  const [selectedChip, setSelectedChip] = useState<T | "전체">(query);
  const [toastMessage, setToastMessage] = useToastMessage<ToastMessageType>("");

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
        <CardContainer>
          <PostCardList
            database={database}
            selectedChip={selectedChip}
            breadcrumb={breadcrumb}
          />
        </CardContainer>
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
