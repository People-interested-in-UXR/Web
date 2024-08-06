"use client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import Card, { ICard } from "./Card";
import Chip, { IChip } from "./Chip";
import { Description } from "../Description";
import { ProfileCard } from "../ProfileCard";
import { User } from "@/app/utils/types/user/user";
import { Toast } from "../Toast";

interface IBoard {
  title: string;
  chips?: Array<IChip>;
  description: string;
  breadcrumb: string[];
  users?: Array<User>;
  database: any;
}

const Board = ({
  title,
  description,
  breadcrumb,
  chips,
  users,
  database,
}: IBoard) => {
  const [selectedChip, setSelectedChip] = useState("전체");
  const [toastMessage, setToastMessage] = useState<"email" | "sns" | "">("");

  const handleChipClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event?.currentTarget?.textContent)
      setSelectedChip(event?.currentTarget?.textContent);
  };

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        setToastMessage("");
      }, 4000);
    }
  }, [toastMessage]);

  // cover는 type을 넣으면 됨 cover[cover.type]
  return (
    <div className="w-full flex flex-col items-center max-w-[1490px] px-4 break-keep text-pretty  sm:gap-16 gap-4">
      <Description title={title} description={description} position="center" />
      {chips && (
        <div className="w-full relative max-sm:mt-4">
          <div className="flex gap-4 sm:justify-center sm:flex-wrap max-sm:px-4  max-sm:overflow-x-scroll max-sm:justify-start max-sm:scrollbar-hide">
            {[...chips].map(({ category }, index) => (
              <Fragment key={index}>
                <Chip
                  category={category}
                  selectedChip={selectedChip}
                  onClick={handleChipClick}
                />
              </Fragment>
            ))}
          </div>
        </div>
      )}
      {database?.pages && (
        <div className="grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1  justify-center max-lg:gap-4">
          {[...database?.pages].map(
            (page, index) =>
              selectedChip === "전체" && (
                <Fragment key={index}>
                  {<Card page={page} breadcrumb={breadcrumb} />}
                </Fragment>
              )
          )}
          {[...database?.pages].map(
            (page, index) =>
              page?.properties["모임 유형"]?.select?.name === selectedChip && (
                <Fragment key={index}>
                  <Card page={page} breadcrumb={breadcrumb} />
                </Fragment>
              )
          )}
        </div>
      )}
      {users && (
        <div className=" grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1  justify-center max-lg:gap-4">
          {[...users].map(
            (user, index) =>
              selectedChip === "전체" && (
                <Fragment key={index}>
                  <ProfileCard {...user} onClick={setToastMessage} />
                </Fragment>
              )
          )}
          {[...users].map(
            (user, index) =>
              user.position === selectedChip && (
                <Fragment key={index}>
                  <ProfileCard {...user} onClick={setToastMessage} />
                </Fragment>
              )
          )}
        </div>
      )}
      {toastMessage && (
        <div className="fixed bottom-20">
          <Toast>
            <div>
              {toastMessage === "email" ? "이메일" : "SNS계정"}이
              복사되었습니다.
            </div>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default Board;
