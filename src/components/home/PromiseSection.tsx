import PromiseHand from "../../../public/icons/handPromise.png";
import RightSticks from "../../../public/icons/right dande.png";
import LeftSticks from "../../../public/icons/left dande.png";
import IconsBG from "../../../public/icons/IconsBG.png";
import BestPrice from "../../../public/vectors/bestPriceGuarantee.png";
import HostelCertification from "../../../public/vectors/hostelCertification.png";
import QualityAssurance from "../../../public/vectors/qualityAssuaranceCheck.png";
import TransparentHostel from "../../../public/vectors/transparentHostelRannking.png";
import Image from "next/image";

export function PromiseSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image src={LeftSticks} alt="" width={32} height={32} className="w-8 h-8" />
          <div className="items-center gap-2">
            <Image src={PromiseHand} alt="Handshake" width={40} height={40} className="w-10 h-10" />
            <h2 className="text-4xl font-bold">Our Promise</h2>
          </div>
          <Image src={RightSticks} alt="Right Icon" width={32} height={32} className="w-8 h-8" />
        </div>

        <div className="text-3xl md:text-4xl font-bold mb-2">
          What you <span className="text-[#8B1D1D]">See</span> is what you <span className="text-[#8B1D1D]">Get</span>
        </div>
        <p className="text-xl text-gray-700">is our basic ethos ..</p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          { src: BestPrice, label: "BEST PRICE GUARANTEE" },
          { src: QualityAssurance, label: "QUALITY ASSURANCE CHECK" },
          { src: TransparentHostel, label: "TRANSPARENT HOSTELS RANKING" },
          { src: HostelCertification, label: "HOSTEL CERTIFICATION PROGRAM" },
        ].map(({ src, label }, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden bg-[#8B1D1D]"
            style={{
              backgroundImage: `url(${IconsBG.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-row items-center">
              <div className="p-4 bg-white rounded-xl m-4 flex-shrink-0">
                <Image src={src} alt={label} width={100} height={100} className="w-20 h-20" />
              </div>
              <div className="p-4 flex-grow text-white text-xl font-bold">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}