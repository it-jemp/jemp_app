function readableDate(term: Date | string, showYear: boolean = true) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  // https://stackoverflow.com/a/66590756/295606
  // https://stackoverflow.com/a/67196206/295606
  const readable = term instanceof Date ? term : new Date(term)
  const day = readable.toLocaleDateString("en-UK", { day: "numeric" })
  const month = readable.toLocaleDateString("en-UK", { month: "short" })
  if (showYear) {
    const year = readable.toLocaleDateString("en-UK", { year: "numeric" })
    return `${day} ${month} ${year}`
  }
  return `${day} ${month}`
}

function localeDate(date: Date | string) {
  const dateIn = date instanceof Date ? date : new Date(date)
  return dateIn.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
}

export { readableDate, localeDate }
