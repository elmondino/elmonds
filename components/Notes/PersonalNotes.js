import { useSession } from "next-auth/client";
import { Button } from "@chakra-ui/button";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import NotesContext from "../../context/PersonalNotesContext";
import { useContext, useEffect } from "react";

async function getNote(note) {
  const response = await fetch(`/api/note/find-user-notes`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

async function handleDeleteNote(noteId) {
  const response = await fetch("/api/note/delete-note", {
    method: "DELETE",
    body: JSON.stringify({ noteId }),
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

export default function NotePage(props) {
  const { colorMode } = useColorMode();
  const notesContext = useContext(NotesContext);
  const [session, loading] = useSession();

  const borderColour = {
    light: "black",
    dark: "white",
  };

  useEffect(async () => {
    const response = await fetch(`/api/note/find-user-notes`);
    const data = await response.json();
    notesContext.setNotes(data);
  }, []);

  async function deleteNote(noteId) {
    try {
      const result = await handleDeleteNote(noteId);
      const data = await getNote();
      notesContext.setNotes(data);
    } catch (error) {
      console.log(error);
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
        <Text my={4}>
          You can delete all the notes you're not happy with by clicking the
          'delete note' button.
        </Text>
        {notesContext.notes &&
        notesContext.notes.status === "success" &&
        notesContext.notes.notes &&
        notesContext.notes.notes.length ? (
          notesContext.notes.notes.map((note) => {
            return (
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
            );
          })
        ) : (
          <Text my={4}>{notesContext.notes && notesContext.notes.message}</Text>
        )}
      </Box>
    );
  }
}
