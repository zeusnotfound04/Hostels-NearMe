
import BookingDetails from "@/components/bookings/BookingDetails";
import { BookingDetailsPageProps } from "@/types";




export default async function Page({params } : BookingDetailsPageProps ) {

    const  bookingId  = await params.bookingId;   

    
    return (
        <div className="container mx-auto py-10">
            <BookingDetails bookingId={bookingId} />
        </div>
    );
}