import { signIn, signOut, useSession } from "next-auth/client";
import { useColorMode, Button, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import DarkModeSwitch from "../DarkModeSwitch";

export default function NavigationLinks({ setIsMobile }) {
  const { colorMode } = useColorMode();
  const [session, loading] = useSession();

  const navHoverBg = {
    light: "linear(to-t, orange.400 1%, white 8%)",
    dark: "linear(to-t, blue.200 1%, gray.900 8%)",
  };

  console.log("session", session);
  console.log("loading", loading);

  const hasLoggedIn = () => {
    if (session) {
      return (
        <>
          <Button
            colorScheme='orange'
            minWidth={["100%", "100%", "auto", "auto"]}
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            onClick={signOut}
          >
            Sign out
          </Button>
          <NextLink href='/change-password' passHref>
            <Button
              onClick={() => setIsMobile(false)}
              as='a'
              variant='ghost'
              minWidth={["100%", "100%", "auto", "auto"]}
              p={[1, 2]}
              mb={[1, 1, 0, 0]}
              _hover={{ bgGradient: navHoverBg[colorMode] }}
              border={[
                "2px solid #0071c3",
                "2px solid #0071c3",
                "none",
                "none",
              ]}
            >
              Change password
            </Button>
          </NextLink>
          <NextLink href='/delete-user' passHref>
            <Button
              onClick={() => setIsMobile(false)}
              as='a'
              variant='ghost'
              minWidth={["100%", "100%", "auto", "auto"]}
              p={[1, 2]}
              mb={[1, 1, 0, 0]}
              _hover={{ bgGradient: navHoverBg[colorMode] }}
              border={[
                "2px solid #0071c3",
                "2px solid #0071c3",
                "none",
                "none",
              ]}
            >
              Delete user
            </Button>
          </NextLink>
        </>
      );
    } else {
      return (
        <>
          <NextLink href='/login' passHref>
            <Button
              onClick={() => setIsMobile(false)}
              minWidth={["100%", "100%", "auto", "auto"]}
              as='a'
              variant='ghost'
              p={[1, 2]}
              mb={[1, 1, 0, 0]}
              _hover={{ bgGradient: navHoverBg[colorMode] }}
              border={[
                "2px solid #0071c3",
                "2px solid #0071c3",
                "none",
                "none",
              ]}
            >
              Log in
            </Button>
          </NextLink>
          <NextLink href='/sign-up' passHref>
            <Button
              onClick={() => setIsMobile(false)}
              minWidth={["100%", "100%", "auto", "auto"]}
              as='a'
              variant='ghost'
              p={[1, 2]}
              mb={[1, 1, 0, 0]}
              _hover={{ bgGradient: navHoverBg[colorMode] }}
              border={[
                "2px solid #0071c3",
                "2px solid #0071c3",
                "none",
                "none",
              ]}
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
            onClick={() => setIsMobile(false)}
            minWidth={["100%", "100%", "auto", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            _hover={{ bgGradient: navHoverBg[colorMode] }}
            border={["2px solid #0071c3", "2px solid #0071c3", "none", "none"]}
          >
            Home
          </Button>
        </NextLink>
        <NextLink href='/weather' passHref>
          <Button
            onClick={() => setIsMobile(false)}
            minWidth={["100%", "100%", "auto", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            _hover={{ bgGradient: navHoverBg[colorMode] }}
            border={["2px solid #0071c3", "2px solid #0071c3", "none", "none"]}
          >
            Weather
          </Button>
        </NextLink>
        <NextLink href='/notes' passHref>
          <Button
            onClick={() => setIsMobile(false)}
            minWidth={["100%", "100%", "auto", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            _hover={{ bgGradient: navHoverBg[colorMode] }}
            border={["2px solid #0071c3", "2px solid #0071c3", "none", "none"]}
          >
            Notes
          </Button>
        </NextLink>
        <NextLink href='/protected' passHref>
          <Button
            onClick={() => setIsMobile(false)}
            minWidth={["100%", "100%", "auto", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            _hover={{ bgGradient: navHoverBg[colorMode] }}
            border={["2px solid #0071c3", "2px solid #0071c3", "none", "none"]}
          >
            Protected
          </Button>
        </NextLink>
        <NextLink href='/protected-server-side' passHref>
          <Button
            onClick={() => setIsMobile(false)}
            minWidth={["100%", "100%", "auto", "auto"]}
            as='a'
            variant='ghost'
            p={[1, 2]}
            mb={[1, 1, 0, 0]}
            _hover={{ bgGradient: navHoverBg[colorMode] }}
            border={["2px solid #0071c3", "2px solid #0071c3", "none", "none"]}
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
