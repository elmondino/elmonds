import Login from "../../components/login/login";
import { useSession } from "next-auth/client";
import { Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function LoginPage() {
  const [session, loading] = useSession();

  return (
    <>
      <main>
        {session && (
          <>
            <Heading as='h1' my={5} size='lg'>
              You have signed in {session.user.email}
            </Heading>
            <Text my={4}>
              You can now access our super secret pages or create a note.
            </Text>
            <Text>
              You can now create notes which everyone can see by{" "}
              <NextLink href='/notes/my-notes'>
                <Link
                  textDecoration={"underline"}
                  _hover={{ textDecoration: "none" }}
                >
                  clicking here
                </Link>
              </NextLink>
              .
            </Text>
          </>
        )}
        {!session && (
          <>
            <Login></Login>
          </>
        )}
      </main>
    </>
  );
}
