import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const searchFields = [
  { label: "Location", name: "location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", name: "dates", placeholder: "Anytime/3 Days" },
  { label: "Budget", name: "budget", placeholder: "$0-$3000" },
  { label: "People", name: "people", placeholder: "5-10" },
]

export function Banner() {
  return (
    <section className="relative flex min-h-[640px] flex-col overflow-hidden lg:min-h-[calc(100svh_-_3.5rem)]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-14 pt-16 text-center">
        <h1 className="max-w-3xl text-4xl leading-[1.1] font-normal text-white sm:text-5xl lg:text-6xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-md bg-cyan-600 px-7 py-3.5 text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:bg-cyan-700"
          >
            Explore Now
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/destinations"
            className="rounded-md bg-white/20 px-7 py-3.5 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      <form className="relative grid grid-cols-1 divide-y divide-white/20 border-t border-white/20 bg-white/15 backdrop-blur-md lg:grid-cols-5 lg:divide-x lg:divide-y-0">
        {searchFields.map(({ label, name, placeholder }) => (
          <div key={name} className="px-6 py-3 text-left">
            <label
              htmlFor={name}
              className="block text-sm font-semibold text-white"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type="text"
              placeholder={placeholder}
              className="mt-0.5 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-cyan-600 px-10 py-4 text-base font-medium text-white transition-colors hover:bg-cyan-700 lg:py-0"
        >
          Search
        </button>
      </form>
    </section>
  )
}
