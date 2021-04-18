import React from "react";
import ChakraUI from "../styles/chakra";
import { Provider } from "next-auth/client";

import Container from "../components/Container";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraUI>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ChakraUI>
    </Provider>
  );
}

export default MyApp;
