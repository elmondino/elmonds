import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
const ObjectId = require("mongodb").ObjectId;

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const session = await getSession({ req: req });
  const noteId = new ObjectId(req.body.noteId);

  if (!session.user.email) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const notesCollection = client.db().collection("notes");
  const notes = await notesCollection.findOne({ email: userEmail });

  if (!notes) {
    res.status(404).json({
      message: "You have no notes, try to create some first.",
    });
    client.close();
    return;
  }

  const result = await notesCollection.deleteOne({ _id: noteId });

  client.close();
  res.status(200).json({ message: "Note deleted!" });
  return;
}

export default handler;
