import Link from "next/link"

import { DestinationCard } from "@/components/destinations/destination-card"
import { getDestinations } from "@/lib/destinations"

export const dynamic = "force-dynamic"

export default async function AllDestinationsPage() {
  const destinations = await getDestinations()

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <h1 className="text-4xl text-gray-900 lg:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-base text-gray-600 lg:text-lg">
        Find your perfect travel experience from our curated collection
      </p>

      <p className="mt-8 text-sm text-gray-500">
        {destinations === null
          ? "Destinations unavailable"
          : `Showing ${destinations.length} destination${destinations.length === 1 ? "" : "s"}`}
      </p>

      {destinations === null ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center">
          <p className="text-base text-gray-700">
            We couldn&apos;t load destinations right now.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Make sure the API server is running on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">http://localhost:5000</code>{" "}
            and try again.
          </p>
        </div>
      ) : destinations.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center">
          <p className="text-base text-gray-700">No destinations yet.</p>
          <Link
            href="/add-destination"
            className="mt-3 inline-block text-sm font-semibold text-cyan-600 underline-offset-4 hover:underline"
          >
            Add the first one
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination._id ?? index}
              destination={destination}
            />
          ))}
        </div>
      )}
    </div>
  )
}
