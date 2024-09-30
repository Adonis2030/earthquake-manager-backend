"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const earthquakeLoader_1 = require("./data/earthquakeLoader");
const startServer = async () => {
    const app = (0, express_1.default)();
    
    await (0, earthquakeLoader_1.loadEarthquakeData)();
    
    const corsOptions = {
        origin: ["https://sandbox.embed.apollographql.com", "http://localhost:3000"],
        credentials: true,
    };

    const server = new server_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
    await server.start();
    app.use("/graphql", (0, cors_1.default)(corsOptions), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
};
startServer().catch((err) => {
    console.error("Error starting server:", err);
});
