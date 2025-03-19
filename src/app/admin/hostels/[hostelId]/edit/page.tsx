
import { notFound } from "next/navigation";
import { Metadata } from "next";
import HostelForm from "@/components/adminHostels/HostelForm";
import {   ParentHostelPageProps } from "@/types";
import  { getHostel } from "@/actions"
 


export const metadata: Metadata = {
  title: "Edit Hostel",
  description: "Modify existing hostel details",
};

   

export default async function EditHostelPage({ params }: ParentHostelPageProps) {
  const { hostelId } = await params;
    
  const hostel = await getHostel(hostelId);

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