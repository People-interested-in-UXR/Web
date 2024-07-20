"use client";
import { Component, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import styles from "./calendar.module.scss";
import CalendarHeader from "./CalendarHeader";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const renderEventContent = (eventInfo: unknown) => {};
  const handleDateClick = (arg: unknown) => {};

  return (
    <div className={`${styles.calendar} w-full h-fit `}>
      <div>
        <h1>우리 모임 일정</h1>
        <p>모임에서 진행되는 다양한 이벤트 일정을 알 수 있어요.</p>
        <p>다음 스터디는 언제인지 바로 확인해보세요.</p>
      </div>
      <CalendarHeader ref={calendarRef} />
      <FullCalendar
        viewClassNames={"mt-4"}
        ref={calendarRef}
        dayHeaderClassNames={``}
        timeZone="local"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        events={[
          { title: "UXR 컨퍼런스", date: "2024-07-12" },
          { title: "자유 회의", date: "2024-07-13" },
        ]}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        dayCellContent={function (arg) {
          return arg.dayNumberText.split("일")[0];
        }}
      />
    </div>
  );
};

export default Calendar;
