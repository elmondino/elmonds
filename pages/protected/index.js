import { useSession } from "next-auth/client";
import { Box, Heading, Text } from "@chakra-ui/layout";

export default function ProtectedPage() {
  const [session, loading] = useSession();

  if (loading && !session) {
    return <Text>Loading session...</Text>;
  }

  if (session) {
    return (
      <Box>
        <Heading as='h1' size='lg' my={5}>
          Protected Next.js Route
        </Heading>
        <Text my={4}>
          You're logged in welcome to the protected route {session.user.email}.
        </Text>
      </Box>
    );
  }

  if (!session) {
    return (
      <Box>
        <Heading as='h1' size='lg' my={5}>
          Protected Next.js Route
        </Heading>
        <Text my={4}>
          This a protected route, you can only view the content of this page if
          you're logged in.
        </Text>
      </Box>
    );
  }
}
