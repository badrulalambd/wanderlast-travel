
import { getTokenFromServer } from "./getTokensServer"

export type Destination = {
  _id?: string
  name: string
  country: string
  category: string
  price: string | number
  duration: string
  departureDate?: string
  imageUrl?: string
  description?: string
}

const DESTINATIONS_API = `${process.env.DESTINATIONS_API_BASE_URL}/destinations`

/**
 * Fetches destinations from the external API.
 * Returns null when the API is unreachable or responds unexpectedly,
 * so pages can render an error state instead of crashing.
 */
export async function getDestinations(): Promise<Destination[] | null> {
  try {
    const res = await fetch(DESTINATIONS_API, {
      cache: "no-store",
    })
    if (!res.ok) {
      const data: unknown = await res.json()
      console.log("Server Response for Destination: ", data);
      return null
    }
    const data: unknown = await res.json()
    console.log("Server Response for Destination: ", data);
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
 const token = await getTokenFromServer();
  try {
    const res = await fetch(`${DESTINATIONS_API}/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
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

/** A stored booking: the destination fields it was created from, plus booking metadata. */
export type Booking = Destination & {
  status?: string
  bookingDate?: string
}

const MY_BOOKINGS_API = `${process.env.DESTINATIONS_API_BASE_URL}/my-bookings`

/**
 * Fetches the bookings of a user from the external API.
 * Returns null when the API is unreachable or responds unexpectedly,
 * so the page can render an error state instead of crashing.
 */
export async function getMyBookings(email: string): Promise<Booking[] | null> {
  const token = await getTokenFromServer();
  try {
    const res = await fetch(`${MY_BOOKINGS_API}/${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    if (!res.ok) return null
    const body = await res.text()
    if (!body.trim()) return []
    const data: unknown = JSON.parse(body)
    return Array.isArray(data) ? (data as Booking[]) : []
  } catch {
    return null
  }
}

// Re-exported for existing importers; the helpers themselves live in ./format so that
// client components can use them without pulling this module's server-only auth chain
// (getTokensServer -> auth -> MongoDB) into the client bundle.
export { formatDepartureDate, formatDuration } from "./format"
