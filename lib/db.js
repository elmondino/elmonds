import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGO_DB, {
    useUnifiedTopology: true,
  });

  return client;
}
