import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Heading, Text, Flex } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

async function findNotes(note) {
  const response = await fetch("/api/note/find-note");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

export default function ViewNotes(props) {
  const { colorMode } = useColorMode();

  const borderColour = {
    light: "black",
    dark: "white",
  };

  useEffect(async () => {
    const response = await fetch(`/api/note/find-note`);
    const data = await response.json();
    setNotes(data);
  }, []);

  const noteRef = useRef();
  const [notes, setNotes] = useState(props.notes);
  const [showNotes, setShowNotes] = useState(true);
  const router = useRouter();

  return (
    <section>
      <Button
        colorScheme='blue'
        onClick={() => setShowNotes(!showNotes)}
        my={4}
      >
        {showNotes ? "Hide notes" : "Show notes"}
      </Button>
      {showNotes ? (
        notes &&
        notes.map((note) => (
          <Flex key={note._id}>
            <Flex
              border={"2px solid black"}
              borderColor={borderColour[colorMode]}
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
    </section>
  );
}
