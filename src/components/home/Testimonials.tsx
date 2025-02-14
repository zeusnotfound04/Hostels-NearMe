import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ArrowL1 from "../../../public/icons/ArrowL1.svg" 
import BigArrow from "../../../public/icons/BigArrow.svg"
import ArrowL2 from "../../../public/icons/ArrowL2.svg"
import ArrowR1 from "../../../public/icons/ArrowLB.svg" // You'll need this file
import ArrowR2 from "../../../public/icons/ArrowRB.svg" // You'll need this file

export function Testimonials() {
  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Left side arrows */}
      <Image src={ArrowL1} alt="Arrow 1" width={150} height={150} className="absolute -left-[10rem] top-[5rem] hidden md:block" />
      <Image src={ArrowL2} alt="Arrow 2" width={150} height={150} className="absolute rotate-180 -left-[10rem]  top-[35rem] hidden md:block" />
      
      {/* Center arrow */}
      <Image src={BigArrow} alt="Big Arrow" width={90} height={90} className="absolute left-[12rem]  -translate-x-1/2 top-[7rem] hidden md:block" />
      
      {/* Right side arrows */}
      <Image src={ArrowR1} alt="Arrow 3" width={150} height={150} className="absolute rotate-180 -right-[10rem] top-[1rem] hidden md:block" />
      <Image src={ArrowR2} alt="Arrow 4" width={150} height={150} className="absolute -right-[10rem] top-[35rem] hidden md:block" />

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Don't Just Take Our Word for It</h2>
        <p className="text-3xl md:text-4xl">Hear It From Our Students</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                  <Image 
                    src="/placeholder.svg"
                    alt={testimonial.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {testimonial.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const testimonials = [
  {
    name: "Shewta Kumar",
    location: "📍 Lucknow, U.P",
    text: "As a student new to Lucknow, I was overwhelmed by the thought of finding a place to stay. But Hostels Near Me made the process so much easier. The website is super intuitive, with detailed hostel listings and honest reviews from other students. I was able to compare prices, see real photos of the rooms, and pick a place that suited my budget and needs. Booking was quick, and there were no hidden fees or complicated procedures. If you're looking for a hassle-free way to find a hostel, this is it! I can't imagine using any other service for my future stays."
  },
  {
    name: "Gaurav Kapoor",
    location: "📍 Jhansi, U.P",
    text: "Hostels Near Me really exceeded my expectations. As someone who dislikes complicated processes, I was relieved to find a platform that offers clear and simple hostel options. The entire booking process was straightforward, and the website gave me all the information I needed—prices, amenities, and even feedback from other students. I secured a comfortable and affordable place within minutes. It's truly a game-changer for anyone looking to find a hostel without the usual hassles. If you're new to Lucknow, I'd recommend this service without hesitation!"
  },
  {
    name: "Anubhav Singh",
    location: "📍 Kota, Rajasthan",
    text: "As a first-time visitor to Lucknow for my coaching, I was dreading the long search for a hostel. Hostels Near Me made the entire process so smooth and easy. The website is user-friendly and provides all the necessary details, including real photos and honest reviews from other students, which made choosing the right place a breeze. I was able to compare various hostels based on my budget and preferred amenities. What really stood out was how quick and transparent the booking process was—no hidden charges, no brokers, just clear, upfront information."
  }
];