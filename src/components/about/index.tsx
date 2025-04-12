import { PromiseSection } from "@/components/about/PromiseSection";
import BackedBy from "@/components/about/BackedBy";
import MissionVisionCards from "@/components/home/VissionCard";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-between space-y-5 p-24 mb-20">


        <PromiseSection/>
        <BackedBy/>
        
    <MissionVisionCards />

    </main>
  );
}