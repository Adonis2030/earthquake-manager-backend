# Earthquake Manager

A Node.js-based GraphQL API for managing earthquake data, using Apollo Server, Express, TypeScript, and data loaded from a CSV file.

## Quick Start

### Prerequisites

- Node.js (v18.x or higher)
- npm (v8.x or higher)

### Installation

1. **Navigate to the project directory**:

   ```bash
   git clone git@github.com:Adonis2030/earthquake-manager-backend.git
   cd earthquake-manager-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Compile TypeScript**:

   ```bash
   npm run compile
   ```

4. **Start the server**:

   ```bash
   npm run start
   ```

   The server will start at: `http://localhost:4000/graphql`

## Testing the Apollo Server

1. **Access Apollo Sandbox**: Visit `http://localhost:4000/graphql` in your browser.

2. **Run Sample Queries**:

   - Get all earthquakes:

     ```graphql
     query {
       earthquakes {
         id
         location
         magnitude
         date
       }
     }
     ```

   - Get earthquake by ID:
     ```graphql
     query {
       earthquake(id: "earthquake_id") {
         id
         location
         magnitude
         date
       }
     }
     ```

3. **Run Sample Mutations**:
   - Create a new earthquake:
     ```graphql
     mutation {
       createEarthquake(input: { location: "New Location", magnitude: 6.5, date: "2024-09-26" }) {
         id
         location
         magnitude
         date
       }
     }
     ```

## Packages Installed

- **@apollo/server**: Apollo GraphQL server.
- **apollo-server-express**: Apollo Server middleware for Express.
- **express**: Web framework.
- **graphql**: GraphQL query language and runtime.
- **csv-parser**: CSV file parser for Node.js.
- **cors**: Cross-Origin Resource Sharing middleware.
- **dotenv**: Environment variable loader.
- **uuid**: UUID generator for unique earthquake IDs.
- **typescript**: TypeScript compiler.

## Dev Tools

- **nodemon**: Automatically restarts the server on file changes.
- **ts-node**: TypeScript execution environment for Node.js.
- **@types/express**: TypeScript types for Express.
- **@types/node**: TypeScript types for Node.js.
