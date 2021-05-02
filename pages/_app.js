import React from "react";
import ChakraUI from "../styles/chakra";
import { Provider } from "next-auth/client";
import Container from "../components/container";
import { NotesContextProvider } from "../context/personal-notes-context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <NotesContextProvider>
        <ChakraUI>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ChakraUI>
      </NotesContextProvider>
    </Provider>
  );
}

export default MyApp;
