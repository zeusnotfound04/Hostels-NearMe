"use client";

import { useSession } from "next-auth/react";
import {HostelSearch} from "@/components/home/HostelSearch";
import { StepBooking } from "@/components/home/StepBooking";
import MissionVisionCards from "@/components/home/VissionCard";
import { Testimonials } from "@/components/home/Testimonials";
import { HostelListing } from "@/components/home/HostelListing";
import HomeText from "@/components/home/HomeText";
import Link from "next/link";
import ScrollFloat from "@/components/ui/ScrollFloat";

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);


  console.log(session?.user.role)
  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <div className="z-10 w-full max-w-6xl items-center justify-between font-sans text-sm">
    
        <HostelSearch />
        <HomeText />
        <HostelListing />
        <StepBooking />
         
        <Testimonials />
        <MissionVisionCards />
      </div>
      <Link href="/admin">Open My Admin</Link>
    </main>
  );
}
