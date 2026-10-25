import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
]

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
]

const socialLinks = [
  {
    label: "X",
    href: "#",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.9.423.42.681.817.9 1.38.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.421-.824.679-1.38.9-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.257-2.236-.421-.569-.224-.96-.479-1.379-.899-.42-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.899-1.38.419-.419.81-.689 1.379-.898.42-.421.679-1.065.9-1.38.164-.421.359-1.065.419-2.235.045-1.261.06-1.649.06-4.844 0-3.195.015-3.587.06-4.859.056-1.17.251-1.814.417-2.234.212-.56.476-.959.894-1.378.418-.419.81-.689 1.379-.898.418-.42.679-1.064.9-1.379.164-.42.36-1.065.419-2.235.04-1.26.057-1.64.057-4.844 0-3.199-.015-3.585-.057-4.858-.057-1.171-.255-1.805-.417-2.227-.212-.56-.477-.96-.897-1.379-.419-.419-.81-.688-1.379-.898-.42-.42-.679-.819-.9-1.379-.164-.42-.359-1.064-.419-2.234-.056-1.266-.072-1.644-.072-4.848 0-3.203.016-3.586.072-4.854.06-1.17.255-1.805.419-2.225.213-.56.477-.959.897-1.379.419-.419.812-.689.9-1.379.419-.421.68-.899.9-1.38.164-.421.36-1.064.419-2.235.071-1.262.087-1.643.087-4.844 0-3.196-.015-3.585-.071-4.854-.06-1.17-.255-1.805-.419-2.227-.212-.56-.476-.96-.897-1.379-.419-.419-.81-.689-.9-1.379-.164-.421-.36-1.064-.419-2.235-.056-1.264-.072-1.644-.072-4.844 0-3.204.016-3.585.072-4.854.06 1.17.256 1.805.419 2.226.419.56.217.96.477 1.379.898.418.421.68.899.9 1.379.164.42.36 1.064.419 2.234.07 1.261.087 1.644.087 4.844 0 3.196-.016 3.584-.071 4.854-.06 1.17-.256 1.805-.419 2.227-.412.56-.476.96-.897 1.379-.419.421-.81.899-.9 1.379-.164.42-.359 1.064-.419 2.234-.056 1.265-.072 1.644-.072 4.844z",
  },
]

const headingClassName = "text-base font-medium uppercase lg:text-lg"
const listClassName = "mt-4 flex flex-col gap-3 text-sm lg:text-base"
const linkClassName = "text-neutral-200 transition-colors hover:text-white"

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <p className="text-5xl font-bold lg:text-6xl">Wanderlast</p>
        <p className="mt-4 text-base text-neutral-300 lg:text-lg">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <h3 className={headingClassName}>Newsletter</h3>
            <p className="mt-3 text-sm text-neutral-300">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex h-12 max-w-sm bg-neutral-800">
              <input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="Enter email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 text-white transition-colors hover:text-neutral-300"
              >
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </button>
            </form>
          </div>

          <div>
            <h3 className={headingClassName}>Quick Links</h3>
            <ul className={listClassName}>
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={linkClassName}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClassName}>Support</h3>
            <ul className={listClassName}>
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={linkClassName}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClassName}>Contact Us</h3>
            <ul className={listClassName}>
              <li>
                <a href="tel:7869011622" className={linkClassName}>
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className={linkClassName}
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-400">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white transition-colors hover:text-neutral-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d={path} fillRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
