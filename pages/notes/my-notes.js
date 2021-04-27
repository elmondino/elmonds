import PersonalNotes from "../../components/Notes/PersonalNotes";
import CreateNotes from "../../components/Notes/CreateNotes";
import { useSession } from "next-auth/client";
import { Heading } from "@chakra-ui/layout";

export default function MyNotesPage() {
  const [session, loading] = useSession();

  if (!session) {
    return (
      <Heading my={6} as='h1' fontSize='lg'>
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
