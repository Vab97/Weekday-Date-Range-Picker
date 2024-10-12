import React, { useState, useEffect } from "react";
import "./DateRangePicker.css";
import { getWeekendsInRange, isWeekday } from "../../Utility/utility";
import { DateRangePickerProps } from "../../Types/types";

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  predefinedRanges,
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [weekendsInRange, setWeekendsInRange] = useState<Date[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  
  const nextMonth = () => setCurrentMonth((prev) => (prev + 1) % 12);
  const prevMonth = () => setCurrentMonth((prev) => (prev - 1 + 12) % 12);
  const nextYear = () => setCurrentYear((prev) => prev + 1);
  const prevYear = () => setCurrentYear((prev) => prev - 1);

  useEffect(() => {
    if (startDate && endDate) {
      const weekends = getWeekendsInRange(startDate, endDate);
      setWeekendsInRange(weekends);
      if (onChange) {
        onChange([startDate, endDate], weekends);
      }
    }
  }, [startDate, endDate, onChange]);

  const handleDateSelection = (date: Date) => {
    if (!isWeekday(date)) return;
    if (!startDate) {
      setStartDate(date);
    } else if (!endDate) {
      if (date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const renderCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const calendarDays = [];

    for (let i = 0; i < firstWeekday; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isWeekend = !isWeekday(currentDate);

      calendarDays.push(
        <button
          key={i}
          className={`calendar-day ${isWeekend ? "weekend" : ""} ${
            startDate &&
            endDate &&
            currentDate >= startDate &&
            currentDate <= endDate
              ? "selected"
              : ""
          }`}
          onClick={() => handleDateSelection(currentDate)}
          disabled={isWeekend}
        >
          {i}
        </button>
      );
    }

    return calendarDays;
  };

  const handlePredefinedRangeSelection = (rangeGetter: () => [Date, Date]) => {
    const range = rangeGetter();
    if (Array.isArray(range) && range.length === 2) {
      const [start, end] = range;
      setStartDate(start);
      setEndDate(end);
    } else {
      console.error(
        "Invalid range returned by getRange. Expected a [start, end] tuple."
      );
    }
  };

  return (
    <div className="date-range-picker">
      <div className="input-box">
        <input
          type="text"
          value={
            startDate && endDate
              ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
              : "MM/dd/yyyy ~ MM/dd/yyyy"
          }
          readOnly
        />
      </div>
      <div className="calendar-controls">
        <button onClick={prevYear}>{"<<"}</button>
        <button onClick={prevMonth}>{"<"}</button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </span>
        <button onClick={nextMonth}>{">"}</button>
        <button onClick={nextYear}>{">>"}</button>
      </div>
      <div className="calendar-container">
        <div className="calendar">
          <div className="calendar-header">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-body">
            {renderCalendar(currentYear, currentMonth)}
          </div>
        </div>
        <div className="calendar">
          <div className="calendar-header">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-body">
            {renderCalendar(currentYear, currentMonth + 1)}
          </div>
        </div>
      </div>
      {predefinedRanges && (
        <div className="predefined-ranges">
          {predefinedRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePredefinedRangeSelection(range.getRange)}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
      {weekendsInRange.length > 0 && (
        <div className="weekends-display">
          <h4>Weekends in the selected range:</h4>
          <ul>
            {weekendsInRange.map((weekend, index) => (
              <li key={index}>{weekend.toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
