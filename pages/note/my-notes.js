import {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {useSession} from 'next-auth/client';

async function getNote(note) {
	const response = await fetch('/api/note/find-user-notes');

	console.log(response);

	const data = await response.json();

	console.log(data);

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
}

async function handleDeleteNote(noteId) {
    console.log(noteId)
	const response = await fetch('/api/note/delete-note', {
		method: 'DELETE',
		body: JSON.stringify(noteId),
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

export default function NotePage(props) {
	const [session, loading] = useSession();
	const [notes, setNotes] = useState(props.notes);

	async function deleteNote(noteId) {
		try {
			const result = await handleDeleteNote(noteId);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	async function submitHandler(event) {
		event.preventDefault();

		try {
			const result = await getNote();
			setNotes(result);
		} catch (error) {
			console.log(error);
		}
	}

	if (loading) {
		return <p>Loading......</p>;
	}
	if (session) {
		return (
			<section>
				<h1>See notes</h1>
				{notes &&
					notes.map(note => (
						<p key={note._id}>
							note: {note.note}
							<button onClick={() => deleteNote(note._id)}></button>
						</p>
					))}
				<button onClick={submitHandler}>get the latest notes</button>
			</section>
		);
	}
}

export async function getStaticProps(context) {
	const returnProps = (notes = null, hasError = false) => {
		return {
			props: {
				notes,
				hasError,
			},
		};
	};

	try {
		const response = await axios.get(`'/api/note/find-user-notes'`);
		return returnProps(response.data, false);
	} catch (err) {
		return returnProps(null, true);
	}
}
