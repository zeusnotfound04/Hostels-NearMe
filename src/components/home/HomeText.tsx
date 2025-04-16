import { CalenderIcon } from "@/components/ui/icon"

const HomeText = () => {

    return <div className="items-center mt-20 flex flex-row space-x-1 justify-center px-4 text-center xs:text-left">
        <CalenderIcon color='black' />
        <h2 className="text-sm sm:text-base">
            <span className='font-bold'>Free Cancellation</span> &
            <span className='font-bold'>Flexible Booking</span> available
        </h2>
    </div>
}


export default HomeText;