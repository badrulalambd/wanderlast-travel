'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, CircleCheckBig, Clock, Eye, MapPin, Trash2 } from "lucide-react"

import { DestinationImage } from "@/components/destinations/destination-image"
import type { Booking } from "@/lib/destinations"
import { getTokenFromClient } from "@/lib/getTokenClient"

// const MONTH_NAMES = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
// ]

/** "2026-05-15" -> "May 15, 2026". Returns the input unchanged when it isn't an ISO date. */
// function formatLongDate(value?: string): string | null {
//     if (!value) return null
//     const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
//     if (!parts) return value
//     const [, year, month, day] = parts
//     return `${MONTH_NAMES[Number(month) - 1]} ${Number(day)}, ${year}`
// }

const MyBookingCard = ({ myBooking }: { myBooking: Booking }) => {
    const router = useRouter()
    const { _id, name, price, imageUrl, departureDate, status } = myBooking

    const isPending = status?.toLowerCase() === "pending"
    // const departure = formatLongDate(departureDate)
    // const detailHref = _id ? `/destinations/${_id}` : "/destinations"

    const handleCancel = async () => {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.DESTINATIONS_API_BASE_URL}/my-bookings/${_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const resData = await res.json()
        console.log(resData)
        router.refresh()
    }

    return (
        <article className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row">
            <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:aspect-4/3 sm:w-72">
                <DestinationImage
                    src={imageUrl}
                    alt={name}
                    sizes="(min-width: 640px) 288px, 100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${isPending ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
                        }`}
                >
                    {isPending ? (
                        <Clock className="size-3.5" aria-hidden="true" />
                    ) : (
                        <CircleCheckBig className="size-3.5" aria-hidden="true" />
                    )}
                    {isPending ? "Pending" : "Confirmed"}
                </span>

                <h2 className="mt-3 text-2xl font-semibold text-gray-900">{name}</h2>

                <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
                    Departure: {departureDate}
                </p>

                <p className="mt-1.5 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
                    Booking ID: {_id ?? "—"}
                </p>

                <p className="mt-3 text-2xl font-bold text-cyan-600">${price}</p>

                <div className="mt-auto flex justify-end gap-3 pt-4">
                    <button
                        onClick={handleCancel}
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <Trash2 className="size-4" aria-hidden="true" />
                        Cancel
                    </button>
                    <Link
                        href='/'
                        className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
                    >
                        <Eye className="size-4" aria-hidden="true" />
                        View
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default MyBookingCard
