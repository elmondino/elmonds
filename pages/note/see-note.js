import {useState, useRef} from 'react';
import {useRouter} from 'next/router';

// import classes from './auth-form.module.css';

async function createNote(note) {
	const response = await fetch('/api/note/find-note');
	// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    console.log(response)

	const data = await response.json();

    console.log(data)

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
}

export default function NotePage() {
	const noteRef = useRef();
    console.log('hi')

	const router = useRouter();

	async function submitHandler(event) {
		event.preventDefault();

		try {
			const result = await createNote();
			console.log(result);
			// router.replace('/login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<section>
			<h1>See notes</h1>
			<button onClick={submitHandler}>hes</button>
		</section>
	);
}
