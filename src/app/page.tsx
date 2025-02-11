
import UserGreetText from "@/components/ui/UserGreetText";
import Image from "next/image";
import Link from "next/link";
import { HostelSearch } from "@/components/home/HostelSearch";
import { getServerSession } from "next-auth";
import { CalenderIcon } from "@/components/ui/icon";
import { StepBooking } from "@/components/home/StepBooking";

export default async function  Home() {
  const session = await getServerSession();
 

  return (
    <main className="flex min-h-screen flex-col items-center p-2"> 
     
      <div className="z-10 w-full max-w-5xl items-center justify-between font-sans text-sm ">
          <HostelSearch />
   

      <StepBooking/>
    <div>
      </div>
             <h1>Welcome sir</h1>
            <pre>{JSON.stringify(session)}</pre>
       
    </div>
    <Link href="/admin"> Open My Admin</Link>
  
    </main>
  );
}