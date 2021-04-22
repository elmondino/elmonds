import { signIn, signOut, useSession } from "next-auth/client";
import { useColorMode, Button, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";

import DarkModeSwitch from "../DarkModeSwitch";

export default function NavigationLinks() {
  const { colorMode } = useColorMode();
  const [session, loading] = useSession();

  const navHoverBg = {
    light: "gray.600",
    dark: "gray.300",
  };

  console.log("session", session);
  console.log("loading", loading);

  const hasLoggedIn = () => {
    if (session) {
      return (
        <>
          <Button minWidth={["100%", "100%", "100%", "auto"]} onClick={signOut}>
            sign out
          </Button>
          <NextLink href='/change-password' passHref>
            <Button
              as='a'
              variant='ghost'
              minWidth={["100%", "100%", "100%", "auto"]}
              p={[1, 2]}
              _hover={{ backgroundColor: navHoverBg[colorMode] }}
            >
              Change password
            </Button>
          </NextLink>
          <NextLink href='/delete-user' passHref>
            <Button
              as='a'
              variant='ghost'
              minWidth={["100%", "100%", "100%", "auto"]}
              p={[1, 2]}
              _hover={{ backgroundColor: navHoverBg[colorMode] }}
            >
              Delete user
            </Button>
          </NextLink>
        </>
      );
    } else {
      return (
        <>
          <Button
            minWidth={["100%", "100%", "100%", "auto"]}
            onClick={signIn}
            variant='ghost'
            p={[1, 2]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Log in
          </Button>
          <NextLink href='/sign-up' passHref>
            <Button
              minWidth={["100%", "100%", "100%", "auto"]}
              as='a'
              variant='ghost'
              p={[1, 2]}
              _hover={{ backgroundColor: navHoverBg[colorMode] }}
            >
              Sign up
            </Button>
          </NextLink>
        </>
      );
    }
  };

  return (
    <>
      <Box>
        <NextLink href='/' passHref>
          <Button
            minWidth={["100%", "100%", "100%", "auto"]}
            as='a'
            variant='ghost'
            p={1}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Home
          </Button>
        </NextLink>
        <NextLink href='/weather' passHref>
          <Button
            minWidth={["100%", "100%", "100%", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Weather
          </Button>
        </NextLink>
        <NextLink href='/notes' passHref>
          <Button
            minWidth={["100%", "100%", "100%", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Notes
          </Button>
        </NextLink>
        <NextLink href='/protected' passHref>
          <Button
            minWidth={["100%", "100%", "100%", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Protected
          </Button>
        </NextLink>
        <NextLink href='/protected-server-side' passHref>
          <Button
            minWidth={["100%", "100%", "100%", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Protected server side
          </Button>
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
