"use client"

import { Menu, User, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "../../public/logo/logo.jpg"
import HostelSearchBar from "@/components/ui/HostelSearchBar"
import { signOut, useSession } from "next-auth/react"

export function SearchNavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const { data: session, status } = useSession()
  console.log("CURRENT SESSION :::"  , session)
  
  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [status])
  
  const authButtons = isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <User className="h-5 w-5 text-gray-700" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1 border border-gray-200 shadow-lg rounded-xl">
        <DropdownMenuItem asChild className="rounded-lg py-2 px-4 hover:bg-gray-50">
          <Link href="/bookings" className="flex items-center gap-2">
            <span className="text-red-600">●</span>
            <span>My Bookings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-lg py-2 px-4 hover:bg-gray-50">
          <Link href="/profile" className="flex items-center gap-2">
            <span className="text-red-600">●</span>
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem className="rounded-lg py-2 px-4 hover:bg-gray-50 text-red-500 font-medium" onClick={()=> signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Button variant="ghost" className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-xl shadow-md hover:shadow-lg transition-all" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </>
  )

  const mobileMenuContent = isAuthenticated ? (
    <>
      <DropdownMenuItem asChild className="rounded-lg py-3 px-4 hover:bg-gray-50">
        <Link href="/bookings" className="flex items-center gap-2">
          <span className="text-red-600">●</span>
          <span>My Bookings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="rounded-lg py-3 px-4 hover:bg-gray-50">
        <Link href="/profile" className="flex items-center gap-2">
          <span className="text-red-600">●</span>
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="my-1" />
      <DropdownMenuItem className="rounded-lg py-3 px-4 hover:bg-gray-50 text-red-500 font-medium">Logout</DropdownMenuItem>
    </>
  ) : (
    <>
      <DropdownMenuItem asChild className="rounded-lg py-3 px-4 hover:bg-gray-50">
        <Link href="/login">Login</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className="rounded-lg py-3 px-4 hover:bg-red-50 text-red-600 font-medium">
        <Link href="/signup">Sign Up</Link>
      </DropdownMenuItem>
    </>
  )

  return (
    <nav className="sticky top-0 z-50 flex flex-col w-full bg-white shadow-sm border-b border-gray-100">

      <div className="flex h-20 items-center justify-between px-4 md:px-8 lg:px-12">

        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Hostels Near Me Logo"
              width={160}
              height={80}
              priority
              quality={100}
              className="h-12 w-auto hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center px-8 md:flex lg:px-16">
        <HostelSearchBar  
  positionStyle="w-full max-w-4xl bg-white hover:bg-white focus-within:bg-white
                rounded-full px-6 py-3 h-14 flex items-center gap-2 
                justify-between shadow-sm hover:shadow transition-all
                border border-gray-200"
  buttonStyle="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
              text-white font-medium flex-shrink-0 px-6 py-2 rounded-full
              flex items-center justify-center shadow-md hover:shadow-lg
              transition-all transform hover:scale-105"
              AnimatePlaceholder={false}

/>

        </div>

        <div className="flex items-center gap-1 md:gap-2">
          
          <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"
                 onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <Search className="h-5 w-5 text-gray-700" />
          </Button>
            
          <div className="hidden md:flex items-center gap-2">
            {authButtons}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200">
                <Menu className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1 mr-2 border border-gray-200 shadow-lg rounded-xl">
              {mobileMenuContent}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-4">
          <HostelSearchBar  
            positionStyle="w-full bg-gray-50 hover:bg-gray-100 focus-within:bg-white
                          rounded-xl px-4 py-3 flex items-center gap-2 
                          justify-between shadow-sm border border-gray-200"
            buttonStyle="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                        text-white font-medium flex-shrink-0 px-4 py-2 rounded-lg
                        flex items-center justify-center"
          />
        </div>
      )}
    </nav>
  )
}