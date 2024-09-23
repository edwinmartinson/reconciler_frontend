/**
 * Returns a string representing the current date and time
 * in one of several formats.
 * @param {string} format - The desired format of the returned string.
 * One of "year", "month", "day", "date", "time", or undefined.
 * If undefined, the full datetime string is returned.
 * @returns {string} A string representing the current date and time.
 */
export default function today(format) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const date = `${year}-${month}-${day}`;
  const time = today.toLocaleTimeString("en-US", { hour12: true });
  const datetime = `${date} ${time}`;

  switch (format) {
    case "year":
      return year;
    case "month":
      return month;
    case "day":
      return day;
    case "date":
      return date;
    case "time":
      return time;
    default:
      return datetime;
  }
}
