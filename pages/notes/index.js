import ViewNotes from "../../components/Notes/ViewNotes";
import CreateNotes from "../../components/Notes/CreateNotes";
import { useSession } from "next-auth/client";
import NextLink from "next/link";
import { Button, Text } from "@chakra-ui/react";

export default function NotesPage() {
  const [session, loading] = useSession();

  return (
    <>
      <ViewNotes />
      <CreateNotes />
      {session && (
        <NextLink href='/notes/my-notes' passHref>
          <Text
            as='a'
            variant='ghost'
            minWidth={["100%", "100%", "100%", "auto"]}
            p={[1, 2]}
            _hover={{ textDecoration: "none" }}
            textDecoration={"underline"}
          >
            Click here to view and delete your notes
          </Text>
        </NextLink>
      )}
    </>
  );
}
