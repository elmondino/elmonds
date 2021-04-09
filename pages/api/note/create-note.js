import {connectToDatabase} from '../../../lib/db';
import {getSession} from 'next-auth/client';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}

	const session = await getSession({req: req});

	if (!session) {
		res.status(401).json({message: 'Not authenticated!'});
		return;
	}

	const userEmail = session.user.email;

	const note = req.body.note;

	if (!note || note.trim().length < 10) {
		res.status(422).json({
			message: note,
		});
		return;
	}

	const client = await connectToDatabase();

	const db = client.db();

	const existingUser = await db.collection('users').findOne({email: userEmail});

	if (!existingUser) {
	  res.status(422).json({ message: 'User not found!' });
	  client.close();
	  return;
	}

	const result = await db.collection('notes').insertOne({
	  email: userEmail,
	  note: note
	});

	res.status(201).json({ message: 'Created note!' });
	client.close();
}

export default handler;
