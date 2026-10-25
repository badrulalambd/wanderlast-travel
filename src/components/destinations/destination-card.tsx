import Link from "next/link"
import { ArrowUpRight, Clock, MapPin, Star } from "lucide-react"

import { DestinationImage } from "@/components/destinations/destination-image"
import type { Destination } from "@/lib/destinations"
import { formatDuration } from "@/lib/destinations"

const imageSizes =
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

export function DestinationCard({ destination }: { destination: Destination }) {
  const { name, country, price, duration, imageUrl } = destination
  const detailHref = destination._id
    ? `/destinations/${destination._id}`
    : "/destinations"

  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-2.5 transition-shadow hover:shadow-md">
      <Link
        href={detailHref}
        className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-muted"
      >
        <DestinationImage
          src={imageUrl}
          alt={name}
          sizes={imageSizes}
          className="object-cover"
        />
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-900 shadow-sm">
          4.5
          <Star
            className="size-3 fill-cyan-500 text-cyan-500"
            aria-hidden="true"
          />
        </span>
      </Link>

      <div className="px-1 pt-3 pb-1">
        <p className="flex items-center gap-1.5 text-xs text-gray-600">
          <MapPin className="size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          {country}
        </p>

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="truncate text-base font-semibold text-gray-900">
            <Link
              href={detailHref}
              className="transition-colors hover:text-cyan-700"
            >
              {name}
            </Link>
          </h3>
          <p className="shrink-0 text-base font-semibold text-gray-900">
            ${price}
            <span className="text-xs font-normal text-gray-500">/Person</span>
          </p>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          {formatDuration(duration)}
        </p>

        <Link
          href={detailHref}
          className="mt-3 inline-flex items-center gap-1 rounded-md border border-cyan-500 px-3 py-1.5 text-xs font-semibold tracking-wider text-cyan-600 uppercase transition-colors hover:bg-cyan-50"
        >
          Book Now
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
