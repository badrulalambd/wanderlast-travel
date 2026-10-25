import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Cta() {
  return (
    <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden py-20 lg:min-h-[520px]">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="relative flex flex-col items-center px-4 text-center">
        <h2 className="text-4xl text-white lg:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/90 lg:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-8 py-4 text-sm font-semibold tracking-wider text-gray-900 uppercase transition-colors hover:bg-gray-100"
        >
          Book Your Trip Today
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  )
}
