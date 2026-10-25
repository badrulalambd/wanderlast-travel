export type Destination = {
  _id?: string
  name: string
  country: string
  price: string | number
  duration: string
  departureDate?: string
  imageUrl?: string
  description?: string
}

const DESTINATIONS_API = "http://localhost:5000/destinations"

/**
 * Fetches destinations from the external API.
 * Returns null when the API is unreachable or responds unexpectedly,
 * so pages can render an error state instead of crashing.
 */
export async function getDestinations(): Promise<Destination[] | null> {
  try {
    const res = await fetch(DESTINATIONS_API, { cache: "no-store" })
    if (!res.ok) return null
    const data: unknown = await res.json()
    return Array.isArray(data) ? (data as Destination[]) : null
  } catch {
    return null
  }
}

export type DestinationResult =
  | { status: "found"; destination: Destination }
  | { status: "not-found" }
  | { status: "unavailable" }

/**
 * Fetches a single destination by id.
 * The API answers unknown ids with 200 + an empty body, so that maps to
 * "not-found"; an unreachable API maps to "unavailable".
 */
export async function getDestination(id: string): Promise<DestinationResult> {
  try {
    const res = await fetch(`${DESTINATIONS_API}/${id}`, { cache: "no-store" })
    if (!res.ok) return { status: "not-found" }
    const body = await res.text()
    if (!body.trim()) return { status: "not-found" }
    const data: unknown = JSON.parse(body)
    if (!data || typeof data !== "object" || !("name" in data)) {
      return { status: "not-found" }
    }
    return { status: "found", destination: data as Destination }
  } catch {
    return { status: "unavailable" }
  }
}

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
