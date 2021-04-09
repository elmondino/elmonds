import Link from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/client';

function Header() {
  const [session, loading] = useSession();
	return (
		<header style={{margin: '0px auto 80px'}}>
			<nav>
				<ul>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/change-password'>Change password</Link>
					</li>
					<li>
						<Link href='/delete-user'>Delete user</Link>
					</li>
					<li>
						<Link href='/login'>Log in</Link>
					</li>
					<li>
						<Link href='/note'>Notes</Link>
					</li>
					<li>
						<Link href='/protected'>Protected Route</Link>
					</li>
					<li>
						<Link href='/protected-server-side'>
							Protected Server Side Route
						</Link>
					</li>
					<li>
						<Link href='/sign-up'>Sign up</Link>
					</li>
					<li>
						<Link href='/weather'>Weather Api</Link>
					</li>
					<li style={{marginTop: '30px'}}>
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
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
