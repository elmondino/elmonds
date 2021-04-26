import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Heading, Text, Flex } from "@chakra-ui/react";

async function findNotes(note) {
  const response = await fetch("/api/note/find-note");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

export default function ViewNotes(props) {
  useEffect(async () => {
    const response = await fetch(`/api/note/find-note`);
    const data = await response.json();
    setNotes(data);
  }, []);

  const noteRef = useRef();
  const [notes, setNotes] = useState(props.notes);
  const [showNotes, setShowNotes] = useState(true);
  const router = useRouter();
  async function submitHandler(event) {
    event.preventDefault();
    try {
      const result = await findNotes();
      setNotes(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      {showNotes ? (
        notes &&
        notes.map((note) => (
          <Flex key={note._id}>
            <Flex
              border={"2px solid black"}
              flex={1}
              p={3}
              borderRadius={4}
              my={4}
              justifyContent='space-between'
              flexWrap={["wrap", "wrap", "nowrap"]}
            >
              <Text>{note.note}</Text>
            </Flex>
          </Flex>
        ))
      ) : (
        <Text my={4}>Notes have been hidden.</Text>
      )}
      <Button
        colorScheme='blue'
        onClick={() => setShowNotes(!showNotes)}
        my={4}
      >
        {showNotes ? "Hide notes" : "Show notes"}
      </Button>
      <Button
        colorScheme='teal'
        my={4}
        mx={(0, 0, 4, 4)}
        onClick={submitHandler}
      >
        Find the latest notes
      </Button>
    </section>
  );
}
