import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/react";
import React from "react";

const NavigationButton = React.forwardRef(({ onClick, href, name }, ref) => {
  const { colorMode } = useColorMode();

  const navHoverBg = {
    light: "linear(to-t, orange.400 1%, white 8%)",
    dark: "linear(to-t, blue.200 1%, gray.900 8%)",
  };

  return (
    <Button
      href={href}
      onClick={onClick}
      ref={ref}
      minWidth={["100%", "100%", "auto", "auto"]}
      as='a'
      variant='ghost'
      p={[1, 2]}
      mb={[1, 1, 0, 0]}
      _hover={{ bgGradient: navHoverBg[colorMode], cursor: "pointer" }}
      border={["2px solid #0071c3", "2px solid #0071c3", "none", "none"]}
    >
      {name}
    </Button>
  );
});

export default NavigationButton;
