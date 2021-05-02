import { useState } from "react";
import { useColorMode, Box } from "@chakra-ui/react";
import Navigationlinks from "./header/navigation-links";
import Hamburgermenu from "./header/hamburger-menu";

function Header() {
  const { colorMode } = useColorMode();
  const [isMobile, setIsMobile] = useState(false);
  const bgColor = {
    light: "white",
    dark: "grayCustom.900",
  };
  const navBgColor = {
    light: "orange.100",
    dark: "blue.900",
  };

  return (
    <Box as='header' maxWidth={"1000px"} alignSelf={"center"} width={"100%"}>
      {/* MOBILE/TABLET */}
      <Hamburgermenu isMobile={isMobile} setIsMobile={setIsMobile} />
      {isMobile ? (
        <Box
          display={["block", "block", "none", "none"]}
          position={"absolute"}
          zIndex={10}
          bg={navBgColor[colorMode]}
          minWidth={"100%"}
          as='nav'
        >
          <Navigationlinks setIsMobile={setIsMobile} />
        </Box>
      ) : (
        <Box display={["none", "none", "none", "none"]}>
          <Navigationlinks setIsMobile={setIsMobile} />
        </Box>
      )}
      {/* DESKTOP */}
      <Box
        display={["none", "none", "flex", "flex"]}
        flexDirection='row'
        justifyContent='space-between'
        alignItems='top'
        bg={bgColor[colorMode]}
        as='nav'
        px={[0, 0, 6, 6]}
        py={[0, 0, 2, 2]}
        mt={[0, 0, 8, 8]}
        mx='auto'
      >
        <Navigationlinks setIsMobile={setIsMobile} />
      </Box>
    </Box>
  );
}

export default Header;
