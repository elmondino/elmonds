import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import {verifyPassword} from '../../../lib/auth';
import {connectToDatabase} from '../../../lib/db';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				email: {label: 'Username', type: 'text', placeholder: 'jsmith'},
				password: {label: 'Password', type: 'password'},
			},
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection('users');

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					client.close();
					return null;
					// throw new Error('No user found!');
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();
					return null;
					// throw new Error('Could not log you in!');
				}

				if (user && isValid) {
					client.close();
					return {email: user.email};
				}
			},
		}),
	],
});
