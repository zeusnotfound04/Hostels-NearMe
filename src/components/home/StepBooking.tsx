import IconsBG from "../../../public/icons/IconsBG.png";
import Image from "next/image";

export function StepBooking() {
  return (
    <div className="flex flex-col items-start justify-center py-10 px-6">
      {/* Left-aligned heading */}
      <h2 className="text-2xl font-bold text-black mb-6 text-left">
        Three Simple Steps to Effortless Booking
      </h2>

      {/* Main container without white background */}
      <div className="bg-[#7C2121] rounded-xl p-6 flex gap-4 w-full max-w-4xl relative overflow-hidden">
        {/* Background Image */}
        <Image 
          src={IconsBG}
          alt="Background icons" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-20 absolute inset-0"
        />

        {/* Step 1 */}
        <div className="flex flex-col flex-1 relative z-10">
          <h3 className="text-white font-bold mb-2 absolute top-[-20px] left-4">
            Step 1
          </h3>
          <div className="bg-white rounded-lg p-6 w-full h-40 flex items-center justify-center">
            <Image src="/path-to-step1-image.png" alt="Step 1" width={100} height={100} />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col flex-1 relative z-10">
          <h3 className="text-white font-bold mb-2 absolute top-[-20px] left-4">
            Step 2
          </h3>
          <div className="bg-white rounded-lg p-6 w-full h-40 flex items-center justify-center">
            <Image src="/path-to-step2-image.png" alt="Step 2" width={100} height={100} />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col flex-1 relative z-10">
          <h3 className="text-white font-bold mb-2 absolute top-[-20px] left-4">
            Step 3
          </h3>
          <div className="bg-white rounded-lg p-6 w-full h-40 flex items-center justify-center">
            <Image src="/path-to-step3-image.png" alt="Step 3" width={100} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
