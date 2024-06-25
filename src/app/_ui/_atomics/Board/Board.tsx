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
  pages: Array<any>;
}

// {
//   object: 'page',
//   id: '311ee101-6df0-4ec0-9bd5-6c307d367287',
//   created_time: '2024-05-05T13:51:00.000Z',
//   last_edited_time: '2024-06-25T03:25:00.000Z',
//   created_by: { object: 'user', id: '83eb4fab-2d8e-457a-8c8a-6afd6e77ff86' },
//   last_edited_by: { object: 'user', id: 'e2838fb1-4594-42af-9c75-bf775a0c8709' },
//   cover: null,
//   icon: null,
//   parent: {
//     type: 'database_id',
//     database_id: 'd45fa536-5c05-4b54-9d0a-56b9a4ed5070'
//   },
//   archived: false,
//   in_trash: false,
//   properties: { '사람': [Object], '태그': [Object], '이름': [Object] },
//   url: 'https://www.notion.so/311ee1016df04ec09bd56c307d367287',
//   public_url: 'https://pyoux.notion.site/311ee1016df04ec09bd56c307d367287',
//   contents: [ [Object], [Object] ]
// },

const Board = ({ title, description, chips, cards, users, pages }: IBoard) => {
  const [selectedChip, setSelectedChip] = useState("전체");

  const handleChipClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event?.currentTarget?.textContent)
      setSelectedChip(event?.currentTarget?.textContent);
  };

  console.log(pages);
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
      {pages && (
        <div className="grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1  justify-center max-lg:gap-4">
          {[...pages].map(
            (page, index) =>
              selectedChip === "전체" && (
                <Fragment key={index}>
                  <Card {...page} />
                </Fragment>
              )
          )}
          {[...pages].map(
            (page, index) =>
              page["properties"]["카테고리"][
                page["properties"]["카테고리"]["type"]
              ]?.name === selectedChip && (
                <Fragment key={index}>
                  <Card {...page} />
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
