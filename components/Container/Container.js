import React from "react";
import { useColorMode, Box } from "@chakra-ui/react";
import Header from "../header/header";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = {
    light: "white",
    dark: "#171717",
  };
  const color = {
    light: "black",
    dark: "white",
  };

  return (
    <>
      <Header></Header>
      <Box
        as='main'
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        px={[4, 4, 4]}
        mt={[4, 8, 8]}
        mx={"auto"}
        maxWidth='800px'
        width='100%'
      >
        {children}
      </Box>
    </>
  );
};

export default Container;
