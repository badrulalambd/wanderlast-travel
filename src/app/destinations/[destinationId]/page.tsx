import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react"

import { DestinationImage } from "@/components/destinations/destination-image"
import {
  formatDepartureDate,
  formatDuration,
  getDestination,
} from "@/lib/destinations"
import EditDestinationDialog from "@/components/editdestination/EditDestinationDialog"
import DeleteDestinationDialog from "@/components/delete-destination/DeleteDestinationDialog"

export const dynamic = "force-dynamic"

// Placeholder content until the API exposes a highlights field.
const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
]

const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]

type Props = {
  params: Promise<{ destinationId: string }>
}

export default async function DestinationDetailPage({ params }: Props) {
  const { destinationId } = await params
  const result = await getDestination(destinationId)

  if (result.status === "not-found") notFound()

  if (result.status === "unavailable") {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center">
          <p className="text-base text-gray-700">
            We couldn&apos;t load this destination right now.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Make sure the API server is running on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              http://localhost:5000
            </code>{" "}
            and try again.
          </p>
          <Link
            href="/destinations"
            className="mt-4 inline-block text-sm font-semibold text-cyan-600 underline-offset-4 hover:underline"
          >
            Back to Destinations
          </Link>
        </div>
      </div>
    )
  }

  const { _id, name, country, price, duration, departureDate, imageUrl, description } =
    result.destination;
  const destinationData = result.destination;
  const departure = formatDepartureDate(departureDate)

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Destinations
        </Link>
        <div className="flex items-center gap-2">
          <EditDestinationDialog 
          destinationData={destinationData}
          />
          <DeleteDestinationDialog 
          _id={_id}
          />
        </div>
      </div>

      <div className="relative mt-4 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <DestinationImage
          src={imageUrl}
          alt={name}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="size-4" aria-hidden="true" />
            {country}
          </p>
          <h1 className="mt-1 text-4xl font-medium text-gray-900 lg:text-5xl">
            {name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Star
                className="size-4 fill-cyan-500 text-cyan-500"
                aria-hidden="true"
              />
              <span className="font-semibold text-gray-900">4.9</span>
              (234 reviews)
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4 text-gray-400" aria-hidden="true" />
              {formatDuration(duration).replace("/", " / ")}
            </span>
          </div>

          {description ? (
            <section className="mt-8 max-w-3xl">
              <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                {description}
              </p>
            </section>
          ) : null}

          <section className="mt-8 max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-flow-col sm:grid-rows-3 sm:gap-x-8">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-cyan-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="mt-1 text-3xl font-bold text-cyan-600">${price}</p>
          <p className="text-xs text-gray-500">per person</p>

          <div className="mt-4 rounded-md bg-muted px-3 py-2.5 text-sm text-gray-700">
            {departure ?? "Any date"}
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
          >
            Book Now
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>

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
    </div>
  )
}
