import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import GlobalStyle from "./global";
import customTheme from "./theme";

export default function ChakraUI({ children }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true,
        }}
      >
        <GlobalStyle>{children}</GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
