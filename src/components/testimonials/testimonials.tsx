"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
   {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
   {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
]

const navButtonClassName =
  "flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-cyan-600 hover:text-cyan-600 disabled:pointer-events-none disabled:opacity-40 lg:size-11"

function TestimonialNav() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel()

  return (
    <div className="mt-2 flex items-center gap-3">
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={navButtonClassName}
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={navButtonClassName}
      >
        <ArrowRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Carousel>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-4xl text-gray-900 lg:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-base text-gray-600 lg:text-lg">
                Real experiences from our happy travelers
              </p>
            </div>
            <TestimonialNav />
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map(({ quote, name, location, image }) => (
              <CarouselItem key={name} className="lg:basis-1/2">
                <article className="flex h-full flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row">
                  <div className="flex flex-1 flex-col">
                    <p className="text-base leading-relaxed text-gray-900 lg:text-lg">
                      {quote}
                    </p>
                    <div className="mt-auto pt-8">
                      <p className="text-cyan-600">— {name}</p>
                      <p className="pl-4 text-sm text-gray-500">{location}</p>
                    </div>
                  </div>
                  <Image
                    src={image}
                    alt={name}
                    width={208}
                    height={256}
                    className="h-60 w-full rounded-lg object-cover sm:h-auto sm:w-52 sm:self-stretch"
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
