import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FemaleIcon, MaleIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Phone } from "lucide-react";
import { IconAddressBook } from "@tabler/icons-react";

type BookingFormProps = {
  price: number;
  gender: "BOYS" | "GIRLS";
};

export default function BookingForm({ price, gender }: BookingFormProps) {
  return (
    <Card className="w-64 bg-[#f4f3f3] rounded-lg shadow-sm">
      <CardContent className="p-4">
        <h2 className="font-black text-black text-3xl mb-4">
          ₹{price.toLocaleString()}/-
        </h2>

        <div className="space-y-2">
          <Input
            className="h-9 bg-[#e0e0e0] rounded-md border border-gray-300"
            placeholder="Name"
          />

          <div className="relative">
            <Input
              className="h-9 bg-[#e0e0e0] rounded-md border border-gray-300 pl-14"
              placeholder="Mobile Number"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              <span className="text-sm">+91</span>
            </div>
            <Separator
              orientation="vertical"
              className="absolute left-12 top-2 h-5"
            />
          </div>

          <div className="relative">
            <Input
              className="h-9 bg-[#e0e0e0] rounded-md border border-gray-300 pl-8"
              placeholder="Address"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <IconAddressBook className="w-4 h-4" />
            </div>
          </div>

          <div className="h-9 bg-[#e0e0e0] rounded-md border border-gray-300 flex items-center justify-between px-4">
            <div className="flex items-center">
              <MaleIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">Male</span>
            </div>

            <Separator orientation="vertical" className="h-5" />

            <div className="flex items-center">
              <FemaleIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">Female</span>
            </div>
          </div>
        </div>

        <div className="flex items-start mt-3">
          <Checkbox
            id="terms"
            className="mt-1 border border-solid border-gray-400"
          />
          <label
            htmlFor="terms"
            className="ml-2 text-xs"
          >
            I have read and agree to the{" "}
            <span className="font-bold">terms and conditions</span> and{" "}
            <span className="font-bold">privacy policy</span> and hereby
            confirm to proceed.
          </label>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 rounded-lg mt-3">
          <span className="font-black text-white text-xl">
            Book Now
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}