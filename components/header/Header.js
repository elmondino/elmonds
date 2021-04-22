import { useState } from "react";
import { useColorMode, Box } from "@chakra-ui/react";
import NavigationLinks from "./NavigationLinks";
import HamburgerMenu from "./HamburgerMenu";
import { useSession } from "next-auth/client";

function Header() {
  const [session, loading] = useSession();
  const { colorMode } = useColorMode();
  const [menu, setMenu] = useState(false);

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
      <HamburgerMenu menu={menu} setMenu={setMenu} />
      {menu ? (
        <Box
          display={["block", "block", "block", "none"]}
          position={"absolute"}
          zIndex={10}
          bg={navBgColor[colorMode]}
          minWidth={"100%"}
          as='nav'
        >
          <NavigationLinks />
        </Box>
      ) : (
        <Box display={["none", "none", "none", "none"]}>
          <NavigationLinks />
        </Box>
      )}

      {/* DESKTOP */}
      <Box
        display={["none", "none", "none", "flex"]}
        flexDirection='row'
        justifyContent='space-between'
        alignItems='top'
        bg={bgColor[colorMode]}
        as='nav'
        px={[0, 0, 0, 6]}
        py={[0, 0, 0, 2]}
        mt={[0, 0, 0, 8]}
        mb={[0, 0, 0, 8]}
        mx='auto'
      >
        <NavigationLinks />
      </Box>
    </Box>
  );
}

export default Header;
