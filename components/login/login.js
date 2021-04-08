import {useRef} from 'react';
import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';

function Login() {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const router = useRouter();

	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		const result = await signIn('credentials', {
			redirect: false,
			email: enteredEmail,
			password: enteredPassword,
		});

    console.log(result)

		// if (!result.error) {
		// 	// set some auth state
		// 	router.replace('/profile');
		// }
	}

	return (
		<section>
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div>
					<button>Login</button>
				</div>
			</form>
		</section>
	);
}

export default Login;
