import PersonalNotes from "../../components/Notes/PersonalNotes";
import CreateNotes from "../../components/Notes/CreateNotes";
import { useSession } from "next-auth/client";
import { Heading } from "@chakra-ui/layout";
import { useState, useEffect } from "react";

export default function MyNotesPage() {
  const [session, loading] = useSession();
  const [notes, setNotes] = useState();

  useEffect(async () => {
    const response = await fetch(`/api/note/find-user-notes`);
    const data = await response.json();
    console.log(data);
    setNotes(data.notes);
  }, []);

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
        {notes && (
          <>
            <PersonalNotes notes={notes} setNotes={setNotes} />
            <CreateNotes notes={notes} setNotes={setNotes} />
          </>
        )}
      </>
    );
  }
}
