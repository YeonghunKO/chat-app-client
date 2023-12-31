export const calculateTime = (inputDateStr: string) => {
  // Assuming the input date string is in UTC format
  const inputDate = new Date(inputDateStr);

  // Get current date
  const currentDate = new Date();

  // Set up date formats
  const timeFormat = { hour: "numeric", minute: "numeric" } as const;
  const dateFormat = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  } as const;

  // Check if it's today, tomorrow, or more than one day ago
  if (
    inputDate.getUTCDate() === currentDate.getUTCDate() &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // Today: Convert to AM/PM format
    const ampmTime = inputDate.toLocaleTimeString("en-US", timeFormat);
    return ampmTime;
  } else if (
    inputDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // Tomorrow: Show "Yesterday"

    return "Yesterday";
  } else if (
    Math.floor(
      (currentDate.valueOf() - inputDate.valueOf()) / (1000 * 60 * 60 * 24),
    ) > 1 &&
    Math.floor(
      (currentDate.valueOf() - inputDate.valueOf()) / (1000 * 60 * 60 * 24),
    ) <= 7
  ) {
    const timeDifference = Math.floor(
      (currentDate.valueOf() - inputDate.valueOf()) / (1000 * 60 * 60 * 24),
    );

    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() - timeDifference);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const targetDay = daysOfWeek[targetDate.getDay()];

    return targetDay;
  } else {
    // More than 7 days ago: Show date in DD/MM/YYYY format
    const formattedDate = inputDate.toLocaleDateString("en-GB", dateFormat);
    return formattedDate;
  }
};

export const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatAMPM = (date: string) => {
  const formattedDate = new Date(date);
  let hours = formattedDate.getHours();
  let minutes = formattedDate.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? Number("0" + minutes) : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
