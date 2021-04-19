import { useState } from "react";
import { useColorMode, Box } from "@chakra-ui/react";
import NavigationLinks from "./navigationLinks";
import HamburgerMenu from "./hamburgerMenu";

function Header() {
  const { colorMode } = useColorMode();
  const [menu, setMenu] = useState(false);

  const bgColor = {
    light: "white",
    dark: "grayCustom.900",
  };

  return (
    <Box as='header'>
      {session && (
        <Box>
          Welcome {session.user.email} you can now access our super secret pages
        </Box>
      )}
      {/* MOBILE/TABLET */}
      <HamburgerMenu menu={menu} setMenu={setMenu}></HamburgerMenu>
      {menu ? (
        <Box
          display={["block", "block", "block", "none"]}
          position={"absolute"}
          zIndex={10}
          bg={bgColor[colorMode]}
          minWidth={"100%"}
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
