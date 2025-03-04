"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import styles from "./calendar.module.scss";
import CalendarHeader from "./CalendarHeader";
import tippy from "tippy.js";
import { MobileEventModal } from "./MobileEventModal";

interface ICalenderEvents {
  "Note Taking": {
    id: string;
    type: "select";
    select: {
      id: string;
      color: string;
      name: string;
    };
  };
  날짜: {
    id: string;
    type: "date";
    date: {
      start: null | string;
      end: null | string;
      time_zone: null | string;
    };
  };
  링크: {
    id: string;
    type: "files";
    files: string[];
  };
  모임유형: {
    id: string;
    type: "select";
    select: {
      id: string;
      name: string;
      color: string;
    };
  };
  주제: {
    id: string;
    type: "title";
    title: Array<{
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
      };
      href: string;
      plain_text: string;
      text: {
        content: string;
        link: null | string;
      };
    }>;
  };
  진행여부: {
    id: string;
    type: "status";
    status: {
      id: string;
      color: string;
      name: string;
    };
  };
}

export const Calendar = ({ pages }: { pages: any }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [screenSize, setScreenSize] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const events = [...pages].map((page: ICalenderEvents) => ({
    title: page["주제"].title[0].plain_text,
    note: page["Note Taking"]?.select?.name,
    category: page["모임유형"].select?.name,
    progress: page["진행여부"].status?.name,
    start: page["날짜"].date.start
      ? new Date(page["날짜"].date.start)
      : undefined,
    end: page["날짜"].date.end ? new Date(page["날짜"].date.end) : undefined,
    backgroundColor: "#51BAFF",
    borderColor: "#51BAFF",
    className:
      "cursor-pointer  bg-[#51BAFF] hover:bg-[#51BAFF] border-none rounded-sm",
  }));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    };

    // 초기 사이즈 설정
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // cleanup 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${styles.full} w-full max-h-screen h-full z-0 md:px-48 px-0 md:mt-16 mt-0`}
    >
      <div className="">
        <CalendarHeader ref={calendarRef} />
        <FullCalendar
          ref={calendarRef}
          dayMaxEvents={false} // 모든 이벤트를 표시하도록 변경
          eventMaxStack={999} // 이벤트 최대 표시 수 증가
          dayMaxEventRows={false} // "more" 링크 제거
          height={screenSize.x <= 475 ? screenSize.y - 180 : screenSize.y - 380}
          viewClassNames={`${styles.calendar}`}
          dayHeaderClassNames={`${styles.dayHeader} text-default b2-400-16 first-of-type:text-primary-red `}
          dayCellClassNames={`${styles.dayCell}  b2-700-16 first-of-type:text-primary-red `}
          eventClassNames={`${styles.event}  pl-1 mx-1 hover:opacity-80`}
          timeZone="local"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          events={events}
          eventDidMount={function (arg) {
            if (screenSize?.x <= 475) {
              // 모바일: 포털 모달을 띄우도록 처리

              arg.el.addEventListener("click", () => {
                setSelectedEvent(arg.event);
              });
            } else {
              // 데스크탑: 기존 tippy 팝오버 사용
              const content = String.raw`
                <div class="w-[280px] h-[180px] bg-white drop-shadow-lg p-4 rounded-lg text-default">
                  <h1 class="b2-700-16 font-bold">${arg?.event?.title}</h1>
                  <div class="mt-4 w-full flex flex-col gap-2">
                    <div class="w-full flex gap-2.5">
                      <Image src="/icon/writingProp/date.svg" alt="Date icon" className="inline" width="16" height="16" />
                      <p class="c1-400-12 inline">
                        ${Intl.DateTimeFormat("ko-KR").format(
                          new Date(arg.event.startStr)
                        )}
                        ${
                          arg.event.endStr
                            ? " ~ " +
                              Intl.DateTimeFormat("ko-KR").format(
                                new Date(arg.event.endStr)
                              )
                            : ""
                        }
                      </p>
                    </div>
                    <div class="w-full flex gap-2.5">
                      <Image src="/icon/writingProp/note_taking.svg" alt="Notetaking icon" className="inline" width="16" height="16" />
                      <p class="c1-400-12">노트테이킹 ${
                        arg.event._def.extendedProps?.note ? "가능" : "불가능"
                      }</p>
                    </div>
                    <div class="w-full flex gap-2.5">
                      <Image src="/icon/writingProp/category.svg" alt="Category icon" className="inline" width="16" height="16" />
                      <p class="c1-400-12">${
                        arg.event._def.extendedProps?.category || "미정"
                      }</p>
                    </div>
                    <div class="w-full flex gap-2.5">
                      <Image src="/icon/writingProp/progress.svg" alt="Progress icon" className="inline" width="16" height="16" />
                      <p class="c1-400-12">${
                        arg.event._def.extendedProps?.progress || "시작 전"
                      }</p>
                    </div>
                  </div>
                </div>
              `;
              tippy(arg.el, {
                duration: 0,
                arrow:
                  '<div class="w-0 h-0 border-solid border-r-[10px] border-r-transparent border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-b-0 rounded-b-xl"></div>',
                allowHTML: true,
                content,
                trigger: "click",
              });
            }
          }}
          eventContent={function (arg) {
            return (
              <div className="w-full h-full text-accent b3-500-12 ">
                {arg.event.title}
              </div>
            );
          }}
          dayCellContent={function (arg) {
            if (arg.isToday) {
              return (
                <div
                  className={`text-accent bg-icon-selected rounded-full flex justify-center items-center text-center 
                  ${
                    arg.dayNumberText.length === 2
                      ? "px-2 py-1.5"
                      : "px-3 py-1.5"
                  }
                  max-md:text-sm max-md:px-1.5 max-md:py-1`}
                >
                  {arg.dayNumberText}
                </div>
              );
            }
            return (
              <div className="ml-2 mt-2 max-md:ml-1 max-md:mt-1 max-md:text-sm">
                {arg.dayNumberText.split("일")[0]}
              </div>
            );
          }}
        />
      </div>
      {selectedEvent &&
        screenSize?.x <= 475 &&
        createPortal(
          <MobileEventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />,
          document.body
        )}
    </div>
  );
};
