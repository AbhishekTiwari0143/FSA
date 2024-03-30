import { MongoClient } from "mongodb";

import dotenv from "dotenv";

dotenv.config();

// const uri = "mongodb://localhost:27017";
const client = new MongoClient(process.env.MONGO_URL);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { connectToMongoDB, client };
