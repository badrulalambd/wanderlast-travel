/** Pure display helpers, side-effect free — safe to import from client components. */

/** "2026-10-29" -> "10/29/2026". Returns the input unchanged when it isn't an ISO date. */
export function formatDepartureDate(value?: string): string | null {
  if (!value) return null
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (!parts) return value
  const [, year, month, day] = parts
  return `${month}/${day}/${year}`
}

/** "2 days 1 night" -> "2 Days/1 Night". Returns the input unchanged when it doesn't match. */
export function formatDuration(duration: string): string {
  const parts = duration.match(/\d+/g)
  if (!parts || parts.length < 2) return duration
  const [days, nights] = parts
  const plural = (value: string, word: string) =>
    `${value} ${word}${value === "1" ? "" : "s"}`
  return `${plural(days, "Day")}/${plural(nights, "Night")}`
}
