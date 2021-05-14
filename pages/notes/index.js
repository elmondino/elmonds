import ViewAllNotes from "../../components/notes/view-all-notes";
import { useSession } from "next-auth/client";
import NextLink from "next/link";
import { Text, Heading, Box } from "@chakra-ui/react";
import {getNotes} from '../api/note/find-note';

export default function NotesPage({notesData}) {
  console.log(notesData)
  const [session, loading] = useSession();

  return (
    <>
      <Box as='section' pb={3}>
        <Heading as='h1' size='lg' my={5}>
          Notes Created by Everyone
        </Heading>
        <Text my={4}>
          you can view everyones notes below, and also create some of your own,
          if you have logged in.
        </Text>
        {!session && !loading && (
          <Text my={4}>
            if you'd like to add a note{" "}
            <NextLink href='/sign-up' passHref>
              <Text
                as='a'
                _hover={{ textDecoration: "none", cursor: "pointer" }}
                textDecoration={"underline"}
              >
                create an account
              </Text>
            </NextLink>
            &nbsp;to get started.
          </Text>
        )}
        {session && (
          <Text
            my={4}
            fontSize='lg'
            minWidth={["100%", "100%", "100%", "auto"]}
          >
            To view create and delete your notes{" "}
            <NextLink href='/notes/my-notes' passHref>
              <Text
                as='a'
                _hover={{ textDecoration: "none", cursor: "pointer" }}
                textDecoration={"underline"}
              >
                click here.
              </Text>
            </NextLink>
          </Text>
        )}
      </Box>
      <ViewAllNotes notesData={notesData}/>
    </>
  );
}

export async function getStaticProps () {
  let data = await getNotes();
  data = JSON.parse(JSON.stringify(data))

  return {
    props: {
      notesData: data.notes
    }
  }
}
