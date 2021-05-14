import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const options = {
    projection: { _id: 1, note: 1 },
  };

  const notes = await db.collection("notes").find({}, options).toArray();

  res.status(200).json({ notes });
  client.close();
  return;
}

export async function getNotes() {
  const client = await connectToDatabase();
  const db = client.db();
  const options = {
    projection: { _id: 1, note: 1 },
  };

  const notes = await db.collection("notes").find({}, options).toArray();

  client.close();
  return ({ notes });
}

export default handler;
