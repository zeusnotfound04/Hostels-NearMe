import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import HostelForm from "@/components/HostelForm";
import { Hostel } from "@/types";

interface EditHostelPageProps {
  params: {
    hostelId: string;
  };
}




export const metadata: Metadata = {
  title: "Edit Hostel",
  description: "Modify existing hostel details",
};

async function getHostel(hostelId: string): Promise<Hostel | null> {
  try {
    const hostel = await prisma.hostel.findUnique({
      where: {
        id: hostelId,
      },
    
    });

    if (!hostel) {
      return null;
    }

    return {
      ...hostel,
      
    };
  } catch (error) {
    console.error("Error fetching hostel:", error);
    return null;
  }
}

export default async function EditHostelPage({ params }: EditHostelPageProps) {
  const hostel = await getHostel(params.hostelId);

  if (!hostel) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Hostel</h1>
      <HostelForm hostelId={params.hostelId} initialData={hostel} />
    </div>
  );
}