import { PromiseSection } from "@/components/about/PromiseSection";
import BackedBy from "@/components/about/MovingCard";
import MissionVisionCards from "@/components/home/VissionCard";
import MovingCards from "@/components/about/MovingCard";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-between space-y-12 p-8 md:p-16 mb-20 w-full">
        <PromiseSection />
        <MovingCards Headline="Our Mentors" />
        <BackedBy Headline="Backed By" />
        <MissionVisionCards />
    </main>
  );
}