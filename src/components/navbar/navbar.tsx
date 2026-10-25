import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { cn } from "cn"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
]

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-600",
                active ? "text-cyan-600" : "text-gray-800"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={160}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex items-center justify-end gap-5 text-sm font-medium text-gray-800">
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 transition-colors hover:text-cyan-600 sm:inline-flex"
          >
            <User className="size-4" aria-hidden="true" />
            Profile
          </Link>
          {accountLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-cyan-600"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
