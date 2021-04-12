import {getSession} from 'next-auth/client';
import {connectToDatabase} from '../../../lib/db';

async function handler(req, res) {
	if (req.method !== 'DELETE') {
		return;
	}

	const session = await getSession({req: req});

	console.log(session)

	if (!session.user.email) {
		res.status(401).json({message: 'Not authenticated!'});
		return;
	}

	const userEmail = session.user.email;
	const client = await connectToDatabase();
	const usersCollection = client.db().collection('notes');
	const user = await usersCollection.findOne({email: userEmail});

	if (!user) {
		res.status(404).json({message: 'User not found.'});
		client.close();
		return;
	}

	const notesCollection = client.db().collection('notes');

	const result = await notesCollection.deleteOne(
		{ email: userEmail }
	  );
	
	  client.close();
	  res.status(200).json({ message: 'Note deleted!' });
}

export default handler;
