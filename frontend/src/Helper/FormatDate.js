export default function formatDate(dateTime) {
  const inputDate = new Date(dateTime);
  const now = new Date();

  const isToday =
    inputDate.getDate() === now.getDate() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return `Today`;
  } else {
    const day = String(inputDate.getDate()).padStart(2, "0");
    const monthNames = [
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
    const month = monthNames[inputDate.getMonth()];
    const slicedYear = inputDate.getFullYear().toString().slice(2,4);
    return `${day}-${month}-${slicedYear}`;
  }
}