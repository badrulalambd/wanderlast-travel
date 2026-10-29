'use client'
import { authClient } from "@/lib/auth-client";
import { Destination, formatDepartureDate } from "@/lib/destinations";
import { getTokenFromClient } from "@/lib/getTokenClient";
import { date } from "better-auth";
import { ArrowRight, Check } from "lucide-react";
import React, { FormEvent } from "react";

interface BookingCardProps {
    destinationData: Destination;
}

const bookingPerks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
]

const BookingCard = ({ destinationData }: BookingCardProps) => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newDate = Object.fromEntries(formData.entries());

        const bookingData = {
            username: user?.name,
            email: user?.email,
            ...destinationData,
            departureDate: newDate.departureDate, 
            bookingDate: new Date(),
        }
        
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/bookings`, {
            cache: "no-store",
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bookingData),
        });
        const bookingRes = await res.json();
        console.log("BookingsData from Server Response: ", bookingRes);

    }

    return (
        <div>
            <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="mt-1 text-3xl font-bold text-cyan-600">${destinationData.price}</p>
                <p className="text-xs text-gray-500">per person</p>

                <form onSubmit={handleBooking}>
                    <div className="rounded-md bg-muted px-3 py-2.5 text-sm text-gray-700">
                        <input
                            type="date"
                            name="departureDate"
                            aria-label="Departure date"
                            defaultValue={destinationData.departureDate ?? "Any date"}
                            className="mt-4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
                    >
                        Book Now
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </button>
                </form>

                <ul className="mt-4 space-y-2">
                    {bookingPerks.map((perk) => (
                        <li
                            key={perk}
                            className="flex items-start gap-2 text-xs text-gray-600"
                        >
                            <Check
                                className="mt-0.5 size-3.5 shrink-0 text-cyan-600"
                                aria-hidden="true"
                            />
                            {perk}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default BookingCard;