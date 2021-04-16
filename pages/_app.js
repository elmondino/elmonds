import React from 'react';
import {
	ChakraProvider,
	ColorModeProvider,
	useColorMode,
} from '@chakra-ui/react';
import customTheme from '../styles/theme';
import {Global, css} from '@emotion/react';
import {Provider} from 'next-auth/client';

import Container from '../components/Container';

const GlobalStyle = ({children}) => {
	const {colorMode} = useColorMode();

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
						background: ${colorMode === 'light' ? 'white' : '#171717'};
					}
				`}
			/>
			{children}
		</>
	);
};

function MyApp({Component, pageProps}) {
	return (
		<Provider session={pageProps.session}>
			<ChakraProvider resetCSS theme={customTheme}>
				<ColorModeProvider
					options={{
						initialColorMode: 'light',
						useSystemColorMode: true,
					}}>
					<GlobalStyle>
						<Container>
							<Component {...pageProps} />
						</Container>
					</GlobalStyle>
				</ColorModeProvider>
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
