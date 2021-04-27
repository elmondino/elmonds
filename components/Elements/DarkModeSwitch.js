import { useColorMode, IconButton, Box } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: "blue.700",
    dark: "orange.200",
  };
  const backgroundColor = {
    light: "orange.100",
    dark: "blue.900",
  };

  return (
    <Box
      minWidth={["100%", "100%", "auto", "auto"]}
      textAlign={"center"}
      px={[1, 2]}
    >
      <IconButton
        aria-label='Toggle dark mode'
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        color={iconColor[colorMode]}
        background={backgroundColor[colorMode]}
      />
    </Box>
  );
};

export default DarkModeSwitch;
