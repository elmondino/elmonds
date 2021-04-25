import { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Input,
  Heading,
  Button,
  Container,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

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
      <Heading as='h2' size='md' my={5}>
        Create Notes below
      </Heading>
      <form onSubmit={submitHandler}>
        <FormControl id='notes'>
          <FormLabel>Add a new note</FormLabel>
          <Input
            type='text'
            id='note'
            required
            ref={noteRef}
            placeholder={
              "insert a note that you can leave for everyone to view"
            }
          />
        </FormControl>
        <Button my={4} colorScheme='blue' type='submit'>
          Create Note
        </Button>
      </form>
    </section>
  );
}
