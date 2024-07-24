"use client";
import { useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick

import styles from "./calendar.module.scss";
import CalendarHeader from "./CalendarHeader";
import tippy from "tippy.js";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [activeDate, setActiveDate] = useState<string>("");

  const handleDateClick = (arg: DateClickArg) => {
    setActiveDate(arg.dateStr);
  };

  return (
    <div className={` w-full h-fit flex flex-col gap-16`}>
      <div className="flex flex-col items-center">
        <h1 className="h1-700-32 text-title">우리 모임 일정</h1>
        <div className="mt-4 text-center b1-500-20 text-sub">
          <p>모임에서 진행되는 다양한 이벤트 일정을 알 수 있어요.</p>
          <p>다음 스터디는 언제인지 바로 확인해보세요.</p>
        </div>
      </div>
      <div>
        <CalendarHeader ref={calendarRef} />
        <FullCalendar
          ref={calendarRef}
          viewClassNames={`${styles.calendar}`}
          dayHeaderClassNames={`${styles.dayHeader} text-default b2-400-16 first-of-type:text-primary-red `}
          dayCellClassNames={`${styles.dayCell} text-default h3-700-20 first-of-type:text-primary-red w-full`}
          timeZone="local"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          events={[
            {
              title: "UXR 컨퍼런스",
              date: "2024-07-05",
              display: "background",
              backgroundColor: "#F0EDEB",
              className: "cursor-pointer border border-icon-unselect",
            },
            {
              title: "UXR 컨퍼런스",
              date: "2024-07-12",
              display: "background",
              backgroundColor: "#F0EDEB",
              className: "cursor-pointer border border-icon-unselect",
            },
            {
              title: "자유 회의",
              description: "자유롭게 의견을 나눠요",
              date: "2024-07-13",
              display: "background",
              backgroundColor: "#F0EDEB",
              className: "cursor-pointer border border-icon-unselect",
            },
          ]}
          eventDidMount={function (arg) {
            const content = String.raw`
            <div class="w-[280px] h-[180px]  bg-white drop-shadow-lg p-4 rounded-lg">
              <h1 class="text-default b2-700-16 font-bold">${arg?.event?.title}</h1>
              <h2 class="text-sub c1-400-12">${arg.event.startStr}${arg.event.endStr && " ~ " + arg.event.endStr} </h2>
              <div class="mt-4">
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
            // return (
            //   <div className="w-full h-full bg-black">
            //     {arg?.event?.startStr === activeDate && (
            //       <div className="bg-black w-[280px] h-[190px] fixed">
            //         <div className="text-red-300">dd</div>
            //       </div>
            //     )}
            //   </div>
            // );
          }}
          dayCellContent={function (arg) {
            if (arg.isToday) {
              return (
                <div className="text-accent bg-icon-selected w-full h-full rounded-2xl flex justify-center items-center py-0.5 px-1 text-center">
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
