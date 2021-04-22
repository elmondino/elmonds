import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Input, Heading, Button } from "@chakra-ui/react";

async function createNote(note) {
  const response = await fetch("/api/note/create-note", {
    method: "POST",
    body: JSON.stringify({ note }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function Note() {
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
      <Heading as='h2' size='lg'>
        Create Note
      </Heading>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='note'>Your note</label>
          <Input
            type='text'
            id='note'
            required
            ref={noteRef}
            placeholder={
              "insert a note that you can leave for everyone to view"
            }
          />
        </div>
        <div>
          <Button>Create Note</Button>
        </div>
      </form>
    </section>
  );
}
