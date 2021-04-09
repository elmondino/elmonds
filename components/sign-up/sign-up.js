import {useState, useRef} from 'react';
import {useRouter} from 'next/router';

// import classes from './auth-form.module.css';

async function createUser(email, password) {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({email, password}),
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

function SignUp() {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const router = useRouter();

	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		try {
			const result = await createUser(enteredEmail, enteredPassword);
			console.log(result);
			router.replace('/login');
		} catch (error) {
      console.log('here?')
			console.log(error);
		}
	}

	return (
		<section>
			<h1>Sign Up</h1>
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
					<button>Create Account</button>
				</div>
			</form>
		</section>
	);
}

export default SignUp;
