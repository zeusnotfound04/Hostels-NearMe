import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ArrowL1 from "../../../public/icons/ArrowL1.svg" 
import BigArrow from "../../../public/icons/BigArrow.svg"
import ArrowL2 from "../../../public/icons/ArrowL2.svg"


export default function Testimonials() {
  return (
    <div className="container mx-auto px-4 py-16 relative">
      <Image src={ArrowL1} alt="Arrow 1" width={150} height={150} className="absolute -left-20 top-20" />
      <Image src={BigArrow} alt="Arrow 2" width={150} height={150} className="absolute left-1/3 top-0" />
      <Image src={ArrowL2} alt="Arrow 3" width={150} height={150} className="absolute -right-20 top-20" />

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Don't Just Take Our Word for It</h2>
        <p className="text-3xl md:text-4xl">Hear It From Our Students</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: "Shewta Kumar", location: "📍 Lucknow, U.P" , description : "" },
          { name: "Gaurav Kapoor", location: "📍 Jhansi, U.P" , description : "" },
          { name: "Anubhav Singh", location: "📍 Kota, Rajasthan" , description : "" }
        ].map(({ name, location }, index) => (
          <Card key={index} className="bg-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/placeholder.svg" alt={name} width={60} height={60} className="rounded-full" />
                <div>
                  <h3 className="font-bold text-lg">{name}</h3>
                  <p className="text-gray-600">{location}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
