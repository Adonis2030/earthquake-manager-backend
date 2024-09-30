"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Earthquake {
    id: ID!               # Add id to the Earthquake type
    location: String!
    magnitude: Float!
    date: String!
  }

  type Query {
    earthquakes(limit: Int, offset: Int): [Earthquake!]!
    earthquake(id: ID!): Earthquake
  }

  # Input type without the id
  input EarthquakeInput {
    location: String!
    magnitude: Float!
    date: String!
  }

  type Mutation {
    createEarthquake(input: EarthquakeInput!): Earthquake!
    updateEarthquake(id: ID!, input: EarthquakeInput!): Earthquake!
    deleteEarthquake(id: ID!): Earthquake!
  }
`;
