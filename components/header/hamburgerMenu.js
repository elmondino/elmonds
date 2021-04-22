import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { color, useColorMode, Flex } from "@chakra-ui/react";

export default function HamburgerMenu({ setIsMobile, isMobile }) {
  const { colorMode } = useColorMode();

  const iconColor = {
    light: "orangeCustom.900",
    dark: "blueCustom.400",
  };

  const navBgColor = {
    light: "orange.100",
    dark: "blue.900",
  };

  return (
    <Flex
      justifyContent={"flex-end"}
      p={2}
      bg={navBgColor[colorMode]}
      display={["flex", "flex", "none", "none"]}
    >
      {isMobile ? (
        <SmallCloseIcon
          w={8}
          h={8}
          color={iconColor[colorMode]}
          onClick={() => setIsMobile(!isMobile)}
        />
      ) : (
        <HamburgerIcon
          w={8}
          h={8}
          color={iconColor[colorMode]}
          onClick={() => setIsMobile(!isMobile)}
        />
      )}
    </Flex>
  );
}
