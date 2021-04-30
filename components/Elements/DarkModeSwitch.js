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
    <IconButton
      aria-label='Toggle dark mode'
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
      background={backgroundColor[colorMode]}
    />
  );
};

export default DarkModeSwitch;
