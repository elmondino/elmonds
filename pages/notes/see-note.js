import {useState, useRef} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

async function createNote(note) {
	const response = await fetch('/api/note/find-note');

	console.log(response);

	const data = await response.json();

	console.log(data);

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
}

export default function NotePage(props) {
	const noteRef = useRef();
	const [notes, setNotes] = useState(props.notes);
	const [showNotes, setShowNotes] = useState(true);

	const router = useRouter();

	async function submitHandler(event) {
		event.preventDefault();

		try {
			const result = await createNote();
			setNotes(result);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<section>
			<h1>See notes</h1>
			<button onClick={() => setShowNotes(!showNotes)}>
				{showNotes ? 'hide notes' : 'show notes'}
			</button>
			{showNotes ? notes && notes.map(note => <p key={note._id}>note: {note.note}</p>) : <p>no notes to show</p>}
			<button onClick={submitHandler}>get the latest notes</button>
		</section>
	);
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
		const response = await axios.get(`'/api/note/find-note'`);
		return returnProps(response.data, false);
	} catch (err) {
		return returnProps(null, true);
	}
}
