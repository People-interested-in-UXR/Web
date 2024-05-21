import { Fragment } from "react";
import Card, { ICard } from "./Card";

interface IBoard {
  title: string;
  chips?: Array<string>;
  description: string;
  cards: Array<ICard>;
}

const Board = ({ title, description, cards }: IBoard) => {
  return (
    <div className="w-full  flex flex-col items-center max-w-[1490px] px-4 break-keep text-pretty">
      <div className="flex flex-col items-center gap-4">
        <h1 className="h1-700-32 text-title">{title}</h1>
        <p className="b1-500-20 text-sub">{description}</p>
      </div>
      <div className="mt-16 grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1  justify-center max-lg:gap-4">
        {cards.map((card, index) => (
          <Fragment key={index}>
            <Card {...card} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Board;
