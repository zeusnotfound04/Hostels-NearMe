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
import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Import promo card with SSR disabled to prevent hydration errors
const HostelPromoCard = dynamic(() => import('@/components/promo/Card'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
    <div className="animate-pulse text-gray-400">Loading promo content...</div>
  </div>
});

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
        <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center bg-white rounded-lg">Loading...</div>}>
          <HostelPromoCard />
        </Suspense>
        <Testimonials />
        <MissionVisionCards />
      </div>
      <Link href="/admin">Open My Admin</Link>
    </main>
  );
}
