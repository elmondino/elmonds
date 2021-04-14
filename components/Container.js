import React from 'react';
import {useColorMode, Button, Flex, Box} from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

import DarkModeSwitch from '../components/DarkModeSwitch';

const Container = ({children}) => {
	const {colorMode} = useColorMode();

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

	const StickyNav = styled(Flex)`
		position: sticky;
		z-index: 10;
		top: 0;
		backdrop-filter: saturate(180%) blur(20px);
		transition: height 0.5s, line-height 0.5s;
	`;

	return (
		<>
			<StickyNav
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				maxWidth='800px'
				minWidth='356px'
				width='100%'
				bg={bgColor[colorMode]}
				as='nav'
				px={[2, 6, 6]}
				py={2}
				mt={8}
				mb={[0, 0, 8]}
				mx='auto'>
				<Box>
					<NextLink href='/' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Home
						</Button>
					</NextLink>
					<NextLink href='/change-password' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Change password
						</Button>
					</NextLink>
					<NextLink href='/delete-user' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Delete user
						</Button>
					</NextLink>
					<NextLink href='/login' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Login
						</Button>
					</NextLink>
					<NextLink href='/note' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							note
						</Button>
					</NextLink>
					<NextLink href='/protected' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Protected
						</Button>
					</NextLink>
					<NextLink href='/protected-server-side' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Protected server side
						</Button>
					</NextLink>
					<NextLink href='/weather' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Weather
						</Button>
					</NextLink>
					<NextLink href='/sign-up' passHref>
						<Button
							as='a'
							variant='ghost'
							p={[1, 2, 4]}
							_hover={{backgroundColor: navHoverBg[colorMode]}}>
							Sign up
						</Button>
					</NextLink>
				</Box>
				<DarkModeSwitch />
			</StickyNav>
			<Flex
				as='main'
				justifyContent='center'
				flexDirection='column'
				bg={bgColor[colorMode]}
				color={color[colorMode]}
				px={[0, 4, 4]}
				mt={[4, 8, 8]}
                mx={'auto'}
                maxWidth='800px'
                width='100%'>
				{children}
			</Flex>
		</>
	);
};

export default Container;
