
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {   ParentHostelPageProps } from "@/types";
import  { getHostel } from "@/actions"
import HostelPage from "@/components/hostels/hostelPage";
 


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
      <HostelPage hostelId={hostelId} hostel={hostel} />
    );
  }