"use client"

import { Menu, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "../../public/logo/logo.jpg";
import HostelSearchBar from "@/components/ui/HostelSearchBar"



const isAuthenticated = false



export function SearchNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex h-28 w-full items-center justify-between border-b bg-white px-4 md:px-6">
      {/* Logo on the right for desktop */}
      <div className="hidden md:block">
        <Link href="/" className="flex items-center gap-2">
        <Image
            src={logo}
            alt="Hostels Near Me Logo"
            width={200}
            height={100}
            priority
            quality={100}
            className="hover:scale-110 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Centered search component (hidden on mobile) */}
      <div className="hidden flex-1 items-center justify-center px-2 md:flex">
      <HostelSearchBar  
  positionStyle="w-full max-w-[85%] sm:max-w-[80%] lg:max-w-6xl 
                 bg-white rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 
                 h-[60px] sm:h-[70px] flex flex-col sm:flex-row items-center 
                 gap-2 sm:gap-0 sm:justify-between 
                 shadow-md border border-gray-300"

  buttonStyle="bg-red-500 hover:bg-red-600 text-white font-medium 
               flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 rounded-full 
               flex items-center justify-center"
/>


      </div>

      <div className="flex items-center gap-2">
        {/* Logo on the left for mobile */}
        <div className="md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
               src={logo}
              alt="HostelsNearMe Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {isAuthenticated ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup">Sign Up</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

