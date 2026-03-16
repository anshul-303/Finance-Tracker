export function convertSQLDateToReadable(isoDate) {
//Converts "2025-12-27T18:30:00.000Z" to 28 Dec 2025

  const formattedDate = new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate ; // 28 Dec 2025
}
