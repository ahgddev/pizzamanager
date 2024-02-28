//This is where data for veggie toppings goes. This data should be pulled by the server and served up via other scripts.
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch (error) {
  console.error(error);
}

let toppingDB = conn.db("pizzaToppings");

export default toppingDB;
