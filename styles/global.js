import { Global, css } from "@emotion/react";
import { useColorMode } from "@chakra-ui/react";

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "white" : "#171717"};
          }
          a:focus {
            box-shadow: none !important;
          }
          ,
          a:active {
            background: none !important;
          }
          * {
            box-sizing: border-box !important;
          }
        `}
      />
      {children}
    </>
  );
};

export default GlobalStyle;
