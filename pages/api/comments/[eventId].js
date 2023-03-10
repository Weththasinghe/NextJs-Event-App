import { MongoClient } from "mongodb";

import { connectDatabase, insertDocument } from '../../../helpers/db-util'

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Conneccting to the database failed!' })
    return
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await insertDocument(client, 'comments', newComment)
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comment: documents });
  }
  client.close();
}

export default handler;
