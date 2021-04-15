import {useState, useRef} from 'react';
import {useRouter} from 'next/router';

// import classes from './auth-form.module.css';

async function createNote(note) {
	const response = await fetch('/api/note/create-note', {
		method: 'POST',
		body: JSON.stringify({note}),
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

export default function NotePage() {
	const noteRef = useRef();

	const router = useRouter();

	async function submitHandler(event) {
		event.preventDefault();

		const newNote = noteRef.current.value;

		try {
			const result = await createNote(newNote);
			console.log(result);
			// router.replace('/login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<section>
			<h1>Create Note</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='note'>Your note</label>
					<input type='input' id='note' required ref={noteRef} />
				</div>
				<div>
					<button>Create Note</button>
				</div>
			</form>
		</section>
	);
}
