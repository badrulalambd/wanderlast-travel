'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "cn"
import { Menu } from "lucide-react"
import { authClient } from "@/lib/auth-client"

//import Popover
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

//import Sheet for the mobile/tablet hamburger drawer
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

//import for avator
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
]

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

export function Navbar() {

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center">
          {/* Mobile & tablet (< lg): hamburger opens a drawer with the full menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="justify-self-start lg:hidden"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 sm:max-w-xs">
              <SheetHeader className="border-b border-gray-100">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation and account
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map(({ label, href }) => (
                  <SheetClose
                    key={label}
                    render={
                      <Link
                        href={href}
                        aria-current={isActive(href) ? "page" : undefined}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-cyan-50 hover:text-cyan-600",
                          isActive(href)
                            ? "bg-cyan-50 text-cyan-600"
                            : "text-gray-800"
                        )}
                      >
                        {label}
                      </Link>
                    }
                  />
                ))}
              </nav>

              <div className="mt-auto border-t border-gray-100 p-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image as string}
                          alt=""
                          className="grayscale"
                        />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <SheetClose
                      render={
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {accountLinks.map(({ label, href }) => (
                      <SheetClose
                        key={label}
                        render={
                          <Link
                            href={href}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-cyan-50 hover:text-cyan-600"
                          >
                            {label}
                          </Link>
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop (lg+): inline nav links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-cyan-600",
                  isActive(href) ? "text-cyan-600" : "text-gray-800"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

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
          {
            user ?
              <Popover>
                <PopoverTrigger render={
                  <Button variant="outline" className="w-fit flex items-center justify-center py-5">
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        alt=""
                        className="grayscale"
                      />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">Profile</span>
                  </Button>} />
                <PopoverContent align="start">
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>
                      {user?.email}
                    </PopoverDescription>
                    <Button onClick={handleLogout} variant="destructive">Logout</Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
              :
              <div className="flex items-center justify-end gap-5 text-sm font-medium text-gray-800">
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
          }

        </div>
      </div>
    </header>
  )
}
