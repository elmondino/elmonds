import {getSession, signOut} from 'next-auth/client';
import {useRef} from 'react';
import {useRouter} from 'next/router';

export default function DeleteUser({session}) {
	const router = useRouter();
	const oldPasswordRef = useRef();

	async function handleDeleteUser(passwordData) {
		const response = await fetch('/api/user/delete-user', {
			method: 'DELETE',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Something went wrong!');
		}

		return data;
	}

	async function submitHandler(event) {
		event.preventDefault();

		const enteredOldPassword = oldPasswordRef.current.value;

		// optional: Add validation

		try {
			const result = await handleDeleteUser({
				oldPassword: enteredOldPassword,
			});

			console.log(result);
			router.replace('/login');
			signOut();
		} catch (error) {
			console.log('here?');
			console.log(error);
		}
	}

	return (
		<section>
			<h1>Your User Profile</h1>

			<form onSubmit={submitHandler}>
				<div>
					<p>to delete your user please insert your old password</p>
					<label htmlFor='old-password'>Old Password</label>
					<input type='password' id='old-password' ref={oldPasswordRef} />
				</div>
				<div>
					<button>Delete user</button>
				</div>
			</form>
		</section>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({req: context.req});

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {session},
	};
}
