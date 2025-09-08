import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://saadibhatti1921:tr3g!6FAB.Z9gPM@cluster0.thmtgab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

let database;

export async function connectDB() {
  try {
    await client.connect();
    database = client.db("invantory");
    console.log("mongoDB is connected");
  } catch (error) {
    console.error("mongoDB is not connected ", error);
    throw error
  }
}

export function getDB() {
  if (!database) {
    console.error("call a connected DB");
    
  }
  return database;
}


export const collections = {
  inventory : ()=>database.collection("inventory"),
  user  :()=>database.collection("user"),
  stockLogs: () => database.collection("stockLogs"), 
  stockIn: () => database.collection("stockIn"), 
  profitGraph: () => database.collection("profitGraph"), 
  fruitStockReports: () => database.collection("fruitStockReports"), 
  
  
}
