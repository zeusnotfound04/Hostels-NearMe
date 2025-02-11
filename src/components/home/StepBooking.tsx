import IconsBG from "../../../public/icons/IconsBG.png";
import Image from "next/image";
import Book from "../../../public/UI/book.png";
import View from "../../../public/UI/view.png";
import Compare from "../../../public/UI/compare.png";

export function StepBooking() {
  return (
    <div className="flex w-full flex-col items-start justify-center py-10 px-6">
      {/* Left-aligned heading */}
      <h2 className="text-4xl font-bold text-black mb-6">
        Three Simple Steps to Effortless Booking
      </h2>

      {/* Horizontal Scroll Wrapper for Mobile */}
      <div className="overflow-x-auto w-full">
        <div className="bg-[#7C2121] rounded-xl p-6 flex gap-4 w-full max-w-6xl relative overflow-hidden">
          {/* Background Image */}
          <Image 
            src={IconsBG}
            alt="Background icons" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-20 absolute inset-0"
          />

          {/* Step 1 */}
          <div className="flex flex-col p-2 flex-1 relative z-10 min-w-[250px]">
            <h2 className="text-white text-2xl font-bold text-left mb-8">
              Step 1
            </h2>
            <div className="bg-white rounded-lg p-6 w-full h-48 flex flex-col justify-between relative overflow-hidden pb-12">
              <h1 className="text-[#7C2121] font-bold absolute top-3 left-4">VIEW</h1>
              <div className="flex items-center justify-center w-full h-full">
                <Image src={View} alt="Step 1" width={500} height={500} className="max-h-32 object-contain" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col p-2 flex-1 relative z-10 min-w-[250px]">
            <h3 className="text-white text-2xl font-bold text-left mb-8">
              Step 2
            </h3>
            <div className="bg-white rounded-lg p-6 w-full h-48 flex flex-col justify-between relative overflow-hidden pb-12">
              <h1 className="text-[#7C2121] font-bold absolute top-3 left-4">COMPARE</h1>
              <div className="flex items-center justify-center w-full h-full">
                <Image src={Compare} alt="Step 2" width={500} height={500} className="max-h-32 object-contain" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col p-2 flex-1 relative z-10 min-w-[250px]">
            <h3 className="text-white text-2xl font-bold text-left mb-8">
              Step 3
            </h3>
            <div className="bg-white rounded-lg p-6 w-full h-48 flex flex-col justify-between relative overflow-hidden pb-12">
              <h1 className="text-[#7C2121] font-bold absolute top-3 left-4">BOOK</h1>
              <div className="flex items-center justify-center w-full h-full">
                <Image src={Book} alt="Step 3" width={500} height={500} className="max-h-32 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
