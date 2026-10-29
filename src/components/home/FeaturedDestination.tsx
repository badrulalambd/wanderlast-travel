import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FeaturedDestinationCarousel } from "./FeaturedDestinationCarousel"
import type { Destination } from "@/lib/destinations"

const FeaturedDestination = async () => {
  let featuredDestinations: Destination[] = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/featured-destination`, {
      cache: "no-store"
    });
    const data: unknown = await res.json();
    featuredDestinations = Array.isArray(data) ? (data as Destination[]) : []
  } catch {
    // API unreachable — render nothing instead of crashing the home page.
    featuredDestinations = []
  }
  console.log("featured Destinations: ", featuredDestinations);

  if (featuredDestinations.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl text-gray-900 lg:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-base text-gray-600 lg:text-lg">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-3 rounded-md border border-cyan-500 px-6 py-3.5 text-sm font-semibold tracking-wider text-cyan-600 uppercase transition-colors hover:bg-cyan-50"
        >
          All Destinations
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="mt-10">
        <FeaturedDestinationCarousel destinations={featuredDestinations} />
      </div>
    </section>
  );
};

export default FeaturedDestination;
