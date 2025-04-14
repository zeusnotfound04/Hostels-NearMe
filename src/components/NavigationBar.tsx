"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { SearchNavBar } from "./SearchNavBar"

export default function NavigationBar() {
  const pathname = usePathname()
  
  // Show regular Navbar only on home page, SearchNavBar on all other routes
  const isHomePage = pathname === "/"
  
  return isHomePage ? <Navbar /> : <SearchNavBar />
}