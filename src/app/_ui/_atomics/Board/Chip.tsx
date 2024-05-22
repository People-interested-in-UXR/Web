import { MouseEventHandler, ReactNode } from "react";

export interface IChip {
  category: string;
}

interface ETC {
  selectedChip: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Chip({ category, selectedChip, onClick }: IChip & ETC) {
  return (
    <button
      className={`${category === selectedChip ? "bg-primary-red text-accent" : "bg-brown-300 text-primary-red"} rounded-[20px] sm:py-2 sm:px-4 py-[7px] px-3 b1-500-12 sm:text-xl sm:font-semibold border-2 border-transparent hover:border-2 hover:border-primary-red max-sm:whitespace-nowrap`}
      onClick={onClick}
    >
      {category}
    </button>
  );
}
