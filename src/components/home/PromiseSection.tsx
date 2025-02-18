import PromiseHand from "../../../public/icons/handPromise.png";
import RightSticks from "../../../public/icons/right dande.png";
import LeftSticks from "../../../public/icons/left dande.png";
import IconsBG from "../../../public/icons/IconsBG.png";
import BestPrice from "../../../public/vectors/bestPriceGuarantee.png";
import HostelCertification from "../../../public/vectors/hostelCertification.png";
import QualityAssurance from "../../../public/vectors/qualityAssuaranceCheck.png";
import TransparentHostel from "../../../public/vectors/transparentHostelRannking.png";
import DownStick from "../../../public/icons/promiseStick.png";
import Image from "next/image";

export function PromiseSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:py-10">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-8">
        <div className="flex flex-col items-center mb-6 sm:mb-4">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-2">
            <Image src={PromiseHand} alt="Handshake" width={80} height={50} className="w-16 h-10 sm:w-12 sm:h-8" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image src={LeftSticks} alt="Left Icon" width={40} height={40} className="w-8 h-8 sm:w-6 sm:h-6" />
            <h2 className="text-4xl font-bold sm:text-2xl">Our Promise</h2>
            <Image src={RightSticks} alt="Right Icon" width={40} height={40} className="w-8 h-8 sm:w-6 sm:h-6" />
          </div>
          <Image src={DownStick} alt="Down Stick" width={120} height={20} className="w-24 sm:w-16 mt-2" />
        </div>

        <div className="text-3xl md:text-4xl font-bold mb-2 sm:text-2xl">
          What you <span className="text-[#8B1D1D]">See</span> is what you <span className="text-[#8B1D1D]">Get</span>
        </div>
        <p className="text-xl text-gray-700 sm:text-lg">is our basic ethos ..</p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto sm:grid-cols-1 sm:gap-4">
        {[ 
          { src: BestPrice, label: "BEST PRICE GUARANTEE" },
          { src: QualityAssurance, label: "QUALITY ASSURANCE CHECK" },
          { src: TransparentHostel, label: "TRANSPARENT HOSTELS RANKING" },
          { src: HostelCertification, label: "HOSTEL CERTIFICATION PROGRAM" },
        ].map(({ src, label }, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden bg-[#8B1D1D] sm:flex sm:flex-col sm:items-center"
            style={{
              backgroundImage: `url(${IconsBG.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-row items-center sm:flex-col sm:text-center">
              <div className="p-4 bg-white rounded-xl m-4 flex-shrink-0 sm:m-2">
                <Image src={src} alt={label} width={100} height={100} className="w-20 h-20 sm:w-16 sm:h-16" />
              </div>
              <div className="p-4 flex-grow text-white text-xl font-bold sm:text-lg">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
