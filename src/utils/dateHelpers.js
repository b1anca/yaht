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

export const FULL_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const getBeginningOfWeek = (date, startIndex = 1) => {
  const day = date.getDay();
  const diff = date.getDate() - day + startIndex;
  return new Date(date.setDate(diff));
};

const getEndOfWeek = (date, endIndex = 7) => {
  const day = date.getDay();
  const diff = date.getDate() - day + endIndex;
  return new Date(date.setDate(diff));
};

export const getDaysBetweenDates = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

export const getMonthsBetweenDates = (date1, date2) => {
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  let startMonth = date1.getMonth();
  const endMonth =
    date2.getMonth() + (date2.getFullYear() - date1.getFullYear()) * 12;

  const months = [];

  while (startMonth <= endMonth) {
    months.push(MONTH_NAMES[startMonth % 12]);
    startMonth++;
  }

  return months;
};

export const createDateRange = (start, end) => {
  var startDate = new Date(start);
  var endDate = new Date(end);

  var dateArray = [];
  var currentDate = startDate;

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};

export const createWeekRange = (date) =>
  createDateRange(getBeginningOfWeek(date), getEndOfWeek(date));

export const getPreviousWeekRange = (date) => {
  const weekStart = getBeginningOfWeek(new Date(date));
  weekStart.setDate(weekStart.getDate() - 1);
  return createWeekRange(weekStart);
};

export const formatDate = (date) => {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${FULL_MONTH_NAMES[monthIndex]} ${day}, ${year}`;
};

export const areDatesEqual = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getWeekName = (date) => WEEKDAY_NAMES[date.getDay()];

export const getMonthName = (date) => MONTH_NAMES[date.getMonth()];
