import { useState, useRef } from "react";
import {
  Input,
  Heading,
  Button,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";
import NotesContext from "../../context/personal-notes-context";
import { useContext } from "react";
import { Alert, AlertTitle } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import findUserNotes from "../../lib/find-user-notes";
import createNote from "../../lib/create-note";

export default function Note() {
  const [errorMessage, setErrorMessage] = useState();
  const notesContext = useContext(NotesContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState();
  const noteRef = useRef();
  const successToast = useToast({
    title: "Note created.",
    description: "Note has been created.",
    status: "success",
    duration: 3000,
    isClosable: true,
    variant: "solid",
  });

  async function submitHandler(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    const newNote = noteRef.current.value;

    try {
      const result = await createNote(newNote);
      successToast();
      const data = await findUserNotes();
      notesContext.setNotes(data);
      setErrorMessage(false);
      setIsButtonDisabled(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsButtonDisabled(false);
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
        <Button
          my={4}
          colorScheme='blue'
          type='submit'
          disabled={isButtonDisabled}
        >
          Create Note
        </Button>
      </form>
    </Box>
  );
}
