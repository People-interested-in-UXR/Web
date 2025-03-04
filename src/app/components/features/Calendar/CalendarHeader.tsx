import { Component, forwardRef, useEffect, useState } from "react";
import { CustomRendering } from "@fullcalendar/core/internal";
import { CalendarApi, ViewApi } from "@fullcalendar/core/index.js";
import { CalendarImpl } from "@fullcalendar/core/internal";
import FullCalendar from "@fullcalendar/react";
import { Icon } from "../../ui/Icon/Icon";

const formater = (day: number | Date | undefined) => {
  if (!day) return "";

  if (day instanceof Date) {
    const date = `${day.getFullYear()}. ${(day.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    return date;
  }

  if (typeof day === "number") {
    return "" + day;
  }

  return day;
};

const CalendarHeader = forwardRef<FullCalendar>(function Calc(prop, ref) {
  const [day, setDay] = useState("");

  useEffect(() => {
    if (!ref || !("current" in ref) || !ref.current) return;
    if (typeof ref === "function") return;

    const calendar = ref?.current?.getApi();

    const prev = document.getElementById("prev");
    const today = document.getElementById("today");
    const day = document.getElementById("day");
    const next = document.getElementById("next");

    prev?.addEventListener("click", () => {
      handlePrev(calendar);
      setDay(formater(calendar?.getDate()));
    });
    today?.addEventListener("click", () => {
      handleToday(calendar);
      setDay(formater(calendar?.getDate()));
    });
    next?.addEventListener("click", () => {
      handleNext(calendar);
      setDay(formater(calendar?.getDate()));
    });

    if (day) {
      setDay(formater(calendar?.getDate()));
    }

    return () => {
      prev?.removeEventListener("click", () => handlePrev(calendar));
      today?.removeEventListener("click", () => handleToday(calendar));
      next?.removeEventListener("click", () => handleNext(calendar));
    };
  }, [ref, setDay]);

  const handlePrev = (calendar: CalendarApi) => {
    calendar.prev();
  };

  const handleToday = (calendar: CalendarApi) => {
    calendar.today();
  };

  const handleNext = (calendar: CalendarApi) => {
    calendar.next();
  };

  return (
    <div className="flex justify-between items-center w-full max-md:px-4 max-md:py-2">
      <div className="flex gap-4 items-center">
        <button id="prev" className="max-md:hidden cursor-pointer">
          <Icon
            src={"/icon/common/calendar_arrow_left.svg"}
            alt={"previous month button"}
            height={44}
            width={44}
          />
        </button>
        <div id="day" className="text-default h3-700-20">
          {day}
        </div>
        <button id="next" className="max-md:hidden cursor-pointer">
          <Icon
            src={"/icon/common/calendar_arrow_right.svg"}
            alt={"previous month button"}
            height={44}
            width={44}
          />
        </button>
      </div>
      <button
        id="today"
        className="text-default bg-white border border-btn-unselected px-4 py-2 h3-700-20 rounded-[22px] max-md:text-sm max-md:px-3 max-md:py-1.5 cursor-pointer"
      >
        오늘
      </button>
    </div>
  );
});

CalendarHeader.displayName = "CalendarHeader";
export default CalendarHeader;
