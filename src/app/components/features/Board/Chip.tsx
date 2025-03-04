import { MouseEventHandler, ReactNode } from "react";

interface IChip<T> {
  category: T | "전체";
  selectedChip: T;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Chip<T>({ category, selectedChip, onClick }: IChip<T>) {
  return (
    <button
      className={`${
        category === selectedChip
          ? "bg-primary-red text-accent"
          : "bg-btn-unselected text-primary-red"
      } rounded-[20px] sm:py-2 sm:px-4 py-[7px] px-3 b1-500-12 sm:text-xl sm:font-semibold border-2 border-transparent hover:border-2 hover:border-primary-red max-sm:whitespace-nowrap cursor-pointer`}
      onClick={onClick}
    >
      {category as unknown as ReactNode}
    </button>
  );
}
