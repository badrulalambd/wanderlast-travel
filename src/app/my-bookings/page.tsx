import Link from "next/link"
import { headers } from "next/headers"

import MyBookingCard from "@/components/booking/MyBookingCard"
import { auth } from "@/lib/auth"
import { getMyBookings } from "@/lib/destinations"

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const user = session?.user

    const myBookings = user?.email ? await getMyBookings(user?.email) : null

    return (
        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <h1 className="text-4xl text-gray-900 lg:text-5xl">My Bookings</h1>
            <p className="mt-3 text-base text-gray-600 lg:text-lg">
                Manage and view your upcoming travel plans
            </p>

            {myBookings === null ? (
                <div className="mt-8 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center">
                    <p className="text-base text-gray-700">
                        We couldn&apos;t load your bookings right now.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Make sure the API server is running on{" "}
                        <code className="rounded bg-muted px-1.5 py-0.5">http://localhost:5000</code>{" "}
                        and try again.
                    </p>
                </div>
            ) : myBookings.length === 0 ? (
                <div className="mt-8 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center">
                    <p className="text-base text-gray-700">
                        You haven&apos;t booked any trips yet.
                    </p>
                    <Link
                        href="/destinations"
                        className="mt-3 inline-block text-sm font-semibold text-cyan-600 underline-offset-4 hover:underline"
                    >
                        Explore destinations
                    </Link>
                </div>
            ) : (
                <div className="mt-8 space-y-6">
                    {myBookings.map((myBooking, index) => (
                        <MyBookingCard
                            key={myBooking._id ?? index}
                            myBooking={myBooking}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyBookingsPage
