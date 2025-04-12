"use client";

import { useSession } from "next-auth/react";
import {HostelSearch} from "@/components/home/HostelSearch";
import { StepBooking } from "@/components/home/StepBooking";
import MissionVisionCards from "@/components/home/VissionCard";
import { Testimonials } from "@/components/home/Testimonials";
import { HostelListing } from "@/components/home/HostelListing";
import HomeText from "@/components/home/HomeText";
import PromoCard from "@/components/promo";




//Todo 
// 1. Make this page server component

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <div className="z-10 w-full max-w-6xl items-center justify-between font-sans text-sm">
    
        <HostelSearch />
        <HomeText />
        <HostelListing />
        <StepBooking />
        <PromoCard/>
        <Testimonials />
        <MissionVisionCards />
      </div>
    </main>
  );
}
