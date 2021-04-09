import Login from '../../components/login/login';
import {signIn, signOut, useSession} from 'next-auth/client';

export default function LoginPage() {
  const [session, loading] = useSession();
  console.log(useSession())
	return (
		<>
			<Login></Login>
			<main>
				{!session && (
					<>
						Not signed in <br />
						<button onClick={signIn}>Sign In</button>
					</>
				)}
				{session && (
					<>
						Signed in as {session.user.email} <br />
						<div>You can now access our super secret pages</div>
						<button onClick={signOut}>sign out</button>
					</>
				)}
			</main>
		</>
	);
}
