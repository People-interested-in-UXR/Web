import Image from "next/image";
import { EventApi } from "@fullcalendar/core";

interface Props {
  event: EventApi;
  onClose: () => void;
}

export const MobileEventModal = ({ event, onClose }: Props) => {
  const extendedProps = event.extendedProps;

  return (
    <div className="fixed inset-x-0 top-[56px] bottom-0 bg-white z-30 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="b2-700-16 font-bold">{event.title}</h1>
        <button onClick={onClose} className="cursor-pointer">
          <Image
            src="/icon/common/cancel.svg"
            alt="Close"
            width={18}
            height={18}
          />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2.5">
          <Image
            src="/icon/writingProp/date.svg"
            alt="Date icon"
            width={16}
            height={16}
          />
          <p className="c1-400-12">
            {Intl.DateTimeFormat("ko-KR").format(new Date(event.startStr))}
            {event.endStr &&
              " ~ " +
                Intl.DateTimeFormat("ko-KR").format(new Date(event.endStr))}
          </p>
        </div>
        <div className="flex gap-2.5">
          <Image
            src="/icon/writingProp/note_taking.svg"
            alt="Notetaking icon"
            width={16}
            height={16}
          />
          <p className="c1-400-12">
            노트테이킹 {extendedProps.note ? "가능" : "불가능"}
          </p>
        </div>
        <div className="flex gap-2.5">
          <Image
            src="/icon/writingProp/category.svg"
            alt="Category icon"
            width={16}
            height={16}
          />
          <p className="c1-400-12">{extendedProps.category || "미정"}</p>
        </div>
        <div className="flex gap-2.5">
          <Image
            src="/icon/writingProp/progress.svg"
            alt="Progress icon"
            width={16}
            height={16}
          />
          <p className="c1-400-12">{extendedProps.progress || "시작 전"}</p>
        </div>
      </div>
    </div>
  );
};
