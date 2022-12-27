import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(
      "mongodb+srv://panduka123:panduka123@traversymedia.tkfnl5e.mongodb.net/events?retryWrites=true&w=majority"
    );
    return client
  }
  
export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result
  }