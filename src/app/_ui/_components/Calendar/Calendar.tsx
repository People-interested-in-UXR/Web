"use client";
import { useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick

import styles from "./calendar.module.scss";
import CalendarHeader from "./CalendarHeader";
import tippy from "tippy.js";

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

const Calendar = ({ pages }: { pages: any }) => {
  const calendarRef = useRef<FullCalendar>(null);

  const events = [...pages].map((page: ICalenderEvents) => ({
    title: page["주제"].title[0].plain_text,
    note: page["Note Taking"]?.select?.name,
    start: page["날짜"].date.start
      ? new Date(page["날짜"].date.start)
      : undefined,
    end: page["날짜"].date.end ? new Date(page["날짜"].date.end) : undefined,
    backgroundColor: "#51BAFF",
    borderColor: "#51BAFF",
    className: "cursor-pointer  bg-[#51BAFF] hover:bg-[#51BAFF] border-none",
  }));

  return (
    <div className={`w-full h-fit flex flex-col gap-16 z-0 px-48`}>
      {/* <div className="flex flex-col items-center">
        <h1 className="h1-700-32 text-title">우리 모임 일정</h1>
        <div className="mt-4 text-center b1-500-20 text-sub">
          <p>모임에서 진행되는 다양한 이벤트 일정을 알 수 있어요.</p>
          <p>다음 스터디는 언제인지 바로 확인해보세요.</p>
        </div>
      </div> */}
      <div>
        <CalendarHeader ref={calendarRef} />
        <FullCalendar
          ref={calendarRef}
          dayMaxEvents={true}
          eventMaxStack={4}
          viewClassNames={`${styles.calendar}`}
          dayHeaderClassNames={`${styles.dayHeader} text-default b2-400-16 first-of-type:text-primary-red `}
          dayCellClassNames={`${styles.dayCell} text-default b2-700-16 first-of-type:text-primary-red w-full`}
          eventClassNames={`${styles.event}`}
          timeZone="local"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          events={events}
          eventDidMount={function (arg) {
            const content = String.raw`
            <div class="w-[280px] h-[180px]  bg-white drop-shadow-lg p-4 rounded-lg">
              <h1 class="text-default b2-700-16 font-bold">${arg?.event?.title}</h1>
              <h2 class="text-sub c1-400-12">${arg.event.startStr}${arg.event.endStr && " ~ " + arg.event.endStr} </h2>
              <div class="mt-4">
                <p>${arg.event._def.extendedProps?.note ? "가능" : "불가능"}</p>
                <p>${arg.event._def.extendedProps?.description ? arg.event._def.extendedProps?.description : ""}</p>
              </div>
            </div>  
          `;

            tippy(arg.el, {
              duration: 0,
              arrow:
                '<div class="w-0 h-0 border-solid border-r-[15px] border-r-transparent border-l-[15px] border-l-transparent border-t-[10px] border-t-white border-b-0 rounded-b-xl"></div>',
              allowHTML: true,
              content,
              trigger: "click",
            });
          }}
          eventContent={function (arg) {
            return (
              <div className="w-full h-full bg-[#51BAFF] text-accent b3-500-12 ">
                {arg.event.title}
              </div>
            );
          }}
          dayCellContent={function (arg) {
            if (arg.isToday) {
              return (
                <div className="text-accent bg-icon-selected w-8 h-8 rounded-2xl flex justify-center items-center py-0.5 px-1 text-center">
                  {arg.dayNumberText}
                </div>
              );
            }
            return arg.dayNumberText.split("일")[0];
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
