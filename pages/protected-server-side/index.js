import { Heading, Text, Box } from "@chakra-ui/layout";
import { getSession } from "next-auth/client";

function ProtectedServerSidePage() {
  return (
    <Box>
      <Heading as='h1' size='lg' my={5}>
        Protected Server Side Route
      </Heading>
      <Text my={4}>
        Meaning behind protected server side route: The user will never see the
        authentication updates as authentication is checked in the backend
        rather than the front end.
      </Text>
      <Text my={4}>
        The way this page has been setup: if you try to access this page without
        having logged in you'll be redirected to the homepage without seeing any
        authentication in the front end.
      </Text>
    </Box>
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

export default ProtectedServerSidePage;
