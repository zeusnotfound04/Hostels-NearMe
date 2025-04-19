import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting seed...');

    // Add some states
    const states = [
      { name: 'Uttar Pradesh' },
      { name: 'Delhi' },
      { name: 'Maharashtra' },
      { name: 'Karnataka' },
      { name: 'Tamil Nadu' }
    ];

    for (const state of states) {
      const existingState = await prisma.state.findUnique({
        where: { name: state.name }
      });

      if (!existingState) {
        await prisma.state.create({
          data: state
        });
        console.log(`Created state: ${state.name}`);
      } else {
        console.log(`State ${state.name} already exists`);
      }
    }

    // Get all states to add cities
    const allStates = await prisma.state.findMany();
    const stateMap = allStates.reduce((map, state) => {
      map[state.name] = state.id;
      return map;
    }, {} as Record<string, string>);

    // Cities data
    const citiesData = [
      { name: 'Lucknow', stateName: 'Uttar Pradesh' },
      { name: 'Kanpur', stateName: 'Uttar Pradesh' },
      { name: 'Varanasi', stateName: 'Uttar Pradesh' },
      { name: 'Agra', stateName: 'Uttar Pradesh' },
      { name: 'Noida', stateName: 'Uttar Pradesh' },
      { name: 'New Delhi', stateName: 'Delhi' },
      { name: 'East Delhi', stateName: 'Delhi' },
      { name: 'South Delhi', stateName: 'Delhi' },
      { name: 'Mumbai', stateName: 'Maharashtra' },
      { name: 'Pune', stateName: 'Maharashtra' },
      { name: 'Nagpur', stateName: 'Maharashtra' },
      { name: 'Bangalore', stateName: 'Karnataka' },
      { name: 'Mysore', stateName: 'Karnataka' },
      { name: 'Chennai', stateName: 'Tamil Nadu' },
      { name: 'Coimbatore', stateName: 'Tamil Nadu' },
      { name: 'Madurai', stateName: 'Tamil Nadu' }
    ];

    // Add cities
    for (const city of citiesData) {
      const stateId = stateMap[city.stateName];
      
      if (!stateId) {
        console.error(`State ${city.stateName} not found`);
        continue;
      }

      try {
        // Check if city already exists
        const existingCity = await prisma.city.findFirst({
          where: {
            name: city.name,
            stateId: stateId
          }
        });

        if (!existingCity) {
          await prisma.city.create({
            data: {
              name: city.name,
              stateId: stateId
            }
          });
          console.log(`Created city: ${city.name}, ${city.stateName}`);
        } else {
          console.log(`City ${city.name}, ${city.stateName} already exists`);
        }
      } catch (error) {
        console.error(`Error creating city ${city.name}:`, error);
      }
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();