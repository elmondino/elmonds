import PersonalNotes from "../../components/notes/personal-notes";
import CreateNotes from "../../components/notes/create-notes";
import { useSession } from "next-auth/client";
import { Heading } from "@chakra-ui/layout";

export default function MyNotesPage() {
  const [session, loading] = useSession();

  if (!session) {
    return (
      <Heading my={5} as='h1' fontSize='lg'>
        Please login to view this page
      </Heading>
    );
  }

  if (session) {
    return (
      <>
        <PersonalNotes />
        <CreateNotes />
      </>
    );
  }
}
