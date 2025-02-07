import { getHostel } from "@/actions";
import TestBooking from "@/components/TestBooking";
import { TestingProps } from "@/types";


async function Page( {params } : TestingProps) {

    
    const hostel = await getHostel(params.hostelId)
    const hostelName = hostel?.name
    console.log(params.hostelId)
    console.log(hostelName)

    console.log(hostel)
    return <div>

        <TestBooking hostelId={params.hostelId} hostelName={hostelName}/>

    </div>
}

export default Page;