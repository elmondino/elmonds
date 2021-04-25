import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/client";
import { Button } from "@chakra-ui/button";
import { Flex, Text, Box, Spacer, Heading } from "@chakra-ui/react";

async function getNote(note) {
  //   console.log("hi");
  const response = await fetch(`/api/note/find-user-notes`);

  // console.log(response);

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

async function handleDeleteNote(noteId) {
  //   console.log(noteId);
  const response = await fetch("/api/note/delete-note", {
    method: "DELETE",
    body: JSON.stringify(noteId),
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
  //   console.log("inside the function", props);
  const [session, loading] = useSession();
  const [notes, setNotes] = useState(props.notes);

  useEffect(async () => {
    const response = await fetch(`/api/note/find-user-notes`);
    const data = await response.json();
    console.log(data);
    setNotes(data);
  }, []);

  async function deleteNote(noteId) {
    try {
      const result = await handleDeleteNote(noteId).then(async () => {
        const data = await getNote();
        console.log("here", data);
        setNotes(data);
        console.log("hi there");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const data = await getNote();
      setNotes(data);
    } catch (error) {
      //   console.log(error);
    }
  }

  if (loading) {
    return <p>Loading......</p>;
  }
  if (session) {
    return (
      <Box>
        <Heading as='h1' size='lg' my={6}>
          View all your personal notes
        </Heading>
        <Text>
          You can delete all the notes you're not happy with by clicking the
          'delete note' button.
        </Text>
        {notes && notes.status === "success" ? (
          notes.notes.map((note) => (
            <Flex key={note._id}>
              <Flex
                border={"1px solid black"}
                flex={1}
                p={3}
                borderRadius={4}
                my={4}
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
          ))
        ) : (
          <Text>{notes && notes.message}</Text>
        )}
        <Button colorScheme='blue' onClick={submitHandler}>
          Find all your notes
        </Button>
      </Box>
    );
  }
}
