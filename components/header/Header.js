import {useState, useEffect} from 'react';
import {signIn, signOut, useSession} from 'next-auth/client';
import {useColorMode, Button, Flex, Box} from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

import HeaderLinks from './headerLinks';

import DarkModeSwitch from '../DarkModeSwitch';

function Header() {
	const {colorMode} = useColorMode();
	const [session, loading] = useSession();
	const [menu, setMenu] = useState(false);

	const bgColor = {
		light: 'white',
		dark: '#171717',
	};

	const color = {
		light: 'black',
		dark: 'white',
	};

	const navHoverBg = {
		light: 'gray.600',
		dark: 'gray.300',
	};

	return (
		<Box as='header'>
			<Button
				as='a'
				variant='ghost'
				p={[1, 2]}
				_hover={{backgroundColor: navHoverBg[colorMode]}}
				display={['block', 'block', 'block', 'none']}
				onClick={() => setMenu(!menu)}>
				Hamburger Button
			</Button>
			{menu ? (
				<Box display={['block', 'block', 'block', 'none']}>
					<HeaderLinks></HeaderLinks>
				</Box>
			) : (
				<Box display={['none', 'none', 'none', 'none']}>
					<HeaderLinks></HeaderLinks>
				</Box>
			)}
			<Box
				display={['none', 'none', 'none', 'flex']}
				flexDirection='row'
				justifyContent='space-between'
				alignItems='top'
				bg={bgColor[colorMode]}
				as='nav'
				px={[0, 0, 0, 6]}
				py={[0, 0, 0, 2]}
				mt={[0, 0, 0, 8]}
				mb={[0, 0, 0, 8]}
				mx='auto'>
				<HeaderLinks></HeaderLinks>
			</Box>
		</Box>
	);
}

export default Header;
