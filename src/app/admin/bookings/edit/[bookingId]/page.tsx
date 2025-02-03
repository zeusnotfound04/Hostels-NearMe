import { BookingDetailsPageProps } from "@/types";


export default async function Page( {params } : BookingDetailsPageProps) {
    const bookingId = await params.bookingId;

    return (
        <div>
            Hemlo from the booking : {bookingId}
        </div>
    )
}