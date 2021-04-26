import PersonalNotes from "../../components/Notes/PersonalNotes";
import CreateNotes from "../../components/Notes/CreateNotes";
import { getSession } from "next-auth/client";

export default function MyNotesPage({ session }) {
  return (
    <>
      <PersonalNotes />
      <CreateNotes />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
