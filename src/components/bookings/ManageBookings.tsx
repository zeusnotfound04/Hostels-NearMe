"use client"
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"

import { columns } from "@/components/bookings/components/columns"
import { DataTable } from "@/components/bookings/components/data-table"
import { taskSchema } from "@/components/bookings/schema/schema"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

interface BookingDetailsProps {
    bookingId: string;
  }

const fetchBookingDetails = async () => {
    const response = await fetch(`/api/bookings`);
    if (!response.ok) throw new Error("Failed to fetch booking details");
    const data = await response.json();
    console.log("Fetched Booking Data at client side:", data); // Log inside query function
    return data;
  };


// // Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "src/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

export default function ManagingBooking () {
    const { data: allBookings, isLoading, error } = useQuery({
        queryKey: ["bookings"], // Ensures caching per bookingId
        queryFn: () => fetchBookingDetails(),
        staleTime: 5 * 60 * 1000, // 5 minutes before re-fetching
        gcTime: 10 * 60 * 1000, // 10 minutes in cache before garbage collection
        refetchOnWindowFocus: false, // Prevents unnecessary refetching when tab is focused
      })

  return (  
    <>
        <div>
            <h1>Manage Bookings</h1>
        </div>
      {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div> */}
    </>
  )
}