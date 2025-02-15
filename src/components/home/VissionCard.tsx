import React from 'react';

const DecorativeBorder = () => (
  <svg className="w-full h-4" viewBox="0 0 400 16">
    <path d="M0 8 H400" stroke="#8B1A1A" strokeWidth="4" />
    <path d="M0 2 H400" stroke="#8B1A1A" strokeWidth="4" />
  </svg>
);

const SideBorder = () => (
  <div className="absolute top-4 bottom-4 w-4">
    <div className="h-full w-full">
      <svg className="h-full w-4" viewBox="0 0 16 400" preserveAspectRatio="none">
        <path d="M8 0 V400" stroke="#8B1A1A" strokeWidth="4" />
        <path d="M2 0 V400" stroke="#8B1A1A" strokeWidth="4" />
      </svg>
    </div>
  </div>
);

const JaggedBorder = () => (
  <div className="absolute top-0 bottom-0 w-12">
    <svg className="h-full w-12" viewBox="0 0 48 400" preserveAspectRatio="none">
      <path d="M24,0 L36,20 L24,40 L36,60 L24,80 L36,100 L24,120 L36,140 L24,160 
               L36,180 L24,200 L36,220 L24,240 L36,260 L24,280 L36,300 L24,320 
               L36,340 L24,360 L36,380 L24,400 L12,380 L24,360 L12,340 L24,320 
               L12,300 L24,280 L12,260 L24,240 L12,220 L24,200 L12,180 L24,160 
               L12,140 L24,120 L12,100 L24,80 L12,60 L24,40 L12,20 L24,0" 
            fill="#8B1A1A" />
    </svg>
  </div>
);

export default function MissionVisionCards() {
  return (
    <div className="relative flex w-full max-w-7xl gap-16 p-8">
      {/* Left Jagged Border */}
      <div className="absolute -left-6 top-0 bottom-0">
        <JaggedBorder />
      </div>
      
      {/* Right Jagged Border */}
      <div className="absolute -right-6 top-0 bottom-0">
        <JaggedBorder />
      </div>

      {/* Who We Are Section */}
      <div className="relative flex-1 p-12">
        <div className="absolute top-0 left-0 right-0">
          <DecorativeBorder />
        </div>
        <div className="absolute left-0">
          <SideBorder />
        </div>
        <div className="absolute right-0">
          <SideBorder />
        </div>
        <div className="absolute bottom-0 left-0 right-0 rotate-180">
          <DecorativeBorder />
        </div>
        
        <h2 className="mb-6 text-4xl font-black">Who We Are?</h2>
        <p className="text-base leading-relaxed">
          When we thought of getting in this sector, we asked ourselves, who exactly is it we are going 
          to help or solve problems for as we will be connecting 2 parties together. we knew that we 
          will be helping the students by saving their time and their resources and so on but, when 
          we glanced into this unorganized Sector more thoroughly we realized we will be helping the 
          Students but with that we won't be leaving the Hostel Owners. That moment we decided to 
          find a broader approach to get the Hostel Owners more benefit if they are bringing their 
          business online. We read our numbers again (with more focus at both the parties this time) 
          and we realized the Strength and Potential of Hostel Owners and then we started seeing both 
          the parties as Two sides of a same coin and decided to be more than just and fair with them.
        </p>
      </div>

      {/* Vertical Separator */}
      <div className="relative w-4">
        <SideBorder />
      </div>

      {/* Mission & Vision Section */}
      <div className="relative flex-1 p-12">
        <div className="absolute top-0 left-0 right-0">
          <DecorativeBorder />
        </div>
        <div className="absolute left-0">
          <SideBorder />
        </div>
        <div className="absolute right-0">
          <SideBorder />
        </div>
        <div className="absolute bottom-0 left-0 right-0 rotate-180">
          <DecorativeBorder />
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-4xl font-black">Our Mission</h2>
          <p className="text-base leading-relaxed">
            Only by moving past those primitive hindrances can we move forward towards a Digital World, 
            a Digital Era where we won't roam around the cities to find a good Hostel or pay high fees 
            to the brokers just to show us around the same Hostels available online.
          </p>
        </div>

        <div className="my-8">
          <svg viewBox="0 0 100 20" className="w-full">
            <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#8B1A1A" strokeWidth="2" />
            <path d="M0,15 Q25,5 50,15 T100,15" fill="none" stroke="#8B1A1A" strokeWidth="2" />
          </svg>
        </div>

        <div>
          <h2 className="mb-6 text-4xl font-black">Our Vision</h2>
          <p className="text-base leading-relaxed">
            Bringing Hostels online may also boost up the sector as the people then setting up their 
            Hostels will also get online Hostel selling opportunities making the task more easier for 
            them. Not only will more Hostels help the students but the rookie owners can earn a good.
          </p>
        </div>
      </div>
    </div>
  );
}