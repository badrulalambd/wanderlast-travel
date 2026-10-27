'use client'
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
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

//import for avator
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { redirect, useRouter } from "next/navigation"
import { use } from "react"

const navLinks = [
  { label: "Home", href: "/", active: true },
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
  console.log("SessionData from Navbar: ", user);

  const router = useRouter();

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
          {
            user ?
              <Popover>
                <PopoverTrigger render={
                  <Button variant="outline" className="w-fit flex items-center justify-center py-5">
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        alt="@shadcn"
                        className="grayscale"
                      />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    Profile
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
