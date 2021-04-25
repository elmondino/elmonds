import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const session = await getSession({ req: req });

  console.log(session);

  if (!session.user.email) {
    res.status(401).json({ message: "Not authenticated!", status: "error" });
    return;
  }

  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const notesCollection = client.db().collection("notes");
  const notes = await notesCollection.findOne({ email: userEmail });

  if (!notes) {
    res.status(404).json({
      message: "You have no notes, try to create some first.",
      status: "error",
    });
    client.close();
    return;
  }

  const result = await notesCollection.deleteOne({ email: userEmail });

  client.close();
  res.status(200).json({ message: "Note deleted!", status: "success" });
  return;
}

export default handler;
