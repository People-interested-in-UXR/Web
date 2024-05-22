"use client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import Card, { ICard } from "./Card";
import Chip, { IChip } from "./Chip";
import { Description } from "../Description";
import { ProfileCard } from "../ProfileCard";
import { IProfileCard } from "../ProfileCard/ProfileCard";

interface IBoard {
  title: string;
  chips?: Array<IChip>;
  description: string;
  cards?: Array<ICard>;
  profileCards?: Array<IProfileCard>;
}

const Board = ({ title, description, chips, cards, profileCards }: IBoard) => {
  const [selectedChip, setSelectedChip] = useState("전체");

  const handleChipClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event?.currentTarget?.textContent)
      setSelectedChip(event?.currentTarget?.textContent);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-[1490px] px-4 break-keep text-pretty sm:gap-16 gap-4">
      <Description title={title} description={description} position="center" />
      {chips && (
        <div className="w-full relative max-sm:mt-4">
          <div className="flex  gap-4 mobile:justify-center mobile:flex-wrap max-mobile:px-4  max-mobile:overflow-x-scroll max-mobile:justify-start max-mobile:scrollbar-hide">
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
      {profileCards && (
        <div className=" grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1  justify-center max-lg:gap-4">
          {[...profileCards].map(
            (card, index) =>
              selectedChip === "전체" && (
                <Fragment key={index}>
                  <ProfileCard {...card} />
                </Fragment>
              )
          )}
          {[...profileCards].map(
            (card, index) =>
              card.job === selectedChip && (
                <Fragment key={index}>
                  <ProfileCard {...card} />
                </Fragment>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Board;
