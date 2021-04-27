import { useState, useRef } from "react";
import {
  Input,
  Heading,
  Button,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";
import NotesContext from "../../context/PersonalNotesContext";
import { useContext } from "react";
import { Alert, AlertTitle } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

async function getNote(note) {
  const response = await fetch(`/api/note/find-user-notes`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

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
  const [errorMessage, setErrorMessage] = useState();
  const notesContext = useContext(NotesContext);
  const noteRef = useRef();
  const successToast = useToast({
    title: "Note created.",
    description: "Note has been created.",
    status: "success",
    duration: 3000,
    isClosable: true,
  });

  async function submitHandler(event) {
    event.preventDefault();
    const newNote = noteRef.current.value;

    try {
      const result = await createNote(newNote);
      successToast();
      const data = await getNote();
      notesContext.setNotes(data);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <Box as='section' py={4}>
      <Heading as='h2' size='md' my={5}>
        Add new notes below
      </Heading>
      <form onSubmit={submitHandler}>
        <FormControl id='notes'>
          <FormLabel>
            Create a new note, be aware everyone will be able to see it!
          </FormLabel>
          <Input
            type='text'
            id='note'
            required
            ref={noteRef}
            placeholder={"insert text for your note"}
          />
        </FormControl>
        {errorMessage && (
          <Alert status='error' my={4}>
            <AlertTitle mr={2}>{errorMessage}</AlertTitle>
          </Alert>
        )}
        <Button my={4} colorScheme='blue' type='submit'>
          Create Note
        </Button>
      </form>
    </Box>
  );
}
