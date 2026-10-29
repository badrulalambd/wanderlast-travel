import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react"

import { DestinationImage } from "@/components/destinations/destination-image"
import { formatDuration } from "@/lib/format"
import type { Destination } from "@/lib/destinations"

/**
 * Featured variant of the destination card: no border, larger title, and an
 * underlined "Book Now" link, per the Featured Destinations design.
 * Rendered inside the featured carousel (client), so keep runtime imports client-safe.
 */
export function FeaturedDestinationCard({
  destination,
}: {
  destination: Destination
}) {
  const { name, country, price, duration, imageUrl } = destination
  const detailHref = destination._id
    ? `/destinations/${destination._id}`
    : "/destinations"

  return (
    <article className="group">
      <Link
        href={detailHref}
        className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-muted"
      >
        <DestinationImage
          src={imageUrl}
          alt={name}
          sizes="(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm">
          4.5
          <Star
            className="size-3.5 fill-gray-900 text-gray-900"
            aria-hidden="true"
          />
        </span>
      </Link>

      <div className="pt-4">
        <p className="flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
          {country}
        </p>

        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h3 className="text-2xl text-gray-900">
            <Link
              href={detailHref}
              className="transition-colors group-hover:text-cyan-700"
            >
              {name}
            </Link>
          </h3>
          <p className="shrink-0 text-2xl font-semibold text-gray-900">
            ${price}
            <span className="text-xs font-normal text-gray-500">/Person</span>
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
          <CalendarDays
            className="size-4 shrink-0 text-gray-400"
            aria-hidden="true"
          />
          {formatDuration(duration)}
        </p>

        <Link
          href={detailHref}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wider text-cyan-600 uppercase underline underline-offset-4 transition-colors hover:text-cyan-700"
        >
          Book Now
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
