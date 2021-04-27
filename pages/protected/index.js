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
        <Heading as='h1' my={5}>
          Welcome to protected Next.js route
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
        <Heading as='h1' my={5}>
          Welcome to protected Next.js route
        </Heading>
        <Text my={4}>
          This a protected route, you can only view the content of this page if
          you're logged in.
        </Text>
      </Box>
    );
  }
}
