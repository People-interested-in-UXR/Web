"use client";
import { Fragment, MouseEventHandler, useState } from "react";
import Card, { ICard } from "./Card";
import Chip, { IChip } from "./Chip";
import { Description } from "../Description";
import { ProfileCard } from "../ProfileCard";
import { User } from "@/app/utils/types/user/user";

interface IBoard {
  title: string;
  chips?: Array<IChip>;
  description: string;
  cards?: Array<ICard>;
  users?: Array<User>;
}

const Board = ({ title, description, chips, cards, users }: IBoard) => {
  const [selectedChip, setSelectedChip] = useState("전체");

  const handleChipClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event?.currentTarget?.textContent)
      setSelectedChip(event?.currentTarget?.textContent);
  };

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
      {cards && (
        <div className="grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1  justify-center max-lg:gap-4">
          {[...cards].map(
            (card, index) =>
              selectedChip === "전체" && (
                <Fragment key={index}>
                  <Card {...card} />
                </Fragment>
              )
          )}
          {[...cards].map(
            (card, index) =>
              card.category === selectedChip && (
                <Fragment key={index}>
                  <Card {...card} />
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
                  <ProfileCard {...user} />
                </Fragment>
              )
          )}
          {[...users].map(
            (user, index) =>
              user.position === selectedChip && (
                <Fragment key={index}>
                  <ProfileCard {...user} />
                </Fragment>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Board;
