import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import cors from "cors";
import { json } from "body-parser";
import { loadEarthquakeData } from "./data/earthquakeLoader";

const startServer = async () => {
  const app = express();

  await loadEarthquakeData();

  const corsOptions = {
    origin: ["https://sandbox.embed.apollographql.com", "http://localhost:3000"],
    credentials: true, 
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", cors(corsOptions), json(), expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});