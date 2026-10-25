"use client"

import Image from "next/image"

const FALLBACK_IMAGE = "/images/destinations/image1.png"

/**
 * Destination images are user-supplied URLs from the API and are often broken;
 * falls back to a local placeholder when the remote image fails to load.
 */
export function DestinationImage({
  src,
  alt,
  sizes,
  className,
}: {
  src?: string
  alt: string
  sizes: string
  className?: string
}) {
  return (
    <Image
      src={src || FALLBACK_IMAGE}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={(event) => {
        if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return
        event.currentTarget.src = FALLBACK_IMAGE
      }}
    />
  )
}
