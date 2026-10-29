"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { FeaturedDestinationCard } from "./FeaturedDestinationCard"
import type { Destination } from "@/lib/destinations"

export function FeaturedDestinationCarousel({
  destinations,
}: {
  destinations: Destination[]
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // Registered via the `setApi` prop (not in an effect body) so the first slide
  // index is known before any "select" event fires.
  const handleApi = React.useCallback((api: CarouselApi) => {
    setApi(api)
    setCurrent(api?.selectedScrollSnap() ?? 0)
  }, [])

  React.useEffect(() => {
    if (!api) return
    const onSelect = (api: CarouselApi) => {
      if (api) setCurrent(api.selectedScrollSnap())
    }
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api?.off("select", onSelect)
      api?.off("reInit", onSelect)
    }
  }, [api])

  if (destinations.length === 0) return null

  return (
    <Carousel
      setApi={handleApi}
      opts={{ align: "start", loop: false }}
      className="w-full"
    >
      <CarouselContent className="-ml-6">
        {destinations.map((destination, index) => (
          <CarouselItem
            key={destination._id ?? index}
            className="pl-6 basis-[85%] sm:basis-1/2 lg:basis-[calc(50%-1.5rem)]"
          >
            <FeaturedDestinationCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselControls total={destinations.length} current={current} />
    </Carousel>
  )
}

function CarouselControls({
  current,
  total,
}: {
  current: number
  total: number
}) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="mt-10 flex items-center gap-6">
      <span className="shrink-0 text-lg text-gray-700">
        {Math.min(current + 1, total)}/{total}
      </span>

      <div
        className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={Math.min(current + 1, total)}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-cyan-600 transition-[width] duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="Previous slide"
          className="size-12 rounded-full border-gray-300 text-gray-500 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600"
          disabled={!canScrollPrev}
          onClick={scrollPrev}
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          aria-label="Next slide"
          className="size-12 rounded-full border-gray-300 text-gray-500 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600"
          disabled={!canScrollNext}
          onClick={scrollNext}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
