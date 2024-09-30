import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Earthquake {
    id: ID!              
    location: String!
    magnitude: Float!
    date: String!
  }

  type Query {
    earthquakes(limit: Int, offset: Int): [Earthquake!]!
    earthquake(id: ID!): Earthquake
  }

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