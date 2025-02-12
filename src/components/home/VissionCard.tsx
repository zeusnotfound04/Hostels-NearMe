import React from 'react';

export const MissionVisionSection = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Who We Are Card */}
        <div className="relative">
          <div className="absolute inset-0">
            <img 
              src="/edge-decorations.png" 
              alt="decorative border" 
              className="w-full h-full"
            />
          </div>
          <div className="relative p-8">
            <h2 className="text-4xl font-bold mb-6">Who We Are?</h2>
            <p className="text-base leading-relaxed">
              When we thought of getting in this sector, we asked ourselves, who exactly is it we are going to help or solve problems for as we will be connecting 2 parties together. we knew that we will be helping the students by saving their time and their resources and so on but, when we glanced into this unorganized Sector more thoroughly we realized we will be helping the Students but with that we won't be leaving the Hostel Owners. That moment we decided to find a broader approach to get the Hostel Owners more benefit if they are bringing their business online. We read our numbers again (with more focus at both the parties this time) and we realized the Strength and Potential of Hostel Owners and then we started seeing both the parties as Two sides of a same coin and decided to be more than just and fair with them.
            </p>
          </div>
        </div>

        {/* Mission & Vision Card */}
        <div className="relative">
          <div className="absolute inset-0">
            <img 
              src="/edge-decorations.png" 
              alt="decorative border" 
              className="w-full h-full"
            />
          </div>
          <div className="relative p-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-base leading-relaxed">
                Only by moving past those primitive hindrances can we move forward towards a Digital World, a Digital Era where we won't roam around the cities to find a good Hostel or pay high fees to the brokers just to show us around the same Hostels available online.
              </p>
            </div>
            
            <div className="my-8">
              <img 
                src="/wavy-line.png" 
                alt="decorative wave" 
                className="w-full h-8"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-base leading-relaxed">
                Bringing Hostels online may also boost up the sector as the people then setting up their Hostels will also get online Hostel selling opportunities making the task more easier for them. Not only will more Hostels help the students but the rookie owners can earn a good.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-xl">
          Made in <span className="text-red-800">India</span>. For the <span className="text-red-800">World</span>
        </p>
      </div>
    </div>
  );
};

export default MissionVisionSection;