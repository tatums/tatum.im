type DateStyle = Intl.DateTimeFormatOptions["dateStyle"]

export function formatDate(date: string, dateStyle: DateStyle = "medium", locales = "en") {
  const dateToFormat = new Date(Date.parse(date));
  if (isNaN(dateToFormat.getTime())) {
    throw new Error("Invalid date format");
  }
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}
