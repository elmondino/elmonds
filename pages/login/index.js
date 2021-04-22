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
            <Heading as='h1' my={6} size='lg'>
              You have signed in {session.user.email}
            </Heading>
            <Text my={3}>You can now access our super secret pages.</Text>
            <Text>
              For example try accessing our server side protected route by{" "}
              <NextLink href='/protected-server-side'>
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
