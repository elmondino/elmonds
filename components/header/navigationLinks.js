import { signOut, useSession } from "next-auth/client";
import { Button, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import DarkModeSwitch from "../DarkModeSwitch";
import NavigationButton from "../Elements/NavigationButton";

export default function NavigationLinks({ setIsMobile }) {
  const [session, loading] = useSession();

  const hasLoggedIn = () => {
    if (session) {
      return (
        <>
          <Button
            colorScheme='orange'
            minWidth={["100%", "100%", "auto", "auto"]}
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            mr={[0, 0, 1, 1]}
            onClick={signOut}
          >
            Sign out
          </Button>
          <NextLink href='/change-password' passHref>
            <NavigationButton
              name='Change password'
              onClick={() => setIsMobile(false)}
            />
          </NextLink>
          <NextLink href='/delete-user' passHref>
            <NavigationButton
              name='Delete user'
              onClick={() => setIsMobile(false)}
            />
          </NextLink>
        </>
      );
    }
    if (!session) {
      return (
        <>
          <NextLink href='/login' passHref>
            <NavigationButton
              name='Log in'
              onClick={() => setIsMobile(false)}
            />
          </NextLink>
          <NextLink href='/sign-up' passHref>
            <NavigationButton
              name='Sign up'
              onClick={() => setIsMobile(false)}
            />
          </NextLink>
        </>
      );
    }
  };

  return (
    <>
      <Box>
        <NextLink href='/' passHref>
          <NavigationButton name='Home' onClick={() => setIsMobile(false)} />
        </NextLink>
        <NextLink href='/weather' passHref>
          <NavigationButton name='Weather' onClick={() => setIsMobile(false)} />
        </NextLink>
        <NextLink href='/notes' passHref>
          <NavigationButton name='Notes' onClick={() => setIsMobile(false)} />
        </NextLink>
        <NextLink href='/protected' passHref>
          <NavigationButton
            name='Protected'
            onClick={() => setIsMobile(false)}
          />
        </NextLink>
        <NextLink href='/protected-server-side' passHref>
          <NavigationButton
            name='Protected server side'
            onClick={() => setIsMobile(false)}
          />
        </NextLink>
      </Box>

      <Flex
        flexWrap={"wrap"}
        justifyContent={"flex-end"}
        ml={[0, 0, 0, 10]}
        minWidth={[0, 0, 0, 230]}
      >
        {hasLoggedIn()}
        <DarkModeSwitch />
      </Flex>
    </>
  );
}
