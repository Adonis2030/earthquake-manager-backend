import { Earthquake } from "../types";
import { loadEarthquakeData } from "../data/earthquakeLoader";
import { v4 as uuidv4 } from 'uuid';



let earthquakes: Earthquake[] = [];

const initializeEarthquakes = async () => {
  earthquakes = await loadEarthquakeData();
};

initializeEarthquakes().catch((error) => {
  console.error("Error loading earthquake data:", error);
});

export const resolvers = {
  Query: {
    earthquakes: async () => earthquakes,
    earthquake: async (_: any, { id }: { id: string }) => {
      return earthquakes.find((earthquake) => earthquake.id === id);
    },
  },

  Mutation: {
    createEarthquake: async (_: any, { input }: { input: Earthquake }) => {
      const newEarthquake = {
        ...input,
        id: uuidv4(), 
      };
      earthquakes.push(newEarthquake);
      return newEarthquake;
    },


    updateEarthquake: async (_: any, { id, input }: { id: string; input: Earthquake }) => {
        const earthquakeIndex = earthquakes.findIndex((e) => e.id === id);
        if (earthquakeIndex === -1) throw new Error('Earthquake not found');
      
        
        earthquakes[earthquakeIndex] = { ...earthquakes[earthquakeIndex], ...input };
        return earthquakes[earthquakeIndex];
      },

    deleteEarthquake: async (_: any, { id }: { id: string }) => {
      const earthquakeIndex = earthquakes.findIndex((e) => e.id === id);
      if (earthquakeIndex === -1) throw new Error('Earthquake not found');

      const deleted = earthquakes.splice(earthquakeIndex, 1);
      return deleted[0];
    },
  },
};