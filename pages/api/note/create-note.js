import {connectToDatabase} from '../../../lib/db';
import {getSession} from 'next-auth/client';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}

	const session = await getSession({req: req});

	console.log(session);

	if (!session) {
		res.status(401).json({message: 'Not authenticated!'});
		return;
	}

	const userEmail = session.user.email;

	const note = req.body.note;

	if (!note || note.trim().length < 10) {
		res.status(422).json({
			message: 'Notes must be at least 10 characters long.',
		});
		return;
	}

	const client = await connectToDatabase();

	const db = client.db();

	const result = await db.collection('notes').insertOne({
		email: userEmail,
		note: note,
	});

	res.status(201).json({message: 'Created note!'});
	client.close();
}

export default handler;
