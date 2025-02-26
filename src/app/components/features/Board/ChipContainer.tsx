import { Dispatch, Fragment, MouseEventHandler, SetStateAction } from "react";
import { IChip } from "./Board";
import Chip from "./Chip";

interface IChipContainer<T> {
  chips: Array<IChip<T>>;
  selectedChip: T;
  setSelectedChip: Dispatch<SetStateAction<T>>;
}
const ChipContainer = <T extends {}>({
  chips,
  selectedChip,
  setSelectedChip,
}: IChipContainer<T | "전체">) => {
  const handleChipClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event?.currentTarget?.textContent)
      setSelectedChip(event?.currentTarget?.textContent as unknown as T);
  };

  return (
    <div className="w-full relative max-sm:mt-4">
      <div className="flex gap-4 sm:justify-center sm:flex-wrap max-sm:px-4  max-sm:overflow-x-scroll max-sm:justify-start max-sm:scrollbar-hide">
        {[...chips].map(({ category }, index) => (
          <Fragment key={index}>
            <Chip<T | "전체">
              category={category}
              selectedChip={selectedChip}
              onClick={handleChipClick}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChipContainer;
