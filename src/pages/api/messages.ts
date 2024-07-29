import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("birthdayMessages");

  if (req.method === 'POST') {
    const { name, message, style } = req.body;
    const result = await db.collection("messages").insertOne({ name, message, style });
    res.status(200).json({ id: result.insertedId });
  } else if (req.method === 'GET') {
    const messages = await db.collection("messages").find({}).toArray();
    res.status(200).json(messages);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}