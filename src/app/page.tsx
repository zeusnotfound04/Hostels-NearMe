
import UserGreetText from "@/components/ui/UserGreetText";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";

export default async function  Home() {
  const session = await getServerSession();
 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <UserGreetText />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          
        </div>
      </div>


      
        
         <h1>Welcome sir</h1>
            <pre> {JSON.stringify(session)}</pre>

         
    
          
        

        <Link href="/admin"> Open My Admin</Link>

      
      
    </main>
  );
}