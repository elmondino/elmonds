import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/react";

export default function NavigationButton({ name }) {
  const { colorMode } = useColorMode();

  const navHoverBg = {
    light: "linear(to-t, orange.400 1%, white 8%)",
    dark: "linear(to-t, blue.200 1%, gray.900 8%)",
  };

  return (
    <Button
      onClick={() => setIsMobile(false)}
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
}
