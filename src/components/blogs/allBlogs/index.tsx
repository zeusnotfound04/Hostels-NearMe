import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { BlogListProps } from "@/types";


export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(({ id, title, content, city, imageUrl }) => (
        <Card key={id} className="overflow-hidden border-none shadow-lg">
          <div className="relative w-full h-[250px]">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <Badge className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {city}
              </Badge>
            </div>

            <h2 className="text-2xl font-bold mb-3 text-[#8B0000]">{title}</h2>

            <p className="text-gray-700 leading-relaxed">
              {content.length > 150 ? `${content.substring(0, 150)}...` : content}
            </p>

            <div className="mt-4">
              <button className="px-4 py-2 bg-[#8B0000] text-white rounded-md hover:bg-[#6B0000] transition-colors">
                Read More
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
