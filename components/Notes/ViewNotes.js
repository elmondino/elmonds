import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Heading, Text } from "@chakra-ui/react";

async function createNote(note) {
  const response = await fetch("/api/note/find-note");

  console.log(response);

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function ViewNotes(props) {
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
      <Heading as='h2' size='lg'>
        View Notes
      </Heading>
      <Button onClick={() => setShowNotes(!showNotes)}>
        {showNotes ? "hide notes" : "show notes"}
      </Button>
      {showNotes ? (
        notes &&
        notes.map((note) => <Text key={note._id}>note: {note.note}</Text>)
      ) : (
        <Text>no notes to show</Text>
      )}
      <Button onClick={submitHandler}>get the latest notes</Button>
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
