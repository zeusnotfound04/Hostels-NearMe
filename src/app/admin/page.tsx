"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {


   const {data: session} = useSession();
   const router = useRouter();

    useEffect(() => {
        if (session?.user.role === "ADMIN") {
            router.push("/admin/dashboard");
        }else{
            router.push("/");
        }    
    }
    , [session, router]);

   return (
    <div>
        <span className="rotate-180 text-5xl font-bold text-center mt-20">Redirecting...</span>
        <div className="flex justify-center mt-10">
            <svg className="animate-spin h-10 w-10 text-gray-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1.5 15h-3v-3h3v3zm0-4.5h-3V7h3v5.5z"/>
            </svg>
        </div>

    </div>
   )

}