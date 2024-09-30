"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const earthquakeLoader_1 = require("../data/earthquakeLoader");
const uuid_1 = require("uuid");

let earthquakes = [];

const initializeEarthquakes = async () => {
  earthquakes = await (0, earthquakeLoader_1.loadEarthquakeData)();
};
initializeEarthquakes().catch((error) => {
  console.error("Error loading earthquake data:", error);
});
exports.resolvers = {
  Query: {
    earthquakes: async () => earthquakes,
    earthquake: async (_, { id }) => {
      return earthquakes.find((earthquake) => earthquake.id === id);
    },
  },
  Mutation: {
    createEarthquake: async (_, { input }) => {
      const newEarthquake = {
        ...input,
        id: (0, uuid_1.v4)(),
      };
      earthquakes.push(newEarthquake);
      return newEarthquake;
    },
    updateEarthquake: async (_, { id, input }) => {
      const earthquakeIndex = earthquakes.findIndex((e) => e.id === id);
      if (earthquakeIndex === -1) throw new Error("Earthquake not found");

      earthquakes[earthquakeIndex] = {
        ...earthquakes[earthquakeIndex],
        ...input,
      };
      return earthquakes[earthquakeIndex];
    },
    deleteEarthquake: async (_, { id }) => {
      const earthquakeIndex = earthquakes.findIndex((e) => e.id === id);
      if (earthquakeIndex === -1) throw new Error("Earthquake not found");
      const deleted = earthquakes.splice(earthquakeIndex, 1);
      return deleted[0];
    },
  },
};
