import '../styles/globals.css';
import Header from '../components/header/header';
import {Provider} from 'next-auth/client';
import {ThemeProvider, theme, CSSReset} from '@chakra-ui/react';

function MyApp({Component, pageProps}) {
	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<Provider session={pageProps.session}>
				<Header></Header>
				<Component {...pageProps} />{' '}
			</Provider>
		</ThemeProvider>
	);
}

export default MyApp;
