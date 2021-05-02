import Head from "next/head";
import { Heading, Text, Box, Link } from "@chakra-ui/react";
import DarkModeSwitch from "../components/elements/dark-mode-switch";
import NextLink from "next/link";

export default function Index() {
  return (
    <>
      <Head>
        <title>Elmonds Kreslins Next.js Application</title>
      </Head>
      <Box>
        <Heading size='lg' my={5}>
          Welcome to Elmonds Kreslins Application
        </Heading>
        <Heading size='md' my={5}>
          Technologies used in creating this App
        </Heading>
        <Text my={3}>
          This App was built using Next.js, React.js, MongoDB, Node.js Rest
          API's and Chakra UI for styling. It is depolyed and hosted on Vercel
          and the code repository is GitHub.
        </Text>
        <Heading size='md' my={5}>
          Colour scheme
        </Heading>
        <Text my={3}>
          If you prefer a dark colour scheme you can change it by clicking this
          icon
          <Box as='span' px={2}>
            <DarkModeSwitch />
          </Box>
          or by clicking the same icon on the navigation bar.
        </Text>
        <Heading size='md' my={5}>
          What can you do on this App?
        </Heading>
        <Text my={3}>
          You are able to sign up for a test an account which will be stored in
          MongoDB.
        </Text>
        <Text my={3}>
          Once you're logged in you will be able to access all features of this
          App. For example access secret routes, create notes and delete notes.
          Be aware these notes are public and every visitor will be able to view
          them.
        </Text>
        <Text my={3}>
          You're able to look at the current weather forecast in some of your
          favourite cities.
        </Text>
        <Text my={3}>
          You can also update your password and delete your test account.
        </Text>
        <Heading size='md' my={5}>
          About me
        </Heading>
        <Text my={3}>
          I'm Front End Developer with Computer Science & Cybernetics BSc
          degree.
        </Text>
        <Text my={3}>
          Commercial experience as Front End Developer since July 2015.
        </Text>
        <Text my={3}>
          Linkedin profile:{" "}
          <NextLink
            href='https://www.linkedin.com/in/elmonds-kreslins'
            passHref
          >
            <Link
              textDecoration='underline'
              _hover={{ textDecoration: "none" }}
            >
              www.linkedin.com/in/elmonds-kreslins
            </Link>
          </NextLink>
        </Text>
        <Text my={3}>
          GitHub account:{" "}
          <NextLink href='https://github.com/elmondino' passHref>
            <Link
              textDecoration='underline'
              _hover={{ textDecoration: "none" }}
            >
              www.github.com/elmondino
            </Link>
          </NextLink>
        </Text>
      </Box>
    </>
  );
}
