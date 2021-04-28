import { useState, useEffect } from "react";
import { Button, Text, Flex } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

export default function ViewNotes() {
  const { colorMode } = useColorMode();
  const [notes, setNotes] = useState();
  const [showNotes, setShowNotes] = useState(true);
  const borderColour = {
    light: "black",
    dark: "white",
  };

  useEffect(async () => {
    const response = await fetch(`/api/note/find-note`);
    const data = await response.json();
    setNotes(data.notes);
  }, []);

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
