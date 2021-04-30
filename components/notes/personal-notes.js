import { useSession } from "next-auth/client";
import { Button } from "@chakra-ui/button";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import NotesContext from "../../context/personal-notes-context";
import { useToast } from "@chakra-ui/react";
import { Alert, AlertTitle } from "@chakra-ui/react";
import findUserNotes from "../../lib/find-user-notes";
import handleDeleteNote from "../../lib/delete-note";

export default function PersonalNotes() {
  const { colorMode } = useColorMode();
  const [session, loading] = useSession();
  const [errorMessage, setErrorMessage] = useState(false);
  const notesContext = useContext(NotesContext);
  const borderColour = {
    light: "black",
    dark: "white",
  };
  const successToast = useToast({
    title: "Deleted note.",
    description: "Note has been deleted!",
    status: "info",
    duration: 3000,
    isClosable: true,
  });

  useEffect(async () => {
    const response = await fetch(`/api/note/find-user-notes`);
    const data = await response.json();
    notesContext.setNotes(data);
  }, []);

  async function deleteNote(noteId) {
    try {
      const result = await handleDeleteNote(noteId);
      successToast();
      const data = await findUserNotes();
      notesContext.setNotes(data);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(true);
    }
  }

  if (loading && !session) {
    return <Text my={4}>Loading....</Text>;
  }

  if (session) {
    return (
      <Box as='section'>
        <Heading as='h1' size='lg' my={5}>
          View all your personal notes
        </Heading>
        {notesContext.notes &&
          notesContext.notes.length &&
          notesContext.notes.map((note) => (
            <Flex key={note._id}>
              <Flex
                border={("2px solid #0071c3", "2px solid #0071c3")}
                borderColor={borderColour[colorMode]}
                flex={1}
                p={3}
                borderRadius={4}
                mt={4}
                justifyContent='space-between'
                flexWrap={["wrap", "wrap", "nowrap"]}
              >
                <Text>{note.note}</Text>
                <Button
                  ml={[0, 0, 2]}
                  mt={[2, 2, 0]}
                  minW={["100%", "100%", "100px"]}
                  alignSelf={"end"}
                  colorScheme='red'
                  onClick={() => deleteNote(note._id)}
                >
                  delete note
                </Button>
              </Flex>
            </Flex>
          ))}
        {notesContext.notes && notesContext.notes.message && (
          <Text my={4}>{notesContext.notes && notesContext.notes.message}</Text>
        )}
        {errorMessage && (
          <Alert status='error' my={4}>
            <AlertTitle mr={2}>{errorMessage}</AlertTitle>
          </Alert>
        )}
      </Box>
    );
  }
}
