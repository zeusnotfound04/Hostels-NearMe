"use client"
import BookingDetails from "@/components/BookingDetails";
import { BookingDetailsPageProps } from "@/types";
import { notFound } from "next/navigation";
import { useEffect , useState } from "react";




export default async function Page({params } : BookingDetailsPageProps ) {
    const [booking, setBooking] = useState<any>(null);
    const  bookingId  = await params.bookingId;   
    useEffect(() => {
        // Simulate an API call or fetching data from a server
        const fetchBookingDetails = async () => {
          // Replace with your actual API call
          const response = await fetch(`/api/bookings/${params.bookingId}`);
          const data = await response.json();
          setBooking(data);
        };
    
        fetchBookingDetails();
      }, [bookingId]);
    
      if (!booking) {
        return <div>Loading...</div>;
      }

    
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Booking Details</h1>
            <BookingDetails booking={booking} />
        </div>
    );
}