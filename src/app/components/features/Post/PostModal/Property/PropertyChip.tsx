import { Dispatch, SetStateAction } from "react";
import { IPostCardModalContent } from "../PostCardModal";

interface IChip {
  value: string;
  active: boolean;
  type: string;
  setModal: Dispatch<SetStateAction<IPostCardModalContent>>;
}
export const PropertyChip = ({ value, type, active, setModal }: IChip) => {
  const handleModal = () => {
    if (type === "모임유형") {
      setModal((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          category: value,
        },
      }));
      return;
    }

    if (type === "진행여부") {
      setModal((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          progress: value,
        },
      }));
      return;
    }

    if (type === "날짜") {
      setModal((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          date: new Date(value),
        },
      }));
      return;
    }

    if (type === "제목" || type === "주제") {
      setModal((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          title: value,
        },
      }));
      return;
    }
  };
  return (
    <button
      onClick={handleModal}
      className={`${
        active
          ? "bg-icon-default text-accent "
          : "bg-background-muted text-sub hover:border-icon-default active:bg-icon-default active:text-accent"
      } px-2 py-1 sm:b2-600-16 b3-600-14 flex items-center justify-center rounded-lg border-2 border-transparent`}
    >
      {value}
    </button>
  );
};
