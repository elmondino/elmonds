import '../styles/globals.css';
import Header from '../components/header/header';
import {Provider} from 'next-auth/client';

function MyApp({Component, pageProps}) {
	return (
		<Provider session={pageProps.session}>
			<Header></Header>
			<Component {...pageProps} />{' '}
		</Provider>
	);
}

export default MyApp;
