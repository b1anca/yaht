import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  differenceInDays,
} from "date-fns";

export const getWeeklyDateRange = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // (0 = Sunday, 1 = Monday, ...)
  const end = endOfWeek(date, { weekStartsOn: 1 });

  return eachDayOfInterval({ start, end });
};

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDaysInMonth = (month, year) => {
  return eachDayOfInterval({
    start: startOfMonth(new Date(year, month)),
    end: endOfMonth(new Date(year, month)),
  });
};
export const getBeginningOfWeek = (date, startIndex = 1) => {
  return startOfWeek(date, { weekStartsOn: startIndex });
};

export const getDaysBetweenDates = (date1, date2) => {
  return differenceInDays(new Date(date2), new Date(date1));
};

export const getMonthsBetweenDates = (date1, date2) => {
  return eachMonthOfInterval({
    start: startOfMonth(date1),
    end: endOfMonth(date2),
  }).map((date) => format(date, "MMM"));
};
