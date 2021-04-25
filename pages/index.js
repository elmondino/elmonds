import Head from "next/head";
import { useColorMode, Heading, Text, Box } from "@chakra-ui/react";

export default function Index() {
  const { colorMode } = useColorMode();
  const colorSecondary = {
    light: "gray.700",
    dark: "gray.400",
  };
  return (
    <>
      <Head>
        <title>Elmonds Kreslins Next.js App</title>
      </Head>
      <Box>
        <Heading my={5}>Hi, I'm Elmonds Kreslins</Heading>
        <Text my={4}>
          I'm front end developer with for over 5 years of professional front
          end devlopment experience.
        </Text>
      </Box>
    </>
  );
}
