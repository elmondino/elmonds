import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session.user.email) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const notesCollection = client.db().collection("notes");
  const user = await notesCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(200).json({
      message: "User does not have any notes, need to create some first.",
    });
    client.close();
    return;
  }

  const options = {
    projection: { _id: 1, note: 1 },
  };
  const notes = await notesCollection
    .find({ email: userEmail }, options)
    .toArray();

  res.status(200).json(notes);
  client.close();
  return;
}

export default handler;
